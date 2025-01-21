import React from "react";
import EducationalContentCard from "./EducationalContentCard";
import { EducationalContentContainer } from "../../styles/EducationalContentStyles";

const EducationalContentList = ({ content }) => {
  return (
      <EducationalContentContainer>
          {content.map((item) => (
            <EducationalContentCard key={item._id} item={item} />
          ))}
     </EducationalContentContainer>
  );
};

export default EducationalContentList;
