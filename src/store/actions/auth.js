import * as actionTypes from "./actionTypes";
import axios from "axios";

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId,
  };
};

const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error,
  };
};

// export const setAuthSignin = (value) => {
//   return {
//     type: actionTypes.AUTH_SIGNIN,
//     value,
//   };
// };

export const logout = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const checkAuthTimeout = (expTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expTime * 1000);
  };
};

export const authSignin = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    let reqData = {
      email: email,
      password: password,
    };
    const url = "http://localhost:8080/signin";
    axios
      .post(url, reqData)
      .then((res) => {
        console.log(1, res);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expirationDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(res.data.token, res.data.userId));
        dispatch(checkAuthTimeout(60 * 60));
        console.log(res);
      })
      .catch((err) => {
        console.log("one", err);
        dispatch(authFailed(err.message));
      });
  };
};

export const authSignup = (name, email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    let reqData = {
      name: name,
      email: email,
      password: password,
    };
    const url = "http://localhost:8080/signup";
    axios
      .post(url, reqData)
      .then((res) => {
        console.log(res);
        dispatch(authSuccess(null, null));
        // dispatch(setAuthSignin(false));
        // console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(authFailed(err.response.data.error.data));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path,
  };
};

export const checkAuthState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    // console.log(token);
    if (token === null) {
      dispatch(logout());
    } else {
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        const expiratonTime =
          (expirationDate.getTime() - new Date().getTime()) / 1000;
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout(expiratonTime));
      }
    }
  };
};
