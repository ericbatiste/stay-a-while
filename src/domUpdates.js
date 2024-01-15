import { getUser, getAllData } from "./apiCalls";
import { userRoomSearch, userRoomFilter, verifyUserCreds } from "./scripts";
import { filterRoomsByDate } from "./users";

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

window.addEventListener('load', () => {
})
loginBtn.addEventListener('click', showUserLogin);
closeLoginModalBtn.addEventListener('click', closeUserLogin);
submitLoginBtn.addEventListener('click', (e) => {
  userBookingsHist.innerHTML = '';
  verifyUserCreds(e, username.value, password.value);
});
searchRoomsBtn.addEventListener('click', () => {
  userRoomSearch();
})
filterRoomType.addEventListener('change', () => {
  userRoomFilter();
})

function showUserLogin() {
  loginModal.classList.remove('hidden');
  loginOverlay.classList.remove('hidden');
}

function closeUserLogin() {
  loginModal.classList.add('hidden');
  loginOverlay.classList.add('hidden');
}

function renderUserBookings(date, roomType, roomNumber, numBeds, bedSize, cost) {
  closeUserLogin();
  userBookingsHist.innerHTML += `
    <li class="booking-details">
    <p id="bookingDate">${date}</p>
    <p id="bookingRoomType">${roomType}
    <span id="bookingRoomNum"> number ${roomNumber}</span>
    </p>
    <p id="bookingBeds">Beds:
    <span id="bookingBedNum">${numBeds}</span>${bedSize}
    </p>
    <p id="bookingCost">$${cost} per night</p>
    </li>`;
    
}

export {
  filterRoomType,
  renderUserBookings,
  selectDate
}