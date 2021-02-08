/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { logoutAdmin, loginAdmin, addtoBasket } from "../actions/index";
import { connect } from "react-redux";
import { Slide } from "react-slideshow-image";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from './Footer';
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
    id
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
    id
  };
};

const mapDispatchToProps = (dispatch) => ({
  loginAdminFromComponent: (admin) => dispatch(loginAdmin(admin)),
  logoutAdminFromComponent: (admin) => dispatch(logoutAdmin(admin)),
});

const Items = (props) => {
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
        console.log(error);
      });
    }
  };

  const getItems = () => {
    axios
      .get("https://eyc-api.herokuapp.com/items", {
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
          const a = response.data.filter(element => element.banner_status === true)
          setBanner(a);
        }
      })
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

  const sendItemToAPI = () => {
    axios
      .post(
        "https://eyc-api.herokuapp.com/items",
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

  console.log(ItemList)
  
  console.log(banner);

  return (
    <div className="text-center h-100 vh-100 d-flex flex-column">
      <NavBar2 />
      <div>
          <Link to="/"><img src="./Logobeyaz.jpg" alt="logo" className="logo-2" /></Link> 
        </div>
      
      <div>
        <b>{myDiv}</b>
      </div>
      <div>
      <div className="slide-container">
      <Slide easing="ease-in">
        {banner.map(element => (
          <div className="card mx-auto p-4 shadow-lg col-12 col-md-6" key={element.id}>
            <div><Link to={`items/${element.id}`}><div className="image-container"><img src={element.image} className="img-fluid rounded" alt="banner-element" /></div></Link></div>
          </div>
        ))}
      </Slide>
    </div>
        
      </div>
      <div className="mb-3 mt-2">
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

export default connect(mapStateToProps, mapDispatchToProps)(Items);
