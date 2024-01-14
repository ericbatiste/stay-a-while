const loginModal = document.querySelector('#loginModal');
const loginOverlay = document.querySelector('.overlay');
const loginBtn = document.querySelector('.login-btn');
const closeLoginModalBtn = document.querySelector('.close-modal-btn')

loginBtn.addEventListener('click', showUserLogin);
closeLoginModalBtn.addEventListener('click', closeUserLogin);

function showUserLogin() {
  loginModal.classList.remove('hidden');
  loginOverlay.classList.remove('hidden');
}

function closeUserLogin() {
  loginModal.classList.add('hidden');
  loginOverlay.classList.add('hidden');
}