/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { logoutAdmin, loginAdmin } from "../actions/index";
import { connect } from "react-redux";
import { Slide } from "react-slideshow-image";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar2 from "../components/NavBar2";
import "../styles/App.css";
import "react-slideshow-image/dist/styles.css";

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
  logoutAdminFromComponent: (admin) => dispatch(logoutAdmin(admin)),
});

const Items = (props) => {
  const [banner, setBanner] = useState([]);

  let responseVar = null;

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
                id: JSON.parse(localStorage.getItem("eycUser")).myResponse.id,
              },
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getItems = () => {
    axios.get("https://eyc-api.herokuapp.com/items", {}).then((response) => {
      if (response.status === 200) {
        const a = response.data.filter(
          (element) => element.banner_status === true
        );
        setBanner(a);
      }
    });
  };

  useEffect(() => {
    getItems();
    checkLoginStatus();
  }, []);

  const handleLogOut = () => {
    axios
      .delete("https://eyc-api.herokuapp.com/v1/auth_user/sign_out", {
        headers: {
          uid: JSON.parse(localStorage.getItem("eycUser")).myUid,
          client: JSON.parse(localStorage.getItem("eycUser")).myClient,
          "access-token": JSON.parse(localStorage.getItem("eycUser"))
            .myAccessToken,
        },
      })
      .then(() => props.logoutAdminFromComponent())
      .then(() => props.history.push("/"))
      .catch((error) => {
        responseVar = error.response.statusText;
        setTimeout(() => {
          alert(responseVar);
        }, 500);
      });
  };

  return (
    <div className="text-center h-100 vh-100 d-flex flex-column">
      <NavBar2 />
      <div>
        <Link to="/">
          <img
            src="./Logobeyaz.jpg"
            alt="EYC Baby, Anne Çocuk Ürünleri Logo"
            className="logo-2"
          />
        </Link>
      </div>
      <main>
        <section className="slide-container">
          <h1>Anne Bebek Ürünleri...</h1>
          <Slide easing="ease-in">
            {banner.map((element) => (
              <div
                className="card mx-auto p-4 shadow-lg col-12 col-md-6"
                key={element.id}
              >
                <div>
                  <Link to={`items/${element.id}`}>
                    <div className="image-container">
                      <img
                        src={element.image}
                        className="img-fluid rounded"
                        alt={element.group}
                      />
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </Slide>
        </section>
      </main>
      <div className="mb-3 mt-2">
        {props.isLoggedIn ? (
          <button
            type="button"
            className="button btn btn-danger"
            onClick={handleLogOut}
          >
            Çıkış
          </button>
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Items);
