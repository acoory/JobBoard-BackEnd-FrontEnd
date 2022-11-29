import React, { useContext, useEffect } from "react";
import Header from "../components/components_home/Header/Header";
import { SearchContext } from "../context/SearchContext";
import SearchBar from "../components/components_home/Main/Search";

export default function Search() {
  const { search } = useContext(SearchContext);
  useEffect(() => {
    console.log(search);
  }, [search.length]);

  return (
    <>
      <Header />
      <SearchBar />
    </>
  );
}
