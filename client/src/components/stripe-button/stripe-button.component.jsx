import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51IDzSbCKieWhz1zTxt4sA7n1RpRFNI0CdTtQsu9KppvQR4UyoBPZxbVOh6QJ6YgYkM9jfp2IKpXaMW3grGWAHE1W00e6SiqGOW";

  // Will eventually pass token to backend which will create the charge
  const onToken = (token) => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token: token,
      },
    })
      .then((response) => {
        alert("Payment successful");
      })
      .catch((error) => {
        console.log("Payment error: ", JSON.parse(error));
        alert(
          "There was an issue with your payment. Please be sure you use the provided credit card."
        );
      });

    console.log(token);
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Dan's Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
