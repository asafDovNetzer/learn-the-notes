import * as actionTypes from "./actionTypes";
import * as firebase from "../../Firebase/Firebase";
import * as actions from "./index";

export const recoverPasswordAsync = (email) => {
  return (dispatch) => {
    firebase.auth
      .sendPasswordResetEmail(email)
      .then(() => {
        dispatch(passwordError(`An email was successfully sent...`), null);
      })
      .catch((error) => {
        dispatch(emailError(error, email));
      });
  };
};

export const clearErrors = () => {
  return {
    type: actionTypes.CLEAR_ERRORS,
  };
};

export const toggleModel = (newState) => {
  return {
    type: actionTypes.TOGGLE_MODEL,
    newState: newState,
  };
};

const emailError = (error, email) => {
  return {
    type: actionTypes.EMAIL_ERROR,
    errorMessage: error.message,
    email: email,
  };
};

export const signUpAsync = (email, password, gameData) => {
  return (dispatch) => {
    firebase.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        dispatch(loginAsync(email, password, gameData));
      })
      .catch((error) => {
        dispatch(emailError(error, email));
      });
  };
};

const loginSuccess = (user) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    user: user,
  };
};

const passwordError = (error, password) => {
  return {
    type: actionTypes.PASSWORD_ERROR,
    errorMessage: error,
    password: password,
  };
};

export const checkUserStatus = () => {
  return (dispatch) => {
    firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(loginSuccess(user));
        dispatch(actions.getStorageAsync(user));
      }
    });
  };
};

export const loginAsync = (email, password, gameData) => {
  return (dispatch) => {
    firebase.auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(loginSuccess(user));
        dispatch(clearErrors());
        dispatch(toggleModel(false));

        if (gameData) {
          const { notesArray, answers, symbolType } = gameData;
          dispatch(actions.setStorage(notesArray, answers, symbolType, user));
        }
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          dispatch(passwordError(error.message, password));
        } else {
          dispatch(emailError(error, email));
        }
      });
  };
};

const logoutSuccess = () => {
  return {
    type: actionTypes.LOGOUT_SUCCESS,
  };
};

export const logoutAsync = () => {
  return (dispatch) => {
    firebase.auth
      .signOut()
      .then(() => {
        dispatch(logoutSuccess());
        dispatch(toggleModel(false));
      })
      .catch((err) => console.log(err));
  };
};
