import React, { Fragment, useState } from "react";
import AuthService from "../../AuthService";
import { toast } from "react-toastify";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";

const Skills = () => {
  const user = AuthService.getCurrentUser();
  const userId = user.user.id;

  const [userPDF, setUserPDF] = useState(
    JSON.parse(localStorage.getItem("inUser"))
  );

  const [skills, setSkills] = useState(userPDF.skills);

  const initialValues = {
    skillss: [...skills],
  };

  const formikOnSubmit = async (values) => {
    await new Promise((r) => setTimeout(r, 500));
    setSkills(values.skillss);
    fetch(`https://server-orientcv.onrender.com/users/${userId}`, {
      method: "PATCH", // or 'PUT'
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        skills: values.skillss,
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
            <FieldArray name="skillss">
              {({ insert, remove, push }) => (
                <div className="form-container bg-box">
                  <h3 className="title-box">Skills</h3>
                  {values.skillss.length > 0 &&
                    values.skillss.map((skills, index) => (
                      <div className="experience-item skills-item" key={index}>
                        <div className="item-input">
                          <Field
                            name={`skillss.${index}.name`}
                            className="name"
                            placeholder="Ex: JavaScript"
                            type="text"
                            required
                          />
                          <ErrorMessage
                            name={`skillss.${index}.name`}
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
                        name: "",
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

export default Skills;
