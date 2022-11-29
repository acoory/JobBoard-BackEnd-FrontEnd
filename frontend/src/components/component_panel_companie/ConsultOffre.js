import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

const ConsultOffre = () => {
  const { user } = useContext(UserContext);
  const [jobApplication, setJobApplication] = useState([]);
  const [userId, setUserId] = useState([]);
  const [jobId, setJobId] = useState("");

  // ADMIN
  const [allJobApplication, setAllJobApplication] = useState([]);

  const test =
    userId.role === "ROLE_ADMIN" ? allJobApplication : jobApplication;

  // On récupere le name de la companie
  useEffect(() => {
    setUserId(user.length >= 1 ? JSON.parse(user) : null);
  }, [userId.length]);

  // On récupere seulement les jobApplication de la companie
  useEffect(() => {
    let config = {
      method: "get",
      url: "http://141.94.31.123:4000/api/jobapplication",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        const p = response.data;
        const v = p.filter((jobapplicatio, i) => {
          return jobapplicatio.companie_name === userId.name;
        });

        setAllJobApplication(response.data);
        setJobApplication(v);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [jobApplication.length, userId]);

  // Marqué comme lu jobApllication
  const markAsRead = (jobI) => {
    if (jobId) {
      let data = JSON.stringify({
        status: 1,
      });

      let config = {
        method: "put",
        url: `http://141.94.31.123:4000/api/jobapplication/${jobId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {})
        .catch(function (error) {
          console.log(error);
        });
    } else {
      return null;
    }
  };
  useEffect(() => {
    markAsRead();
  }, [jobId.length, jobApplication.length]);

  console.log(test);

  return (
    <>
      {test.reverse().map((job) => (
        <article
          key={job.id}
          className="article_description card_panel candid_div"
        >
          <div className="description_candid_title">
            <h3>{job.advertisement_title}</h3>
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
                <i className="fa-regular fa-circle-check"></i>Déja consulté
              </a>
            ) : (
              <a
                onClick={() => {
                  setJobId(job.id);
                  markAsRead(jobId);
                  setJobApplication([]);
                }}
                className="cv_candid two"
              >
                <i className="fa-regular fa-circle-check"></i>Marquer comme lu
              </a>
            )}
            <p className="candid_date">
              Recu le <span className="date_candid">{job.created_at}</span>
            </p>
          </div>
        </article>
      ))}
    </>
  );
};

export default ConsultOffre;
