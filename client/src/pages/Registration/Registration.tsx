import "./Registration.css";

function Registration() {
  return (
    <main className="registration-page">
      <form>
        <label htmlFor="firstname">Prénom</label>
        <input
          type="text"
          name="firstname"
          placeholder="Ecrivez ici votre prénom"
        />

        <label htmlFor="firstname">Nom</label>
        <input
          type="text"
          name="lastname"
          placeholder="Ecrivez ici votre nom"
        />

        <label htmlFor="email">Votre email</label>
        <input
          type="email"
          name="email"
          placeholder="Ecrivez-ici@votreemail.com"
        />

        <label htmlFor="password">Votre mot de passe</label>
        <input type="password" name="password" placeholder="**********" />

        <label htmlFor="confirm-password">Confirmer votre mot de passe</label>
        <input
          type="confirm-password"
          name="confirmPassword"
          placeholder="**********"
        />

        <button type="button">Valider</button>
      </form>
    </main>
  );
}

export default Registration;
