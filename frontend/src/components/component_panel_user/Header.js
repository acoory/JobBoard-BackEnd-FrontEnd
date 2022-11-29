import React, { useContext } from "react";
import logo from "../../images/FINDJOB(2).png";
import { NavLink } from "react-router-dom";
import { CardContext } from "../../context/CardContext";

const Header = () => {
  return (
    <>
      <div className="header_panel_companie">
        <>
          <div className="container"></div>
          <header className="header_home">
            <div className="container_header">
              <img src={logo} alt="FinJob logo" />

              <nav>
                <ul>
                  <NavLink
                    to="/"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <li>Accueil</li>
                  </NavLink>
                </ul>
              </nav>
              <div className="header_right"></div>
            </div>
          </header>
        </>
      </div>
      <div className="section_yellow height">
        <div className="section_yellow">
          <div className="section_yellow_left" style={{ marginBottom: "10px" }}>
            <h2 className="section_yellow_title font_size">
              Bienvenue sur votre dashboard
            </h2>
            <h3 className="section_yellow_h3 h3_font_weight">
              Consulter l'état de vos candidature en toute simplicité
            </h3>
          </div>
          <div className="section_yellow_card section_yellow_spans">
            <span>Vivez de nouvelle experience</span>
            <span>Développez de nouvelle compétences</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
