import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import GeneralInfo from "./GeneralInfo";
import Experience from "./Experience";
import SocialMedia from "./SocialMedia";
import Education from "./Education";
import Skills from "./Skills";
import Languages from "./Languages";
import Projects from "./Projects";
import Awards from "./Awards";
import Certificates from "./Certificates";
import GenerateCv from "./GenerateCv";

const ContainerUserDashboard = () => {
  return (
    <div className="user-dashboard py-100">
      <div className="container">
        <div className="tabs-container">
          <Tabs>
            <Tab eventKey="generalInfo" title="General Info">
              <GeneralInfo />
            </Tab>
            <Tab eventKey="experience" title="Experience">
              <Experience />
            </Tab>
            <Tab eventKey="socialMedia" title="Social Media">
              <SocialMedia />
            </Tab>
            <Tab eventKey="education" title="Education">
              <Education />
            </Tab>
            <Tab eventKey="skills" title="Skills">
              <Skills />
            </Tab>
            <Tab eventKey="languages" title="Languages">
              <Languages />
            </Tab>
            <Tab eventKey="projects" title="Projects">
              <Projects />
            </Tab>
            <Tab eventKey="awards" title="Awards">
              <Awards />
            </Tab>
            <Tab eventKey="certificates" title="Certificates">
              <Certificates />
            </Tab>
            <Tab eventKey="generateCv" title="Generate CV">
              <GenerateCv />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ContainerUserDashboard;
