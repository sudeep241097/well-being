import React from "react";
import { Card } from "../../styles/EducationalContentStyles";

const EducationalContentCard = ({ item }) => {
  return (
    <Card>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <p>{item.content}</p>
      {item.link && (
        <a href={item.link} target="_blank" rel="noopener noreferrer">
          View More
        </a>
      )}
    </Card>
  );
};

export default EducationalContentCard;
