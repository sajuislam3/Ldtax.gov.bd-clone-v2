// Print.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import PdfComp from "../PdfComp";

function Print() {
  const location = useLocation();
  const pdfFile = location.state.pdfFile;

  return (
    <div>
      {/* Display PDF using PdfComp */}
      {pdfFile && <PdfComp pdfFile={pdfFile} />}
    </div>
  );
}

export default Print;
