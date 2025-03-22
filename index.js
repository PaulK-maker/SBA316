
//array of objects for the menu links 
var menuLinks = [
  { text: 'Home', href: '#home' },
  { text: 'Estimator', href: '#form-section' },
  { text: 'Features', href: '#features' },
  { text: 'About', href: '#about' },
  { text: 'Contact', href: '#contact' }
];

// object to store bathroom items incluideing names of the items and price
const BathroomItems = Object({
  SHOWER: { name: 'Shower', basePrice: 225, maxPrice: 1240 },
  TOILET: { name: 'Toilet', basePrice: 150, maxPrice: 800 },
  PLUMBING: { name: 'Plumbing', basePrice: 500, maxPrice: 2000 },
  ELECTRICAL: { name: 'Electrical', basePrice: 300, maxPrice: 1500 },
  ECO_FRIENDLY: { name: 'Eco-Friendly Materials', price: 500 },
  HEATED_FLOOR: { name: 'Heated Flooring', price: 1000 },
  SMART_SHOWER: { name: 'Smart Shower System', price: 800 },
  SMART_LIGHTING: { name: 'Smart Lighting System', price: 600 },
  SMART_WARMING: { name: 'Smart Warming System', price: 700 }
});

// An array to store the items selected by the user
let selectedItems = [];
// event listener for use when the DOM 
document.addEventListener('DOMContentLoaded', () => {
  populateItemSelect(); // populates the dropdown with items 
  setupEventListeners(); // event listener for user interaction
  updateTable();// updates the table 
});

// function to populate the itme selected in the drop doen menu
function populateItemSelect() {
  const itemSelect = document.getElementById('itemSelect');
  // iterate over each item in bathroom items 
  for (const [key, value] of Object.entries(BathroomItems)) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = value.name;
    itemSelect.appendChild(option);
  }
}
// function to set up eventlisteners
function setupEventListeners() {
  // listen for changes  during selectiom
  document.getElementById('itemSelect').addEventListener('change', handleItemSelection);
// listen for change in bathroom item
  document.getElementById('bathroom-type').addEventListener('change', updateTable);
// listen for change in bathroom size 
  document.getElementById('bathroom-size').addEventListener('input', updateTable);
}

// function to handle item selection 
function handleItemSelection(e) {
  const selectedKey = e.target.value;
  const selectedItem = BathroomItems[selectedKey];
  if (selectedItem) {
    selectedItems.push(selectedItem); // use .push to add selectded items 
    updateTable(); // update cost table 
  }
}
// function to update cost table
function updateTable() {
// get bathroom size and type from the input 
  const size = Number(document.getElementById('bathroom-size').value) || 0;

  const type = document.getElementById('bathroom-type').value;
// calculate ,ultiplier based on type and size 
  const baseMultiplier = getBaseMultiplier(type);

  const sizeMultiplier = Math.max(1, size / 50);
// create new table body
  const tableBody = document.createElement('tbody');
  let totalCost = 0;

  selectedItems.forEach(item => {
    // add totol cost row
    const row = tableBody.insertRow();
    row.insertCell().textContent = item.name;
    
    const cost = calculateItemCost(item, baseMultiplier, sizeMultiplier);
    row.insertCell().textContent = `$${cost.toFixed(2)}`;
    
    totalCost += cost;
  });
// create total row
  const totalRow = tableBody.insertRow();
  totalRow.insertCell().textContent = 'Total';
  totalRow.insertCell().textContent = `$${totalCost.toFixed(2)}`;
// create new table and append table body
  const table = document.createElement('table');
  table.appendChild(tableBody);
//replace old table with new one 
  const container = document.getElementById('cost-table-container');
  container.innerHTML = '';
  container.appendChild(table);
}
// function to get the base ,ultiplier based on the bathroom type
function getBaseMultiplier(type) {
  switch (type) {
    case 'Half Bath': return 1;
    case 'Full Bath': return 1.5;
    case 'Master Bath': return 2;
    default: return 1;
  }
}
// function to calculate the cost of individual item
function calculateItemCost(item, baseMultiplier, sizeMultiplier) {
  if (item.basePrice !== undefined) {
    // using average of base and max price 
    return ((item.basePrice + item.maxPrice) / 2) * baseMultiplier * sizeMultiplier;
  } else {
    // use one item for single priced items 
    return item.price * baseMultiplier * sizeMultiplier;
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////
// part of the commented code fulfil the requirement but could not work the way i intended///////
///////////////////////////////////////////////////////////////////////////////////////////////////



//   //iterate to Create the table header
//   const headerRow = table.insertRow();
//   const headers = ['Item', 'Cost', 'Quantity', 'Total Cost'];
//   for (let i = 0; i < headers.length; i++) {
//     const headerText = headers[i];
//     const th = document.createElement('th');
//     th.textContent = headerText;
//     headerRow.appendChild(th);
//   }

//   // iterate to Create table rows
//   for (let i = 0; i < items.length; i++) {
//     const item = items[i];
//     const row = table.insertRow();
//     row.insertCell().textContent = item.name;
//     row.insertCell().textContent = `$${item.cost}`;
//     row.insertCell().textContent = item.quantity;
//     row.insertCell().textContent = `$${item.totalCost || 0}`;
//   }
// // Append the table to the container
//   container.appendChild(table);
// }
// // function used to make the calculations as per user needs 
// function calculateCosts(size, type, includePlumbing, includeElectrical) {
//   const baseMultiplier = type === 'half bath' ? 1 : type === 'full bath' ? 1.5 : 2;
//   const sizeMultiplier = Math.max(1, size / 50);

//   // various items costs 
//   const items = [
//     { name: 'Shower', baseCost: 225, maxCost: 1240 },
//     { name: 'Toilet', baseCost: 150, maxCost: 800 }
//   ];

//   if (includePlumbing) {
//     items.push({ name: 'Plumbing', baseCost: 500, maxCost: 2000 });
//   }

//   if (includeElectrical) {
//     items.push({ name: 'Electrical', baseCost: 300, maxCost: 1500 });
//   }
//   //feature costs
//     const features = [
//     { id: 'eco-friendly', name: 'Eco-Friendly Materials', cost: 500 },
//     { id: 'heated-floor', name: 'Heated Flooring', cost: 1000 },
//     { id: 'smart-shower', name: 'Smart Shower System', cost: 800 },
//     { id: 'smart-lighting', name: 'light System', cost: 600 },
//     { id: 'smart-warming', name: 'Smart warming System', cost: 700 }
//   ];
//   features.forEach(feature => {
//     if (document.getElementById(feature.id).checked) {
//       items.push({ name: feature.name, baseCost: feature.cost, maxCost: feature.cost });
//     }
//   });
//   // create cost for each item
//   return items.map(item => ({
//     name: item.name,
//     cost: `${Math.round(item.baseCost * baseMultiplier * sizeMultiplier)}-${Math.round(item.maxCost * baseMultiplier * sizeMultiplier)}`,
//     quantity: 1,
//     totalCost: Math.round(((item.baseCost + item.maxCost) / 2) * baseMultiplier * sizeMultiplier)
//   }));
// }
// // create cost for each item
//   const result = [];
//   for (let i = 0; i < items.length; i++) {
//     const item = items[i];
//     const cost = item.baseCost * baseMultiplier * sizeMultiplier;
//     const maxCost = item.maxCost * baseMultiplier * sizeMultiplier;
//     result.push({
//       name: item.name,
//       cost: `${Math.round(cost)}-${Math.round(maxCost)}`,
//       quantity: 1,
//       totalCost: Math.round((cost + maxCost) / 2)
//     });
//   }
//   return result;

// //function setting event listener for the forms elements
// function setupFormListeners() {
//   const typeSelect = document.querySelector('#bathroom-type');
//   const sizeInput = document.querySelector('#bathroom-size');
//   const plumbingCheckbox = document.querySelector('#include-plumbing');
//   const electricalCheckbox = document.querySelector('#include-electrical');
//   const nameInput = document.querySelector('#name');
//   const emailInput = document.querySelector('#email');
//   const phoneInput = document.querySelector('#phone');

//   const elements = [typeSelect, sizeInput, plumbingCheckbox, electricalCheckbox];
//   for (let i = 0; i < elements.length; i++) {
//     const element = elements[i];
//     element.addEventListener('change', ()=>{
//       saveInputs();
//       updateTable();
//     });
//   }
// }
// // function to update the cost table 


// //function to set up smooth navigation

// function setupNavigation() {
//   const anchors = document.querySelectorAll('a[href^="#"]');
//   for (let i = 0; i < anchors.length; i++) {
//     const anchor = anchors[i];
//     anchor.addEventListener('click', function (e) {
//       e.preventDefault();
//       const target = document.querySelector(this.getAttribute('href'));
//       if (target) {
//         target.scrollIntoView({ behavior: 'smooth' });
//       }
//     });
//   }
// }
// //function to set up the styling for the main element 
// function setupStyles() {
//   const mainEl = document.querySelector("main");
//   const topMenuEl = document.getElementById("top-menu");
//   const subMenuEl = document.querySelector('#sub-menu');

//   // Main container styling
//   mainEl.classList.add('flex-ctr');
//   mainEl.style.backgroundColor = 'var(--main-bg)';

//   // Top menu styling
//   topMenuEl.style.height = "100%";
//   topMenuEl.classList.add("flex-around");

//   // Submenu styling
//   subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
//   subMenuEl.classList.add("flex-around");
//   subMenuEl.style.position = "absolute";
//   subMenuEl.style.top = "0";
//   subMenuEl.style.backgroundColor="blue"
// }

// // function to display bsthroom features checkbox
// function displayFeatures() {
//   const featureListDiv = document.querySelector('#feature-list');
//   featureListDiv.innerHTML = '';

  
//   const features = [
//     { id: 'eco-friendly', name: 'Eco-Friendly Materials', cost: 500 },
//     { id: 'heated-floor', name: 'Heated Flooring', cost: 1000 },
//     { id: 'smart-shower', name: 'Smart Shower System', cost: 800 },
//     { id: 'smart-lighting', name: 'light System', cost: 600 },
//     { id: 'smart-warming', name: 'Smart warming System', cost: 700 }
//   ];

//   features.forEach(feature => {
//     const label = document.createElement('label');
//     const checkbox = document.createElement('input');
//     checkbox.type = 'checkbox';
//     checkbox.id = feature.id;
    
//     // Load checkbox state from localStorage
//     checkbox.checked = localStorage.getItem(feature.id) === 'true';
    
//     checkbox.addEventListener('change', () => {
//       localStorage.setItem(feature.id, checkbox.checked);
//       updateTable();
//     });
// //append feature check box
//     label.append(checkbox, ` ${feature.name} (+$${feature.cost})`);
//     featureListDiv.appendChild(label);
//     featureListDiv.appendChild(document.createElement('br'));
//   });
// }
// // validate email
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
// validate phone number 10 digits 
function validatePhone(phone) {
  const regex = /^\d{10}$/; 
  return regex.test(phone);
}
// validate only numbers 
function validateNumbersOnly(size) {
  const regex = /^[0-9]+$/;
  return regex.test(size);
}
// function to show alert mesasages
function showAlert(message, type) {
  const alertContainer = document.getElementById('alertContainer');
  alertContainer.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
}
// function to save values selected   
function saveInputs() {
const nameValue = document.querySelector('#name').value;
const emailValue = document.querySelector('#email').value;
const phoneValue = document.querySelector('#phone').value;
const bathroomSizeValue = document.querySelector('#bathroom-size').value;
const bathroomTypeValue = document.querySelector('#bathroom-type').value;

if (!validateEmail(emailValue) && emailValue != '') {
    alert('Please enter a valid email address.');
    return;
}
if (!validatePhone(phoneValue) && phoneValue != '') {
    alert('Please enter a valid phone number (10 digits).');
    return;
}
if (!validateBathroomSize(bathroomSizeValue) && bathroomSizeValue != '') {
    alert('Please enter a valid Bathroom Size (Only number).');
    return;
}

  localStorage.setItem('name', nameValue);
  localStorage.setItem('email', emailValue);
  localStorage.setItem('phone', phoneValue);
  localStorage.setItem('bathroomSize', bathroomSizeValue);
  localStorage.setItem('bathroomType', bathroomTypeValue);

  
}



// function setupStyles(){
//   const mainE1 = document.querySelector("main");
// const topMenuE1 = document.getElementById("top-menu")
// const subMenuEl = document.querySelector('#sub-menu');
// mainE1.classList.add('flex-ctr')

// mainE1.style.backgroundColor = 'var(--main-bg)';
// topMenuE1.style.height = "100%";
// topMenuE1.classList.add("flex-around");
// subMenuE1.style.backgroundColor= "var(--sub-menu-bg)";
// subMenuE1.classList.add("flex-around");
// subMenuE1.style.position = "absolute";
// subMenuE1.style.top = "0";
// // }
// function buildSubmenu(subLinks){
//     // clean the current content of the submenu
//     subMenuE1.innerHTML='';

// menuLinks.forEach(link=>{
//     const newElement=document.createElement('a');
//     newElement.href=link.href;
//     newElement.textContent =link.text;
//     subMenuE1=appendChild(newElement)
// });
// }
// const Home=document.querySelector("#home");

// // }
// // Array of feature objects
// const featuresData = [
//   {
//       title: "Material Selection Guide",
//       description: "Choosing the right materials is crucial...",
//       content: `
//           <ul>
//               <li><strong>Tiles:</strong><ul><li>Ceramic: Affordable...</li></ul></li>
//               <li><strong>Fixtures:</strong> Consider basic vs. premium...</li>
//           </ul>
//       
//   }
//   
// 

// source= https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
//https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
//https://www.w3schools.com/html/html5_webstorage.asp
//https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Image_gallery