/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { logoutAdmin, loginAdmin } from "../actions/index";
import { connect } from "react-redux";
import { Slide } from "react-slideshow-image";
import Footer from './Footer';
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import NavBar2 from "./NavBar2";
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

const AllItems = (props) => {
  const [photo, setImage] = useState(null);
  const [state, setState] = useState({
    name: "",
    details: "",
    value: 0,
    group: "Müslin",
  });
  const [myDiv, setMyDiv] = useState(null);
  const [ItemList, setItemList] = useState([]);
  const [navState, setNavState] = useState("");
  const [banner, setBanner] = useState([]);

  let responseVar = null;

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

  const getItems = () => {
    axios
      .get("http://localhost:3001/items", {
        // headers: {
        //   uid: JSON.parse(localStorage.getItem("eycUser")).myUid,
        //   client: JSON.parse(localStorage.getItem("eycUser")).myClient,
        //   "access-token": JSON.parse(localStorage.getItem("eycUser"))
        //     .myAccessToken,
        // },
      })
      .then((response) => {
        if (response.status === 200) {
          setItemList(response.data);
          const a = response.data.filter(
            (element) => element.banner_status === true
          );
          setBanner(a);
        }
      });
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

  const sendItemToAPI = () => {
    axios
      .post(
        "http://localhost:3001/items",
        {
          item: {
            image: photo,
            details: state.details,
            value: state.value,
            name: state.name,
            group: state.group,
          },
        },
        {
          headers: {
            uid: JSON.parse(localStorage.getItem("eycUser")).myUid,
            client: JSON.parse(localStorage.getItem("eycUser")).myClient,
            "access-token": JSON.parse(localStorage.getItem("eycUser"))
              .myAccessToken,
          },
        }
      )
      .then((response) => {
        if (response.status === 201) {
          setMyDiv("Yükleme Başarılı");
          setTimeout(() => {
            setMyDiv(null);
          }, 2000);
        }
      })
      .then(() => {
        checkLoginStatus();
        getItems();
      })
      .catch((error) => {
        responseVar = error.response.statusText;
        setTimeout(() => {
          alert(responseVar);
        }, 500);
      });
  };

  const onImageUpload = (event) => {
    setImage(event.originalUrl);
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChange = (event) => {
    setNavState(event.target.value);
  };

  console.log(ItemList);

  console.log(banner);

  return (
    <div className="text-center d-flex flex-column">
      <NavBar2 />
      <h1>Tüm Ürünler</h1>
      <NavBar handleChange={handleChange} value={navState} />
      <div>
          <Link to="/"><img src="./Logobeyaz.jpg" alt="logo" className="logo-2" /></Link> 
        </div>
      <div>
        <b>{myDiv}</b>
      </div>
      <div className="row mx-0 px-3 d-flex justify-content-center">
        {ItemList.filter((myItem) => myItem.name.indexOf(navState) !== -1).map(
          (element) => {
            return (
              <div
                key={element.id}
                className="card shadow-lg my-3 py-3 col-12 col-lg-3 mx-2 d-flex"
              >
                <div className="col-8 mx-auto">
                  <Link to={`items/${element.id}`}>
                    <img
                      src={element.image}
                      alt="item"
                      className="card-img-top img-fluid rounded myImage"
                    />
                  </Link>
                </div>
                <div className="card-body">
                  <div className="font-weight-bold details">{element.name}</div>
                  <div className="font-weight-bold details">{element.details}</div>
                  <div className="font-weight-bold details">{element.value}</div>
                  <div className="font-weight-bold details">{element.group}</div>
                </div>
              </div>
            );
          }
        )}
      </div>
      <div className="mb-3">
       {props.isLoggedIn ?  <button
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

export default connect(mapStateToProps, mapDispatchToProps)(AllItems);