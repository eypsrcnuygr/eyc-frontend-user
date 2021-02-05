import { connect } from "react-redux";
import { logoutAdmin, loginAdmin } from "../actions/index";
import { useEffect } from 'react';
import axios from 'axios';

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



const User = (props) => {

  // const [userId, setUserId] = useState(null);

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
    const [value] = props;
    value.reduce((a, b) => {
      return a + b;
  }, 0);
  }

  useEffect(() => {
    checkLoginStatus();
    calculateValue()
  }, []);

  

}

export default connect(mapStateToProps, mapDispatchToProps)(User);