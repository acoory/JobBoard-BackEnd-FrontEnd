import SectionOffre from "./SectionOffre";
import React from "react";
import Search from "./Search";

const Main = () => {
  return (
    <>
      <main>
        <Search />
        <section className="section_offre_description">
          <SectionOffre />
        </section>
      </main>
    </>
  );
};

export default Main;
