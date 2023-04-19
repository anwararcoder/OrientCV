import React, { Fragment, useRef } from "react";
import PreviewCVContainer from "../../Components/PreviewCV/PreviewCVContainer";
import AuthService from "../../AuthService";
import { useReactToPrint } from "react-to-print";
import { Link } from "react-router-dom";

const PreviewCV = () => {
  const user = AuthService.getCurrentUser();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Fragment>
      {!user ? (
        <Fragment>
          <div className="login-first">
            <div className="">
              <h1>Login First</h1>
              <Link to="/login" className="btn-1 btn-2">
                Login
              </Link>
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="preview-cv-page">
            <div className="print-btns">
              <button onClick={handlePrint} className="btn-1">
                Print & Download CV
              </button>
              <Link to="/userDashboard" className="btn-1 btn-2">
                Go Back
              </Link>
            </div>
            <div className="preview-cv-box" ref={componentRef}>
              <PreviewCVContainer />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default PreviewCV;
