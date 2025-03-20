

var menuLinks = [
  { text: 'Home', href: '#home' },
  { text: 'Estimator', href: '#form-section' },
  { text: 'Features', href: '#features' },
  { text: 'About', href: '#about' },
  { text: 'Contact', href: '#contact' }
];
const materialPrices = {
  tiles: {
    ceramic: 2.0,
    porcelain: 4.0,
    natural_stone: 8.0
  },
  fixtures: {
    basic: 1200,
    premium: 3500
  }
};
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupStyles();
  setupFormListeners();
  updateTable(); 
  displayFeatures();
});

function createCostTable(items) {
  const container = document.querySelector('#cost-table-container');
  if (!container) {
    console.error('Cost table container not found');
    return;
  }

  // Clear previous table
  container.innerHTML = '';

  const table = document.createElement('table');
  table.className = 'cost-table';

  //Create header
  const headerRow = table.insertRow();
  const headers = ['Item', 'Cost', 'Quantity', 'Total Cost'];
  for (let i = 0; i < headers.length; i++) {
    const headerText = headers[i];
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  }

  // Create rows
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const row = table.insertRow();
    row.insertCell().textContent = item.name;
    row.insertCell().textContent = `$${item.cost}`;
    row.insertCell().textContent = item.quantity;
    row.insertCell().textContent = `$${item.totalCost || 0}`;
  }

  container.appendChild(table);
}

function calculateCosts(size, type, includePlumbing, includeElectrical) {
  const baseMultiplier = type === 'half bath' ? 1 : type === 'full bath' ? 1.5 : 2;
  const sizeMultiplier = Math.max(1, size / 50);

  const items = [
    { name: 'Shower', baseCost: 225, maxCost: 1240 },
    { name: 'Toilet', baseCost: 150, maxCost: 800 }
  ];

  const result = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const cost = item.baseCost * baseMultiplier * sizeMultiplier;
    const maxCost = item.maxCost * baseMultiplier * sizeMultiplier;
    result.push({
      name: item.name,
      cost: `${Math.round(cost)}-${Math.round(maxCost)}`,
      quantity: 1,
      totalCost: Math.round((cost + maxCost) / 2)
    });
  }
  return result;
}
///
function setupFormListeners() {
  const typeSelect = document.querySelector('#bathroom-type');
  const sizeInput = document.querySelector('#bathroom-size');
  const plumbingCheckbox = document.querySelector('#include-plumbing');
  const electricalCheckbox = document.querySelector('#include-electrical');
  const nameInput = document.querySelector('#name');
  const emailInput = document.querySelector('#email');
  const phoneInput = document.querySelector('#phone');

  const elements = [typeSelect, sizeInput, plumbingCheckbox, electricalCheckbox];
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    element.addEventListener('change', ()=>{
      saveInputs();
      updateTable();
    });
  }
}
///

function updateTable() {
  const size = parseFloat(document.querySelector('#bathroom-size').value) || 0;
  const type = document.querySelector('#bathroom-type').value;
  const includePlumbing = document.querySelector('#include-plumbing').checked;
  const includeElectrical = document.querySelector('#include-electrical').checked;

  const items = calculateCosts(size, type, includePlumbing, includeElectrical);
  createCostTable(items);
}

///

function setupNavigation() {
  const anchors = document.querySelectorAll('a[href^="#"]');
  for (let i = 0; i < anchors.length; i++) {
    const anchor = anchors[i];
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

function setupStyles() {
  const mainEl = document.querySelector("main");
  const topMenuEl = document.getElementById("top-menu");
  const subMenuEl = document.querySelector('#sub-menu');

  // Main container styling
  mainEl.classList.add('flex-ctr');
  mainEl.style.backgroundColor = 'var(--main-bg)';

  // Top menu styling
  topMenuEl.style.height = "100%";
  topMenuEl.classList.add("flex-around");

  // Submenu styling
  subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
  subMenuEl.classList.add("flex-around");
  subMenuEl.style.position = "absolute";
  subMenuEl.style.top = "0";
}


function displayFeatures() {
  const featureListDiv = document.querySelector('#feature-list');
  featureListDiv.innerHTML = '';

  const features = [
    { id: 'eco-friendly', name: 'Eco-Friendly Materials' },
    { id: 'heated-floor', name: 'Heated Flooring' },
    { id: 'smart-shower', name: 'Smart Shower System' }
  ];

  features.forEach(feature => {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = feature.id;
    
    // Load checkbox state from localStorage
    checkbox.checked = localStorage.getItem(feature.id) === 'true';
    
    checkbox.addEventListener('change', () => {
      localStorage.setItem(feature.id, checkbox.checked);
    });

    label.append(checkbox, ` ${feature.name}`);
    featureListDiv.appendChild(label);
    featureListDiv.appendChild(document.createElement('br'));
  });
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validatePhone(phone) {
  const regex = /^\d{10}$/; // Assumes 10-digit phone number
  return regex.test(phone);
}

function validateBathroomSize(size) {
  const regex = /^\d+$/; // Only numbers allowed
  return regex.test(size);
}

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

  //
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
    
    function loadInputs() {
        document.querySelector('#name').value = localStorage.getItem('name') || '';
        document.querySelector('#email').value = localStorage.getItem('email') || '';
        document.querySelector('#phone').value = localStorage.getItem('phone') || '';
        document.querySelector('#bathroom-size').value = localStorage.getItem('bathroomSize') || '';
        document.querySelector('#bathroom-type').value = localStorage.getItem('bathroomType') || '';
    }
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
//       `
//   },
//   {
//       title: "Cost Breakdown Explanation",
//       description: "Understand the factors that influence renovation costs...",
//       content: "<p>Costs depend on size, materials, and labor.</p>"  // Example
//   },
//   // Add more features here
// ]
