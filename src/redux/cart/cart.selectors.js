import { createSelector } from "reselect";

//INPUT SELECTOR [takes the whole state and just returns a slioce of it. (One layer deep usually)]
const selectCart = (state) => state.cart;

//using the createSlector method makes this a MEMOIZE SELECTOR
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);
