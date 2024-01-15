import './images/turing-logo.png';
import './css/styles.css';
import { getAllData, getUser } from './apiCalls.js';
import { 
  filterRoomType,
  renderAvailRooms,
  renderLoginFailed, 
  renderTotalCost, 
  renderUserBookings, 
  selectDate 
} from './domUpdates.js';

import {
  calcTotalCost,
  compileUserBookings,
  createNewBooking,
  filterRoomsByDate,
  filterRoomsByType,
  setCurrentUser,
  userSelectRoom
} from './users.js';

function verifyUserCreds(e, username, password) {
  e.preventDefault();
  let userNum = Number(username.slice(8));
  let registeredNum = userNum >= 1 && userNum <= 50;
  if (username.slice(0, 8) === 'customer' && registeredNum && password === 'overlook2021') {
    getUser(userNum).then(user => {
      userLoggedIn(user);
    });
  } else {
    renderLoginFailed();
  }
}

function userLoggedIn(user) {
  getAllData().then(data => {
    const userBookings = compileUserBookings(user, data[2].bookings);
    userBookings.forEach(booking => {
      data[1].rooms.forEach(room => {
        if (booking.roomNumber === room.number) {
          renderUserBookings(
            booking.date,
            room.roomType,
            room.number,
            room.numBeds,
            room.bedSize,
            room.costPerNight
          );
        }
      });
    });
    renderTotalCost(calcTotalCost(userBookings, data[1].rooms))
  });
}

function userRoomSearch() {
  let userDate = selectDate.value.split('-').join('/');
  getAllData().then(data => {
    const availableRooms = filterRoomsByDate(userDate, data[2].bookings, data[1].rooms);
    availableRooms.forEach(room => {
      renderAvailRooms(userDate, room);
    })
  });
}

function userRoomFilter() {
  return getAllData().then(data => {
    console.log(filterRoomsByType(filterRoomType.value, data[1].rooms));
  });
}

export { verifyUserCreds, userRoomSearch, userRoomFilter };
