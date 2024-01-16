import { userRoomSearch, userRoomFilter, verifyUserCreds, userNewBooking } from './scripts';

const loginModal = document.querySelector('#loginModal');
const loginOverlay = document.querySelector('.overlay');
const loginBtn = document.querySelector('.login-btn');
const closeLoginModalBtn = document.querySelector('.close-modal-btn');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const submitLoginBtn = document.querySelector('#submitLoginBtn');
const selectDate = document.querySelector('#selectDate');
const searchRoomsBtn = document.querySelector('#searchRoomsBtn');
const searchHeading = document.querySelector('.search-heading');
const selectDatePrompt = document.querySelector('.select-date-prompt');
const filterRoomType = document.querySelector('#selectRoomType');
const userBookingsHist = document.querySelector('.booking-history');
const userBookingsUpcmg = document.querySelector('.booking-upcoming');
const viewHistBtn = document.querySelector('#viewHist');
const viewUpcmgBtn = document.querySelector('#viewUpcmg');
const loginFailed = document.querySelector('.login-failed-text');
const resetBtn = document.querySelector('.reset-btn');
const totalCost = document.querySelector('.total-cost');
const mockContentContainer = document.querySelector('.mock-content-container');
const userDashboard = document.querySelector('.user-bookings-dashboard');
const availRoomsContainer = document.querySelector('.available-rooms-container');
const availRoomsHeading = document.querySelector('#availRoomsHeading');
const availRoomsList = document.querySelector('.available-rooms-list');
const welcome = document.querySelector('.welcome');
const loginPrompt = document.querySelector('.login-prompt');
const bookingSuccess = document.querySelector('.booking-success');
const successMsg = document.querySelector('.success-msg');
const returnToDashBtn = document.querySelector('#returnToDash');

loginBtn.addEventListener('click', showUserLogin);
closeLoginModalBtn.addEventListener('click', closeUserLogin);
availRoomsList.addEventListener('click', e => {
  userNewBooking(e);
});
returnToDashBtn.addEventListener('click', showUserDashboard);
viewHistBtn.addEventListener('click', showUserHistory);
viewUpcmgBtn.addEventListener('click', showUserUpcoming);
submitLoginBtn.addEventListener('click', showUserDashboard);
searchRoomsBtn.addEventListener('click', () => {
  availRoomsList.innerHTML = '';
  userRoomSearch();
});
filterRoomType.addEventListener('change', () => {
  availRoomsList.innerHTML = '';
  userRoomFilter();
});

function renderUserBookings(date, room, element) {
  const { number, roomType, bedSize, numBeds, costPerNight } = room;
  closeUserLogin();
  element.innerHTML += `
    <li class="booking-details" tabindex="0">
      <p id="bookingDate">${date}</p>
      <p id="bookingRoomType">${roomType}:<span id="bookingRoomNum"> ${number}</span></p>
      <p id="bookingBeds">Beds: <span id="bookingBedNum">${numBeds} </span>${bedSize}</p>
      <p id="bookingCost">$${costPerNight} per night</p>
    </li>`;
}

function renderTotalCost(cost) {
  totalCost.innerText = `Total spent: $${cost.toLocaleString()}`;
}

function renderAvailRooms(date, room) {
  if (!date || new Date(date) <= new Date()) {
    promptUserSearch();
    setTimeout(() => promptUserSearch(), 1800);
  } else {
    const { number, roomType, bedSize, numBeds, costPerNight } = room;
    searchRoomsView();
    availRoomsHeading.innerText = `Avaliable rooms - ${date}`;
    availRoomsList.innerHTML += `
      <li id="${number}" tabindex="0">
        <p id="availRoomType">${roomType}</p>
        <p id="availRoomNum">${number}</p>
        <p id="availRoomBed">Beds: <span id="availRoomBedNum">${numBeds} </span>${bedSize}</p>
        <p id="availRoomCost">$${costPerNight} per night</p>
        <button class="book-now-btn" id="${number}">Book now</button>
      </li>`;
  }
}

function renderUserLoggedIn(name) {
  let firstName = name.split(' ')[0]
  loginBtn.innerText = 'Sign Out';
  welcome.innerText = `Welcome back ${firstName}!`
  show(welcome);
}

function renderBookingSuccess(date) {
  successMsg.innerText = `Looks like we'll be seeing you on ${date}!`;
  bookingSuccessView();
}

function showUserDashboard(e) {
  userLoggedInView();
  clearBookingElement();
  verifyUserCreds(e, username.value, password.value);
}

function renderLoginFailed() {
  show(loginFailed);
  show(resetBtn);
}

function promptUserLogin() {
  showUserLogin();
  show(loginPrompt);
}

function showUserLogin() {
  hide(loginPrompt);
  hide(loginFailed);
  hide(resetBtn);
  show(loginModal);
  show(loginOverlay);
}

function closeUserLogin() {
  hide(loginModal);
  hide(loginOverlay);
}

function clearBookingElement() {
  userBookingsHist.innerHTML = '';
  userBookingsUpcmg.innerHTML = '';
}

function userLoggedInView() {
  show(userDashboard);
  hide(bookingSuccess);
  hide(mockContentContainer);
  hide(availRoomsContainer);
}

function promptUserSearch() {
  searchHeading.classList.toggle('hidden');
  selectDatePrompt.classList.toggle('hidden');
}

function searchRoomsView() {
  hide(mockContentContainer);
  hide(userDashboard);
  show(availRoomsContainer);
}

function showUserHistory() {
  show(userBookingsHist);
  hide(userBookingsUpcmg);
}

function showUserUpcoming() {
  hide(userBookingsHist);
  show(userBookingsUpcmg);
}

function bookingSuccessView() {
  hide(userDashboard);
  hide(mockContentContainer);
  hide(availRoomsContainer);
  show(bookingSuccess);
}

function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden');
}

export {
  filterRoomType,
  promptUserLogin,
  renderAvailRooms,
  renderBookingSuccess,
  renderUserBookings,
  renderUserLoggedIn,
  renderLoginFailed,
  renderTotalCost,
  selectDate,
  userBookingsHist,
  userBookingsUpcmg
};
