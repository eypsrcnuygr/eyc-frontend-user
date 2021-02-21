import NavBar2 from "./NavBar2";
import Footer from "./Footer";

const Bank = () => (
  <div className="d-flex flex-column vh-100">
    <NavBar2 />
    <div className="card py-3 shadow-lg col-lg-8 mx-auto">
      <h1 className="text-center">Hesap Numaralarımız</h1>
      <p>
      TR7700 0100 0938 7124 3336 5003, ZİRAAT  BANKASI-YASEMİN ÇOLPAN
      </p>
    </div>
    <Footer />
  </div>
);

export default Bank;
