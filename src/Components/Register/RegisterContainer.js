import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthService from "../../AuthService";

const RegisterContainer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState({});
  const [experience, setExperience] = useState([]);
  const [socialMedia, setSocialMedia] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [awards, setAwards] = useState([]);
  const [certificates, setCertificates] = useState([]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();
  useEffect(() => {
    if (user) {
      AuthService.logout();
    }
  }, [user]);
  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);

    AuthService.register(
      name,
      email,
      password,
      experience,
      location,
      socialMedia,
      education,
      skills,
      languages,
      projects,
      awards,
      certificates
    )
      .then((data) => {
        if (data === "Password is too short") {
          toast.error("Password is too short");
          setLoading(true);
        }
        if (data === "Email already exists") {
          toast.error("Email already exists");
          setLoading(true);
        } else {
          toast.success("Account Added Successfully");
          setLoading(false);
          navigate("/login");
        }
      })
      .catch((error) => {
        setLoading(true);
      });
  };
  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="register-box">
              <h2>welcome to OrientCV website</h2>
              <form onSubmit={handleRegister} className="register-form">
                <div className="quote-item">
                  <span className="lable">name*</span>
                  <i className="fas fa-user"></i>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="name"
                    placeholder="Name"
                  />
                </div>
                <div className="quote-item">
                  <span className="lable">Email*</span>
                  <i className="fas fa-envelope"></i>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div className="quote-item">
                  <span className="lable">Password*</span>
                  <i className="fas fa-file-signature"></i>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
                <div className="quote-item">
                  <button type="submit" className="btn-1 btn-2">
                    Submit
                  </button>
                </div>
                <div className="terms">
                  By continuing, you agree to OrientCV Company’s <b>Terms</b> of
                  Use and <b>Privacy Policy</b>.
                </div>
                <div className="have-account">
                  Already have an account?{" "}
                  <Link to="/login">
                    <b>Log in</b>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterContainer;
