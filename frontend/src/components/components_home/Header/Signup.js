import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { SignUp } from "../../../services/user.service";

export default function Signup({ loginorsignup, setisModal }) {
  const { setUser } = useContext(UserContext);
  const [loading, setloading] = useState(false);
  const [nextRegister, setnextRegister] = useState(0);
  const [err, seterr] = useState("");

  const [name, setname] = useState("");
  const [firstname, setfirstname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [adress, setadress] = useState("");
  const [postalcode, setpostalcode] = useState("");
  const [city, setcity] = useState("");
  const [tel, settel] = useState("");
  const [cv, setcv] = useState([]);
  const [profilPicture, setprofilPicture] = useState([]);

  useEffect(() => {}, [profilPicture.length]);

  return (
    <React.Fragment>
      {loginorsignup === 1 ? (
        nextRegister === 0 ? (
          <>
            {err.length >= 1 ? <div className="error_login">{err}</div> : ""}
            <span>Nom</span>
            <input
              name="name"
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
            <span>Prénom</span>
            <input
              onChange={(e) => setfirstname(e.target.value)}
              name="username"
              type="text"
              value={firstname}
            />
            <span>Email</span>
            <input
              onChange={(e) => setemail(e.target.value)}
              name="email"
              type="text"
              value={email}
            />
            <span>Mot de passe</span>
            <input
              onChange={(e) => setpassword(e.target.value)}
              name="password"
              type="password"
              value={password}
            />
            <span>Confirmer votre mot de passe</span>
            <input type="password" />
            <br />
            <button onClick={() => setnextRegister(1)} className="button_login">
              Suivant
            </button>
          </>
        ) : (
          <>
            {err.length >= 1 ? <div className="error_login">{err}</div> : ""}
            <span>Adresse</span>
            <input
              onChange={(e) => setadress(e.target.value)}
              name="adress"
              type="text"
              value={adress}
            />
            <span>Code postal</span>
            <input
              onChange={(e) => setpostalcode(e.target.value)}
              name="postalcode"
              type="number"
              value={postalcode}
            />
            <span>Ville</span>
            <input
              onChange={(e) => setcity(e.target.value)}
              name="city"
              type="text"
              value={city}
            />
            <span>Téléphone</span>
            <input
              onChange={(e) => settel(e.target.value)}
              name="tel"
              type="number"
              value={tel}
            />
            <span>Cv PDF</span>
            <input
              onChange={(e) => setcv(e.target.files[0])}
              name="cv"
              type="file"
              // value={cv}
            />
            <span>Photo de profil</span>
            <input
              onChange={(e) => setprofilPicture(e.target.files[0])}
              name="profilPicture"
              type="file"
              // value={profilPicture}
            />
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button
                className="button_after"
                onClick={() => setnextRegister(0)}
              >
                Retour
              </button>
              {loading ? (
                <div className="lds-dual-ring"></div>
              ) : (
                <button
                  onClick={() =>
                    SignUp(
                      name,
                      firstname,
                      email,
                      password,
                      adress,
                      postalcode,
                      city,
                      tel,
                      cv,
                      profilPicture,
                      setloading,
                      setUser,
                      setisModal,
                      seterr
                    )
                  }
                  className="button_submit"
                >
                  Confirmer
                </button>
              )}
            </div>
          </>
        )
      ) : null}
    </React.Fragment>
  );
}
