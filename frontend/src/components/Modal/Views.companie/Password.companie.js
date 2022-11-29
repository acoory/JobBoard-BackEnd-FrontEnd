import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import { ChangePassword } from "../../../services/companie.service";

export default function Password_companie() {
  const [currentPassword, setcurrentPassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [validpassword, setvalidpassword] = useState("");
  const [error, seterror] = useState("");
  const [success, setsuccess] = useState("");

  const { user } = useContext(UserContext);

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
              <span>Mot de passe actuelle :</span>
            </td>
            <td className="longInput">
              <input
                type="text"
                value={currentPassword}
                onChange={(e) => setcurrentPassword(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <span>Nouveau mot de passe :</span>
            </td>
            <td className="longInput">
              <input
                type="text"
                value={newpassword}
                onChange={(e) => setnewpassword(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <span>Confirmation mot de passe:</span>
            </td>
            <td className="longInput">
              <input
                type="text"
                value={validpassword}
                onChange={(e) => setvalidpassword(e.target.value)}
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
                  ChangePassword(
                    currentPassword,
                    newpassword,
                    user,
                    validpassword,
                    setsuccess,
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
