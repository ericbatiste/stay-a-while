import chai from 'chai';
const expect = chai.expect;

import { bookings, customers, rooms } from './mock-data.js';

import {
  calcTotalCost,
  compileUserBookings,
  createNewBooking,
  filterRoomsByDate,
  filterRoomsByType,
  setCurrentUser,
  userSelectRoom
} from '../src/users.js';

describe('Search for available rooms', () => {
  it('should find rooms available on a specific date', () => {
    const availableRooms = filterRoomsByDate('2024/01/13', bookings, rooms);

    expect(availableRooms).to.deep.equal([rooms[0], rooms[1], rooms[4]]);
  });

  it('should find rooms available on a different date', () => {
    const availableRooms = filterRoomsByDate('2024/01/12', bookings, rooms);

    expect(availableRooms).to.deep.equal([rooms[0], rooms[2], rooms[3], rooms[4]]);
  });

  it('should return an empty array if no rooms available', () => {
    const allRoomsBooked = [
      { id: 'book1', userID: 5, date: '2024/01/13', roomNumber: 1 },
      { id: 'book2', userID: 4, date: '2024/01/13', roomNumber: 2 },
      { id: 'book3', userID: 3, date: '2024/01/13', roomNumber: 3 },
      { id: 'book4', userID: 2, date: '2024/01/13', roomNumber: 4 },
      { id: 'book5', userID: 1, date: '2024/01/13', roomNumber: 5 }
    ];
    const availableRooms = filterRoomsByDate('2024/01/13', allRoomsBooked, rooms);

    expect(availableRooms).to.deep.equal([]);
  });
});

describe('Filter avialable rooms', () => {
  it('should filter available rooms by a roomType', () => {
    const filteredRooms = filterRoomsByType('single room', rooms);

    expect(filteredRooms).to.deep.equal([rooms[2], rooms[3]]);
  });

  it('should filter available rooms by a different roomType', () => {
    const filteredRooms = filterRoomsByType('suite', rooms);

    expect(filteredRooms).to.deep.equal([rooms[1]]);
  });
});

describe('User selects available room', () => {
  it('should return a room object selected by the user', () => {
    const selectedRoom = userSelectRoom(rooms, '5');

    expect(selectedRoom).to.deep.equal({
      number: 5,
      roomType: 'junior suite',
      bidet: true,
      bedSize: 'queen',
      numBeds: 1,
      costPerNight: 397.02
    });
  });

  it('should return a different room object....', () => {
    const selectedRoom = userSelectRoom(rooms, '3');

    expect(selectedRoom).to.deep.equal({
      number: 3,
      roomType: 'single room',
      bidet: false,
      bedSize: 'king',
      numBeds: 1,
      costPerNight: 491.14
    });
  });
});

describe('Create booking', () => {
  it('should return a new booking object when user selects room', () => {
    const customer = customers[0];
    const selectedRoom = rooms[1];
    const newBooking = createNewBooking(customer, '2024/01/11', selectedRoom);

    expect(newBooking).to.deep.equal({
      userID: 1,
      date: '2024/01/11',
      roomNumber: 2
    });
  });

  it('should return a new booking object with different parameters', () => {
    const customer = customers[3];
    const selectedRoom = rooms[3];
    const newBooking = createNewBooking(customer, '2024/01/12', selectedRoom);

    expect(newBooking).to.deep.equal({
      userID: 4,
      date: '2024/01/12',
      roomNumber: 4
    });
  });
});

describe('Compile user bookings', () => {
  it('should compile an array of users bookings', () => {
    bookings[1].userID = 3;
    const customer = customers[2];
    const usersBookings = compileUserBookings(customer, bookings);
    expect(usersBookings).to.deep.equal([
      { id: 'book2', userID: 3, date: '2024/01/12', roomNumber: 2 },
      { id: 'book3', userID: 3, date: '2024/01/13', roomNumber: 3 }
    ]);
  });

  it('should compile an array of another users bookings', () => {
    bookings[0].userID = 2;
    bookings[4].userID = 2;
    const customer = customers[1];
    const usersBookings = compileUserBookings(customer, bookings);

    expect(usersBookings).to.deep.equal([
      { id: 'book1', userID: 2, date: '2024/01/15', roomNumber: 1 },
      { id: 'book4', userID: 2, date: '2024/01/13', roomNumber: 4 },
      { id: 'book5', userID: 2, date: '2024/01/14', roomNumber: 5 }
    ]);
  });
});

describe('Calculate total cost of customer bookings', () => {
  it('should calculate the total cost of a given set of bookings', () => {
    const userBookings = [
      { id: 'book1', userID: 3, date: '2024/01/15', roomNumber: 1 },
      { id: 'book2', userID: 3, date: '2024/01/12', roomNumber: 2 },
      { id: 'book3', userID: 3, date: '2024/01/13', roomNumber: 3 },
      { id: 'book4', userID: 3, date: '2024/01/13', roomNumber: 4 },
      { id: 'book5', userID: 3, date: '2024/01/14', roomNumber: 5 }
    ];
    const totalCost = calcTotalCost(userBookings, rooms);

    expect(totalCost).to.equal(2153.38);
  });

  it('should calculate the total cost of a different set of bookings', () => {
    const userBookings = [
      { id: 'book2', userID: 2, date: '2024/01/12', roomNumber: 2 },
      { id: 'book3', userID: 2, date: '2024/01/13', roomNumber: 3 },
      { id: 'book4', userID: 2, date: '2024/01/13', roomNumber: 4 },
    ];
    const totalCost = calcTotalCost(userBookings, rooms);

    expect(totalCost).to.equal(1397.96);
  });
});