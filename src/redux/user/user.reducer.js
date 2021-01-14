/*
A reducer is a function that gets two properties: (state, action)
    1. STATE: object which represents the initial/previous state 
    2. ACTION:
        {
            type: string,
            payload: any
        }
*/

import { UserActionTypes } from "./user.types";

//INITIAL_STATE will represent the initial state of this reducer
const INITIAL_STATE = {
  currentUser: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
