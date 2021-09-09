import React, { useEffect, useState } from "react";
import { Accordion, Card, ListGroup } from "react-bootstrap";

const IDTYPE = { areaId: 0, indicatorId: 1, milieuId: 2 };

export const ParametersSideMenu = ({
  data,
  selectedParameters,
  retreiveSelectedParameters,
}) => {
  const [allProvincesSelector, toggleAllProvincesSelector] = useState(false);
  const addId = (value, collectionType) => {
    if (collectionType == IDTYPE.areaId) {
      let res;
      let tempCollection = selectedParameters.selectedAreas;
      console.log(tempCollection);
      let index = tempCollection.findIndex((d) => d === value);
      Boolean(tempCollection.find((d) => d === value))
        ? tempCollection.splice(index, 1)
        : tempCollection.push(value);
      retreiveSelectedParameters(tempCollection, IDTYPE.areaId);
    }
    if (collectionType == IDTYPE.indicatorId) {
      let tempCollection = selectedParameters.selectedIndicators;
      Boolean(tempCollection.find((d) => d === value))
        ? tempCollection.splice(
            tempCollection.findIndex((d) => d === value),
            1
          )
        : tempCollection.push(value);
      retreiveSelectedParameters(tempCollection, IDTYPE.indicatorId);
    }
    if (collectionType == IDTYPE.milieuId) {
      let tempCollection = selectedParameters.selectedMilieu;
      Boolean(tempCollection.find((d) => d === value))
        ? tempCollection.splice(
            tempCollection.findIndex((d) => d === value),
            tempCollection.findIndex((d) => d === value) + 1
          )
        : tempCollection.push(value);
      retreiveSelectedParameters(tempCollection, IDTYPE.milieuId);
    }
  };
  const handleTileClick = (event, collectionType) => {
    switch (collectionType) {
      case IDTYPE.areaId:
        addId(event.target.id, collectionType);
        break;
      case IDTYPE.indicatorId:
        event.target.textContent &&
          addId(event.target.textContent, collectionType); //empty string is falsy // fix for clicking fires two events 1 for label 1 for checkbox
        break;
      case IDTYPE.milieuId:
        event.target.textContent &&
          addId(event.target.textContent, collectionType); //empty string is falsy // fix for clicking fires two events 1 for label 1 for checkbox
        break;
      default:
        console.log("switch default");
        break;
    }
  };
  const selectDeslectAllProvinces = (ev) => {
    allProvincesSelector
      ? data
          .map((v) => v[1])
          .filter((v) => !selectedParameters.selectedAreas.includes(v))
          .forEach((v) => addId(v, IDTYPE.areaId))
      : retreiveSelectedParameters([], IDTYPE.areaId);
    toggleAllProvincesSelector((v) => !v);
  };

  return (
    <Accordion defaultActiveKey="1">
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          Provinces
          <i> +</i>
        </Accordion.Toggle>
        <ListGroup>
          <Accordion.Collapse eventKey="0" key={0}>
            <ListGroup.Item>
              <label className="d-flex justify-content-between">
                Maroc
                <input
                  type="checkbox"
                  checked={!allProvincesSelector} //bug: check is inverted!
                  onChange={selectDeslectAllProvinces}
                ></input>
              </label>
            </ListGroup.Item>
          </Accordion.Collapse>

          <div style={{ maxHeight: `70vh`, overflowY: "scroll" }}>
            {data
              .filter((d) => d[0] != "region")
              .map((area, index) => (
                <Accordion.Collapse eventKey="0" key={index + 1}>
                  <ListGroup.Item>
                    <div id={area[1]}>
                      <label className="d-flex justify-content-between">
                        {area[2]}
                        <input
                          className="prov"
                          id={area[1]}
                          checked={
                            !!selectedParameters.selectedAreas.includes(area[1])
                          }
                          onChange={(ev) => handleTileClick(ev, IDTYPE.areaId)}
                          type="checkbox"
                        ></input>
                      </label>
                    </div>
                  </ListGroup.Item>
                </Accordion.Collapse>
              ))}
          </div>
        </ListGroup>
      </Card>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="1">
          Indicateurs
          <i> +</i>
        </Accordion.Toggle>
        <ListGroup>
          <div style={{ maxHeight: `70vh`, overflowY: "scroll" }}>
            {[
              "Population Marocains",
              "Nombre de Ménages",
              "Population Etrangers",
            ].map((indicator, index) => (
              <Accordion.Collapse eventKey="1" key={index}>
                <ListGroup.Item>
                  <div>
                    <label
                      className="d-flex justify-content-between"
                      onClick={(ev) => handleTileClick(ev, IDTYPE.indicatorId)}
                    >
                      {indicator}
                      <input type="checkbox"></input>
                    </label>
                  </div>
                </ListGroup.Item>
              </Accordion.Collapse>
            ))}
          </div>
        </ListGroup>
      </Card>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="2">
          Milieu
          <i> +</i>
        </Accordion.Toggle>
        <ListGroup>
          <div style={{ maxHeight: `70vh`, overflowY: "scroll" }}>
            {["Total", "Urbain", "Rural"].map((milieu, index) => (
              <Accordion.Collapse eventKey="2" key={index}>
                <ListGroup.Item>
                  <div>
                    <label
                      className="d-flex justify-content-between"
                      onClick={(ev) => handleTileClick(ev, IDTYPE.milieuId)}
                    >
                      {milieu}
                      <input type="checkbox"></input>
                    </label>
                  </div>
                </ListGroup.Item>
              </Accordion.Collapse>
            ))}
          </div>
        </ListGroup>
      </Card>
    </Accordion>
  );
};
