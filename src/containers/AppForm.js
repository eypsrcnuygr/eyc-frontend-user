/* eslint-disable no-alert */
/* eslint-disable camelcase */
import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { createAdmin, loginAdmin } from "../actions/index";
import { SetLocalStorage } from "../helpers/SetLocalStorage";

const mapStateToProps = (state) => {
  const {
    email,
    password,
    password_confirmation,
    uid,
    client,
    access_token,
  } = state.createAdminReducer.admin;

  const { isLoggedIn } = state.createAdminReducer;

  return {
    email,
    password,
    password_confirmation,
    isLoggedIn,
    uid,
    client,
    access_token,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loginAdminFromComponent: (admin) => dispatch(loginAdmin(admin)),
  createAdminFromComponent: (user) => dispatch(createAdmin(user)),
});

const AppForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [emailForLogin, setEmailForLogin] = useState("");
  const [passwordForLogin, setPasswordForLogin] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  let responseVar = null;

  const handleSubmit = (event) => {
    axios
      .post("https://eyc-api.herokuapp.com/v1/auth_user", {
        email,
        password,
        password_confirmation,
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === "success") {
          console.log(response.headers);
          SetLocalStorage(response);
          props.createAdminFromComponent({
            admin: {
              email,
              password,
              password_confirmation,
              uid: response.headers.uid,
              access_token: response.headers.access_token,
              client: response.headers.client,
            },
          });
        }
      })
      .then(() => props.history.push("/"))
      .catch((error) => {
        console.log(error);
        setHasError(true);
        setErrorMessage(error.response);
        responseVar = errorMessage;
        setTimeout(() => {
          alert(responseVar);
        }, 500);
        return error.response;
      });

    event.preventDefault();
  };

  const handleSubmitForLogin = (event) => {
    axios
      .post("https://eyc-api.herokuapp.com/v1/auth_user/sign_in", {
        email: emailForLogin,
        password: passwordForLogin,
      })
      .then((response) => {
        if (response.status === 200) {
          SetLocalStorage(response);
          props.loginAdminFromComponent({
            admin: {
              email: emailForLogin,
              password: passwordForLogin,
            },
          });
        }
      })
      .then(() => props.history.push("/"))
      .catch((error) => {
        setHasError(true);
        setErrorMessage(error.response.statusText);
        responseVar = errorMessage;
        setTimeout(() => {
          alert(responseVar);
        }, 500);
        return error.response;
      });

    event.preventDefault();
  };

  return (
    <div className="yellowbg d-flex flex-column">
      <h1 className="text-center font-weight-bold">EYC BABY</h1>
      <form className="text-center mb-4 w-50 mx-auto mt-4">
        <input
          type="email"
          name="email"
          id="myMailForTest"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="form-control mb-2"
        />
        <input
          type="password"
          name="password"
          id="myPasswordForTest"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          className="form-control mb-2"
        />
        <input
          type="password"
          name="password_confirmation"
          id="myPasswordConfirmationForTest"
          placeholder="Password-Confirmation"
          value={password_confirmation}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          required
          className="form-control mb-2"
        />
        <button
          type="button"
          className="btn btn-success mt-3"
          id="myButtonForTest"
          onClick={handleSubmit}
        >
          Üye Ol
        </button>
      </form>

      <form className="text-center mb-3 w-50 mx-auto">
        <input
          type="email"
          name="email"
          data-testid="custom-element"
          placeholder="Email"
          value={emailForLogin}
          onChange={(event) => setEmailForLogin(event.target.value)}
          required
          className="form-control mb-2"
        />
        <input
          type="password"
          name="password"
          data-testid="custom-element2"
          placeholder="Password"
          value={passwordForLogin}
          onChange={(event) => setPasswordForLogin(event.target.value)}
          required
          className="form-control mb-2"
        />
        <button
          type="button"
          className="btn btn-primary mt-3"
          data-testid="custom-element3"
          onClick={handleSubmitForLogin}
        >
          Giriş Yap
        </button>
      </form>
      {hasError ? <div>{errorMessage}</div> : null}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppForm);
