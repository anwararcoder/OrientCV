import React, { Fragment, useState } from "react";
import AuthService from "../../AuthService";
import { toast } from "react-toastify";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import certificatesImage from "./../../assets/images/certificate.png";

const Certificates = () => {
  const user = AuthService.getCurrentUser();
  const userId = user.user.id;

  const [userPDF, setUserPDF] = useState(
    JSON.parse(localStorage.getItem("inUser"))
  );

  const [certificates, setCertificates] = useState(userPDF.certificates);

  const initialValues = {
    certificatess: [...certificates],
  };

  const formikOnSubmit = async (values) => {
    await new Promise((r) => setTimeout(r, 500));
    setCertificates(values.certificatess);
    fetch(`https://server-orientcv.onrender.com/users/${userId}`, {
      method: "PATCH", // or 'PUT'
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        certificates: values.certificatess,
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
            <FieldArray name="certificatess">
              {({ insert, remove, push }) => (
                <div className="form-container bg-box">
                  <h3 className="title-box">Certificates</h3>
                  {values.certificatess.length > 0 &&
                    values.certificatess.map((certificates, index) => (
                      <div
                        className="experience-item certificates-item"
                        key={index}
                      >
                        <img src={certificatesImage} alt="certificates" />
                        <div className="content">
                          <div className="item-input">
                            <span>Name :</span>
                            <Field
                              name={`certificatess.${index}.name`}
                              className="name"
                              placeholder="Ex: Certificate"
                              type="text"
                              required
                            />
                            <ErrorMessage
                              name={`certificatess.${index}.name`}
                              component="div"
                              className="field-error"
                            />
                          </div>
                          <div className="item-input date">
                            <span>Date :</span>
                            <Field
                              name={`certificatess.${index}.date`}
                              className="date"
                              placeholder="Ex: 20/1/2023"
                              type="date"
                              required
                            />
                            <ErrorMessage
                              name={`certificatess.${index}.date`}
                              component="div"
                              className="field-error"
                            />
                          </div>

                          <div className="item-input">
                            <span>Issuer :</span>
                            <Field
                              name={`certificatess.${index}.issuer`}
                              className="issuer"
                              placeholder="Ex: Company"
                              type="text"
                              required
                            />
                            <ErrorMessage
                              name={`certificatess.${index}.issuer`}
                              component="div"
                              className="field-error"
                            />
                          </div>

                          <div className="item-input">
                            <span>Url :</span>
                            <Field
                              name={`certificatess.${index}.url`}
                              className="url"
                              placeholder="Ex: http://facebook.com/"
                              type="url"
                              required
                            />
                            <ErrorMessage
                              name={`certificatess.${index}.url`}
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
                        date: "",
                        issuer: "",
                        url: "",
                      })
                    }
                  >
                    + Add certificate
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

export default Certificates;
