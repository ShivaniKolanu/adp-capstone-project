import React from "react";
import { Link, Route, Router, Routes } from "react-router-dom";
import { LoginComponent } from "./LoginComponent";

export function Header() {
  return (
    <>
    <h1>Header</h1>
      {/* <Router>
        <button>hello</button>
        <Link to="/about">About</Link>

        <Routes>
          <Route path="/about" element={<LoginComponent />} />
        </Routes>
      </Router> */}
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Route className="navbar-brand" to="/">Logo</Route>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">

          </div>
        </div>
      </nav> */}
    </>
  );
};

export default Header;