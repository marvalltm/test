import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');

const STORAGE_KEY = 'feedback-form-state';
let formData = {};

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

reloadPage();

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  console.log(savedData);
  e.target.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = {};
}

function reloadPage() {
  const savedValues = localStorage.getItem(STORAGE_KEY);
  if (savedValues) {
    formData = JSON.parse(savedValues);
    email.value = formData.email;
    message.value = formData.message;
  }
}
