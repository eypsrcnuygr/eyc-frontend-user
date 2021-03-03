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
    id,
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
    id,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loginAdminFromComponent: (admin) => dispatch(loginAdmin(admin)),
  createAdminFromComponent: (user) => dispatch(createAdmin(user)),
});

const AppForm = (props) => {
  const [email, setEmail] = useState("");
  const [myAddress, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [myName, setMyName] = useState("");
  const [mySurname, setMySurname] = useState("");
  const [emailForLogin, setEmailForLogin] = useState("");
  const [passwordForLogin, setPasswordForLogin] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [myCity, setMyCity] = useState("");
  const [myGsm, setMyGsm] = useState("");

  let responseVar = null;

  const handleSubmit = (event) => {
    axios
      .post("http://localhost:3001/v1/auth_user", {
        email,
        password,
        password_confirmation,
        address: myAddress,
        name: myName,
        surname: mySurname,
        gsm: myGsm,
        city: myCity
      })
      .then((response) => {
        if (response.data.status === "success") {
          SetLocalStorage(response);
          props.createAdminFromComponent({
            admin: {
              email,
              password,
              password_confirmation,
              uid: response.headers.uid,
              access_token: response.headers.access_token,
              client: response.headers.client,
              id: response.data.data.id
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
      .post("http://localhost:3001/v1/auth_user/sign_in", {
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
              id: response.data.data.id
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
          type="text"
          name="name"
          id="myNameForTest"
          placeholder="İsim"
          value={myName}
          onChange={(event) => setMyName(event.target.value)}
          required
          className="form-control mb-2"
        />
        <input
          type="text"
          name="name"
          id="mySurnameForTest"
          placeholder="Soyisim"
          value={mySurname}
          onChange={(event) => setMySurname(event.target.value)}
          required
          className="form-control mb-2"
        />
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
          placeholder="Şifre"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          className="form-control mb-2"
        />
        <input
          type="password"
          name="password_confirmation"
          id="myPasswordConfirmationForTest"
          placeholder="Şifre-Tekrar"
          value={password_confirmation}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          required
          className="form-control mb-2"
        />
        <textarea
          type="text"
          name="address"
          id="myAddress"
          rows="3"
          placeholder="Adresiniz"
          value={myAddress}
          onChange={(event) => setAddress(event.target.value)}
          required
          className="form-control mb-2"
        />
        <input
          type="text"
          name="city"
          id="myCityForTest"
          placeholder="Şehir"
          value={myCity}
          onChange={(event) => setMyCity(event.target.value)}
          required
          className="form-control mb-2"
        />
         <input
          type="text"
          name="city"
          id="myCityForTest"
          placeholder="Cep Telefonu (Opsiyonel)"
          value={myGsm}
          onChange={(event) => setMyGsm(event.target.value)}
          className="form-control mb-2"
        />
        <button
          type="button"
          className="btn btn-success mt-3"
          id="myButtonForTest"
          onClick={handleSubmit}
          disabled={myName.length<1 || email.length<1 || password.length<1 || password_confirmation.length <1 || myAddress.length <1}
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
          placeholder="Şifre"
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
          disabled={emailForLogin.length < 1 || passwordForLogin.length < 1}
        >
          Giriş Yap
        </button>
      </form>
      {hasError ? <div>{errorMessage}</div> : null}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppForm);
