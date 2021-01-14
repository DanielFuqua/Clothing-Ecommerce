// The root-reducer is the base reducer object that represents all of the state of the application

import { combineReducers } from "redux";
import cartReducer from "./cart/cart.reducer";
import userReducer from "./user/user.reducer";

export default combineReducers({
  user: userReducer,
  cart: cartReducer,
});
