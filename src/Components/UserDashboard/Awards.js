import React, { Fragment, useState } from "react";
import AuthService from "../../AuthService";
import { toast } from "react-toastify";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import awardsImage from "./../../assets/images/medal.png";

const Awards = () => {
  const user = AuthService.getCurrentUser();
  const userId = user.user.id;

  const [userPDF, setUserPDF] = useState(
    JSON.parse(localStorage.getItem("inUser"))
  );

  const [awards, setAwards] = useState(userPDF.awards);

  const initialValues = {
    awardss: [...awards],
  };

  const formikOnSubmit = async (values) => {
    await new Promise((r) => setTimeout(r, 500));
    setAwards(values.awardss);
    fetch(`https://server-orientcv.onrender.com/users/${userId}`, {
      method: "PATCH", // or 'PUT'
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        awards: values.awardss,
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
            <FieldArray name="awardss">
              {({ insert, remove, push }) => (
                <div className="form-container bg-box">
                  <h3 className="title-box">Awards</h3>
                  {values.awardss.length > 0 &&
                    values.awardss.map((awards, index) => (
                      <div className="experience-item awards-item" key={index}>
                        <img src={awardsImage} alt="awards" />
                        <div className="content">
                          <div className="item-input">
                            <span>Title :</span>
                            <Field
                              name={`awardss.${index}.title`}
                              className="title"
                              placeholder="Ex: Award"
                              type="text"
                              required
                            />
                            <ErrorMessage
                              name={`awardss.${index}.title`}
                              component="div"
                              className="field-error"
                            />
                          </div>
                          <div className="item-input date">
                            <span>Date :</span>
                            <Field
                              name={`awardss.${index}.date`}
                              className="date"
                              placeholder="Ex: 20/1/2023"
                              type="date"
                              required
                            />
                            <ErrorMessage
                              name={`awardss.${index}.date`}
                              component="div"
                              className="field-error"
                            />
                          </div>

                          <div className="item-input">
                            <span>Awarder :</span>
                            <Field
                              name={`awardss.${index}.awarder`}
                              className="awarder"
                              placeholder="Ex: Company"
                              type="text"
                              required
                            />
                            <ErrorMessage
                              name={`awardss.${index}.awarder`}
                              component="div"
                              className="field-error"
                            />
                          </div>

                          <div className="item-input">
                            <span>Summary :</span>
                            <Field
                              as="textarea"
                              name={`awardss.${index}.summary`}
                              className="summary"
                              placeholder="Ex: There is no spoon."
                              type="text"
                              required
                            />
                            <ErrorMessage
                              name={`awardss.${index}.summary`}
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
                        title: "",
                        date: "",
                        awarder: "",
                        summary: "",
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

export default Awards;
