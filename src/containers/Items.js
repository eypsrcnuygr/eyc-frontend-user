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
  const [muslin, setMuslin] = useState([]);
  const [pike, setPike] = useState([]);

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
        const b = response.data.filter(element => (
          element.group === 'Organik Müslin Örtüler'
        ));
        const c = response.data.filter(element => (
          element.group === 'Çift Taraflı Pikeler'
        ));
        setBanner(a);
        setMuslin(b);
        setPike(c);
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
  let k = -1;
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
          <h1 className="d-none">Anne Bebek Ürünleri</h1>
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
        <section>
          <h2>Organik Müslin Örtüler</h2>
          {muslin[0] ? <div className="d-flex justify-content-center align-items-center mt-4">
            <div className="col-4 my-font">Bebekleriniz icin en güzelini en doğal haliyle sevgiyle üretiyoruz ...</div>
            <div className="col-lg-4 col-6"><Link to="/groups/:Organik Müslin Örtüler"><img src={muslin[0].image} alt="Organik Müslin" className="w-100" /></Link></div>
          </div> : null}
        </section>
        <h2 className="mt-5">Çift Taraflı Pikeler</h2>
        <section className="d-flex flex-wrap justify-content-center">
         {pike ? pike.map(item => {
           k += 1;
           return (
            <div key={k} className="col-lg-4 col-8 mt-3 d-flex flex-column justify-content-end">
              <div><Link to={`items/${item.id}`} ><img src={item.image} alt="Organik Pike" className="w-100" /></Link></div>
              <div>{item.name}</div>
            </div>
           )
         }) : null}
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
