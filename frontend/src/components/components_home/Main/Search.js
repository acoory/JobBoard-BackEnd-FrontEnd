import React, { useContext, useEffect, useState } from "react";
import { CardContext } from "../../../context/CardContext";
import { SearchContext } from "../../../context/SearchContext";
import { useNavigate } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Dropdown } from "semantic-ui-react";

export default function Search() {
  const { allOffres, setAllOffres, fetchAllOffre } = useContext(CardContext);
  const [arrayAvantage, setarrayAvantage] = useState([]);
  const [duplicateOffres, setDuplicateOffres] = useState([]);
  const { search, setSearch } = useContext(SearchContext);
  const [input, setInput] = useState("");
  const [type, setType] = useState("");
  const [result, setResult] = useState("");

  const options = [
    { key: 1, text: "prime", value: "prime" },
    { key: 2, text: "transport", value: "transport" },
    { key: 3, text: "remote", value: "remote" },
  ];

  const contrat = [
    { text: "Tout", value: "" },
    { text: "CDD", value: "cdd" },
    { text: "CDI", value: "cdi" },
    { text: "ALTERNANCE", value: "alternance" },
  ];

  const filterOffre = (e) => {
    setAllOffres(null);
    e.preventDefault();

    setTimeout(() => {
      let axios = require("axios");
      let config = {
        method: "get",
        url: "http://141.94.31.123:4000/api/advertisement",
        headers: {},
      };
      axios(config)
        .then(function (response) {
          ////////////////////////

          const intputSearch = input
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();

          const filterOffre = response.data.filter((offre) => {
            const title = offre.title
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase();
            const type = offre.type
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase();

            if (title.includes(intputSearch) && type.includes(type))
              return true;

            return false;
          });

          const filterOffreByAvantage = filterOffre.filter((offre) => {
            if (arrayAvantage.length === 0) return true;

            for (let i = 0; i < arrayAvantage.length; i++) {
              if (offre.avantage.includes(arrayAvantage[i])) return true;
            }
            return false;
          });

          const filterOffreByType = filterOffreByAvantage.filter((offre) => {
            if (type === "") return true;

            if (offre.type.includes(type)) return true;

            return false;
          });

          setAllOffres(filterOffreByType);

          ////////////////
        })
        .catch((error) => {
          console.log(error);
        });
    }, 1000);
  };

  let navigate = useNavigate();

  useEffect(() => {}, [search]);

  return (
    <>
      <div className="container-search">
        <div className="container-input-search">
          <div className="flex-input-quoi">
            <li className="label-search">
              <i class="fa-solid fa-magnifying-glass"></i>
            </li>
            <input
              className="input-search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Metier.."
            />
          </div>
          <button
            onClick={(e) => {
              filterOffre(e);
            }}
            className="button-search"
          >
            Recherche
          </button>
        </div>
        <div className="container-input-search-filter">
          <Dropdown
            placeholder="Avantage"
            multiple
            selection
            options={options}
            onChange={(e, data) => setarrayAvantage(data.value)}
          />
          <Dropdown
            style={{ marginLeft: "10px" }}
            selection
            placeholder="Contrat"
            scrolling
            onChange={(e, data) => setType(data.value)}
            options={contrat}
          />
        </div>
      </div>
    </>
  );
}
