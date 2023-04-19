import React, { Fragment, useState } from "react";
import AuthService from "../../AuthService";
import { toast } from "react-toastify";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import projectsImage from "./../../assets/images/project.png";

const Projects = () => {
  const user = AuthService.getCurrentUser();
  const userId = user.user.id;

  const [userPDF, setUserPDF] = useState(
    JSON.parse(localStorage.getItem("inUser"))
  );

  const [projects, setProjects] = useState(userPDF.projects);

  const initialValues = {
    projectss: [...projects],
  };

  const formikOnSubmit = async (values) => {
    await new Promise((r) => setTimeout(r, 500));
    setProjects(values.projectss);
    fetch(`https://server-orientcv.onrender.com/users/${userId}`, {
      method: "PATCH", // or 'PUT'
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        projects: values.projectss,
      }),
    })
      .then((response) => {
        toast.success("Save Changes");
        return response.json();
      })
      .then((data) => {
        if (data) {
          localStorage.setItem("inUser", JSON.stringify(data));
          setUserPDF(data);
        }
        return data;
      });
  };

  return (
    <Fragment>
      <Formik initialValues={initialValues} onSubmit={formikOnSubmit}>
        {({ values }) => (
          <Form>
            <FieldArray name="projectss">
              {({ insert, remove, push }) => (
                <div className="form-container bg-box">
                  <h3 className="title-box">
                    Samples of Your Creative and Project Design
                  </h3>
                  {values.projectss.length > 0 &&
                    values.projectss.map((projects, index) => (
                      <div
                        className="experience-item projects-item"
                        key={index}
                      >
                        <img src={projectsImage} alt="projects" />
                        <div className="content">
                          <div className="item-input">
                            <span>Name :</span>
                            <Field
                              name={`projectss.${index}.name`}
                              className="name"
                              placeholder="Ex: Authentication System"
                              type="text"
                              required
                            />
                            <ErrorMessage
                              name={`projectss.${index}.name`}
                              component="div"
                              className="field-error"
                            />
                          </div>

                          <div className="item-input">
                            <span>description :</span>
                            <Field
                              as="textarea"
                              name={`projectss.${index}.description`}
                              className="description"
                              placeholder="Ex: Create Authentication System By React Js"
                              type="text"
                              required
                            />
                            <ErrorMessage
                              name={`projectss.${index}.description`}
                              component="div"
                              className="field-error"
                            />
                          </div>

                          <div className="item-input">
                            <span>Technologies Used :</span>
                            <Field
                              name={`projectss.${index}.technologiesUsed`}
                              className="technologiesUsed"
                              placeholder="Ex: Html - Css – Js – ReactJs - REST APIs"
                              type="text"
                              required
                            />
                            <ErrorMessage
                              name={`projectss.${index}.technologiesUsed`}
                              component="div"
                              className="field-error"
                            />
                          </div>

                          <div className="item-input">
                            <span>URL :</span>
                            <Field
                              name={`projectss.${index}.url`}
                              className="url"
                              placeholder="Ex: http://facebook.com"
                              type="url"
                              required
                            />
                            <ErrorMessage
                              name={`projectss.${index}.url`}
                              component="div"
                              className="field-error"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          className="delete"
                          onClick={() => remove(index)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    ))}
                  <button
                    type="button"
                    className="btn-1 btn-2"
                    onClick={() =>
                      push({
                        name: "",
                        description: "",
                        technologiesUsed: "",
                        url: "",
                      })
                    }
                  >
                    + Add project
                  </button>
                </div>
              )}
            </FieldArray>
            <button className="btn-1" type="submit" style={{ width: "100%" }}>
              Save Changes
            </button>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

export default Projects;
