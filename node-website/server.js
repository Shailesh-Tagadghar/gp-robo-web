const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

// Define allowed file types
const allowedFileTypes = ['.pdf', '.doc', '.docx'];

// Configure multer for file uploads
const upload = multer({
    dest: 'uploads/',
    fileFilter: (req, file, cb) => {
        const extname = path.extname(file.originalname).toLowerCase();
        if (allowedFileTypes.includes(extname)) {
            return cb(null, true);
        } else {
            return cb(new Error('Only PDF or Word files are allowed'));
        }
    }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Form submission endpoint
app.post('/submitForm', upload.single('resume'), (req, res) => {
    // Extract form data
    const formData = req.body;

    // Extract uploaded resume file
    const resumeFile = req.file;

    // Format data as JSON
    const jsonData = JSON.stringify(formData);

    // Format data as tabular
    const tableData = `
        <table>
            <tr><th>Name</th><td>${formData.name}</td></tr>
            <tr><th>Email</th><td>${formData.email}</td></tr>
            <tr><th>Contact No.</th><td>${formData.contactNo}</td></tr>
            <tr><th>College Name</th><td>${formData.collegeName}</td></tr>
            <tr><th>Year of Passing</th><td>${formData.yearOfPassing}</td></tr>
            <tr><th>Role Category</th><td>${formData.roleCategory}</td></tr>
            <tr><th>Exceptional Work</th><td>${formData.exceptionalWork}</td></tr>
        </table>
    `;

    // Send email
    sendEmail(formData.email, jsonData, tableData, resumeFile)
    .then(() => res.send('success'))
    .catch(error => res.status(500).json({ error: 'Error submitting form: ' + error.message }));
});


// Function to send email
async function sendEmail(senderEmail, jsonData, tableData, resumeFile) {
    let transporter = nodemailer.createTransport({
        // Configure your email service
        service: 'Gmail',
        auth: {
            user: 'tagadgharshailesh@gmail.com', // Your email address
            pass: 'ehwb yjsu vqac mdik' // Your email password
        }
    });

    // Setup email data
    let mailOptions = {
        from: senderEmail, // Sender will be the email provided in the form
        to: 'tagadgharshailesh@gmail.com', // Your email address as recipient
        subject: 'New Career Application',
        text: 'New career application received!',
        // html: `<p>New career application received!</p><p><strong>JSON Data:</strong></p><pre>${jsonData}</pre><p><strong>Tabular Data:</strong></p>${tableData}`,
        html: `<p>New career application received!</p><p></p>${tableData}`,
        attachments: [
            {
                path: resumeFile.path, // Use the original file path
                filename: resumeFile.originalname
            }
        ]
    };

    // Send email
    return transporter.sendMail(mailOptions);
}

app.listen(PORT, () => 
    console.log(`Server is running on port ${PORT}`)
);
