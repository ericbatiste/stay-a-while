export const setCurrentUser = (customers, id) => {
  return customers.find(customer => customer.id === id);
}

export const filterRoomsByDate = (selectDate, bookings, rooms) => {
  const searchResult = rooms.reduce((availRooms, room) => {
    const match = bookings.find(({ date, roomNumber }) => {
      return selectDate !== date && room.number === roomNumber
    })
    if (match) availRooms.push(room);
    return availRooms;
  }, [])
  if (searchResult.length === 0) {
    return `Please accept our sincere apology. Unfortunately we have no rooms available for the date you have selected. If possible, try adjusting your search.`
  }
  return searchResult;
}

export const filterRoomsByType = (roomType, availableRooms) => {
  return availableRooms.filter(room => room.roomType === roomType)
}

export const userSelectRoom = (rooms, targetId) => {
  return rooms.find(room => room.number === Number(targetId));
}

export const createNewBooking = (user, date, selectedRoom) => {
  return {
    userID: user.id,
    date,
    roomNumber: selectedRoom.number
  }
}

export const compileUserBookings = (user, bookings) => {
  const result = bookings.filter(booking => user.id === booking.userID)
  return result;
}

export const calcTotalCost = (userBookings, rooms) => {
  const result = userBookings.reduce((totalCost, booking) => {
    const match = rooms.find(room => room.number === booking.roomNumber);
    if (match) totalCost += match.costPerNight
    return totalCost
  }, 0);
  return `Total spent: $${result}.`
}