import cartActionTypes from './cart.types';

const INITIAL_STATE = {
  showCart: false,
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case cartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        showCart: !state.showCart
      }
    default:
      return state;
  }
}