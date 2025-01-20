import React from "react";
import EducationalContentCard from "./EducationalContentCard";

const EducationalContentList = ({ content }) => {
  return (
    <div className="content-list">
      {content.map((item) => (
        <EducationalContentCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default EducationalContentList;
