import React, { createContext, useEffect, useState } from "react";

export const CardContext = createContext();

export const CardConsumer = ({ children }) => {
  // Contain first description advertisement of page Home
  const [card, setCard] = useState([]);
  // Contain all advertisement
  const [allOffres, setAllOffres] = useState(null);
  // Modal candidature appear/disappear
  const [modalCandidature, setModalCandidature] = useState(false);
  const [modalCandidatureBis, setModalCandidatureBis] = useState(false);

  // Call for all advertisement
  const fetchAllOffre = () => {
    let axios = require("axios");
    let config = {
      method: "get",
      url: "http://localhost:4000/api/advertisement",
      headers: {},
    };
    axios(config)
      .then(function (response) {
        console.log(response.data);
        // De base, la carte description contiendra les infos de la derniere offre publié
        const arr = response.data;
        setCard(arr.slice(-1)[0]);
        setAllOffres(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAllOffre();
  }, []);

  useEffect(() => {}, [card.length, allOffres]);

  return (
    <CardContext.Provider
      value={{
        card,
        setCard,
        allOffres,
        setAllOffres,
        modalCandidature,
        setModalCandidature,
        setModalCandidatureBis,
        modalCandidatureBis,
        fetchAllOffre,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
