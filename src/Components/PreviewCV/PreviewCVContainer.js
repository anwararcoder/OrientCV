import React, { Fragment, useState } from "react";

const PreviewCVContainer = () => {
  const [userCV, setUserCV] = useState(
    JSON.parse(localStorage.getItem("inUser"))
  );
  return (
    // { userCV.name ? (<h1>{userCV.name}</h1>) : (<Fragment></Fragment>) }
    <div className="inner">
      <div className="box head">
        <h1>
          {userCV.name ? (
            <Fragment>{userCV.name}</Fragment>
          ) : (
            <Fragment></Fragment>
          )}
          {userCV.label ? (
            <span>, ( {userCV.label} )</span>
          ) : (
            <Fragment></Fragment>
          )}
        </h1>
        <ul className="info">
          {userCV.email ? (
            <li>
              Email : <a href={`mailto:${userCV.email}`}>{userCV.email}</a>
            </li>
          ) : (
            <Fragment></Fragment>
          )}
          {userCV.location.address ? (
            <li>
              Address : {userCV.location.address} - {userCV.location.city} -{" "}
              {userCV.location.region}
            </li>
          ) : (
            <Fragment></Fragment>
          )}
          {userCV.phone ? (
            <li>
              Phone : <a href={`tel:${userCV.phone}`}>{userCV.phone}</a>
            </li>
          ) : (
            <Fragment></Fragment>
          )}
        </ul>
        {userCV.socialMedia.length === 0 ? (
          <Fragment></Fragment>
        ) : (
          <ul className="social-media-links">
            {userCV.email ? (
              <li>
                <a href={userCV.email}>Portfolio</a>
              </li>
            ) : (
              <Fragment></Fragment>
            )}
            {userCV.socialMedia.map((item, index) => {
              return (
                <li key={index}>
                  <a href={item?.url} style={{ textTransform: "capitalize" }}>
                    {item?.network}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* ================================= */}
      {userCV.summary ? (
        <div className="box box-style-2 summary">
          <div className="title">
            <h3>Career Objective</h3>
          </div>
          <div className="content">
            <div className="text-box">{userCV.summary}</div>
          </div>
        </div>
      ) : (
        <Fragment></Fragment>
      )}
      {/* ================================= */}
      {userCV.experience.length === 0 ? (
        <Fragment></Fragment>
      ) : (
        <div className="box box-style-2 experience">
          <div className="title">
            <h3>experience</h3>
          </div>
          <div className="content">
            {userCV.experience.map((item, index) => {
              return (
                <div key={index} className="experience-item-box">
                  <h4 className="experience-title">
                    {item.jobTitle}, at {item.companyName}
                    <span className="experience-time">
                      {item.startDate} | {item.endDate}
                    </span>
                  </h4>
                  <span className="date">{item.city}</span>
                  <div className="text-box">{item.discription}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* ================================= */}
      {userCV.education.length === 0 ? (
        <Fragment></Fragment>
      ) : (
        <div className="box box-style-2 experience education">
          <div className="title">
            <h3>education</h3>
          </div>
          <div className="content">
            {userCV.education.map((item, index) => {
              return (
                <div
                  key={index}
                  className="experience-item-box education-item-box"
                >
                  <h4 className="experience-title">
                    {item.institution}
                    <span className="experience-time">
                      {item.startDate} | {item.endDate}
                    </span>
                  </h4>
                  <div className="text-box">
                    {item.studyType} - {item.area}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* ================================= */}
      {userCV.skills.length === 0 ? (
        <Fragment></Fragment>
      ) : (
        <div className="box box-style-2 experience skills">
          <div className="title">
            <h3>skills</h3>
          </div>
          <div className="content">
            {userCV.skills.map((item, index) => {
              return (
                <div
                  key={index}
                  className="experience-item-box skills-item-box"
                >
                  <h4 className="experience-title">{item.name}</h4>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* ================================= */}
      {userCV.languages.length === 0 ? (
        <Fragment></Fragment>
      ) : (
        <div className="box box-style-2 experience skills">
          <div className="title">
            <h3>languages</h3>
          </div>
          <div className="content">
            {userCV.languages.map((item, index) => {
              return (
                <div
                  key={index}
                  className="experience-item-box skills-item-box"
                >
                  <h4 className="experience-title">{item.name}</h4>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* ================================= */}
      {userCV.projects.length === 0 ? (
        <Fragment></Fragment>
      ) : (
        <div className="box box-style-2 experience education">
          <div className="title">
            <h3>projects</h3>
          </div>
          <div className="content">
            {userCV.projects.map((item, index) => {
              return (
                <div
                  key={index}
                  className="experience-item-box projects-item-box"
                >
                  <h4 className="experience-title">{item.name}</h4>
                  <div className="text-box">
                    {item.description}
                    <br />
                    <b>Technologies and libraries: </b>
                    {item.technologiesUsed}
                    <br />
                    <b>Link: </b>
                    <a href={item.url}>{item.url}</a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* ================================= */}
      {userCV.awards.length === 0 ? (
        <Fragment></Fragment>
      ) : (
        <div className="box box-style-2 experience education">
          <div className="title">
            <h3>awards</h3>
          </div>
          <div className="content">
            {userCV.awards.map((item, index) => {
              return (
                <div
                  key={index}
                  className="experience-item-box education-item-box"
                >
                  <h4 className="experience-title">
                    {item.title}, Awarded on: {item.awarder}
                    <span className="experience-time">{item.date}</span>
                  </h4>
                  <div className="text-box">{item.summary}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* ================================= */}
      {userCV.certificates.length === 0 ? (
        <Fragment></Fragment>
      ) : (
        <div className="box box-style-2 experience education">
          <div className="title">
            <h3>certificates</h3>
          </div>
          <div className="content">
            {userCV.certificates.map((item, index) => {
              return (
                <div
                  key={index}
                  className="experience-item-box education-item-box"
                >
                  <h4 className="experience-title">
                    {item.name}, From: {item.issuer}
                    <span className="experience-time">{item.date}</span>
                  </h4>
                  <div className="text-box">
                    <a href={item.url}>{item.url}</a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewCVContainer;
