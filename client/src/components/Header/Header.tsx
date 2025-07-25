import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../../services/AuthContext";
import "./Header.css";

function Header() {
  const { isLogged, setIsLogged, setUser } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    fetch("http://localhost:3310/api/logout", {
      method: "POST",
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        toast.success("Déconnexion réussie");
        setIsLogged(false);
        setUser(null);
        navigate("/");
      } else {
        toast.error("Erreur lors de la déconnexion");
      }
    });
  }
  return (
    <section className="header-component">
      <Link to="/">
        <img src="/images/Logo-InLibro.png" alt="logo-inLibro" />
      </Link>
      <nav>
        {!isLogged ? (
          <>
            <Link to="/login"> Se connecter</Link>
          </>
        ) : (
          <>
            <Link to="/reading-pile"> Ma pile de lecture</Link>
            <Link to="/my-books"> Mes propositions de lecture</Link>
            <button type="button" onClick={handleLogout}>
              Se déconnecter
            </button>
          </>
        )}
      </nav>
    </section>
  );
}

export default Header;
