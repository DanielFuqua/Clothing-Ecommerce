import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51IB2xrGHnX2wj2j19NlbihSOFx0kFVJsqKjotF8o0zzgFr1Q6faw54HLlrIz3ZSUjtspwNBw6fQBEWQZ8nnk1ZMW00NR2ADLOc";

  // Will eventually pass token to backend which will create the charge
  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful");
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
