import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="main-header public-header">
      <div className="main-container">
        <Link to="/" className="title-wrap">
          <img
            className="header-logo"
            src="/images/pigmaLogo.png"
            alt="logo-pigma"
          />
        </Link>
        <nav className="main-nav">
          <ul>

            <li>
              <Link to="/connexion" className="nav-link underline">Connexion / Inscription</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
