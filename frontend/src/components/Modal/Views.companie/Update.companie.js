import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import {
  ReadCompanieData,
  UpdateDataUser,
} from "../../../services/companie.service";

export default function UpdateUser() {
  const [error, seterror] = useState("");
  const [success, setsuccess] = useState("");

  const { user, setUser } = useContext(UserContext);

  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [logo, setlogo] = useState([]);

  useEffect(() => {
    ReadCompanieData(user, setemail, setname);
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
              <span>Email :</span>
            </td>
            <td className="longInput">
              <input
                type="text"
                value={email.length >= 1 ? email : ""}
                onChange={(e) => setemail(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <span>Nom de l'entreprise :</span>
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
              <span>Photo de profil :</span>
            </td>
            <td>
              <input type="file" onChange={(e) => setlogo(e.target.files[0])} />
            </td>
            <td>
              <img
                style={{ width: "80px" }}
                src={!Array.isArray(logo) ? URL.createObjectURL(logo) : null}
              />
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
                    user,
                    name,
                    email,
                    logo,
                    setsuccess,
                    setUser,
                    seterror
                  )
                }
              >
                Enregistrer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
}
