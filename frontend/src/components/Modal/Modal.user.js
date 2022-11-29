import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import UpdatePassword from "./Views.user/Password.user";
import UpdateUser from "./Views.user/Update.user";

import { Logout } from "../../services/user.service";

export default function Modal_information({
  modalSetting,
  setmodalSetting,
  setmodal,
}) {
  const [active, setactive] = useState(0);
  const [view, setview] = useState("myData");
  const { user, setUser } = useContext(UserContext);
  const [menuMobile, setmenuMobile] = useState(false);

  const ChoiceModalView = (view) => {
    switch (view) {
      case "myData":
        return <UpdateUser />;
      case "updatePassword":
        return <UpdatePassword />;
    }
  };

  useEffect(() => {}, [user]);

  return (
    <React.Fragment>
      <div
        className="modal_panel"
        style={{
          height: modalSetting ? "90%" : "0%",
          overflow: modalSetting ? "visible" : "hidden",
        }}
      >
        <div
          onClick={() => setmenuMobile(false)}
          className="transparence-container-mobile"
          style={{ display: menuMobile ? "block" : "none" }}
        ></div>
        <div
          className="container-menu-mobile"
          style={{ width: menuMobile ? "50%" : "0px" }}
        >
          <img
            alt="picture_user"
            className="picture_user"
            src={JSON.parse(user).profilPicture}
          />
          <li
            onClick={() => {
              setactive(0);
              setview("myData");
              setmenuMobile(false);
            }}
            className={active === 0 ? "active" : null}
          >
            Mes informations
          </li>
          <li
            onClick={() => {
              setactive(1);
              setview("updatePassword");
              setmenuMobile(false);
            }}
            className={active === 1 ? "active" : null}
          >
            Modifier mon mot de passes
          </li>
          <li onClick={() => Logout(setUser, setmodalSetting)}>Deconnexion</li>
        </div>

        <div className="container_modal">
          <div className="header_modal">
            <div
              onClick={() => setmenuMobile(true)}
              className="button-mobile-menu"
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
            <h1>Paramètres</h1>
            <button
              onClick={() => setmodalSetting(false)}
              className="close_modal"
            >
              <img
                alt="close_modal"
                style={{ width: "12px" }}
                src="https://cdn-icons-png.flaticon.com/512/2976/2976286.png"
              />
            </button>
          </div>
          <div className="content">
            <div className="content-panel">
              <div className="container-profilpicture">
                <img
                  alt="picture_user"
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "100%",
                    objectFit: "cover",
                  }}
                  src={JSON.parse(user).profilPicture}
                />
              </div>
              <li
                onClick={() => {
                  setactive(0);
                  setview("myData");
                }}
                className={active === 0 ? "active" : null}
              >
                Mes informations
              </li>
              <li
                onClick={() => {
                  setactive(1);
                  setview("updatePassword");
                }}
                className={active === 1 ? "active" : null}
              >
                Modifier mon mot de passe
              </li>
              <li onClick={() => Logout(setUser, setmodalSetting)}>
                Deconnexion
              </li>
            </div>
            <div className="content-main">{ChoiceModalView(view)}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
