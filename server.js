const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

//Load .env into process env, allowing process.env to access secret key
if (process.env.NODE_ENV !== "production") require("dotenv").config();
//bring in stripe library
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//Instantiate a new express application - an api server
const app = express();
const port = process.env.PORT || 5000;

//For any of the request coming in, proces the body tag and convert into json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Enables so that we're able to make requests from localhost3000 to port5000
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  //app.get is how we tell our application what the rest parameters for each url will be (Get, Post, Update, Delete)
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port " + port);
});

//Want the app to recieve a request from client code to some route called "/payment"
app.post("/payment", (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "usd",
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});
