import './images/turing-logo.png';
import './css/styles.css';
import { getAllData, getUser, postBooking } from './apiCalls.js';
import {
  filterRoomType,
  promptUserLogin,
  renderAvailRooms,
  renderBookingSuccess,
  renderLoginFailed,
  renderTotalCost,
  renderUserBookings,
  selectDate,
  userBookingsHist,
  userBookingsUpcmg
} from './domUpdates.js';
import {
  calcTotalCost,
  compileUserBookings,
  createNewBooking,
  filterRoomsByDate,
  filterRoomsByType,
  userSelectRoom
} from './users.js';

let currentUser;
let userDate;

function verifyUserCreds(e, username, password) {
  e.preventDefault();
  let userNum = Number(username.slice(8));
  let registeredNum = userNum >= 1 && userNum <= 50;
  if (username.slice(0, 8) === 'customer' && registeredNum && password === 'overlook2021') {
    getUser(userNum).then(user => {
      userLoggedIn(user);
      currentUser = user
    });
  } else {
    renderLoginFailed();
  }
}

function userLoggedIn(user) {
  getAllData().then(data => {
    const userBookings = compileUserBookings(user, data[2].bookings);
    const sortedBookings = sortUserBookings(userBookings)
    sortedBookings.forEach(booking => {
      data[1].rooms.forEach(room => {
        if (booking.roomNumber === room.number) {
          new Date(booking.date) < new Date() ? 
          renderUserBookings(booking.date, room, userBookingsHist) :
          renderUserBookings(booking.date, room, userBookingsUpcmg); 
        }
      });
    });
    renderTotalCost(calcTotalCost(userBookings, data[1].rooms));
  });
}

function userRoomSearch() {
  userDate = selectDate.value.split('-').join('/');
  getAllData().then(data => {
    const availableRooms = filterRoomsByDate(userDate, data[2].bookings, data[1].rooms);
    availableRooms.forEach(room => {
      renderAvailRooms(userDate, room);
    });
  });
}

function userRoomFilter() {
  userDate = selectDate.value.split('-').join('/');
  getAllData().then(data => {
    const availableRooms = filterRoomsByDate(userDate, data[2].bookings, data[1].rooms);
    const filtered = filterRoomsByType(filterRoomType.value, availableRooms);
    filtered.forEach(room => {
      renderAvailRooms(userDate, room);
    });
  });
}

function userNewBooking(e) {
  if (!currentUser) {
    promptUserLogin();
  } else { 
    const roomNum = Number(e.target.id.slice(3))
    getAllData().then(data => {
      const selectedRoom = userSelectRoom(data[1].rooms, roomNum)
      postBooking(createNewBooking(currentUser, userDate, selectedRoom));
      renderBookingSuccess(userDate);
    })
  }
}

function sortUserBookings(bookings) {
  return bookings.sort((a, b) => new Date(a.date) - new Date(b.date));
} 

export { 
  verifyUserCreds, 
  userRoomSearch, 
  userRoomFilter, 
  userNewBooking 
};
