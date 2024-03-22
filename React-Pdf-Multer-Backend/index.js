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
    const uniqueSuffix = generateRandomString(20);
    cb(null, uniqueSuffix + ".pdf");
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

// Function to count the total number of files in MongoDB
const countFilesInDB = async () => {
  try {
    const count = await PdfSchema.countDocuments();
    return count;
  } catch (error) {
    console.error("Error counting files in MongoDB:", error);
    throw error;
  }
};

app.post("/upload-files", upload.single("file"), async (req, res) => {
  try {
    const fileLimit = 5; // Define the file limit
    // Check if the total number of files exceeds the limit
    const fileCount = await PdfSchema.countDocuments();
    if (fileCount >= fileLimit) {
      // Fetch the oldest files
      const oldestFiles = await PdfSchema.find(
        {},
        {},
        { sort: { createdAt: 1 }, limit: fileCount - fileLimit + 1 }
      );

      // Prepare the warning message
      let warningMessage = `File limit exceeded! Please delete the following files created first: \n`;
      oldestFiles.forEach((file, index) => {
        warningMessage += `${index + 1}. ${file.title}\n`; // Assuming 'title' field represents the name of the file
      });

      // Send the warning message to the client
      return res.status(400).json({ status: "error", message: warningMessage });
    }

    // Continue with file upload process
    const filePath = req.file.path;
    const fileData = fs.readFileSync(filePath);

    // Load the PDF document
    const pdfDoc = await PDFDocument.load(fileData);

    const randomText = generateRandomString(20);
    // Generate QR code text and embed it in each page of the PDF document
    const qrText = `http://localhost:5000/print/${randomText}`;
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

    // Rename the file before saving to local storage
    const fileName = randomText + ".pdf";
    const newFilePath = `./files/${fileName}`;
    fs.writeFileSync(newFilePath, modifiedPdfBytes);

    // Save PDF details to MongoDB or perform other operations
    const title = req.body.title;
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
    // Fetch files from MongoDB and sort them based on creation date in descending order
    const files = await PdfSchema.find({}).sort({ createdAt: -1 });

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
