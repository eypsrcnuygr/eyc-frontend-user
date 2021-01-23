import { Link } from 'react-router-dom';

const NavBar2 = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarSupportedContent">
        <Link to="/logged_in">Giriş Yap</Link>
      </div>
    </nav>
  );
}

export default NavBar2;