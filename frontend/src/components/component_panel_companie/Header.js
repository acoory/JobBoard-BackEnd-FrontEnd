import React from "react";
import { Carousel } from "@trendyol-js/react-carousel";
import logo from "../../images/FINDJOB(2).png";
import { NavLink } from "react-router-dom";

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
              Créer, modifier et supprimer vos offres en toute simplicité
            </h3>
          </div>
          <div className="section_yellow_card section_yellow_spans">
            <span>Dénichez de nouveau talent</span>
            <span>Agrandissez-vous</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
