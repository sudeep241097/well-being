import React from "react";
import RelaxationCard from "./RelaxationCard";
import { ResourcesListContainer } from "../../styles/RelaxationResourcesStyles";

const RelaxationResourcesList = ({ resources }) => {
  return (
    <ResourcesListContainer>
      {resources.map((resource) => (
        <RelaxationCard key={resource._id} resource={resource} />
      ))}
    </ResourcesListContainer>
  );
};

export default RelaxationResourcesList;