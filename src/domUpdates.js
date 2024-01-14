import { verifyUserCreds } from "./scripts";

const loginModal = document.querySelector('#loginModal');
const loginOverlay = document.querySelector('.overlay');
const loginBtn = document.querySelector('.login-btn');
const closeLoginModalBtn = document.querySelector('.close-modal-btn');
const loginForm = document.querySelector('.login-inputs');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const submitLoginBtn = document.querySelector('#submitLoginBtn');


loginBtn.addEventListener('click', showUserLogin);
closeLoginModalBtn.addEventListener('click', closeUserLogin);
submitLoginBtn.addEventListener('click', (e) => {
  verifyUserCreds(e, username.value, password.value);
}) 

function showUserLogin() {
  loginModal.classList.remove('hidden');
  loginOverlay.classList.remove('hidden');
}

function closeUserLogin() {
  loginModal.classList.add('hidden');
  loginOverlay.classList.add('hidden');
}