import React from "react";
import { useContext } from "react";
import { CardContext } from "../../../context/CardContext";
import { Link } from "react-router-dom";

// On récupere offre pour récuperer les infos de chaque offre
const SectionOffreCard = ({ offre }) => {
  // On récupere setCard pour y stocké les infos de l'offre cliquez
  const { setCard } = useContext(CardContext);

  return (
    <div className="card_offre" onClick={() => setCard(offre)}>
      <article className="article_offre_card">
        <div className="">
          <h2 className="article_offre_card_title">{offre.title}</h2>
          <Link to={`/offre/${offre.id}`}>
            <h2 className="article_offre_card_title_mobile">{offre.title}</h2>
          </Link>
        </div>

        <div className="article_offre_card_titleLocal">
          <p className="article_offre_card_companie">
            {offre.companie_name} -{" "}
            <span className="text_location">{offre.location}</span>
          </p>
          {/*<p className="article_offre_card_localisation">{offre.location}</p>*/}
        </div>

        <div className="article_offre_card_infoItem">
          <span>
            <i className="fa-solid fa-money-bill"></i>
            <p className="a">{offre.salarie} € par mois</p>
          </span>

          <span>
            <i className="fa-solid fa-share-nodes"></i>
            <p className="type_txt">{offre.type}</p>
          </span>
        </div>

        <div className="article_offre_card_infoItem2">
          <span className="infoItem_span">
            <i className="fa-solid fa-paper-plane"></i>
            <p>Candidature facile</p>
          </span>
          <span className="infoItem_span">
            <i className="fa-solid fa-user-plus"></i>
            <p>Plusieurs postes à pourvoir</p>
          </span>
        </div>

        <ul className="article_offre_card_list">
          <li>{offre.phrase_accroche}</li>
        </ul>

        <p className="section_offre_card_date">
          {" "}
          Offre publié <span>le 03/10/2022</span>
        </p>
      </article>
    </div>
  );
};

export default SectionOffreCard;
