import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import OffreCard from "./OffreCard";
import ModalModifyPost from "./ModalModifyPost";
import Header from "./Header";
import ModalCreatePost from "./ModalCreatePost";
import ConsultOffre from "./ConsultOffre";
import { CardContext } from "../../context/CardContext";

const Main = () => {
  // On y stock toutes les offres
  let [offres, setOffres] = useState([]);
  // On récupere les infos de la companie connecté
  const { user } = useContext(UserContext);
  const { allOffres } = useContext(CardContext);

  // On Y stock les offres que la companie à créer
  const [companieOffre, setCompanieOffre] = useState([]);
  // Pour afficher/désafficher le modal
  const [modalModify, setModalModify] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);
  const [dataUser, setDataUser] = useState([]);

  // On relance pour stocké role de l'utilisateur dans dataUser
  useEffect(() => {
    user.length < 1 ? setDataUser(null) : setDataUser(JSON.parse(user).role);
  }, [user, allOffres]);

  // On stock les infos de la card sélectionner
  const [selectCard, setSelectCard] = useState("");

  const [choiceModal, setChoiceModal] = useState(2);

  // Call API pour toutes les offre
  const dataOffreCompanie = () => {
    let config = {
      method: "get",
      url: "http://localhost:4000/api/advertisement",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setOffres(response.data);
        // On stock seulement els offre créer par la companie connecté
        setCompanieOffre(
          offres.filter((obj) => {
            return obj.companie_id === JSON.parse(user).userId;
          })
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    dataOffreCompanie();
    console.log(offres);
  }, [offres.length, companieOffre.length]);

  return (
    <div>
      {modalCreate ? (
        <>
          {" "}
          <ModalCreatePost
            offres={offres}
            setModalCreate={setModalCreate}
            setCompanieOffre={setCompanieOffre}
            selectCard={selectCard}
          />
          <div
            onClick={() => setModalCreate(false)}
            className="div_transp_modify"
          ></div>
        </>
      ) : (
        ""
      )}
      {/*On affiche modal et la div transparente si modalModify == true*/}
      {modalModify ? (
        <>
          {" "}
          <ModalModifyPost
            dataOffreCompanie={dataOffreCompanie}
            offres={offres}
            setModalModify={setModalModify}
            setCompanieOffre={setCompanieOffre}
            selectCard={selectCard}
          />
          <div
            onClick={() => setModalModify(false)}
            className="div_transp_modify"
          ></div>
        </>
      ) : (
        ""
      )}

      <Header />
      <div className="container_choice_panel_companie">
        <ul className="panel_companie_nav">
          {dataUser === "ROLE_ADMIN" ? null : (
            <li
              className={choiceModal === 1 ? "li_active" : null}
              onClick={() => setModalCreate(true)}
            >
              Nouvelle offre
            </li>
          )}
          <li
            className={choiceModal === 2 ? "li_active" : null}
            onClick={() => setChoiceModal(2)}
          >
            Éditer offres
          </li>
          <li
            className={choiceModal === 3 ? "li_active" : null}
            onClick={() => setChoiceModal(3)}
          >
            Candidatures
          </li>
        </ul>
      </div>

      {/*Sinon on affiche seulement les offres*/}
      {choiceModal === 2 ? (
        dataUser === "ROLE_COMPANIE" ? (
          <section className="offres">
            {companieOffre
              .slice()
              // .reverse()
              .map((offre) => (
                <OffreCard
                  key={offre.id}
                  offre={offre}
                  modalModify={modalModify}
                  setCompanieOffre={setCompanieOffre}
                  setModalModify={setModalModify}
                  setSelectCard={setSelectCard}
                />
              ))}
          </section>
        ) : (
          <section className="offres">
            {allOffres && allOffres.map((offre) => (
              <OffreCard
                key={offre.id}
                offre={offre}
                modalModify={modalModify}
                setCompanieOffre={setCompanieOffre}
                setModalModify={setModalModify}
                setSelectCard={setSelectCard}
              />
            ))}
          </section>
        )
      ) : null}

      {choiceModal === 3 ? (
        <div className="display_flex">
          {" "}
          <ConsultOffre />{" "}
        </div>
      ) : null}
    </div>
  );
};

export default Main;
