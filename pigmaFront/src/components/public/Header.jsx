import { Link } from "react-router-dom";
import logo from "../../images/pigmaLogo.png"

function Header() {
  return (
    <header className="main-header">
      <div className="main-container">
        <Link to="/">
          <img
            className="header-logo"
            src={logo}
            alt="logo-pigma"
          />
        </Link>
        <nav className="main-nav">
          <ul>

            <li>
              <Link to="/login" className="nav-link underline">Connexion / Inscription</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
