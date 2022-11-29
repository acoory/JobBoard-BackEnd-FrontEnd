import React, { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import Signupcompanie from "./Signup.companie";

export default function Modal_login({ isModal, setisModal }) {
  const [loginorsignup, setloginorsignup] = useState(0);

  return (
    <React.Fragment>
      {isModal ? (
        <div className="transparence_login">
          <div
            onClick={() => setisModal(!isModal)}
            className="transparence"
          ></div>
          <div className="modal_login">
            <h1>Bienvenue !</h1>
            <div className="SigninorSignup">
              <button
                style={{
                  boxShadow: loginorsignup === 0 ? "0px 2px 0px #ffcd00" : "",
                }}
                onClick={() => setloginorsignup(0)}
              >
                Se connecter
              </button>
              <button
                style={{
                  boxShadow: loginorsignup === 1 ? "0px 2px 0px #ffcd00" : "",
                }}
                onClick={() => setloginorsignup(1)}
              >
                Je veux postuler
              </button>
              <button
                style={{
                  boxShadow: loginorsignup === 2 ? "0px 2px 0px #ffcd00" : "",
                }}
                onClick={() => setloginorsignup(2)}
              >
                Je suis une entreprise
              </button>
            </div>

            {/* Formulaire login */}
            <Signin loginorsignup={loginorsignup} setisModal={setisModal} />

            {/* Formulaire register people */}
            <Signup loginorsignup={loginorsignup} setisModal={setisModal} />

            {/* Formulaire register companie */}
            <Signupcompanie
              loginorsignup={loginorsignup}
              setisModal={setisModal}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}
