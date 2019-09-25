import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_29UlvfkeS5zQWFRxat3ED2bs002O3b1qHk';

  const onToken = async token => {
    try {
      await axios({
        url: 'payment',
        method: 'post',
        data: {
          amount: priceForStripe,
          token,
        },
      });
      alert('Payment successful!');
    } catch (error) {
      console.log('Payment error: ', JSON.parse(error));
      alert(
        'There was an issue with your payment. Please ensure you use the credit card details provided'
      );
    }
  }
  return (
    <StripeCheckout
      label='Pay Now'
      name='Enex Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel={'Pay Now'}
      token={onToken}
      stripeKey={publishableKey}
    />
  );
}

export default StripeCheckoutButton;
