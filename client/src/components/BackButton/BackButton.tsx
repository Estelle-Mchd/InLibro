import "./BackButton.css";
import { useNavigate } from "react-router";

function BackButton() {
  const navigate = useNavigate();
  const previousPage = () => {
    navigate(-1);
  };

  return (
    <section className="section-back-button">
      <button type="button" onClick={previousPage} className="back-button">
        Page précédente
      </button>
    </section>
  );
}

export default BackButton;
