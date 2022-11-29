import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { CardContext } from "../../context/CardContext";

const ModalModifyPost = ({
  selectCard,
  setCompanieOffre,
  offres,
  setModalCreate,
}) => {
  const { user } = useContext(UserContext);
  const { setAllOffres } = useContext(CardContext);
  const userData = JSON.parse(user);
  // Passer a la 2eme page du formulaire
  const [nextModalModifyy, setNextModalModifyy] = useState(false);

  // Listen form
  const [descriptions, setDescriptions] = useState();
  const [titres, setTitres] = useState();
  const [localisations, setLocalisations] = useState();
  const [salaires, setSalaires] = useState();
  const [nbrePosts, setNbrePosts] = useState();
  const [types, setTypes] = useState();
  const [phraseAccroches, setPhraseAccroches] = useState();
  // On transforme en tableau la chaine de caractère
  const [avantages, setAvantages] = useState([]);
  const [errors, seterrors] = useState("");
  const [successs, setsuccesss] = useState("");

  const newdate = new Date();

  const year = newdate.getFullYear();
  const month = newdate.getMonth() + 1;
  const day = newdate.getDate();
  const date = [year, month, day].join("-");

  // create new post in database
  const createPost = async (e) => {
    e.preventDefault();
    const axios = require("axios");
    const data = JSON.stringify({
      title: titres,
      title_filter: titres
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase(),
      companie_id: userData.userId,
      description: descriptions.replace(/(\r|\n|\r)/gm, "<br/>"),
      location: localisations,
      type: types,
      salarie: parseInt(salaires),
      companie_name: userData.name,
      created_at: date,
      avantage: avantages.toString(),
      phrase_accroche: phraseAccroches,
      nbrePost: nbrePosts,
    });

    const config = {
      method: "post",
      url: "http://141.94.31.123:4000/api/advertisement",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setsuccesss("Votre offre a bien été publié");
        seterrors("");
        setAllOffres([...offres, response.data]);
        setCompanieOffre([...offres, response.data]);
        setModalCreate(false);
      })
      .catch(function (error) {
        seterrors("Une erreur est survenue");
        setsuccesss("");
        console.log(error);
      });
  };

  // Retour au premier formulaire
  const returnFirstForm = () => {
    setNextModalModifyy(false);
  };
  //Verify first form
  const formVerifSuite = (e) => {
    e.preventDefault();
    if (
      avantages.length &&
      titres &&
      localisations &&
      salaires &&
      nbrePosts &&
      types
    )
      setNextModalModifyy(true);
    else seterrors("Remplir le formulaire");
    setTimeout(() => {
      seterrors("");
    }, 3000);
  };

  // Set Avantage
  const setChekboxTitre = (e) => {
    if (avantages.includes("titre"))
      setAvantages(avantages.filter((data) => data !== "titre"));
    else setAvantages([...avantages, e.target.value]);
  };

  const setChekboxTransport = (e) => {
    if (avantages.includes("transport"))
      setAvantages(avantages.filter((data) => data !== "transport"));
    else setAvantages([...avantages, e.target.value]);
  };

  const setChekboxPrime = (e) => {
    if (avantages.includes("prime"))
      setAvantages(avantages.filter((data) => data !== "prime"));
    else setAvantages([...avantages, e.target.value]);
  };

  return (
    <>
      <div className="apparition">
        <form autoComplete="on" className="form_modify_offre form_modify_media">
          <button
            onClick={(e) => {
              e.preventDefault();
              setModalCreate(false);
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
              style={{ marginTop: successs.length >= 1 ? "0%" : "-10%" }}
            >
              {successs}
            </div>
            <div
              className="error"
              style={{ marginTop: errors.length >= 1 ? "0%" : "-10%" }}
            >
              {errors}
            </div>
          </div>

          <h1>Créer une offre</h1>

          {/* Form suit two */}
          {nextModalModifyy ? (
            <>
              <label htmlFor="">Phrase d'accroche :</label>
              <textarea
                defaultValue={phraseAccroches}
                className="phrase_accroche"
                onChange={(e) => setPhraseAccroches(e.target.value)}
                placeholder=""
              />
              <label htmlFor="">Description :</label>
              <textarea
                defaultValue={descriptions}
                className="description"
                onChange={(e) => setDescriptions(e.target.value)}
                placeholder=""
              />
              <div className="modalButtonsDiv">
                <button className="button_after" onClick={returnFirstForm}>
                  Retour
                </button>
                <button onClick={createPost} className="candidature">
                  Confirmer
                </button>
              </div>
            </>
          ) : (
            // First Form
            <>
              <label htmlFor="titre">Titre :</label>
              <input
                defaultValue={titres}
                onChange={(e) => setTitres(e.target.value)}
                name="titre"
                type="text"
              />
              <label htmlFor="localisation">Localisation :</label>
              <input
                defaultValue={localisations}
                onChange={(e) => setLocalisations(e.target.value)}
                name="localisation"
              />
              <label htmlFor="salaire">Salaire (mensuel) :</label>
              <input
                defaultValue={salaires}
                onChange={(e) => setSalaires(e.target.value)}
                type="number"
                name="salaire"
              />
              <label htmlFor="nbrePost">Nombre de poste(s) :</label>
              <input
                defaultValue={nbrePosts}
                onChange={(e) => setNbrePosts(e.target.value)}
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
                      avantages.includes("titre") ? "checked" : ""
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
                      avantages.includes("transport") ? "checked" : ""
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
                      avantages.includes("prime") ? "checked" : ""
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
                    defaultChecked={
                      types ? (types.includes("cdi") ? "checked" : "") : null
                    }
                    onChange={(e) => setTypes([e.target.value])}
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
                    defaultChecked={
                      types ? (types.includes("cdd") ? "checked" : "") : null
                    }
                    onChange={(e) => setTypes([e.target.value])}
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
                      types
                        ? types.includes("alternance")
                          ? "checked"
                          : ""
                        : null
                    }
                    onChange={(e) => setTypes([e.target.value])}
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
