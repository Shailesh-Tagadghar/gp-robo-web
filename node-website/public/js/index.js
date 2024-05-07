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

// Function to populate dropdown menu with checkboxes
function populateDropdownCheckboxes() {
    var dropdownMenu = document.getElementById('roleCategoryDropdown');

    roleCategories.forEach(function(category) {
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'roleCategory';
        checkbox.value = category;

        var label = document.createElement('label');
        label.appendChild(document.createTextNode(category));
        label.className = 'dropdown-item';

        var listItem = document.createElement('li');
        listItem.appendChild(checkbox);
        listItem.appendChild(label);

        // Add event listener to change background color when clicked
        listItem.addEventListener('click', function() {
            checkbox.checked = !checkbox.checked; // Toggle checkbox
            listItem.classList.toggle('selected'); // Toggle selected class
        });

        dropdownMenu.appendChild(listItem);
    });
}

// Toggle visibility of dropdown checkboxes
document.getElementById('dropdownMenuButton').addEventListener('click', function() {
    var dropdownMenu = document.getElementById('roleCategoryDropdown');
    if (dropdownMenu.style.display === 'block') {
        dropdownMenu.style.display = 'none';
    } else {
        dropdownMenu.style.display = 'block';
    }
});

// Populate the dropdown checkboxes when the page loads
window.onload = function() {
    populateDropdownCheckboxes();
};