import './images/turing-logo.png';
import './css/styles.css';
import { filterRoomType, renderUserBookings, selectDate } from './domUpdates.js';

import { getAllData, getUser } from './apiCalls.js';

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
    return 'nope';
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
  });
}

function userRoomSearch() {
  let userDate = selectDate.value.split('-').join('/');
  return getAllData().then(data => {
    const availableRooms = filterRoomsByDate(userDate, data[2].bookings, data[1].rooms);
    return availableRooms;
  });
}

function userRoomFilter() {
  return getAllData().then(data => {
    console.log(filterRoomsByType(filterRoomType.value, data[1].rooms));
  });
}

export { verifyUserCreds, userRoomSearch, userRoomFilter };
