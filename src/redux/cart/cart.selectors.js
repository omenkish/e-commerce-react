import { createSelector } from 'reselect';

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
);

export const selectShowCart = createSelector(
  [selectCart],
  cart => cart.showCart
);

export const selectCartItemsQuantityCount = createSelector(
  [selectCartItems],
  cartItems => 
  cartItems.reduce(
    (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity,
    0
  )
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems => cartItems.length
);