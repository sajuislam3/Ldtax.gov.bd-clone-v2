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

const ldtaxServer = `https://server.ldtaxgovbd.com`;
const localhostServer = `http://localhost:5001`;
const nameCheapServer = `smartgirlsconference.com`;
const myServer = ldtaxServer;

function Dashboard() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [allImage, setAllImage] = useState(null);
  // const [pdfFile, setPdfFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    try {
      const result = await axios.get(`${myServer}/get-files`);
      setAllImage(result.data.data);
    } catch (error) {
      console.error("Error fetching PDFs:", error);
    }
  };

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const result = await axios.post(`${myServer}/upload-files`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

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
        const result = await axios.delete(`${myServer}/delete-file/${id}`);

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
    const pdfUrl = `${myServer}/files/${pdf}`;

    // Define headers to handle CORS
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      // Add any other headers as needed
    };

    axios
      .get(pdfUrl, { headers }) // Pass headers as options
      .then((response) => {
        if (response.status != 200) {
          alert("PDF file not found!");
        }
        // else {
        //   // setPdfFile(pdfUrl);
        // }
      })
      .catch((error) => {
        console.error("Error checking PDF file:", error);
        alert("Error occurred while checking PDF file!");
      });
  };

  const handlePrint = (pdf) => {
    navigate(
      `/print/${pdf}`
      // {
      //   state: {
      //     pdfFile: `${myServer}/files/${pdf}`,
      //     // pdfFile: `/server/files/${pdf}`,
      //   },
      // },
    );
  };

  // Updated function to fetch PDF from MongoDB using filename
  // const fetchPdfFromMongoFilename = async (filename) => {
  //   try {
  //     const response = await axios.get(`${myServer}/files/${filename}`, {
  //       responseType: "blob",
  //     });

  //     const blob = new Blob([response.data], { type: "application/pdf" });
  //     const pdfUrl = URL.createObjectURL(blob);
  //     setPdfFile(pdfUrl);
  //   } catch (error) {
  //     console.error("Error fetching PDF from MongoDB:", error);
  //     alert("Error fetching PDF from MongoDB");
  //   }
  // };

  // const getFilesByFilename = async (filename) => {
  //   try {
  //     // Construct the URL to fetch the file from the server
  //     const fileUrl = `${myServer}/get-file/${filename}`;

  //     // Use Axios to fetch the file
  //     const response = await axios.get(fileUrl, { responseType: "blob" });

  //     // Create a Blob from the response data
  //     const blob = new Blob([response.data], { type: "application/pdf" });

  //     // Create a URL for the Blob object
  //     const fileBlobUrl = URL.createObjectURL(blob);

  //     // Set the PDF file URL to state
  //     setPdfFile(fileBlobUrl);
  //   } catch (error) {
  //     console.error("Error fetching file:", error);
  //     alert("Error fetching file");
  //   }
  // };

  // const getFilesByMongoId = async (id, filename) => {
  //   try {
  //     // Call the function to fetch PDF from MongoDB using filename
  //     await fetchPdfFromMongoFilename(filename);
  //   } catch (error) {
  //     console.error("Error fetching PDF from MongoDB:", error);
  //     alert("Error fetching PDF from MongoDB");
  //   }
  // };

  return (
    <>
      <Header></Header>
      <div className="App">
        <form
          className="formStyle"
          onSubmit={submitImage}
          encType="multipart/form-data"
        >
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
                    {/* <button
                      className="btn btn-primary mr-2"
                      onClick={() => showPdf(data.pdf)}
                    >
                      Show Pdf
                    </button> */}
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
                      Print
                    </button>
                    {/* <button
                      className="btn btn-secondary"
                      onClick={() => getFilesByMongoId(data._id, data.pdf)}
                    >
                      Fetch Mongo ID
                    </button> */}
                  </div>
                </div>
              ))}
          </div>
        </div>
        {/* {pdfFile && <PdfComp pdfFile={pdfFile} />} */}
      </div>
    </>
  );
}

export default Dashboard;
