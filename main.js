import { ClientPrivate } from './ClientPrivate.js';
import { ClientProfessional } from './ClientProfessional.js';
import { BonusMalus } from './BonusMalus.js';

// Initialize event listener for form submission
document.getElementById('bonusMalusForm').addEventListener('submit', function(event) {
  event.preventDefault(); 

  // Get form values
  const formData = getFormData();

  // Create client instance
  const client = createClient(formData);

  // Calculate bonus-malus score
  const score = client.bonusMalus.calculateBonusMalus();

  // Display result
  displayResult(formData.firstName, formData.drivingYears, formData.accidentsAtFault, score);
});

// Function to get form data
function getFormData() {
  return {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    age: parseInt(document.getElementById('age').value, 10),
    drivingYears: parseInt(document.getElementById('drivingYears').value, 10),
    accidentsAtFault: parseInt(document.getElementById('accidentsAtFault').value, 10),
    usage: Number(document.getElementById('usage').value),
    form: document.getElementById('bonusMalusForm'),
    resultDiv: document.getElementById('result')
  };
}

// Function to create client instance based on usage
function createClient(formData) {
  const bonusMalus = new BonusMalus(formData.drivingYears, formData.accidentsAtFault, formData.usage);
  return formData.usage === 0
    ? new ClientPrivate(formData.firstName, formData.lastName, formData.age, bonusMalus)
    : new ClientProfessional(formData.firstName, formData.lastName, formData.age, bonusMalus);
}

// Function to display result
function displayResult(firstName, drivingYears, accidentsAtFault, score) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';
  resultDiv.style.width = '550px';
  resultDiv.classList.add("px-14", "pb-8", "pt-10", "rounded-lg", "border-white", "border", "items-end", "justify-between", "flex-col", "flex");

  // Determine timeout duration based on resultDiv width
  const timeoutDuration = (resultDiv.offsetWidth < 550) ? 500 : 0;

  // Display result after timeout (to make a smooth transition/apparition)
  setTimeout(() => {
    const resultHTML = `
      <div class="text-2xl font-light">
        <div class="text-4xl italic mb-2">Hey ${firstName},</div>
        <br/> You've been driving for <span class='font-bold'>${drivingYears}</span> year${drivingYears > 1 ? 's' : ''} and had  
        <span class='font-bold'>${accidentsAtFault}</span> accident${accidentsAtFault > 1 ? 's' : ''} in the past five years, so your bonus-malus score is 
        <div class="text-9xl mt-20 text-center">${score}</div>
      </div>`;
    
    resultDiv.innerHTML = resultHTML;
    addResetButton();
  }, timeoutDuration);
}

// Function to add reset button
function addResetButton() {
  const resultDiv = document.getElementById('result');
  const form = document.getElementById('bonusMalusForm');

  // Check if reset button already exists
  if (!document.getElementById('resetButton')) {
    const resetButton = document.createElement('button');
    resetButton.id = 'resetButton';
    resetButton.innerText = 'Reset Form';
    resetButton.classList.add( "bg-blue-800", "text-white", "hover:bg-blue-900", "border-blue-800","text-sm",  "py-2", "px-4", "rounded");

    resetButton.addEventListener('click', () => {
      form.reset(); // Reset form
      resultDiv.innerHTML = ''; // Clear resultDiv
      resultDiv.style.width = '0';
      resultDiv.classList.remove("px-14", "pb-8", "pt-10", "rounded-lg", "border-white", "border");
      resetButton.remove();// Remove reset button
    });

    // Append reset button to resultDiv
    resultDiv.appendChild(resetButton);
  }
}
