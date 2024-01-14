import './images/turing-logo.png';
import './css/styles.css';
import './domUpdates.js';

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
  if (
    username.slice(0, 8) === 'customer' &&
    registeredNum &&
    password === 'overlook2021'
  ) {
    getUser(userNum).then(user => {
      return user
    })
  } else {
    return 'nope';
  }
}


export { verifyUserCreds };
