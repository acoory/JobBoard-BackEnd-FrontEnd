import React, { useContext, useState } from "react";
import { CardContext } from "../../../context/CardContext";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";

const ModalCandidature = () => {
  const { card, setModalCandidature, setModalCandidatureBis } =
    useContext(CardContext);
  const { user } = useContext(UserContext);
  const userData = JSON.parse(user);
  let [cv, setCv] = useState([userData.cv]);
  const [errore, seterrore] = useState("");
  const [succe, setsucce] = useState("");
  let [presentation, setPresentation] = useState("");

  console.log(JSON.parse(user));

  const sendForm = (e) => {
    e.preventDefault();

    if (presentation.length > 29) {
      let data = JSON.stringify({
        advertisement_id: card.id,
        people_id: userData.userId,
        motivation_letter: presentation,
        companie_name: card.companie_name,
        people_name: userData.name,
        advertisement_title: card.title,
        cv: cv,
        people_firstname: userData.firstname,
      });

      let config = {
        method: "post",
        url: "http://localhost:4000/api/jobapplication",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setsucce("Votre candidature à bien était envoyé 😉");
          setTimeout(function () {
            setModalCandidature(false);
            setModalCandidatureBis(false);
            setsucce("");
          }, 3000);
        })
        .catch(function (error) {
          console.log(error);
          seterrore("Oups il y a un problème ... 🤨");
          setTimeout(() => {
            setModalCandidature(false);
          }, 5000);
          setTimeout(() => {
            seterrore("");
          }, 3000);
        });
    } else {
      seterrore("Minimum 30 caractère pour le champ description");
      setTimeout(() => {
        seterrore("");
      }, 3000);
    }
  };

  return (
    <>
      <form className="form_modify_offre form_modify_media">
        <button
          onClick={(e) => {
            e.preventDefault();
            setModalCandidature(false);
            setModalCandidatureBis(false);
            setsucce("");
          }}
          className="close_modale"
        >
          <img
            alt="close_modal"
            style={{ width: "12px" }}
            src="https://cdn-icons-png.flaticon.com/512/2976/2976286.png"
          />
        </button>
        <div className="container-notif">
          <div
            className="success"
            style={{ marginTop: succe.length >= 1 ? "0%" : "-10%" }}
          >
            {succe}
          </div>
          <div
            className="error"
            style={{ marginTop: errore.length >= 1 ? "0%" : "-10%" }}
          >
            {errore}
          </div>
        </div>

        <h1>Candidature</h1>
        <h3 className="companie_candidature">
          {card.companie_name} - {card.title}
        </h3>
        {/*<h3>{card.title}</h3>*/}
        <label htmlFor="lettre">Briève présentation</label>
        <textarea
          onChange={(e) => setPresentation(e.target.value)}
          className="textarea_candidature"
          name="lettre"
        ></textarea>

        <label className="label_candidature">Votre cv</label>
        {/*//// ?????????????? ////*/}

        <embed
          src={
            !cv
              ? userData.cv
              : !Array.isArray(cv)
              ? URL.createObjectURL(cv)
              : userData.cv
          }
          width="100%"
          height="470"
        />
        <div className="buttonNext">
          <button
            onClick={sendForm}
            style={{ color: "white" }}
            className="candidature"
          >
            Envoyer
          </button>
        </div>
      </form>
    </>
  );
};

export default ModalCandidature;
