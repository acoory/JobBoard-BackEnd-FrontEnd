import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import Modellogin from "./Modal";
import { NavLink } from "react-router-dom";
import Search from "../Main/Search";
import Carousel from "better-react-carousel";
import axios from "axios";

const logo = require("../../../images/FINDJOB(2).png");

export default function Header({ setmodalSetting, modalSetting }) {
  const [isModal, setisModal] = useState(false);
  const { user } = useContext(UserContext);
  const [companyData, setCompanyData] = useState(null);

  useEffect(() => {}, [user.length]);

  return (
    <>
      <Modellogin isModal={isModal} setisModal={setisModal} />
      <div className="container"></div>
      <header className="header_home">
        <div className="container_header">
          <img className="img_logo" src={logo} alt="FinJob logo" />

          <div className="header_right">
            {user.length >= 1 ? (
              <>
                {user.length >= 1 ? (
                  JSON.parse(user).role === "ROLE_COMPANIE" ? (
                    <NavLink to="/panelCompanie">
                      <button className="panel">Panel companie</button>
                    </NavLink>
                  ) : null
                ) : null}
                {user.length >= 1 ? (
                  JSON.parse(user).role === "ROLE_ADMIN" ? (
                    <NavLink to="/panelCompanie">
                      <button className="panel">Panel admin</button>
                    </NavLink>
                  ) : null
                ) : null}
                {user.length >= 1 ? (
                  JSON.parse(user).role === "ROLE_USER" ? (
                    <NavLink to="/panelUser">
                      <button className="panel">Panel candidat</button>
                    </NavLink>
                  ) : null
                ) : null}
                <button className="button_user_online">
                  {JSON.parse(user).email}
                </button>
                <button
                  onClick={() => setmodalSetting(!modalSetting)}
                  className="logout"
                >
                  <img
                    alt="logout"
                    style={{ width: "15px", height: "15px" }}
                    src="https://cdn-icons-png.flaticon.com/512/3524/3524659.png"
                  />
                </button>
              </>
            ) : (
              <>
                <button className="button_register">Créer un compte</button>
                <button
                  className="button_login"
                  onClick={() => setisModal(!isModal)}
                >
                  Se connecter
                </button>
              </>
            )}
          </div>
        </div>
      </header>
      <div className="section_yellow">
        <div className="section_yellow_left">
          <h2 className="section_yellow_title">Work for more</h2>
          <h3 className="section_yellow_h3">
            Construisons ensemble la nouvelle experience au travail
          </h3>
        </div>

        <div className="section_yellow_card"></div>
      </div>
    </>
  );
}
