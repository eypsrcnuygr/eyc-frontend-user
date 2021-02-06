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

  const { items_ids, user_id, value } = state.createBasketReducer.basket;

  return {
    email,
    password,
    password_confirmation,
    isLoggedIn,
    uid,
    client,
    access_token,
    items_ids,
    user_id,
    value
  };
};

const mapDispatchToProps = (dispatch) => ({
  loginAdminFromComponent: (admin) => dispatch(loginAdmin(admin)),
  logoutAdminFromComponent: (admin) => dispatch(logoutAdmin(admin)),
});

const NavBar2 = (props) => {

  const [errorDiv, setErrorDiv] = useState(null);

  const checkLoginStatus = () => {
    if (JSON.parse(localStorage.getItem("eycUser"))) {
      axios
      .get("https://eyc-api.herokuapp.com/v1/auth_user/validate_token", {
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
              id: JSON.parse(localStorage.getItem("eycUser")).myResponse.id
            },
          });
        }
      })
      .catch((error) => {
        setErrorDiv(error);
      });
    }

  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light my-navbar">
      <div
        className="collapse navbar-collapse d-flex justify-content-center"
        id="navbarSupportedContent"
      >
        
        <div className="collapse navbar-collapse text-center d-flex justify-content-center" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle font-weight-bold my-link"
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
              <Link to="/logged_in" className="login">Giriş Yap</Link>
            ) : (
              <div className="d-flex justify-content-lg-between">
                <div className="ml-3"><Link to="/user" className="my-link-2 font-weight-bold">Hoşgeldin {props.email}</Link></div>
                <div><Link to="/basket" className="my-link-2"><i className="fas fa-2x fa-shopping-cart"></i></Link><span style={{ position: "absolute", color: "white", fontWeight: "700" }}>{props.items_ids.length}</span></div>
              </div>
              
            )}
          </div>
        </div>
        {errorDiv !== null && errorDiv.message === 'Request failed with status code 401' ? <div className="mx-auto">Giriş Yapmayı Unutmayın</div> : null }
      </div>
      
    </nav>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar2);
