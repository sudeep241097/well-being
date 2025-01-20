import React from "react";
import { Card } from "../../styles/RelaxationResourcesStyles";

const RelaxationCard = ({ resource }) => {
  return (
    <Card>
      <h3>{resource.title}</h3>
      <p>{resource.description}</p>
      {resource.type === "Video" || resource.type === "Audio" ? (
        <a href={resource.link} target="_blank" rel="noopener noreferrer">
          View Resource
        </a>
      ) : (
        <pre>{resource.instructions}</pre>
      )}
    </Card>
  );
};

export default RelaxationCard;