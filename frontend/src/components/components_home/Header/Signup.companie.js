import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { Signup } from "../../../services/companie.service";

export default function Signupcompanie({ loginorsignup, setisModal }) {
  const [emailCompanie, setemailCompanie] = useState("");
  const [passewordCompanie, setpasswordCompanie] = useState("");
  const [nameCompanie, setnameCompanie] = useState("");
  const [logoCompanie, setlogoCompanie] = useState([]);
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState("");

  const { setUser } = useContext(UserContext);

  return (
    <React.Fragment>
      {loginorsignup === 2 ? (
        <>
          {err.length >= 1 ? <div className="error_login">{err}</div> : null}
          <span>Email</span>
          <input
            onChange={(e) => setemailCompanie(e.target.value)}
            name="adress"
            type="text"
            value={emailCompanie}
          />
          <span>Mot de passe</span>
          <input
            onChange={(e) => setpasswordCompanie(e.target.value)}
            name="password"
            type="password"
            value={passewordCompanie}
          />
          <span>Nom de l'entreprise</span>
          <input
            onChange={(e) => setnameCompanie(e.target.value)}
            name="name"
            type="text"
            value={nameCompanie}
          />
          <span>Logo</span>
          <input
            onChange={(e) => setlogoCompanie(e.target.files[0])}
            name="profilPicture"
            type="file"
          />
          <br />
          {loading ? (
            <div className="lds-dual-ring"></div>
          ) : (
            <button
              onClick={() =>
                Signup(
                  emailCompanie,
                  passewordCompanie,
                  logoCompanie,
                  nameCompanie,
                  setloading,
                  setUser,
                  setisModal,
                  seterr
                )
              }
              className="button_login_companie"
            >
              Confirmer
            </button>
          )}
        </>
      ) : null}
    </React.Fragment>
  );
}
