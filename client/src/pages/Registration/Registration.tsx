import { useState } from "react";
import "./Registration.css";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import BackButton from "../../components/BackButton/BackButton";
import { useAuth } from "../../services/AuthContext";

function Registration() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    role: "user",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const res = await fetch("http://localhost:3310/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        toast.error("Erreur lors de la création du compte");
        return;
      }

      toast.success("Compte créé avec succès !");

      await login(formData.email, formData.password);

      navigate("/reading-pile");
    } catch (error) {
      console.error(error);
      toast.error("Erreur serveur");
    }
  };

  return (
    <section className="registration-page">
      <img src="/images/Logo-InLibro.png" alt="logo-inLibro" />
      <section className="registration-component">
        <article>
          <p>
            Tu libéreras bientôt le lecteur qui se cache au fond de toi...{" "}
            <br /> C'est si beau ! 🥹
          </p>
        </article>
        <form className="form-registration" onSubmit={handleSubmit}>
          <h2>Inscription</h2>
          <input
            type="text"
            name="firstname"
            placeholder="Ecrire ici votre prénom"
            onChange={handleChange}
          />

          <input
            type="text"
            name="lastname"
            placeholder="Ecrire ici votre nom"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Ecrireici@votreemail.com"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Ecrire ici votre mot de passe"
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmer votre mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit">Valider</button>
        </form>
      </section>
      <BackButton />
    </section>
  );
}

export default Registration;
