/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { Widget } from "@uploadcare/react-widget";
import { useEffect, useState } from "react";
import { logoutAdmin, loginAdmin } from "../actions/index";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

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

const Item = (props) => {
  const [photo, setImage] = useState(null);
  const [state, setState] = useState({
    name: "",
    details: "",
    value: 0,
    group: 'Müslin',
  });
  const [myDiv, setMyDiv] = useState(null);
  const [Item, setItem] = useState([]);
  let responseVar = null;

  const checkLoginStatus = () => {
    axios
      .get("http://localhost:3001/v1/auth/validate_token", {
        headers: {
          uid: JSON.parse(localStorage.getItem("myAdmin")).myUid,
          client: JSON.parse(localStorage.getItem("myAdmin")).myClient,
          "access-token": JSON.parse(localStorage.getItem("myAdmin"))
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

  const getItem = () => {
    axios
      .get(`http://localhost:3001/items/${props.match.params.id}`, {
        headers: {
          uid: JSON.parse(localStorage.getItem("myAdmin")).myUid,
          client: JSON.parse(localStorage.getItem("myAdmin")).myClient,
          "access-token": JSON.parse(localStorage.getItem("myAdmin"))
            .myAccessToken,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setItem(response.data);
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
      .delete("http://localhost:3001/v1/auth/sign_out", {
        headers: {
          uid: JSON.parse(localStorage.getItem("myAdmin")).myUid,
          client: JSON.parse(localStorage.getItem("myAdmin")).myClient,
          "access-token": JSON.parse(localStorage.getItem("myAdmin"))
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
        `http://localhost:3001/items/${props.match.params.id}`,
        {
          item: {
            image: photo,
            details: state.details,
            value: state.value,
            name: state.name,
            group: state.group
          },
        },
        {
          headers: {
            uid: JSON.parse(localStorage.getItem("myAdmin")).myUid,
            client: JSON.parse(localStorage.getItem("myAdmin")).myClient,
            "access-token": JSON.parse(localStorage.getItem("myAdmin"))
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
  return (
    <div className="text-center">
      <h1>Ürünü değiştir</h1>
      <div>
        <b>{myDiv}</b>
      </div>
      <input
        className="form-control w-50 mx-auto my-2"
        onChange={(event) => onInputChange(event)}
        value={state.name}
        name="name"
        type="text"
        placeholder="Ürünün Adı"
      />
      <input
        className="form-control w-50 mx-auto my-2"
        onChange={(event) => onInputChange(event)}
        value={state.details}
        name="details"
        type="text"
        placeholder="Ürünün Detayları"
      />
      <input
        className="form-control w-50 mx-auto my-2"
        onChange={(event) => onInputChange(event)}
        value={state.value}
        name="value"
        type="Number"
        placeholder="Ürünün Fiyatı"
      />
      <select name="group" id="group" className="form-control w-50 mx-auto" onChange={(event) => onInputChange(event)}>
        <option value="Müslin">Müslin</option>
        <option value="Patik">Patik</option>
        <option value="Battaniye">Battaniye</option>
        <option value="Kundak">Kundak</option>
      </select>
      <Widget
        publicKey={process.env.REACT_APP_PUBLIC_API_KEY}
        id="file"
        role="uploadcare-uploader"
        onChange={(event) => onImageUpload(event)}
        locale="tr"
      />
      <button
        type="button"
        className="btn btn-success my-3 w-25 mx-auto"
        onClick={sendItemToAPI}
      >
        Yükle
      </button>
      <div className="card w-50 mx-auto p-4 shadow-lg mb-4">
      <div className="w-75 mx-auto">
        <img src={Item.image} alt="specific-item" className="img-fluid" />
      </div>
      <div>{Item.name}</div>
      <div>{Item.details}</div>
      <div>{Item.value}</div>
      <div>{Item.group}</div>
      </div>
      
      
      <div className="mb-3">
        <Link to="/logged_in">
        <button
          type="button"
          className="button btn btn-primary"
        >
          Admin Panele Dön
        </button>
        </Link>
        
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
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
