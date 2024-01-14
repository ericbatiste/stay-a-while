export const setCurrentUser = (customers, id) => {
  return customers.find(customer => customer.id === id);
}

export const filterRoomsByDate = (selectDate, bookings, rooms) => {
  return rooms.reduce((availRooms, room) => {
    const match = bookings.find(({ date, roomNumber }) => {
      return selectDate !== date && room.number === roomNumber
    })
    if (match) availRooms.push(room);
    return availRooms;
  }, [])
}

export const filterRoomsByType = (roomType, availableRooms) => {
  return availableRooms.filter(room => room.roomType === roomType)
}

export const userSelectRoom = (rooms, targetId) => {
  return rooms.find(({number}) => number === Number(targetId));
}

export const createNewBooking = (user, date, selectedRoom) => {
  return {
    userID: user.id,
    date,
    roomNumber: selectedRoom.number
  }
}

export const compileUserBookings = (user, bookings) => {
  return bookings.filter(({userID}) => user.id === userID)
}

export const calcTotalCost = (userBookings, rooms) => {
  return userBookings.reduce((totalCost, {roomNumber}) => {
    const match = rooms.find(({number}) => number === roomNumber);
    if (match) totalCost += match.costPerNight
    return totalCost
  }, 0);
}