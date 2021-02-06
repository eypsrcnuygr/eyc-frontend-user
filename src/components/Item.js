/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import NavBar2 from "./NavBar2";
import { useEffect, useState } from "react";
import { logoutAdmin, loginAdmin, addtoBasket } from "../actions/index";
import Footer from './Footer';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const mapStateToProps = (state) => {
  const {
    email,
    password,
    password_confirmation,
    uid,
    client,
    access_token,
  } = state.createAdminReducer.admin;

  const { items_ids, user_id } = state.createBasketReducer.basket;

  const { isLoggedIn } = state.createAdminReducer;

  return {
    email,
    password,
    password_confirmation,
    isLoggedIn,
    uid,
    client,
    access_token,
    items_ids,
    user_id
  };
};

const mapDispatchToProps = (dispatch) => ({
  loginAdminFromComponent: (admin) => dispatch(loginAdmin(admin)),
  logoutAdminFromComponent: (admin) => dispatch(logoutAdmin(admin)),
  addtoBasketFromComponent: (basket) => dispatch(addtoBasket(basket)),
});

const Item = (props) => {
  const [photo, setImage] = useState(null);
  const [state, setState] = useState({
    name: "",
    details: "",
    value: 0,
    group: "Müslin",
  });
  const [myDiv, setMyDiv] = useState(null);
  const [Item, setItem] = useState([]);
  let responseVar = null;

  const [userId, setUserId] = useState(null);
  const [itemId, setItemId] = useState([]);

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
        setUserId(response.data.data.id);
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

  const getItem = () => {
    axios
      .get(`https://eyc-api.herokuapp.com/items/${props.match.params.id}`, {
        // headers: {
        //   uid: JSON.parse(localStorage.getItem("eycUser")).myUid,
        //   client: JSON.parse(localStorage.getItem("eycUser")).myClient,
        //   "access-token": JSON.parse(localStorage.getItem("eycUser"))
        //     .myAccessToken,
        // },
      })
      .then((response) => {
        if (response.status === 200) {
          setItem(response.data);
          setItemId(response.data.id);
        }
      });
  };

  useEffect(() => {
    getItem();
    checkLoginStatus();
  }, []);

  const onImageUpload = (event) => {
    setImage(event.originalUrl);
  };

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
      .patch(
        `https://eyc-api.herokuapp.com/items/${props.match.params.id}`,
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
        if (response.status === 200) {
          setMyDiv("Yükleme Başarılı");
          getItem();
          setTimeout(() => {
            setMyDiv(null);
          }, 2000);
        }
      })
      .then(() => {
        checkLoginStatus();
      })
      .catch((error) => {
        responseVar = error.response.statusText;
        setTimeout(() => {
          alert(responseVar);
        }, 500);
      });
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddToBasket = () => {
    props.addtoBasketFromComponent({
      basket: {
        user_id: userId,
        items_ids: itemId,
        value: Item.value
      },
    })
  } 
  return (
    <div className="text-center vh-100 h-100 d-flex flex-column">
      <NavBar2 />
      <div>
          <Link to="/"><img src="./Logobeyaz.jpg" alt="logo" className="logo-2" /></Link> 
        </div>
      <div>
        <b>{myDiv}</b>
      </div>
      <div className="col-12 col-md-4 card mx-auto p-4 shadow-lg mb-4">
        <div className="mx-auto col-9">
          <img
            src={Item.image}
            alt="specific-item"
            className="img-fluid rounded"
          />
        </div>
        <div>
          <b>{Item.name}</b>
        </div>
        <div>
          <b>{Item.details}</b>
        </div>
        <div>
          <b>{Item.value} Tr</b>
        </div>
        <div>
          {props.isLoggedIn ? <button
            className="btn btn-success"
            onClick={() =>
              handleAddToBasket()
            }
          >
            Sepete Ekle
          </button> : <p className="font-weight-bold text-danger">Alışveriş yapmak için giriş yapınız!</p>}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Item);
