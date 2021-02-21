// import { connect } from "react-redux";
// import { logoutAdmin, loginAdmin, removeFromBasket } from "../actions/index";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import NavBar2 from "../components/NavBar2";
// import Footer from "../components/Footer";

// const mapStateToProps = (state) => {
//   const {
//     email,
//     password,
//     password_confirmation,
//     uid,
//     client,
//     access_token,
//     id
//   } = state.createAdminReducer.admin;

//   const { isLoggedIn } = state.createAdminReducer;



//   return {
//     email,
//     password,
//     password_confirmation,
//     isLoggedIn,
//     uid,
//     client,
//     access_token,
//     id
//   };
// };

// const mapDispatchToProps = (dispatch) => ({
//   loginAdminFromComponent: (admin) => dispatch(loginAdmin(admin)),
//   logoutAdminFromComponent: (admin) => dispatch(logoutAdmin(admin)),
// });

// const User = (props) => {
//   const [myValue, setMyValue] = useState(0);
//   const [myUser, setMyUser] = useState([]);
//   const [userId, setUserId] = useState('');

//   const checkLoginStatus = () => {
//     if (JSON.parse(localStorage.getItem("eycUser"))) {
//       axios
//         .get("https://eyc-api.herokuapp.com/v1/auth_user/validate_token", {
//           headers: {
//             uid: JSON.parse(localStorage.getItem("eycUser")).myUid,
//             client: JSON.parse(localStorage.getItem("eycUser")).myClient,
//             "access-token": JSON.parse(localStorage.getItem("eycUser"))
//               .myAccessToken,
//           },
//         })
//         .then((response) => {
//           // setUserId(response.data.data.id);
//           if (response.data.success && !props.isLoggedIn) {
//             props.loginAdminFromComponent({
//               admin: {
//                 email: response.data.data.email,
//                 password: props.password,
//                 id: JSON.parse(localStorage.getItem("eycUser")).myResponse.id
//               },
//             });
//           }
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }
//   };
//   const calculateValue = () => {
//     let value = props.value;
//     console.log(value);
//     value = value.map((item) => parseFloat(item));
//     value = value.reduce((a, b) => a + b, 0);
//     console.log(value);
//     setMyValue(value);
//   };

//   const getItems = () => {
//     axios
//       .get(`https://eyc-api.herokuapp.com/users/${props.id}`, {
//         headers: {
//           uid: JSON.parse(localStorage.getItem("eycUser")).myUid,
//           client: JSON.parse(localStorage.getItem("eycUser")).myClient,
//           "access-token": JSON.parse(localStorage.getItem("eycUser"))
//             .myAccessToken,
//         },
//       })
//       .then((response) => {
//         if (response.status === 200) {
//           console.log(response.data);
//           setMyUser(response.data);
//           localStorage.setItem('eycUserResponse', JSON.stringify({
//             response
//           }));
//         }
//       });
//   };

//   const handleTransaction = () => {
//     axios.post(
//       `https://eyc-api.herokuapp.com/sold_items`,
//       {
//         sold_item: {
//           user_id: props.user_id,
//           items_ids: props.items_ids,
//           date: new Date().toISOString(),
//           value: myValue,
//         },
//       },
//       {
//         headers: {
//           uid: JSON.parse(localStorage.getItem("eycUser")).myUid,
//           client: JSON.parse(localStorage.getItem("eycUser")).myClient,
//           "access-token": JSON.parse(localStorage.getItem("eycUser"))
//             .myAccessToken,
//         },
//       }
//     );
//     // .then((response) => {
//     //   if (response.status === 200) {
//     //     setMyItems(...myItems, response.data);
//     //   }
//     // });
//   };

//   // const getRemovedItems = (i) => {
      
//   //   setMyItems(myItems.filter((item) => item.id !== i.id));
//   //   calculateValue();
//   // };

//   // const handleRemove = (i) => {
//   //   props.removeFromBasketFromComponent({
//   //     basket: {
//   //       user_id: props.user_id,
//   //       item_id: i.id,
//   //       value: i.value,
//   //     },
//   //   })

//   //   getRemovedItems(i);
//   //   console.log(props.value);
//   // }

//   useEffect(() => {
//     checkLoginStatus();
//     getItems();
//   }, []);

//   // useEffect(() => {
//   //   calculateValue();
//   // }, [props.value]);
//   let i = -1;
//   console.log(JSON.parse(JSON.parse(localStorage.getItem('eycUserResponse')).response.data.items));
//   return (
//     <div className="d-flex flex-column h-100 vh-100 text-center">
//       <NavBar2 />
//       <div>
//        {(localStorage.getItem('eycUserResponse')) ? 
//        JSON.parse(JSON.parse(localStorage.getItem('eycUserResponse')).response.data.items).map(element => {
//          i+=1;
//          return(
//            <div>
//              <b className="text-danger">{parseFloat(element.value)} TL</b>
//              {' '}
//              <b>{element.date.slice(0,10)}</b>
//            </div>
//          )
//        }): <div>Geçmiş alışverişiniz bulunmamaktadır.</div>}
//       </div>
//       {/* <div className="font-weight-bold text-center text-danger mt-5">
//         Toplam: {myValue} TL
//       </div> */}
//       <div className="h-100">
      
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default connect(mapStateToProps, mapDispatchToProps)(User);
