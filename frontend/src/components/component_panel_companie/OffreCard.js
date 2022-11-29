import React, { useContext } from "react";
import axios from "axios";
import { CardContext } from "../../context/CardContext";

const OffreCard = ({
  offre,
  modalModify,
  setModalModify,
  setSelectCard,
  setCompanieOffre,
}) => {
  const { setAllOffres } = useContext(CardContext);

  // Transform mensuel salarie to annual
  const salarie = offre.salarie * 12;
  const salarieYears = salarie.toLocaleString();

  const setModal = () => {
    setModalModify(!modalModify);
    setSelectCard(offre);
  };

  const deleteOffre = () => {
    let config = {
      method: "delete",
      url: `http://141.94.31.123:4000/api/advertisement/${offre.id}`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        setAllOffres([]);
        setCompanieOffre([]);
        console.log("test");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <article className="article_description card_panel card_panel_media">
        <p></p>
        <div className="card_panel_header">
          <div className="card_panel_header_title">
            <h3>{offre.title}</h3>
            <span className="infoItem_span infoItem_description">
              <p className="avantage nbreCandid">{offre.type}</p>
            </span>

            {/* <p>{offre.description}</p> */}
            <p
              dangerouslySetInnerHTML={{
                __html: offre.description.substr(0, 200),
              }}
            />
          </div>
          <div className="edit">
            <button
              className="candidature"
              style={{ fontSize: "13px", textTransform: "uppercase" }}
              onClick={setModal}
            >
              Modifier
            </button>
            <button className="heart" onClick={deleteOffre}>
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      </article>
    </>
  );
};

export default OffreCard;
