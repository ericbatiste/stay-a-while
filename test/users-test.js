import chai from 'chai';
const expect = chai.expect;
import { bookings, rooms, customers } from './mock-data.js';
import { filterRoomsByDate, filterRoomsByType } from '../src/users.js';

describe('Search for available rooms', () => {
  it('should find rooms available on a specific date', () => {
    const availableRooms = filterRoomsByDate('2024/01/13', bookings, rooms);

    expect(availableRooms).to.deep.equal([rooms[0], rooms[1], rooms[4]]);
  });

  it('should find rooms available on a different date', () => {
    const availableRooms = filterRoomsByDate('2024/01/12', bookings, rooms);

    expect(availableRooms).to.deep.equal([rooms[0], rooms[2], rooms[3], rooms[4]]);
  });

  it('should fiercly appologize if no rooms are available for a selected date', () => {
    const allRoomsBooked = bookings.map(booking => {
      booking.date = '2024/01/13';
      return booking;
    });
    const availableRooms = filterRoomsByDate('2024/01/13', allRoomsBooked, rooms);

    expect(availableRooms).to.equal(
      `Please accept our sincere apology. Unfortunately we have no rooms available for the date you have selected. If possible, try adjusting your search.`
    );
  });
});

describe('Filter avialable rooms', () => {
  it('should filter available rooms by a roomType', () => {
    const filteredRooms = filterRoomsByType('single room', rooms);

    expect(filteredRooms).to.deep.equal([rooms[2], rooms[3]])
  })

  it('should filter available rooms by a different roomType', () => {
    const filteredRooms = filterRoomsByType('suite', rooms);

    expect(filteredRooms).to.deep.equal([rooms[1]]);
  })
})
