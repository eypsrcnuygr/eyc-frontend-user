/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { logoutAdmin, loginAdmin } from "../actions/index";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Footer from '../components/Footer';
import NavBar from "../components/NavBar";
import NavBar2 from "../components/NavBar2";
import LogoBeyaz from '../styles/Logobeyaz.jpg';
import "../styles/App.css";
import 'react-slideshow-image/dist/styles.css'

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

const GroupByItem = (props) => {
  const [navState, setNavState] = useState("");
  const [myGroup, setMyGroup] = useState([]);

  let responseVar = null;

  const checkLoginStatus = () => {
    if (JSON.parse(localStorage.getItem("eycUser"))) {
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
              id: JSON.parse(localStorage.getItem("eycUser")).myResponse.id
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
    axios
      .get("http://localhost:3001/items", {
      })
      .then((response) => {
        if (response.status === 200) {
          const a = response.data
          setMyGroup(a);
        }
      })
  };

  
  useEffect(() => {
    getItems();
    checkLoginStatus();
  }, []);

  const handleLogOut = () => {
    axios
      .delete("http://localhost:3001/v1/auth_user/sign_out", {
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

  const handleChange = (event) => {
    setNavState(event.target.value);
  };
  

  return (
    <div className="text-center d-flex flex-column vh-100">
      <NavBar2 />
      <div><h1>{props.match.params.group.slice(1)}</h1></div>
      <NavBar handleChange={handleChange} value={navState} />
      <div>
          <Link to="/"><img src={LogoBeyaz} alt="logo" className="logo-2" /></Link>  
        </div>
      <div className="row mx-0 d-flex justify-content-center">
        {myGroup.filter((myItem) => myItem.name.toLowerCase().indexOf(navState.toLowerCase()) !== -1).filter(element => element.group === props.match.params.group.slice(1)).map(
          (element) => {
            return (
              <div
                key={element.id}
                className="card shadow-lg my-3 py-3 col-9 col-md-3 mx-3"
              >
                <div className="mx-auto col-8">
                  <Link to={`/items/${element.id}`}>
                    <img
                      src={element.image}
                      alt={element.group}
                      className="card-img-top img-fluid rounded myImage"
                    />
                  </Link>
                </div>
                <div className="card-body">
                  <div className="details"><b>{element.name}</b></div>
                  <div className="details"><b>{element.value} ₺</b></div>
                </div>
              </div>
            );
          }
        )}
      </div>
      <div className="mb-3">
        {props.isLoggedIn ? <button
          type="button"
          className="button btn btn-danger"
          onClick={handleLogOut}
        >
          Çıkış
        </button> : null}
      </div>
      <Footer />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupByItem);
