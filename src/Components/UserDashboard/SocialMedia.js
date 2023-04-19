import React, { Fragment, useState } from "react";
import AuthService from "../../AuthService";
import { toast } from "react-toastify";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";

const SocialMedia = () => {
  const user = AuthService.getCurrentUser();
  const userId = user.user.id;

  const [userPDF, setUserPDF] = useState(
    JSON.parse(localStorage.getItem("inUser"))
  );

  const [socialMedia, setSocialMedia] = useState(userPDF.socialMedia);

  const initialValues = {
    socialMedias: [...socialMedia],
  };

  const formikOnSubmit = async (values) => {
    await new Promise((r) => setTimeout(r, 500));
    setSocialMedia(values.socialMedias);
    fetch(`https://server-orientcv.onrender.com/users/${userId}`, {
      method: "PATCH", // or 'PUT'
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        socialMedia: values.socialMedias,
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
            <FieldArray name="socialMedias">
              {({ insert, remove, push }) => (
                <div className="form-container bg-box">
                  <h3 className="title-box">Social Media</h3>
                  {values.socialMedias.length > 0 &&
                    values.socialMedias.map((socialMedia, index) => (
                      <div
                        className="experience-item socialMedia-item"
                        key={index}
                      >
                        <div className="item-input" style={{ width: "50%" }}>
                          <span>Network Name:</span>
                          <Field
                            name={`socialMedias.${index}.network`}
                            className="network"
                            placeholder="Ex: Twitter"
                            type="text"
                            style={{ textTransform: "lowercase", width: "50%" }}
                            required
                          />
                          <ErrorMessage
                            name={`socialMedias.${index}.network`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="item-input" style={{ width: "50%" }}>
                          <span>Username:</span>
                          <Field
                            name={`socialMedias.${index}.username`}
                            className="username"
                            placeholder="Ex: anwararcoder"
                            type="text"
                            style={{ width: "50%" }}
                            required
                          />
                          <ErrorMessage
                            name={`socialMedias.${index}.username`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="item-input" style={{ width: "100%" }}>
                          <span>URL:</span>
                          <Field
                            name={`socialMedias.${index}.url`}
                            className="url"
                            placeholder="Ex: https://twitter.com/anwararcoder"
                            type="url"
                            style={{ width: "80%" }}
                            required
                          />
                          <ErrorMessage
                            name={`socialMedias.${index}.url`}
                            component="div"
                            className="field-error"
                          />
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
                        network: "",
                        username: "",
                        url: "",
                      })
                    }
                  >
                    + Add Links
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

export default SocialMedia;
