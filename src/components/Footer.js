import { Link } from "react-router-dom";
import iyzicoLogo from '../styles/iyzico-logo.png';

const Footer = () => {
  return (
    <div className="mt-auto">
      <div className="text-center"><img src={iyzicoLogo} alt="iyzico-logo" /></div>
      <footer className="d-block d-md-flex justify-content-around pt-4 pb-1 text-light flex-wrap mt-auto text-center">
      <div className="d-flex flex-column">
        <div>
          <Link to="/"><img src="./Logo3.jpg" alt="EYC Baby, Anne Çocuk Ürünleri Logo" className="logo" /></Link> 
        </div>
        <div>
          <a href="https://instagram.com/eyc_baby?igshid=uvxui1qnednb" target="blank" className="text-light"><i className="fab fa-instagram fa-2x mt-2"></i></a>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center">
        <div className="text-center w-100">
          <h4 className="border-bottom">EYC BABY</h4>
        </div>
        <ul className="pl-0">
          <li className="list-unstyled py-2">
            <Link className="text-light" to='/AboutUs'>Hakkımızda</Link>
          </li>
          <li className="list-unstyled py-2">
            <Link className="text-light" to="/Bank">Hesap Numaralarımız</Link>
          </li>
        </ul>
      </div>
      <div>
        <div className="text-center w-100">
          <h4 className="border-bottom">Müşteri Hizmetleri</h4>
        </div>
        <ul className="pl-0">
          <li className="list-unstyled py-2">
            <Link className="text-light" to="/Contract">Mesafeli Satış Sözleşmesi</Link>
          </li>
          <li className="list-unstyled py-2">
            <Link className="text-light" to="/Conditions">İade ve İptal Koşulları</Link>
          </li>
          <li className="list-unstyled py-2">
            <Link className="text-light" to="/Security">Gizlilik ve Güvenlik İlkesi</Link>
          </li>
        </ul>
      </div>
      <div>
        <div className="text-center w-100">
          <h4 className="border-bottom">İletişim</h4>
        </div>
        <ul className="pl-0">
          <li className="list-unstyled">
            <p>
              <i className="fab fa-whatsapp mr-2"></i>0506 472 84 28
            </p>
          </li>
          <li className="list-unstyled">
            <p>
              <i className="far fa-envelope mr-2"></i>
              yasemincolpan@eycbaby.com.tr
            </p>
          </li>
          <li className="list-unstyled">
            <p>
              <i className="far fa-compass mr-2"></i>Eyüpsultan/İstanbul Türkiye
            </p>
          </li>
        </ul>
      </div>
    </footer>
    <div className="text-danger dizayn text-center pb-2">Dizayn ©<a target="blank" href="https://www.eyupsercanuygur.com" className="text-danger">Eyüp Sercan UYGUR</a></div>
    </div>
    
  );
};

export default Footer;
