import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Page/Home/Home";
import Login from "./Page/Login/Login";
import Register from "./Page/Register/Register";
import UserDashboard from "./Page/UserDashboard/UserDashboard";
import PreviewCV from "./Page/PreviewCV/PreviewCV";
import NavbarSection from "./Components/NavbarSection";

function App() {

  return (
    <Fragment>
      <NavbarSection />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/PreviewCV" element={<PreviewCV />} />
      </Routes>
      {/* <Footer /> */}
    </Fragment>
  );
}

export default App;
