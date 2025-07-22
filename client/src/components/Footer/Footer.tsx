import { Link } from "react-router";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-component">
      <nav className="link-footer">
        <Link to="/">Nous contacter</Link>
        <Link to="/">A propos</Link>
        <Link to="/">Revue de presse</Link>
        <Link to="/">C.G.V</Link>
      </nav>
      <li className="link-logo">
        <a href="https://github.com/Estelle-Mchd/InLibro" target="blank">
          <img src="/images/github-logo.png" alt="logo GitHub" />
        </a>
        <a
          href="https://www.linkedin.com/in/estelle-michard-b24697295/"
          target="blank"
        >
          <img src="/images/linkedin-logo.png" alt="logo Linkedin" />
        </a>
      </li>
    </footer>
  );
}

export default Footer;
