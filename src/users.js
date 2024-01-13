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