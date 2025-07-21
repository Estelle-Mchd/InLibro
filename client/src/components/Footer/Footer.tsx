import { Link } from "react-router";

function Footer() {
  return (
    <section className="footer-component">
      <nav>
        <Link to="/">Nous contacter</Link>
        <Link to="/">A propos</Link>
        <Link to="/">Revue de presse</Link>
        <Link to="/">C.G.V</Link>
      </nav>
    </section>
  );
}

export default Footer;
