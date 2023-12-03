import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="main-footer">
      <div className="main-container">
        <p>
          Copyright © {new Date().getFullYear()}&nbsp;
          <Link className="footer-link underline" to="/">
            pigma Communications-web.fr
          </Link>{" "}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
