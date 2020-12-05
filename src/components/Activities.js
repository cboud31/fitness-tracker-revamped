import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import NewActivityForm from "./NewActivityForm";

const Activities = (props) => {
  // will need useState for searchbar...

  const { masterActivitiesList, setMasterActivitiesList, isLoggedIn } = props;

  // searchActivities() will filter over masterList...

  return (<>
    {/* <div className="search-bar">
        <input type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} />
    </div> */}
    <div className="activity-list">
      {isLoggedIn ? (
        <NewActivityForm
          masterActivitiesList={masterActivitiesList}
          setMasterActivitiesList={setMasterActivitiesList}
        />
      ) : null}

      {masterActivitiesList.map((activity, idx) => {
        const { name, description } = activity;
        return (
          <div className="activity" key={idx}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                style={{ border: "4px solid black" }}
              >
                <h3>{name}</h3>
              </AccordionSummary>
              <AccordionDetails style={{ border: "2px solid black" }}>
                <h4>{description}</h4>
              </AccordionDetails>
            </Accordion>
          </div>
        );
      })}
    </div>
  </>);
};

export default Activities;

/*
<h2 key={idx}>{name}</h2>;
*/
