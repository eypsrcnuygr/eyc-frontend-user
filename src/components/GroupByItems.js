/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { logoutAdmin, loginAdmin } from "../actions/index";
import { connect } from "react-redux";
import { Slide } from "react-slideshow-image";
import { Link } from "react-router-dom";
import Footer from './Footer';
import NavBar from "./NavBar";
import NavBar2 from "./NavBar2";
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

  const [ItemList, setItemList] = useState([]);
  const [navState, setNavState] = useState("");
  const [myGroup, setMyGroup] = useState([]);

  let responseVar = null;


  const getItems = () => {
    axios
      .get("http://localhost:3001/items", {
        headers: {
          uid: JSON.parse(localStorage.getItem("eycUser")).myUid,
          client: JSON.parse(localStorage.getItem("eycUser")).myClient,
          "access-token": JSON.parse(localStorage.getItem("eycUser"))
            .myAccessToken,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setItemList(response.data);
          const a = response.data
          setMyGroup(a);
        }
      })
  };
  
  useEffect(() => {
    getItems();
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
    <div className="text-center">
      <NavBar2 />
      <NavBar handleChange={handleChange} value={navState} />
  
      <div className="row mx-0 d-flex justify-content-center">
        {myGroup.filter((myItem) => myItem.name.indexOf(navState) !== -1).filter(element => element.group === props.match.params.group.slice(1)).map(
          (element) => {
            return (
              <div
                key={element.id}
                className="card shadow-lg my-3 py-3 col-9 col-md-3 mx-3"
              >
                <div><h3>{element.group}</h3></div>
                <div className="mx-auto col-8">
                  <Link to={`/items/${element.id}`}>
                    <img
                      src={element.image}
                      alt="item"
                      className="card-img-top img-fluid rounded myImage"
                    />
                  </Link>
                </div>
                <div className="card-body">
                  <div>Ürün Adı: <b>{element.name}</b></div>
                  <div>Detaylar: <b>{element.details}</b></div>
                  <div>Fiyatı: <b>{element.value} Tr</b></div>
                </div>
              </div>
            );
          }
        )}
      </div>
      <div className="mb-3">
        <button
          type="button"
          className="button btn btn-danger"
          onClick={handleLogOut}
        >
          Çıkış
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupByItem);
