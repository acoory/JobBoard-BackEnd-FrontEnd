import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import { UpdateDataUser, ReadUserData } from "../../../services/user.service";

export default function UpdateUser() {
  const [error, seterror] = useState("");
  const [success, setsuccess] = useState("");

  const { user, setUser } = useContext(UserContext);

  const [name, setname] = useState("");
  const [firstname, setfirstname] = useState("");
  const [email, setemail] = useState("");
  const [adresse, setadress] = useState("");
  const [postalcode, setpostalcode] = useState("");
  const [city, setcity] = useState("");
  const [tel, settel] = useState("");
  const [profilPicture, setprofilPicture] = useState([]);
  const [cv, setcv] = useState([]);

  console.log(JSON.parse(user).token);

  useEffect(() => {
    ReadUserData(
      user,
      setname,
      setfirstname,
      setemail,
      setadress,
      setpostalcode,
      setcity,
      settel
    );
  }, []);

  return (
    <React.Fragment>
      <div className="container-notif">
        <div
          className="success"
          style={{ marginTop: success.length >= 1 ? "0%" : "-10%" }}
        >
          {success}
        </div>
        <div
          className="error"
          style={{ marginTop: error.length >= 1 ? "0%" : "-10%" }}
        >
          {error}
        </div>
      </div>
      <table>
        <tbody>
          <tr>
            <td>
              <span>Nom :</span>
            </td>
            <td className="longInput">
              <input
                type="text"
                value={name.length >= 1 ? name : ""}
                onChange={(e) => setname(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <span>Prénom :</span>
            </td>
            <td className="longInput">
              <input
                type="text"
                value={firstname.length >= 1 ? firstname : ""}
                onChange={(e) => setfirstname(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <span>Email :</span>
            </td>
            <td>
              <input
                type="text"
                value={email.length >= 1 ? email : ""}
                onChange={(e) => setemail(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <span>Adresse :</span>
            </td>
            <td>
              <input
                type="text"
                value={adresse.length >= 1 ? adresse : ""}
                onChange={(e) => setadress(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <span>Code postale :</span>
            </td>
            <td>
              <input
                type="number"
                value={postalcode.length >= 1 ? postalcode : ""}
                onChange={(e) => setpostalcode(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <span>Ville :</span>
            </td>
            <td>
              <input
                type="text"
                value={city.length >= 1 ? city : ""}
                onChange={(e) => setcity(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <span>Téléphone :</span>
            </td>
            <td>
              <input
                type="number"
                value={tel.length >= 1 ? tel : ""}
                onChange={(e) => settel(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <span>Photo de profil :</span>
            </td>
            <td>
              <input
                type="file"
                onChange={(e) => setprofilPicture(e.target.files[0])}
              />
              <img
                style={{ width: "80px" }}
                src={
                  !Array.isArray(profilPicture)
                    ? URL.createObjectURL(profilPicture)
                    : null
                }
              />
            </td>
          </tr>
          <tr>
            <td>
              <span>CV :</span>
            </td>
            <td>
              <input type="file" onChange={(e) => setcv(e.target.files[0])} />
            </td>
          </tr>
          <tr style={{ background: "#f4f4f4", boxShadow: "none !important" }}>
            <td
              style={{
                background: "#f4f4f4",
                boxShadow: "rgb(244 244 244) 1px 2px 9px",
              }}
            >
              <button
                className="button_modal"
                onClick={() =>
                  UpdateDataUser(
                    name,
                    firstname,
                    email,
                    adresse,
                    postalcode,
                    city,
                    tel,
                    profilPicture,
                    cv,
                    user,
                    setsuccess,
                    seterror,
                    setUser
                  )
                }
              >
                Enregistrer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <table className="pdf">
        <tbody>
          <tr>
            <td>
              <embed
                className="embed_user"
                src={
                  !Array.isArray(cv)
                    ? URL.createObjectURL(cv)
                    : JSON.parse(user).cv
                }
                width="350"
                height="470"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
}
