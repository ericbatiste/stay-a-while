import './css/styles.css';
import './domUpdates.js'
import './images/turing-logo.png';

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


// An example of how you tell webpack to use a CSS (SCSS) file

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
