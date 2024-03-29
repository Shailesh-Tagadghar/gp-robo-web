// Load navbar
fetch('navbar.html')
    .then(response => response.text())
    .then(html => document.getElementById('navbar').innerHTML = html);

// Load footer
fetch('footer.html')
    .then(response => response.text())
    .then(html => document.getElementById('footer').innerHTML = html);

// Load copyright
fetch('copyright.html')
    .then(response => response.text())
    .then(html => document.getElementById('copyright').innerHTML = html);

// fetch('copyright.html')
//     .then(response => response.text())
//     .then(html => document.getElementById('hr-line').innerHTML = html);


// Array of role categories
var roleCategories = [
    "AI/ML Engineer",
    "Mechanical Engineer",
    "3d design + 3d printing",
    "Hardware",
    "Actuator design and arms",
    "Navigation and positioning",
    "Software Engineering",
    "Robot Operating System (Ros)",
    "Vision",
    "Chat bot",
    "Kinematics",
    "Full stack developer",
    "Chat GPT",
    "Marketing",
    "Product Designer",
    "Web Developer",
    "Other..."
];

// Function to populate dropdown menu options
function populateDropdown() {
    var dropdown = document.getElementById('roleCategory');
    
    roleCategories.forEach(function(category) {
        var option = document.createElement('option');
        option.text = category;
        option.value = category;
        dropdown.appendChild(option);
    });
}

// Populate the dropdown when the page loads
window.onload = populateDropdown;





// Save form data to local storage
function saveFormData(formData) {
    var savedForms = JSON.parse(localStorage.getItem('savedForms')) || [];
    savedForms.push(formData);
    localStorage.setItem('savedForms', JSON.stringify(savedForms));
}

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();

    // Gather form data
    var formData = {
        name: document.getElementById('name').value,
        exceptionalWork: document.getElementById('exceptionalWork').value,
        contactNo: document.getElementById('contactNo').value,
        collegeName: document.getElementById('collegeName').value,
        roleCategory: document.getElementById('roleCategory').value,
        yearOfPassing: document.getElementById('yearOfPassing').value,
        resume: document.getElementById('resume').value
    };

    // Save form data to local storage
    saveFormData(formData);

    // Optionally, display a message or redirect the user after submission
    alert('Form submitted successfully!');

    // Reset the form
    document.getElementById('applicationForm').reset();
}

// Add submit event listener to the form
document.getElementById('applicationForm').addEventListener('submit', handleSubmit);


