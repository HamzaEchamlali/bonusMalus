import { ClientPrivate } from './ClientPrivate.js';
import { ClientProfessional } from './ClientProfessional.js';
import { BonusMalus } from './BonusMalus.js';

let clickCount = 0;

document.getElementById('bonusMalusForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const age = parseInt(document.getElementById('age').value, 10);
  const drivingYears = parseInt(document.getElementById('drivingYears').value, 10);
  const accidentsAtFault = parseInt(document.getElementById('accidentsAtFault').value, 10);
  const usage = Number(document.getElementById('usage').value);
  const form = document.getElementById('bonusMalusForm');
  const resultDiv = document.getElementById('result');

  const bonusMalus = new BonusMalus(drivingYears, accidentsAtFault, usage);

  const client = usage === 0
      ? new ClientPrivate(firstName, lastName, age, bonusMalus)
      : new ClientProfessional(firstName, lastName, age, bonusMalus);
  
  const score = client.bonusMalus.calculateBonusMalus();

  resultDiv.innerHTML = '';
  resultDiv.style.width = '550px';
  resultDiv.classList.add("px-14", "pb-14", "pt-10", "rounded-lg", "border-white", "border", "items-end", "justify-between", "flex-col", "flex");

  const timeoutDuration = (clickCount === 0 && resultDiv.offsetWidth < 500) ? 500 : 0;
  setTimeout(() => {
    resultDiv.innerHTML = `<div class="text-2xl font-light">
                            <div class="text-4xl italic mb-2">Hey ${firstName},</div>
                            <br/> You've been driving for <span class='font-bold'>${drivingYears}</span> year${drivingYears > 1 ? 's' : ''} and had  
                            <span class='font-bold'>${accidentsAtFault}</span> accident${accidentsAtFault > 1 ? 's' : ''} in the past five years, so your bonus-malus score is 
                            <div class="text-9xl mt-20 text-center">${score}</div>
                           </div>`;

    if (!document.getElementById('resetButton')) {
      const resetButton = document.createElement('button');
      resetButton.id = 'resetButton';
      resetButton.innerText = 'Reset Form';
      resetButton.classList.add("mt-2", "flex-shrink-0", "bg-blue-800", "text-white", "hover:bg-blue-900", "border-blue-800", "hover:border-bg-blue-900", "text-sm", "border-4", "py-1", "px-2", "rounded");
      resetButton.addEventListener('click', () => {
        form.reset();

        resultDiv.innerHTML = '';
        resultDiv.style.width = '0';
        resultDiv.classList.remove("px-14", "pb-14", "pt-10", "rounded-lg", "border-white", "border");

        resetButton.remove();
      });
      resultDiv.appendChild(resetButton);
    }
  }, timeoutDuration); 

  clickCount++;
});

