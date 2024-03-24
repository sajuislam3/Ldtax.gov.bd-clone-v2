import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PdfComp from "../../PdfComp";
import { pdfjs } from "react-pdf";
import "./Dashboard.css";
import Header from "../Shared/Header/Header";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function Dashboard() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [allImage, setAllImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    try {
      const result = await axios.get("http://localhost:5001/get-files");
      setAllImage(result.data.data);
    } catch (error) {
      console.error("Error fetching PDFs:", error);
    }
  };
  const submitImage = async (e) => {
    e.preventDefault();

    // Check if a file is selected
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const result = await axios.post(
        "http://localhost:5001/upload-files",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (result.data.status === "ok") {
        alert("Uploaded Successfully!!!");
        getPdf();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Display the error message to the user
        alert(error.response.data.message);
      } else {
        console.error("Error uploading PDF:", error);
        // Show a generic error message if the specific error message is not available
        alert(
          "An error occurred while uploading the PDF. Please try again later."
        );
      }
    }
  };

  const deletePdf = async (id, pdf) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this PDF?"
    );
    if (confirmDelete) {
      try {
        const result = await axios.delete(
          `http://localhost:5001/delete-file/${id}`
        );

        if (result.data.status === "ok") {
          alert("PDF Deleted Successfully!!!");
          getPdf();
        }
      } catch (error) {
        console.error("Error deleting PDF:", error);
      }
    }
  };

  const showPdf = (pdf) => {
    const pdfUrl = `http://localhost:5001/files/${pdf}`;
    axios
      .head(pdfUrl)
      .then((response) => {
        if (response.status === 200) {
          setPdfFile(pdfUrl);
        } else {
          alert("PDF file not found!");
        }
      })
      .catch((error) => {
        console.error("Error checking PDF file:", error);
        alert("Error occurred while checking PDF file!");
      });
  };

  const handlePrint = (pdf) => {
    navigate(`/print/${pdf}`, {
      state: {
        pdfFile: `http://localhost:5001/files/${pdf}`,
      },
    });
  };

  return (
    <>
      <Header></Header>
      <div className="App">
        <form className="formStyle" onSubmit={submitImage}>
          <h4>Upload Pdf in Here</h4>
          <br />
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <input
            type="file"
            name="file"
            className="form-control"
            accept="application/pdf"
            required
            onChange={(e) => setFile(e.target.files[0])}
          />
          <br />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
        <div className="uploaded">
          <h4>Uploaded PDF:</h4>
          <div className="output-div my-uploaded-files">
            {allImage &&
              allImage.map((data) => (
                <div
                  className="inner-div border p-3 rounded m-2"
                  key={data._id}
                >
                  <h6>Title: {data.title}</h6>
                  <div className="my-buttons">
                    <button
                      className="btn btn-primary mr-2"
                      onClick={() => showPdf(data.pdf)}
                    >
                      Show Pdf
                    </button>
                    <button
                      className="btn btn-danger mr-2"
                      onClick={() => deletePdf(data._id, data.pdf)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handlePrint(data.pdf)}
                    >
                      Share
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {pdfFile && <PdfComp pdfFile={pdfFile} />}
      </div>
    </>
  );
}

export default Dashboard;
