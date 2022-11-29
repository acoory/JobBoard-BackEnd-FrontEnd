import React, { useContext } from "react";
import SectionOffreCard from "./SectionOffreCard";
import SectionDescription from "./SectionDescription";
import { CardContext } from "../../../context/CardContext";
import { Dimmer, Loader, Segment, Image } from "semantic-ui-react";

const SectionOffre = () => {
  const { allOffres } = useContext(CardContext);

  return (
    <>
      {allOffres ? (
        <>
          <article className="section_offre">
            {allOffres.length > 0 ? (
              allOffres
                .slice()
                .reverse()
                .map((offre) => (
                  <SectionOffreCard key={offre._id} offre={offre} />
                ))
            ) : (
              <>
                <h1 className="h1_no_offre">Aucune offre disponible</h1>
                <p>Votre Recherche n'a retourné aucun résultat</p>
              </>
            )}
          </article>

          <SectionDescription />
        </>
      ) : (
        <>
          <article className="section_offre">
            <div
              style={{
                marginBottom: "20px",
              }}
            >
              <Segment>
                <Dimmer active inverted>
                  <Loader inverted>Loading</Loader>
                </Dimmer>

                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
              </Segment>
            </div>
            <div
              style={{
                marginBottom: "20px",
              }}
            >
              <Segment>
                <Dimmer active inverted>
                  <Loader inverted>Loading</Loader>
                </Dimmer>

                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
              </Segment>
            </div>
            <div
              style={{
                marginBottom: "20px",
              }}
            >
              <Segment>
                <Dimmer active inverted>
                  <Loader inverted>Loading</Loader>
                </Dimmer>

                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
              </Segment>
            </div>
            <div
              style={{
                marginBottom: "20px",
              }}
            >
              <Segment>
                <Dimmer active inverted>
                  <Loader inverted>Loading</Loader>
                </Dimmer>

                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
              </Segment>
            </div>
          </article>
          <div className="visibleornone">
            <article className="article_description description_card">
              <Segment>
                <Dimmer active inverted></Dimmer>

                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
              </Segment>
            </article>
          </div>
        </>
      )}

      {/* <SectionDescription /> */}
    </>
  );
};

export default SectionOffre;
