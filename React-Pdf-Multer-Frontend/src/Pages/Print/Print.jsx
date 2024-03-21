import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import PdfComp from "../../PdfComp";
import { useReactToPrint } from "react-to-print";
import "./Print.css";

function Print() {
  const componentRef = useRef();
  const location = useLocation();
  const pdfFile = location.state.pdfFile;

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className=" ">
      <div className="  print-card  border">
        <div className="  card-header-name text-white bg-primary">
          <p className="m-0 p-1">ভূমি উন্নয়ন কর পরিশোধ রসিদ</p>
        </div>

        <div className="pdf-popup mx-auto w-full" ref={componentRef}>
          {pdfFile && <PdfComp pdfFile={pdfFile} />}
        </div>

        <button
          type="button"
          onClick={handlePrint}
          className="btn ml-4 btn-md btn-success mt-4 bg-[#4B8DF8] text-white"
          style={{ margin: "20px", padding: "10px" }}
        >
          প্রিন্ট
        </button>
      </div>
    </div>
  );
}

export default Print;
