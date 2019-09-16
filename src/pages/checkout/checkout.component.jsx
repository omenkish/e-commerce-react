import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { selectCartItems, selectCartTotal } from "../../redux/cart/cart.selectors";

import './checkout.styles.scss';

const CheckoutPage = ({ cartItems, total }) => {
  const headerElements = [
    'Product', 'Description', 'Quantity', 'Price', 'Remove'
  ];
  return (
    <div className='checkout-page' >
      <div className='checkout-header'>
        {
          headerElements.map((elem, idx) => (
            <div key={idx} className='header-block'>
              <span>{elem}</span>
            </div>
          ))
        }
      </div>

      {cartItems.map(cartItem => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
      ))}
      
      <div className='total'>
        <span>TOTAL: ${total}</span>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);
