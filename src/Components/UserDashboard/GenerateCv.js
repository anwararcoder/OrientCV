import React from "react";
import { Link } from "react-router-dom";

const GenerateCv = () => {
  return (
    <div className="bg-box generate-cv">
      <h3 className="title-box">Generate My CV</h3>
      <div className="btns">
        <Link to="/PreviewCV" className="btn-1 btn-2">
          Preview CV
        </Link>
      </div>
    </div>
  );
};

export default GenerateCv;
