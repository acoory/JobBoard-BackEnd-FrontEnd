import React, { useContext, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { SignIn } from "../../../services/auth.service";

export default function Signin({ loginorsignup, setisModal }) {
  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");
  const [loginerror, setloginerror] = useState("");
  const [loader, setloader] = useState(false);

  const { setUser } = useContext(UserContext);

  return (
    <React.Fragment>
      {loginorsignup === 0 ? (
        <>
          {loginerror.length >= 1 ? (
            <div className="error_login">Email ou mot de passe incorrect</div>
          ) : null}
          <span>Adresse email</span>
          <input
            onChange={(e) => setloginEmail(e.target.value)}
            value={loginEmail}
            type="text"
          />
          <span>Mot de passe</span>
          <input
            onChange={(e) => setloginPassword(e.target.value)}
            value={loginPassword}
            type="password"
          />
          <br />
          {loader ? (
            <div className="lds-dual-ring"></div>
          ) : (
            <button
              onClick={() =>
                SignIn(
                  loginEmail,
                  loginPassword,
                  setloader,
                  setUser,
                  setisModal,
                  setloginerror
                )
              }
              className="button_login"
            >
              Se connecter
            </button>
          )}
        </>
      ) : null}
    </React.Fragment>
  );
}
