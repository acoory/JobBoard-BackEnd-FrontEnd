import Main from "../components/components_home/Main/Main";
import Header from "../components/components_home/Header/Header";
import ModalUser from "../components/Modal/Modal.user";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import ModalCompanie from "../components/Modal/Modal.companie";
import React from "react";
import ModalCandidature from "../components/components_home/Main/ModalCandidature";
import { CardContext } from "../context/CardContext";

export default function Home() {
  const { setModalCandidature, modalCandidature } = useContext(CardContext);
  const { user } = useContext(UserContext);
  const [modalSetting, setmodalSetting] = useState(false);

  // Choix du modal en fonction du rôle de l'utilisateur
  const ChoiceModal = (view) => {
    switch (view) {
      case "ROLE_USER":
        return (
          <ModalUser
            modalSetting={modalSetting}
            setmodalSetting={setmodalSetting}
          />
        );
      case "ROLE_COMPANIE":
        return (
          <ModalCompanie
            modalSetting={modalSetting}
            setmodalSetting={setmodalSetting}
          />
        );
      case "ROLE_ADMIN":
        return (
          <ModalCompanie
            modalSetting={modalSetting}
            setmodalSetting={setmodalSetting}
          />
        );
      default:
        break;
    }
  };

  return (
    <>
      {modalSetting ? (
        <div
          onClick={() => setmodalSetting(!modalSetting)}
          className="transparence_panel"
        />
      ) : null}
      {modalCandidature ? (
        <>
          {" "}
          <ModalCandidature />
          <div
            onClick={() => setModalCandidature(false)}
            className="transparence_panel"
          ></div>
        </>
      ) : (
        ""
      )}
      <Header setmodalSetting={setmodalSetting} modalSetting={modalSetting} />
      <Main />

      {/* Selection de la modal en fonction du role de l'utilisateur */}
      {user.length >= 1 ? ChoiceModal(JSON.parse(user).role) : null}
    </>
  );
}
