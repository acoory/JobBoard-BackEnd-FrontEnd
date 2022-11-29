import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { CardContext } from "../../context/CardContext";

const ModalModifyPost = ({
  selectCard,
  setCompanieOffre,
  offres,
  setModalModify,
  dataOffreCompanie,
}) => {
  // Passer a la 2eme page du formulaire
  const [nextModalModify, setNextModalModify] = useState(false);

  // Listen form
  const [description, setDescription] = useState(selectCard.description);
  const [titre, setTitre] = useState(selectCard.title);
  const [localisation, setLocalisation] = useState(selectCard.location);
  const [salaire, setSalaire] = useState(selectCard.salarie);
  const [nbrePost, setNbrePost] = useState(selectCard.nbrePost);
  const [type, setType] = useState(selectCard.type);
  const [phraseAccroche, setPhraseAccroche] = useState(
    selectCard.phrase_accroche
  );
  // On transforme en tableau la chaine de caractère
  const [avantage, setAvantage] = useState(selectCard.avantage.split(","));
  const [error, seterror] = useState("");
  const [success, setsuccess] = useState("");

  const { user } = useContext(UserContext);
  const { setAllOffres } = useContext(CardContext);

  // Requête modify offre
  const sendForm = (e) => {
    e.preventDefault();

    if (
      titre &&
      localisation &&
      salaire &&
      nbrePost &&
      avantage.length &&
      type &&
      description &&
      phraseAccroche
    ) {
      let axios = require("axios");
      let data = JSON.stringify({
        title: titre,
        description: description,
        location: localisation,
        type: type,
        salarie: salaire,
        avantage: avantage.toString(),
        phrase_accroche: phraseAccroche,
        nbrePost: nbrePost,
      });

      let config = {
        method: "put",
        url: `http://141.94.31.123:4000/api/advertisement/${selectCard.id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setAllOffres([]);
          setsuccess("Bravo vos données ont bien été modifier.");
          setTimeout(() => {
            setsuccess("");
          }, 5000);

          let config = {
            method: "get",
            url: "http://141.94.31.123:4000/api/advertisement",
            headers: {},
          };

          // Requête pour mettre à jour state offre de la companie
          axios(config)
            .then(function (response) {
              // On stock seulement els offre créer par la companie connecté
              setTimeout(() => {
                setModalModify(false);
              }, 3000);

              setCompanieOffre(
                offres.filter((obj) => {
                  return obj.companie_id === JSON.parse(user).userId;
                })
              );
              setCompanieOffre([]);
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
          seterror(error.response.data);
          setTimeout(() => {
            seterror("");
          }, 3000);
        });
    } else seterror("Remplir le formulaire");
    setTimeout(() => {
      seterror("");
    }, 3000);
  };

  // Retour au premier formulaire
  const returnFirstForm = () => {
    setNextModalModify(false);
  };
  //Verify first form
  const formVerifSuite = (e) => {
    e.preventDefault();
    if (avantage.length && titre && localisation && salaire && nbrePost && type)
      setNextModalModify(true);
    else seterror("Remplir le formulaire");
    setTimeout(() => {
      seterror("");
    }, 3000);
  };

  // Set Avantage
  const setChekboxTitre = (e) => {
    if (avantage.includes("titre")) {
      setAvantage(avantage.filter((data) => data !== "titre"));
      console.log("ntp");
    } else {
      console.log("ntm");
      setAvantage([...avantage, e.target.value]);
    }
  };

  const setChekboxTransport = (e) => {
    if (avantage.includes("transport"))
      setAvantage(avantage.filter((data) => data !== "transport"));
    else setAvantage([...avantage, e.target.value]);
  };

  const setChekboxPrime = (e) => {
    if (avantage.includes("prime"))
      setAvantage(avantage.filter((data) => data !== "prime"));
    else setAvantage([...avantage, e.target.value]);
  };

  return (
    <>
      <div className="apparition">
        <form autoComplete="on" className="form_modify_offre form_modify_media">
          <div className="container-notif">
            <div
              className="success"
              style={{ marginTop: success.length >= 1 ? "0%" : "-10%" }}
            >
              {success}
            </div>
            <div
              className="error"
              style={{ marginTop: error.length >= 1 ? "0%" : "-10%" }}
            >
              {error}
            </div>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setModalModify(false);
            }}
            className="close_modale"
          >
            <img
              alt="close_modal"
              style={{ width: "12px" }}
              src="https://cdn-icons-png.flaticon.com/512/2976/2976286.png"
            />
          </button>
          <h1>Modifier l'offre</h1>

          {/* Form suit two */}
          {nextModalModify ? (
            <>
              <label htmlFor="">Phrase d'accroche :</label>
              <textarea
                className="phrase_accroche"
                defaultValue={phraseAccroche}
                onChange={(e) => setPhraseAccroche(e.target.value)}
                placeholder=""
              />
              <label htmlFor="">Description :</label>
              <textarea
                className="description"
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder=""
              />
              <div className="modalButtonsDiv">
                <button className="button_after" onClick={returnFirstForm}>
                  Retour
                </button>
                <button onClick={sendForm} className="candidature">
                  Confirmer
                </button>
              </div>
            </>
          ) : (
            // First Form
            <>
              <label htmlFor="titre">Titre :</label>
              <input
                defaultValue={titre}
                onChange={(e) => setTitre(e.target.value)}
                name="titre"
                type="text"
              />
              <label htmlFor="localisation">Localisation :</label>
              <input
                defaultValue={localisation}
                onChange={(e) => setLocalisation(e.target.value)}
                name="localisation"
              />
              <label htmlFor="salaire">Salaire (mensuel) :</label>
              <input
                defaultValue={salaire}
                onChange={(e) => setSalaire(e.target.value)}
                type="number"
                name="salaire"
              />
              <label htmlFor="nbrePost">Nombre de poste(s) :</label>
              <input
                defaultValue={nbrePost}
                onChange={(e) => setNbrePost(e.target.value)}
                name="nbrePost"
                type="number"
                max="100"
                placeholder=""
              />

              <label className="modifyLabelAvantages">Avantages :</label>
              <div className="avantageCheckboxs">
                <div className="avantageChekbox">
                  <input
                    defaultChecked={
                      avantage.includes("titre") ? "checked" : null
                    }
                    onClick={setChekboxTitre}
                    style={{ appearance: "auto" }}
                    type="checkbox"
                    id="coding"
                    name="interest"
                    value="titre"
                  />
                  <label className="labelAvantage" htmlFor="coding">
                    Titre-restaurant
                  </label>
                </div>
                <div className="avantageChekbox">
                  <input
                    defaultChecked={
                      avantage.includes("transport") ? "checked" : null
                    }
                    onClick={setChekboxTransport}
                    style={{ appearance: "auto" }}
                    type="checkbox"
                    id="music"
                    name="interest"
                    value="transport"
                  />
                  <label className="labelAvantage" htmlFor="music">
                    Transport
                  </label>
                </div>
                <div className="avantageChekbox">
                  <input
                    defaultChecked={
                      avantage.includes("prime") ? "checked" : null
                    }
                    onClick={setChekboxPrime}
                    style={{ appearance: "auto" }}
                    type="checkbox"
                    id="music"
                    name="interest"
                    value="prime"
                  />
                  <label className="labelAvantage" htmlFor="music">
                    Prime
                  </label>
                </div>
              </div>

              <label htmlFor="type">Type de contrat :</label>
              <div className="typeCheckBox">
                <div className="checkBoxType">
                  <input
                    defaultChecked={type.includes("cdi") ? "checked" : ""}
                    onChange={(e) => setType([e.target.value])}
                    style={{ appearance: "auto" }}
                    type="radio"
                    id="coding"
                    name="interest"
                    value="cdi"
                  />
                  <label className="labelAvantage" htmlFor="coding">
                    CDI
                  </label>
                </div>
                <div className="checkBoxType">
                  <input
                    defaultChecked={type.includes("cdd") ? "checked" : ""}
                    onChange={(e) => setType([e.target.value])}
                    style={{ appearance: "auto" }}
                    type="radio"
                    id="music"
                    name="interest"
                    value="cdd"
                  />
                  <label className="labelAvantage" htmlFor="music">
                    CDD
                  </label>
                </div>
                <div className="checkBoxType">
                  <input
                    defaultChecked={
                      type.includes("alternance") ? "checked" : ""
                    }
                    onChange={(e) => setType([e.target.value])}
                    style={{ appearance: "auto" }}
                    type="radio"
                    id="music"
                    name="interest"
                    value="alternance"
                  />
                  <label className="labelAvantageBis" htmlFor="music">
                    Alternance
                  </label>
                </div>
              </div>

              <div className="buttonNext">
                <button onClick={formVerifSuite} className="candidature">
                  Suivant
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default ModalModifyPost;
