import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { logoutAdmin, loginAdmin } from "../actions/index";
import { connect } from "react-redux";

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
  logoutAdminFromComponent: (admin) => dispatch(logoutAdmin(admin)),
});

const NavBar2 = (props) => {
  const checkLoginStatus = () => {
    axios
      .get("http://localhost:3001/v1/auth_user/validate_token", {
        headers: {
          uid: JSON.parse(localStorage.getItem("eycUser")).myUid,
          client: JSON.parse(localStorage.getItem("eycUser")).myClient,
          "access-token": JSON.parse(localStorage.getItem("eycUser"))
            .myAccessToken,
        },
      })
      .then((response) => {
        if (response.data.success && !props.isLoggedIn) {
          props.loginAdminFromComponent({
            admin: {
              email: response.data.data.email,
              password: props.password,
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div
        className="collapse navbar-collapse d-flex justify-content-center"
        id="navbarSupportedContent"
      >
        
        <div className="collapse navbar-collapse text-center d-flex justify-content-center" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Kategoriler
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/groups/:Müslin">
                  Müslinler
                </Link>
                <Link className="dropdown-item" to="/groups/:Patik">
                  Patikler
                </Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="/groups/:Battaniye">
                  Battaniyeler
                </Link>
                <Link className="dropdown-item" to="/groups/:Kundak">
                  Kundaklar
                </Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="/all">
                  Tüm Ürünler
                </Link>
              </div>
            </li>
          </ul>
          <div>
            {!props.isLoggedIn ? (
              <Link to="/logged_in">Giriş Yap</Link>
            ) : (
              <div className="ml-3"><Link to="/">Hoşgeldin {props.email}</Link></div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar2);
