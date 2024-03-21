const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
app.use("/files", express.static("files"));

// for qr code generation

const fs = require("fs");
const { PDFDocument } = require("pdf-lib");
const qrCode = require("qrcode");
// const upload = multer({ dest: 'uploads/' }); // Specify the destination folder for uploaded files

//mongodb connection----------------------------------------------
const mongoUrl = `mongodb+srv://tax-pdf-uploader:3LHvO5SeDVjpqiAR@cluster0.v7wkgs9.mongodb.net/tax-pdf-uploader?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));
//multer------------------------------------------------------------
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

require("./pdfDetails");
const PdfSchema = mongoose.model("PdfDetails");
const upload = multer({ storage: storage });

const generateRandomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

app.post("/upload-files", upload.single("file"), async (req, res) => {
  try {
    // Read the uploaded file from disk
    const filePath = req.file.path;
    const fileData = fs.readFileSync(filePath);

    // Load the PDF document
    const pdfDoc = await PDFDocument.load(fileData);

    // Generate QR code text and embed it in each page of the PDF document
    const randomText = generateRandomString(20);
    const qrText = `http://localhost:5000/updatedPDF/${randomText}`;
    const pageCount = pdfDoc.getPageCount();

    for (let i = 0; i < pageCount; i++) {
      const page = pdfDoc.getPage(i);
      const { width, height } = page.getSize();

      const qrDataUrl = await qrCode.toDataURL(qrText);
      const qrImage = await pdfDoc.embedPng(qrDataUrl);

      const qrWidth = 90;
      const qrHeight = 90;
      const centerX = (width - qrWidth) / 2;
      const centerY = (height - qrHeight) / 2 - height * 0.13;

      const qrImageDims = {
        x: centerX,
        y: centerY,
        width: qrWidth,
        height: qrHeight,
      };
      page.drawImage(qrImage, qrImageDims);
    }

    // Save the modified PDF document
    const modifiedPdfBytes = await pdfDoc.save();

    // Write the modified PDF document back to disk
    fs.writeFileSync(filePath, modifiedPdfBytes);

    // Save PDF details to MongoDB or perform other operations
    const title = req.body.title;
    const fileName = req.file.filename;
    await PdfSchema.create({ title: title, pdf: fileName });

    res.send({ status: "ok" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
});


// Define the delete API endpoint
app.delete("/delete-file/:id", async (req, res) => {
  try {
    const fileId = req.params.id;

    // Find the PDF document in MongoDB using the unique identifier
    const pdfDoc = await PdfSchema.findById(fileId);

    if (!pdfDoc) {
      return res
        .status(404)
        .json({ status: "error", message: "PDF document not found" });
    }

    // Delete the file from local storage
    const filePath = `./files/${pdfDoc.pdf}`;
    fs.unlinkSync(filePath); // Remove the file from disk

    // Delete the document from MongoDB
    await PdfSchema.findByIdAndDelete(fileId);

    res.json({ status: "ok", message: "File deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Failed to delete file" });
  }
});

app.get("/get-files", async (req, res) => {
  try {
    const files = await PdfSchema.find({});
    res.json({ status: "ok", data: files });
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ status: "error", message: "Failed to fetch files" });
  }
});

//apis----------------------------------------------------------------
app.get("/", async (req, res) => {
  res.send("Success!!!!!!");
});

app.listen(5001, () => {
  console.log("Server Started");
});
