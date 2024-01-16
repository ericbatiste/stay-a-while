import { 
  userRoomSearch, 
  userRoomFilter, 
  verifyUserCreds, 
  userNewBooking 
} from './scripts';

const loginModal = document.querySelector('#loginModal');
const loginOverlay = document.querySelector('.overlay');
const loginBtn = document.querySelector('.login-btn');
const closeLoginModalBtn = document.querySelector('.close-modal-btn');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const submitLoginBtn = document.querySelector('#submitLoginBtn');
const selectDate = document.querySelector('#selectDate');
const searchRoomsBtn = document.querySelector('#searchRoomsBtn');
const filterRoomType = document.querySelector('#selectRoomType');
const userBookingsHist = document.querySelector('.booking-history');
const loginFailed = document.querySelector('.login-failed-text');
const resetBtn = document.querySelector('.reset-btn');
const totalCost = document.querySelector('.total-cost');
const mockContentContainer = document.querySelector('.mock-content-container');
const userDashboard = document.querySelector('.user-bookings-dashboard');
const availRoomsContainer = document.querySelector('.available-rooms-container');
const availRoomsHeading = document.querySelector('#availRoomsHeading');
const availRoomsList = document.querySelector('.available-rooms-list');
const bookNowBtn = document.querySelector('#bookNowBtn');
const loginPrompt = document.querySelector('.login-prompt');
const bookingSuccess = document.querySelector('.booking-success');
const successMsg = document.querySelector('.success-msg');
const returnToDashBtn = document.querySelector('#returnToDash');

loginBtn.addEventListener('click', showUserLogin);
closeLoginModalBtn.addEventListener('click', closeUserLogin);
searchRoomsBtn.addEventListener('click', userRoomSearch);
submitLoginBtn.addEventListener('click', e => {
  userLoggedInView();
  userBookingsHist.innerHTML = '';
  verifyUserCreds(e, username.value, password.value);
});
filterRoomType.addEventListener('change', () => {
  availRoomsList.innerHTML = '';
  userRoomFilter();
});
availRoomsList.addEventListener('click', e => {
  userNewBooking(e);
});
returnToDashBtn.addEventListener('click', e => {
  userLoggedInView();
  userBookingsHist.innerHTML = '';
  verifyUserCreds(e, username.value, password.value);
});

function renderUserBookings(date, roomType, roomNumber, numBeds, bedSize, cost) {
  closeUserLogin();
  userBookingsHist.innerHTML += `
    <li class="booking-details">
      <p id="bookingDate">${date}</p>
      <p id="bookingRoomType">${roomType}<span id="bookingRoomNum"> number ${roomNumber}</span></p>
      <p id="bookingBeds">Beds: <span id="bookingBedNum">${numBeds} </span>${bedSize}</p>
      <p id="bookingCost">$${cost} / night</p>
    </li>`;
}

function renderTotalCost(cost) {
  totalCost.innerText = `Total spent: $${cost.toLocaleString()}`;
}

function renderAvailRooms(date, room) {
  const { number, roomType, bedSize, numBeds, costPerNight } = room;
  searchRoomsView();
  availRoomsHeading.innerText = `Avaliable rooms, ${date}`;
  availRoomsList.innerHTML += `
    <li>
      <p id="availRoomType">${roomType}</p>
      <p id="availRoomNum">${number}</p>
      <p id="availRoomBed">Beds: <span id="availRoomBedNum">${numBeds} </span>${bedSize}</p>
      <p id="availRoomCost">$${costPerNight} / night</p>
      <button id="btn${number}">Book now</button>
    </li>`;
}

function renderLoginFailed() {
  loginFailed.classList.remove('hidden');
  resetBtn.classList.remove('hidden');
}

function showUserLogin() {
  loginPrompt.classList.add('hidden');
  loginFailed.classList.add('hidden');
  resetBtn.classList.add('hidden');
  loginModal.classList.remove('hidden');
  loginOverlay.classList.remove('hidden');
}

function closeUserLogin() {
  loginModal.classList.add('hidden');
  loginOverlay.classList.add('hidden');
}

function userLoggedInView() {
  userDashboard.classList.remove('hidden');
  bookingSuccess.classList.add('hidden');
  mockContentContainer.classList.add('hidden');
  availRoomsContainer.classList.add('hidden');
}

function searchRoomsView() {
  mockContentContainer.classList.add('hidden');
  userDashboard.classList.add('hidden');
  availRoomsContainer.classList.remove('hidden');
}

function promptUserLogin() {
  showUserLogin();
  loginPrompt.classList.remove('hidden');
}

function renderBookingSuccess(date) {
  successMsg.innerText = `Looks like we'll be seeing you on ${date}!`;
  bookingSuccessView();
}

function bookingSuccessView() {
  userDashboard.classList.add('hidden');
  mockContentContainer.classList.add('hidden');
  availRoomsContainer.classList.add('hidden');
  bookingSuccess.classList.remove('hidden');
}

export {
  filterRoomType,
  promptUserLogin,
  renderAvailRooms,
  renderBookingSuccess,
  renderUserBookings,
  renderLoginFailed,
  renderTotalCost,
  selectDate
};
