import React from "react";
import Print from "./Pages/Print/Print";
import { Link, useLocation } from "react-router-dom";
import PdfComp from "./PdfComp";

import "./App.css";

const App = () => {
  const location = useLocation();
  const pdfFile = location.state.pdfFile;

  return (
    <div className="siteuimain">
      <div className="navbar-full">
        <div className="page-logo">
          <Link to={`/`}>
            <img
              src="https://ldtax.gov.bd/assets/admin/layout4/img/logo-light.png"
              alt="logo"
              className="logo-default"
            />
          </Link>
        </div>
        <img src="https://ldtax.gov.bd/assets/admin/layout4/img/nagorik.png" />
      </div>

      <Print />

      <div className="footer">
        <div className="page-footer-inner flex items-center">
          <Link to="http://www.bangladesh.gov.bd/" target="_blank">
            <img
              src="https://ldtax.gov.bd/assets/admin/layout4/img/bd.png"
              alt=""
            />
          </Link>{" "}
          <span className="title">
            ভূমি সংস্কার বোর্ড, ভূমি মন্ত্রণালয়, গণপ্রজাতন্ত্রী বাংলাদেশ সরকার
          </span>
          &nbsp;&nbsp;
        </div>
        <div className="page-footer-inner pull-right flex items-center">
          <span className="title">কারিগরি সহায়তায়</span>
          <Link to="http://mysoftheaven.com/" target="_blank">
            <img
              src="https://ldtax.gov.bd/img/auto.png"
              alt=""
              style={{ width: "140px" }}
            />
          </Link>
          &nbsp;&nbsp;
        </div>
      </div>
    </div>
  );
};

export default App;
