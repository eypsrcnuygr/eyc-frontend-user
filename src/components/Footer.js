import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="d-block d-md-flex justify-content-around pt-4 pb-1 text-light flex-wrap mt-auto">
      <div className="d-flex flex-column">
        <div>
          <Link to="/"><img src="./Logo3.jpg" alt="logo" className="logo" /></Link> 
        </div>
        <div>
          <i className="fab fa-instagram fa-2x mt-2"></i>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center">
        <div className="text-center w-100">
          <h4 className="border-bottom my-h4">EYC BABY</h4>
        </div>
        <ul className="pl-0">
          <li className="list-unstyled py-2">
            <Link className="text-light">Hakkımızda</Link>
          </li>
          <li className="list-unstyled py-2">
            <Link className="text-light">Hesap Numaralarımız</Link>
          </li>
          <li className="list-unstyled py-2">
            <Link className="text-light">İletişim</Link>
          </li>
        </ul>
      </div>
      <div>
        <div className="text-center w-100">
          <h4 className="border-bottom my-h4">Müşteri Hizmetleri</h4>
        </div>
        <ul className="pl-0">
          <li className="list-unstyled py-2">
            <Link className="text-light">Mesafeli Satış Sözleşmesi</Link>
          </li>
          <li className="list-unstyled py-2">
            <Link className="text-light">Kişisel Verilerin Korunması</Link>
          </li>
          <li className="list-unstyled py-2">
            <Link className="text-light">Gizlilik İlkesi</Link>
          </li>
          <li className="list-unstyled py-2">
            <Link className="text-light">Çerez Politikası</Link>
          </li>
        </ul>
      </div>
      <div>
        <div className="text-center w-100">
          <h4 className="border-bottom my-h4">İletişim</h4>
        </div>
        <ul className="pl-0">
          <li className="list-unstyled">
            <p>
              <i className="fab fa-whatsapp mr-2"></i>Telefon Numarası Yaz
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
              <i className="far fa-compass mr-2"></i>İstanbul Türkiye
            </p>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;