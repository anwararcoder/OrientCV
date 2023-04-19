import React from "react";
import AuthService from "../AuthService";

const Header = () => {
  const user = AuthService.getCurrentUser();
  return (
    // :: Header
    <section className="header">
      <div className="overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="banner">
              <div className="top-headline">
                {user ? `Welcome ${ user.user.name } to OrientCV` : 'Discover The Easiest ways to Build Your CV!'}
              </div>
              <h1>Online CV Builder With Creative Templates.</h1>
              <p className="down-headline">
                Our Perfect resume builder takes the hassle out of resume
                writing. Choose from several templates and follow easy prompts
                to create the perfect job-ready resume.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
