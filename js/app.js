// Global Variables

let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

// Fetch data from API

fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err));

// Function to create cards with employee data

function displayEmployees(employeeData) {
    employees = employeeData;

    // Store the employee HTML as we create it
    let employeeHTML = '';

    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        // Template literal to add into the HTML
        employeeHTML += `
            <div class="card" data-index="${index}">
                <img class="avatar" src="${picture.large}" />
                <div class="text-container">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="city">${city}</p>
                </div>
            </div>
        `
    });

    gridContainer.innerHTML = employeeHTML;
}

// Function to create the modal with the corresponding employee data

function displayModal(index) {
    // Using object destructuring to make template literal cleaner
    let {name, dob, phone, email, location: {city, street, state, postcode}, picture} = employees[index];

    let date = new Date(dob.date);

    const modalHTML = `
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="city">${city}</p>
            <hr />
            <p class="phone-number">${phone}</p>
            <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
            <p class="birthday">Birthday: ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `

    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}

// Click event to open up modal with data pulled from card that was clicked

gridContainer.addEventListener('click', e => {
    // Make sure the click is not on the gridContainer itself
    if (e.target !== gridContainer) {
        // Select the card element based on its proximity to the actual element clicked
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');

        displayModal(index);
    }
});

// Click event to close the modal with the 'X' button

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});