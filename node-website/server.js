// const express = require('express');
// const bodyParser = require('body-parser');
// const nodemailer = require('nodemailer');
// const multer = require('multer');
// const path = require('path');
// const mongoose = require('mongoose');
// const Application = require('./applicationModel');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.static('public'));

// // Define allowed file types
// const allowedFileTypes = ['.pdf', '.doc', '.docx'];

// // Configure multer for file uploads
// const upload = multer({
//     dest: 'uploads/',
//     fileFilter: (req, file, cb) => {
//         const extname = path.extname(file.originalname).toLowerCase();
//         if (allowedFileTypes.includes(extname)) {
//             return cb(null, true);
//         } else {
//             return cb(new Error('Only PDF or Word files are allowed'));
//         }
//     }
// });

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());



// // Nodemailer transporter setup
// const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: 'tagadgharshailesh@gmail.com', // Your email address
//         pass: 'ehwb yjsu vqac mdik' // Your email password
//     }
// });


// // Form submission endpoint
// app.post('/submitForm', multer().single('resume'), async (req, res) => {
//     try {
//         const formData = req.body;
//         const resumeFile = req.file.buffer; // Store resume as Buffer

//         // Create a new application instance
//         const application = new Application({
//             name: formData.name,
//             email: formData.email,
//             contactNo: formData.contactNo,
//             collegeName: formData.collegeName,
//             yearOfPassing: formData.yearOfPassing,
//             roleCategory: formData.roleCategory,
//             exceptionalWork: formData.exceptionalWork,
//             resume: resumeFile
//         });

//         // Save the application to the database
//         await application.save();

//         // Send email containing form data
//         await transporter.sendMail({
//             from: senderEmail,
//             to: 'tagadgharshailesh@gmail.com', // Your email address as recipient
//             subject: 'New Career Application',
//             html: `
//                 <p>New career application received!</p>
//                 <p>Name: ${formData.name}</p>
//                 <p>Email: ${formData.email}</p>
//                 <p>Contact No.: ${formData.contactNo}</p>
//                 <p>College Name: ${formData.collegeName}</p>
//                 <p>Year of Passing: ${formData.yearOfPassing}</p>
//                 <p>Role Category: ${formData.roleCategory}</p>
//                 <p>Exceptional Work: ${formData.exceptionalWork}</p>
//             `
//         });

//         res.send('success');
//     } catch (error) {
//         res.status(500).json({ error: 'Error submitting form: ' + error.message });
//     }
// });

// // app.post('/submitForm', upload.single('resume'), (req, res) => {
// //     // Extract form data
// //     const formData = req.body;

// //     // Extract uploaded resume file
// //     const resumeFile = req.file;

// //     // Format data as JSON
// //     const jsonData = JSON.stringify(formData);

// //     // Format data as tabular
// //     const tableData = `
// //         <table>
// //             <tr><th>Name</th><td>${formData.name}</td></tr>
// //             <tr><th>Email</th><td>${formData.email}</td></tr>
// //             <tr><th>Contact No.</th><td>${formData.contactNo}</td></tr>
// //             <tr><th>College Name</th><td>${formData.collegeName}</td></tr>
// //             <tr><th>Year of Passing</th><td>${formData.yearOfPassing}</td></tr>
// //             <tr><th>Role Category</th><td>${formData.roleCategory}</td></tr>
// //             <tr><th>Exceptional Work</th><td>${formData.exceptionalWork}</td></tr>
// //         </table>
// //     `;

// //     // Send email
// //     sendEmail(formData.email, jsonData, tableData, resumeFile)
// //     .then(() => res.send('success'))
// //     .catch(error => res.status(500).json({ error: 'Error submitting form: ' + error.message }));
// // });

// // Form submission endpoint



// // Function to send email
// // async function sendEmail(senderEmail, jsonData, tableData, resumeFile) {
// //     let transporter = nodemailer.createTransport({
// //         // Configure your email service
// //         service: 'Gmail',
// //         auth: {
// //             user: 'tagadgharshailesh@gmail.com', // Your email address
// //             pass: 'ehwb yjsu vqac mdik' // Your email password
// //         }
// //     });

// //     // Setup email data
// //     let mailOptions = {
// //         from: senderEmail, // Sender will be the email provided in the form
// //         to: 'tagadgharshailesh@gmail.com', // Your email address as recipient
// //         subject: 'New Career Application',
// //         text: 'New career application received!',
// //         // html: `<p>New career application received!</p><p><strong>JSON Data:</strong></p><pre>${jsonData}</pre><p><strong>Tabular Data:</strong></p>${tableData}`,
// //         html: `<p>New career application received!</p><p></p>${tableData}`,
// //         attachments: [
// //             {
// //                 path: resumeFile.path, // Use the original file path
// //                 filename: resumeFile.originalname
// //             }
// //         ]
// //     };

// //     // Send email
// //     return transporter.sendMail(mailOptions);
// // }

// app.listen(PORT, () =>
//     console.log(`Server is running on port ${PORT}`)
// );


// ehwb yjsu vqac mdik

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
// Serve files in the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://<username>:<password>@cluster0.bdcw4yt.mongodb.net/<databasename>?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a schema for form data
const applicationSchema = new mongoose.Schema({
    name: String,
    exceptionalWork: String,
    email: String,
    contactNo: String,
    collegeName: String,
    roleCategory: [String], // Define roleCategory as an array of strings
    yearOfPassing: String,
    resume: String // Store resume file path
});

const Application = mongoose.model('Enquiry-Application', applicationSchema);

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Preserve the original filename
    }
});

const upload = multer({ storage: storage });

// Form submission endpoint
app.post('/submitForm', upload.single('resume'), async (req, res) => {
    try {
        // Check if the application already exists based on email address
        const existingApplication = await Application.findOne({ email: req.body.email });
        if (existingApplication) {
            // If application exists, send a success response with a custom message
            return res.status(400).json({ message: 'Application already exists for this email address' });
        }

        // Create a new application instance
        const newApplication = new Application({
            name: req.body.name,
            exceptionalWork: req.body.exceptionalWork,
            email: req.body.email,
            contactNo: req.body.contactNo,
            collegeName: req.body.collegeName,
            roleCategory: req.body.roleCategory, // Accepts an array of role categories
            yearOfPassing: req.body.yearOfPassing,
            resume: req.file.originalname // Save the original filename
        });

        // Save the application to MongoDB
        await newApplication.save();

        // Send email
        await sendEmail(req.body.email, newApplication);

        // Send a success response to the client
        return res.status(200).json({ message: 'Form submitted successfully!' });
    } catch (error) {
        console.error('Error submitting form:', error);
        // Send an error response to the client
        return res.status(500).json({ error: 'Error submitting form: ' + error.message });
    }
});


// Function to send email
async function sendEmail(senderEmail, application) {
    let transporter = nodemailer.createTransport({
        // Configure your email service
        service: 'Gmail',
        auth: {
            user: 'example@gmail.com', // Your email address
            pass: '' // Your email password
        }
    });

    // Setup email data
    let mailOptions = {
        from: senderEmail, // Use a fixed sender email
        to: 'tagadgharshailesh@gmail.com', // Your email address as recipient
        subject: 'New Career Application',
        text: 'New career application received!',
        html: `<p>New career application received!</p>
               <table border="1">
                 <tr><th>Name</th><td>${application.name}</td></tr>
                 <tr><th>Email</th><td>${application.email}</td></tr>
                 <tr><th>Contact No.</th><td>${application.contactNo}</td></tr>
                 <tr><th>College Name</th><td>${application.collegeName}</td></tr>
                 <tr><th>Year of Passing</th><td>${application.yearOfPassing}</td></tr>
                 <tr><th>Role Category</th><td>${application.roleCategory.join(', ')}</td></tr>
                 <tr><th>Exceptional Work</th><td>${application.exceptionalWork}</td></tr>
               </table>`,
        attachments: [
            {
                path: path.join(__dirname, 'uploads', application.resume), // Use the resume file path saved in uploads directory
                filename: application.resume // Use the original filename
            }
        ]
    };

    // Send email
    return transporter.sendMail(mailOptions);
}

// Admin login endpoint
app.post('/adminLogin', (req, res) => {
    const { username, password } = req.body;
    // Validate admin credentials (Replace with your authentication logic)
    if (username === 'user_name' && password === 'your_password') {
        // Redirect to admin dashboard upon successful authentication
        res.redirect('/admin-dashboard');
    } else {
        // Authentication failed
        res.status(401).send('Invalid credentials');
    }
});

// Admin dashboard endpoint
app.get('/admin-dashboard', async (req, res) => {
    try {
        // Fetch all form data from the database
        const formData = await Application.find();
        // Render admin dashboard page with form data
        res.render('admin_dashboard', { formData });
    } catch (error) {
        console.error('Error fetching form data:', error);
        res.status(500).send('Error fetching form data');
    }
});


app.listen(PORT, () => 
    console.log(`Server is running on port ${PORT}`)
);
