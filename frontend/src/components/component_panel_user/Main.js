import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

const Main = () => {
  const { user } = useContext(UserContext);
  const [jobApplication, setJobApplication] = useState([]);
  const [userId, setUserId] = useState([]);

  // On récupere le name de la companie
  useEffect(() => {
    setUserId(user.length >= 1 ? JSON.parse(user).userId : "");
  }, [userId.length, user.length]);

  // On récupere seulement les jobApplication de la companie
  useEffect(() => {
    let config = {
      method: "get",
      url: "http://localhost:4000/api/jobapplication",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        const p = response.data;
        const v = p.filter((jobapplicatio, i) => {
          return jobapplicatio.people_id === userId;
        });
        setJobApplication(v);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [jobApplication.length, userId]);

  return (
    <>
      <Header />
      <div className="candidature_section">
        {jobApplication.reverse().map((job) => (
          <article
            key={job.id}
            className="article_description card_panel candid_div"
          >
            <div className="description_candid_title">
              <h3>
                {job.companie_name} - {job.advertisement_title}
              </h3>
            </div>
            <h4>
              {job.people_name} {job.people_firstname}
            </h4>

            <h4>Présentation</h4>
            <p className="word_wrap">{job.motivation_letter}</p>
            <div className="div_cv">
              <a className="cv_candid one" href={job.cv} target="_blank">
                <i className="fa-regular fa-file-pdf"></i>Curriculum vitae
              </a>

              {job.status === 1 ? (
                <a className="cv_candid read">
                  <i className="fa-regular fa-circle-check"></i>A était consulté
                </a>
              ) : (
                <a className="cv_candid color_cv">
                  <i className="fa-regular fa-hourglass-half"></i>Non consulté
                </a>
              )}
            </div>
            <p className="candid_date position_date">
              Recu le <span className="date_candid">{job.created_at}</span>
            </p>
          </article>
        ))}
      </div>
    </>
  );
};

export default Main;
