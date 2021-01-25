import ShopActionTypes from "./shop.types";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

//BEFORE LEVERAGING THUNKS...

/*
export const updateCollections = (collectionsMap) => ({
  type: ShopActionTypes.UPDATE_COLLECTIONS,
  payload: collectionsMap,
});
*/

//LEVERAGING THUNKS...
export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.fetchCollectionsFailure,
  payload: errorMessage,
});

//   THUNK   ///
//ASYNCHRONUS ACTION CREATOR... THIS IS WHERE THE ASYNC STUFF FROM THE SHOP COMPONENT IS BEING MOVED TO...
export const fetchCollectionsStartAsync = () => {
  return (dispatch) => {
    const collectionRef = firestore.collection("collections");
    dispatch(fetchCollectionsStart());

    collectionRef
      .get()
      .then((snapshot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch((error) => dispatch(fetchCollectionsFailure(error)));
  };
};
// THIS IS ALL A THUNK IS... A FUNCTION THAT RETURNS A FUNCTION... THAT GETS ACCESS TO DISPATCH... SO THT WE CAN DISPATCH MULTIPLE ACTIONS AND HANDLE ASYNC CODE INSIDE OF AN ACTION INSTEAD OF A COMPONENT...
