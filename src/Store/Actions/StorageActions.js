import * as actionTypes from "./actionTypes";
import * as firebase from "../../Firebase/Firebase";

const saveStorage = (data) => {
  const { notesArray = false, answersArray = false, symbolType = false } = data;

  return {
    type: actionTypes.GET_STORAGE,
    notesArray: notesArray,
    answers: answersArray,
    symbolType: symbolType,
  };
};

const deleteStorage = () => {
  return {
    type: actionTypes.DELETE_STORAGE,
  };
};

const storageSetSuccessfully = () => {
  return {
    type: actionTypes.STORAGE_SET,
  };
};

const storageUnset = () => {
  return {
    type: actionTypes.STORAGE_UNSET,
  };
};

export const getStorageAsync = (user) => {
  return (dispatch) => {
    firebase.database
      .ref(`users/${user.uid}`)
      .get()
      .then((res) => {
        if (res.exists()) dispatch(saveStorage(res.val().data));
        if (!res.exists()) dispatch(saveStorage());
      })
      .catch((err) => console.log(err));
  };
};

export const deleteStorageAsync = (user) => {
  return (dispatch) => {
    if (!user) {
      dispatch(deleteStorage());
      return;
    }

    firebase.database
      .ref(`users/${user?.uid}`)
      .remove()
      .then(() => dispatch(deleteStorage()))
      .catch((err) => console.log(err));
  };
};

export const setStorage = (notesArray, answersArray, symbolType, user) => {
  return (dispatch) => {
    dispatch(storageUnset());
    const data = {
      notesArray: notesArray,
      answersArray: answersArray,
      symbolType: symbolType,
    };

    firebase.database.ref(`users/${user.uid}`).set({ data: data }, (error) => {
      if (!error) dispatch(storageSetSuccessfully());
      if (error) console.log(error);
    });
  };
};
