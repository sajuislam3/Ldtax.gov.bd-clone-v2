# Ldtax-v2: Secure PDF Uploads with QR Code Access

## Introduction
Ldtax-v2 is a web application designed to facilitate secure PDF uploads and convenient access to these documents through unique QR codes. This documentation provides an overview of the project, its features, and how to use it effectively.
### Live Link
Frontend: https://ldtaxgovbd.com/login
Backend: 
### Features
- **Secure Admin Panel**: Administrators can securely upload PDF documents through an admin panel.
- **Unique QR Codes**: Each uploaded PDF receives a unique QR code link for easy access.
- **PDF Storage**: File names are stored in MongoDB for efficient management.
- **File Hosting**: PDF files are hosted on cPanel for reliable access.
- **Print or Scan**: Users have the option to print the QR code or scan it to access the PDF online.

## Installation and Setup
To install and set up the Ldtax-v2 project, follow the steps below:

### Backend (Node.js)
1. Clone the repository from GitHub.
   ```bash
   git clone https://github.com/yourusername/backend-pdf-upload.git
   ```
2. Navigate to the project directory.
   ```bash
   cd backend-pdf-upload
   ```
3. Install dependencies.
   ```bash
   npm install
   ```
4. Configure MongoDB connection and cPanel settings in the `.env` file.

### Frontend (React)
1. Clone the frontend repository from GitHub.
   ```bash
   git clone https://github.com/yourusername/react-pdf-multer-frontend.git
   ```
2. Navigate to the frontend directory.
   ```bash
   cd react-pdf-multer-frontend
   ```
3. Install dependencies.
   ```bash
   npm install
   ```

## Backend Package.json Details
```json
{
  "name": "backend-pdf-upload",
  "version": "1.0.0",
  "description": "Backend for Ldtax-v2 project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Your Name",
  "license": "ISC",
  "dependencies": {
    "axios": "^1.6.8",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.1",
    "mongodb": "^6.5.0",
    "mongoose": "^8.2.2",
    "multer": "^1.4.5-lts.1",
    "nodemon": "^3.1.0",
    "pdf-lib": "^1.17.1",
    "pdf-parse": "^1.1.1",
    "qrcode": "^1.5.3",
    "react-pdf": "^5.7.2"
  }
}
```

## Frontend Package.json Details
```json
{
  "name": "react-pdf-multer-frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.6.8",
    "bootstrap": "^5.3.3",
    "firebase": "^10.9.0",
    "localforage": "^1.10.0",
    "match-sorter": "^6.3.4",
    "react": "^18.2.0",
    "react-bootstrap": "^2.10.2",
    "react-dom": "^18.2.0",
    "react-icons": "^5.0.1",
    "react-pdf": "^7.7.1",
    "react-router-dom": "^6.22.3",
    "react-scripts": "^5.0.1",
    "react-to-print": "^2.15.1",
    "sort-by": "^1.2.0",
    "web-vitals": "^3.5.2"
  },
  "devDependencies": {
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@vitejs/plugin-react": "^4.2.1",
    "eslint": "^8.57.0",
    "eslint-plugin-react": "^7.34.1",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.6",
    "http-proxy-middleware": "^2.0.6",
    "vite": "^5.2.0"
  }
}
```

## Screenshots
### WP Admin Page
![WP Admin Page](https://i.ibb.co/BZdD0JL/2-wp-admin-page.png)

### Upload PDF
![Upload PDF](https://i.ibb.co/kgYz2S7/3-upload-pdf.png)

### Successfully Update
![Successfully Update](https://i.ibb.co/z5XVbGb/4-successfully-update.png)

### Print PDF QR Code
![Print PDF QR Code](https://i.ibb.co/1JPkQTs/5-print-pdf-qr-code.png)

### QR Coded PDF Print Page Button
![QR Coded PDF Print Page Button](https://i.ibb.co/K6XNNYN/6-qr-coded-pdf-print-page-button.png)

### Login Page
![Login Page](https://i.ibb.co/pxspmdF/1-login-page.png)

## Contributing
Contributions to the project are welcome! If you have any suggestions or find any issues, please open an issue or submit a pull request on GitHub.

## License
This project is licensed under the [MIT License](LICENSE).

## Acknowledgments
- This project was inspired by the need for secure PDF document management.
- Special thanks to the contributors and open-source community for their support and feedback.

## Support
For any inquiries or support, please contact through Linkedin(check my profile)

## Conclusion
Ldtax-v2 provides a secure and convenient solution for managing PDF documents with unique QR code access. Whether you're an administrator uploading documents or a user accessing them, this application streamlines the process for efficiency and ease of use.
