import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthService from "../../AuthService";

const LoginContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    AuthService.login(email, password)
      .then((data) => {
        if (data === "Cannot find user" || data === "Incorrect password") {
          toast.error("Cannot find user or Incorrect password");
          setLoading(true);
        } else {
          toast.success(`Welcome: ${data.user.name}`);
          setLoading(false);
          navigate("/");
        }
      })
      .catch((error) => {
        toast.error(error);
        setLoading(true);
      });
  };
  const user = AuthService.getCurrentUser();
  useEffect(() => {
    if (user) {
      AuthService.logout();
    }
  }, []);
  return (
    <div className="register login">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="register-box">
              <h2>welcome to OrientCV website</h2>
              <form onSubmit={handleLogin} className="register-form">
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
                  <Link to="/register">
                    <b>SignUp</b>
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

export default LoginContainer;
