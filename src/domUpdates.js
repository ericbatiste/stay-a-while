import { getUser, getAllData } from './apiCalls';
import { userRoomSearch, userRoomFilter, verifyUserCreds } from './scripts';
import { filterRoomsByDate } from './users';

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
const userDashboard = document.querySelector('.user-bookings-dashboard')
const availRoomsContainer = document.querySelector('.available-rooms-container');
const availRoomsHeading = document.querySelector('#availRoomsHeading');
const availRoomsList = document.querySelector('.available-rooms-list');

window.addEventListener('load', () => {});
loginBtn.addEventListener('click', showUserLogin);
closeLoginModalBtn.addEventListener('click', closeUserLogin);
submitLoginBtn.addEventListener('click', e => {
  userLoggedInView();
  userBookingsHist.innerHTML = '';
  verifyUserCreds(e, username.value, password.value);
});
searchRoomsBtn.addEventListener('click', () => {
  userRoomSearch()
});
filterRoomType.addEventListener('change', () => {
  availRoomsList.innerHTML = '';
  userRoomFilter()
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
  totalCost.innerText = `Total spent: $${cost.toLocaleString()}`
}

function renderAvailRooms(date, room) {
  const { number, roomType, bedSize, numBeds, costPerNight } = room;
  searchRoomsView();
  availRoomsHeading.innerText = `Avaliable rooms for ${date}`;
  availRoomsList.innerHTML += `
    <li>
      <p id="availRoomType">${roomType}</p>
      <p id="availRoomNum">${number}</p>
      <p id="availRoomBed">Beds: <span id="availRoomBedNum">${numBeds} </span>${bedSize}</p>
      <p id="availRoomCost">$${costPerNight} / night</p>
    </li>`;
}

function renderLoginFailed() {
  loginFailed.classList.remove('hidden');
  resetBtn.classList.remove('hidden');
}

function showUserLogin() {
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
  mockContentContainer.classList.add('hidden');
  availRoomsContainer.classList.add('hidden');
}

function searchRoomsView() {
  mockContentContainer.classList.add('hidden');
  userDashboard.classList.add('hidden');
  availRoomsContainer.classList.remove('hidden');
}

export { 
  filterRoomType,
  renderAvailRooms, 
  renderUserBookings, 
  renderLoginFailed,
  renderTotalCost, 
  selectDate 
};
