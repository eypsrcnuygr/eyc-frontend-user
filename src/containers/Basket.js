import { connect } from "react-redux";
import { logoutAdmin, loginAdmin, removeFromBasket } from "../actions/index";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar2 from "../components/NavBar2";
import Footer from "../components/Footer";

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
    value,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loginAdminFromComponent: (admin) => dispatch(loginAdmin(admin)),
  logoutAdminFromComponent: (admin) => dispatch(logoutAdmin(admin)),
  removeFromBasketFromComponent: (basket) => dispatch(removeFromBasket(basket)),
});

const Basket = (props) => {
  const [myValue, setMyValue] = useState(0);
  const [myItems, setMyItems] = useState([]);

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
          // setUserId(response.data.data.id);
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
    }
  };
  const calculateValue = () => {
    let value = props.value;
    console.log(value);
    value = value.map((item) => parseFloat(item));
    value = value.reduce((a, b) => a + b, 0);
    console.log(value);
    setMyValue(value);
  };

  const getItems = () => {
    props.items_ids.forEach((id) => {
      axios
        .get(`http://localhost:3001/items/${id}`, {
          headers: {
            uid: JSON.parse(localStorage.getItem("eycUser")).myUid,
            client: JSON.parse(localStorage.getItem("eycUser")).myClient,
            "access-token": JSON.parse(localStorage.getItem("eycUser"))
              .myAccessToken,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            setMyItems((myItems) => [...myItems, response.data]);
          }
        });
    })
  };

  const handleTransaction = () => {
    axios.post(
      `http://localhost:3001/sold_items`,
      {
        sold_item: {
          user_id: props.user_id,
          items_ids: props.items_ids,
          date: new Date().toISOString(),
          value: myValue,
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
    );
    // .then((response) => {
    //   if (response.status === 200) {
    //     setMyItems(...myItems, response.data);
    //   }
    // });
  };

  const getRemovedItems = (i) => {
      
    setMyItems(myItems.filter((item) => item.id !== i.id));
    calculateValue();
  };

  const handleRemove = (i) => {
    props.removeFromBasketFromComponent({
      basket: {
        user_id: props.user_id,
        item_id: i.id,
        value: i.value,
      },
    })

    getRemovedItems(i);
    console.log(props.value);
  }

  useEffect(() => {
    checkLoginStatus();
    getItems();
  }, []);

  useEffect(() => {
    calculateValue();
  }, [props.value]);
  let i = -1;

  return (
    <div className="d-flex flex-column h-100 vh-100 text-center">
      <NavBar2 />
      <div className="d-flex flex-wrap text-center">
        {myItems.map((item) => {
          i += 1;
          return (
            <div key={i} className="col-lg-2 mx-auto">
              <div>
                <img src={item.image} alt="ürün" className="img-fluid" />
              </div>
              <div>{item.name}</div>
              <div>{item.value}</div>
              <button
                className="btn btn-danger"
                onClick={() => handleRemove(item)}
              >
                Sepetten Çıkar
              </button>
            </div>
          );
        })}
      </div>
      <div className="font-weight-bold text-center text-danger">
        Toplam: {myValue} TL
      </div>
      <button
        onClick={handleTransaction}
        className="btn btn-success col-lg-1 mx-auto font-weight-bold py-0"
      >
        Ödeme Yap
      </button>
      <Footer />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Basket);
