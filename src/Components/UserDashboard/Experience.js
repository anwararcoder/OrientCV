import React, { Fragment, useState } from "react";
import AuthService from "../../AuthService";
import { toast } from "react-toastify";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import experianceImage from "./../../assets/images/experiance.png";

const Experience = () => {
  const user = AuthService.getCurrentUser();
  const userId = user.user.id;

  const [userPDF, setUserPDF] = useState(
    JSON.parse(localStorage.getItem("inUser"))
  );

  const [experience, setExperience] = useState(userPDF.experience);

  const initialValues = {
    experiences: [...experience],
  };

  const formikOnSubmit = async (values) => {
    await new Promise((r) => setTimeout(r, 500));
    setExperience(values.experiences);
    fetch(`https://server-orientcv.onrender.com/users/${userId}`, {
      method: "PATCH", // or 'PUT'
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        experience: values.experiences,
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
            <FieldArray name="experiences">
              {({ insert, remove, push }) => (
                <div className="form-container bg-box">
                  <h3 className="title-box">Work experiences/Activities?</h3>

                  {values.experiences.length > 0 &&
                    values.experiences.map((experience, index) => (
                      <div className="experience-item" key={index}>
                        <img src={experianceImage} alt="experiance" />
                        <div className="content">
                          <div className="item-input">
                            <Field
                              name={`experiences.${index}.jobTitle`}
                              className="jobTitle"
                              placeholder="Ex: Front End"
                              type="text"
                              required
                            />
                            <ErrorMessage
                              name={`experiences.${index}.jobTitle`}
                              component="div"
                              className="field-error"
                            />
                          </div>
                          <div className="item-input">
                            <Field
                              name={`experiences.${index}.companyName`}
                              className="companyName two"
                              placeholder="Ex: INETWORK-ME"
                              type="text"
                              required
                            />
                            <ErrorMessage
                              name={`experiences.${index}.companyName`}
                              component="div"
                              className="field-error"
                            />
                          </div>
                          <div className="item-input">
                            <Field
                              name={`experiences.${index}.city`}
                              className="city three"
                              placeholder="Ex: Cairo - Egypt"
                              type="text"
                              required
                            />
                            <ErrorMessage
                              name={`experiences.${index}.city`}
                              component="div"
                              className="field-error"
                            />
                          </div>
                          <div className="item-input date">
                            <Field
                              name={`experiences.${index}.startDate`}
                              className="startDate"
                              placeholder="Ex: 20/05/1998"
                              type="date"
                              required
                            />
                            <ErrorMessage
                              name={`experiences.${index}.startDate`}
                              component="div"
                              className="field-error"
                            />
                          </div>
                          <div className="item-input date">
                            <Field
                              name={`experiences.${index}.endDate`}
                              className="endDate"
                              placeholder="Ex: 20/1/2023"
                              type="date"
                              required
                            />
                            <ErrorMessage
                              name={`experiences.${index}.endDate`}
                              component="div"
                              className="field-error"
                            />
                          </div>
                          <div className="item-input">
                            <Field
                              as="textarea"
                              name={`experiences.${index}.discription`}
                              className="discription"
                              placeholder="As a web developer, I have many years of experience with CSS, JavaScript, and HTML. On top of that, my software development skills allowed me to build up my object-oriented programming abilities."
                              type="text"
                              required
                            />
                            <ErrorMessage
                              name={`experiences.${index}.discription`}
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
                        jobTitle: "",
                        companyName: "",
                        startDate: "",
                        endDate: "",
                        city: "",
                        discription: "",
                      })
                    }
                  >
                    + Add Experience/Activity
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

export default Experience;
