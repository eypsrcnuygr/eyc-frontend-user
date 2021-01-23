const NavBar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Ara"
            aria-label="Search"
            value={props.value}
            onChange={(event) => props.handleChange(event)}
          />
        </form>
      </div>
    </nav>
  );
}

export default NavBar;