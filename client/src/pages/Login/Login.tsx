import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../services/AuthContext";
import "./Login.css";
import BackButton from "../../components/BackButton/BackButton";

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
      navigate("/reading-pile");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <section className="section-login">
      <img src="/images/Logo-InLibro.png" alt="logo-InLibro" />
      <section className="login-component">
        <article>
          <p>Ta pile de lecture ne se tient qu’à quelques clicks. ✨</p>
        </article>
        <form onSubmit={handleSubmit} className="form-login">
          <h2>Connexion</h2>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            value={password}
            placeholder="Mot de passe"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Je me connecte</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Link to="/registration" className="link-login">
            Je n'ai pas encore de compte
          </Link>
        </form>
      </section>
      <BackButton />
    </section>
  );
}

export default Login;
