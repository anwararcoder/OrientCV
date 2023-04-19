import React, { Fragment, useState } from "react";
import AuthService from "../../AuthService";
import { toast } from "react-toastify";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import educationImage from "./../../assets/images/education.png";

const Education = () => {
  const user = AuthService.getCurrentUser();
  const userId = user.user.id;

  const [userPDF, setUserPDF] = useState(
    JSON.parse(localStorage.getItem("inUser"))
  );

  const [education, setEducation] = useState(userPDF.education);

  const initialValues = {
    educations: [...education],
  };

  const formikOnSubmit = async (values) => {
    await new Promise((r) => setTimeout(r, 500));
    setEducation(values.educations);
    fetch(`https://server-orientcv.onrender.com/users/${userId}`, {
      method: "PATCH", // or 'PUT'
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        education: values.educations,
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
            <FieldArray name="educations">
              {({ insert, remove, push }) => (
                <div className="form-container bg-box">
                  <h3 className="title-box">
                    What's your current educational level??
                  </h3>
                  {values.educations.length > 0 &&
                    values.educations.map((education, index) => (
                      <div
                        className="experience-item education-item"
                        key={index}
                      >
                        <img src={educationImage} alt="education" />
                        <div className="content">
                          <div className="item-input">
                            <Field
                              name={`educations.${index}.area`}
                              className="area"
                              placeholder="Ex: Software Development"
                              type="text"
                              required
                            />
                            <ErrorMessage
                              name={`educations.${index}.area`}
                              component="div"
                              className="field-error"
                            />
                          </div>
                          <div className="item-input">
                            <Field
                              name={`educations.${index}.studyType`}
                              className="studyType"
                              placeholder="Ex: Bachelor"
                              type="text"
                              required
                            />
                            <ErrorMessage
                              name={`educations.${index}.studyType`}
                              component="div"
                              className="field-error"
                            />
                          </div>
                          <div className="item-input">
                            <Field
                              name={`educations.${index}.institution`}
                              className="institution"
                              placeholder="Ex: University"
                              type="text"
                              required
                            />
                            <ErrorMessage
                              name={`educations.${index}.institution`}
                              component="div"
                              className="field-error"
                            />
                          </div>
                          <div className="item-input date">
                            <Field
                              name={`educations.${index}.startDate`}
                              className="startDate"
                              placeholder="Ex: 20/05/1998"
                              type="date"
                              required
                            />
                            <ErrorMessage
                              name={`educations.${index}.startDate`}
                              component="div"
                              className="field-error"
                            />
                          </div>
                          <div className="item-input date">
                            <Field
                              name={`educations.${index}.endDate`}
                              className="endDate"
                              placeholder="Ex: 20/1/2023"
                              type="date"
                              required
                            />
                            <ErrorMessage
                              name={`educations.${index}.endDate`}
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
                        institution: "",
                        area: "",
                        studyType: "",
                        startDate: "",
                        endDate: "",
                      })
                    }
                  >
                    + Add education
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

export default Education;
