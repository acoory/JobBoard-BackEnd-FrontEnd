import React, { useContext, useEffect, useState } from "react";
import { CardContext } from "../../../context/CardContext";
import { UserContext } from "../../../context/UserContext";

const SectionDescription = () => {
  // On récupère card pour afficher les informations de la card sélectionné
  const { card, setModalCandidature } = useContext(CardContext);
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState("");
  // Convert salarie mensuel to years
  const salarie = card.salarie * 12;
  const salarieYears = salarie.toLocaleString();

  const avantage = card.avantage;

  useEffect(() => {
    setUserData(user.length >= 1 ? JSON.parse(user) : null);
  }, [user.length]);

  return (
    <div className="visibleornone">
      <article className="article_description description_card">
        <div className="candidature_simplifie">
          <h2>{card.title}</h2>
          <p>
            <span>{card.companie_name}</span> - {card.location}
          </p>
          <div className="candid_buttons">
            {userData && userData.role === "ROLE_USER" ? (
              <button
                className="candidature"
                onClick={() => setModalCandidature(true)}
              >
                Candidature simplifiée
              </button>
            ) : (
              <button
                className="candidature transp_button"
                onClick={() =>
                  alert("Veuillez vous connecter en tant qu'utilisateur")
                }
              >
                Candidature simplifiée
              </button>
            )}

            {/*<button className="heart">*/}
            {/*  <i className="fa-regular fa-heart"></i>*/}
            {/*</button>*/}
          </div>
        </div>
        <div className="description_test">
          <div className="description_header">
            <h4 className="description_detail">Détail du poste</h4>
            <p className="description_salaire">Salaire</p>
            <p>{salarieYears} € par an</p>
            <p className="description_salaire">Type de contrat</p>
            <p className="type_card">{card.type}</p>
            <p className="description_salaire">Avantages</p>
            <div className="description_avantage">
              {avantage ? (
                avantage.indexOf("prime") !== -1 ? (
                  <span className="infoItem_span infoItem_description">
                    <p className="avantage nbreCandid">Prime</p>
                  </span>
                ) : null
              ) : null}
              {avantage ? (
                avantage.indexOf("titre") !== -1 ? (
                  <span className="infoItem_span infoItem_description">
                    <p className="avantage nbreCandid">Titre-restaurant</p>
                  </span>
                ) : null
              ) : null}
              {avantage ? (
                avantage.indexOf("transport") !== -1 ? (
                  <span className="infoItem_span infoItem_description">
                    <p className="avantage nbreCandid">Transport</p>
                  </span>
                ) : null
              ) : null}
            </div>
          </div>
          <div className="descr_div">
            <p className="descr_title">Description du poste</p>
            {/* <p>{card.description}</p> */}
            <p dangerouslySetInnerHTML={{ __html: card.description }} />
          </div>
          <div>
            <p className="description_description_text">
              Analyse de recrutement
            </p>
            <span className="infoItem_span infoItem_description">
              <i className="fa-solid fa-user-plus"></i>
              {card.nbrePost < 2 ? (
                <p className="nbreCandid">
                  Souhaite recruter {card.nbrePost} candidat pour ce poste
                </p>
              ) : (
                <p className="nbreCandid">
                  Souhaite recruter {card.nbrePost} candidats pour ce poste
                </p>
              )}
            </span>
            <p className="date">
              Offre publié{" "}
              <span className="descr_date">le {card.created_at}</span>
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default SectionDescription;
