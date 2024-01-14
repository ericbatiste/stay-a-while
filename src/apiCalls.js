// GET All customers 'http://localhost:3001/api/v1/customers'
// '' Customer 'http://localhost:3001/api/v1/customers/<id>'
// '' All rooms  'http://localhost:3001/api/v1/rooms'
// '' All bookings 'http://localhost:3001/api/v1/bookings'
// POST New booking 'http://localhost:3001/api/v1/bookings'
// DELETE booking 'http://localhost:3001/api/v1/bookings/<id>'

const dataUrls = [
  'http://localhost:3001/api/v1/customers',
  'http://localhost:3001/api/v1/rooms',
  'http://localhost:3001/api/v1/bookings'
];

export const getAllData = () => {
  Promise.all(dataUrls.map(url => {
    fetch(url).then(response => {
      if (!response.ok) {
        throw new Error('Try harder you fool!')
      }
      return response.json();
    })
    .then(data => {
      // customers = data.customers;
      // rooms = data.rooms;
      // bookings = data.bookings;
    })
    .catch(error => {
      console.error(error)
    })
  }))
}

export const getUser = (id) => {
  fetch(`http://localhost:3001/api/v1/customers/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Try harder you fool!')
      }
      return response.json();
    })
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.error(error)
    })
}

export const postBooking = () => {  
  fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    body: JSON.stringify(someDataToSend),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Woops!')
    }
    return response.json()
  })
  .then(data => console.log(data))
  .catch(error => console.error(error));
}

export const deleteBooking = (id) => {  
  fetch(`http://localhost:3001/api/v1/bookings/${id}`, {
    method: 'POST',
    body: JSON.stringify(someDataToSend),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Woops!')
    }
    return response.json()
  })
  .then(data => console.log(data))
  .catch(error => console.error(error));
}
