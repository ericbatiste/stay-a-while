const dataUrls = [
  'http://localhost:3001/api/v1/customers',
  'http://localhost:3001/api/v1/rooms',
  'http://localhost:3001/api/v1/bookings'
];

export const getAllData = () => {
  return Promise.all(
    dataUrls.map(url =>
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Oops, something went wrong!');
          }
          return response.json();
        })
        .then(data => data)
        .catch(error => console.error(error))
    )
  );
};

export const getUser = id => {
  return fetch(`${dataUrls[0]}/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Oops, something went wrong!');
      }
      return response.json();
    })
    .then(user => user)
    .catch(error => console.error(error));
};

export const postBooking = bookingInfo => {
  fetch(`${dataUrls[2]}`, {
    method: 'POST',
    body: JSON.stringify(bookingInfo),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Oops, something went wrong!');
      }
      return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error(error));
};

export const deleteBooking = id => {
  fetch(`${dataUrls[2]}/${id}`, {
    method: 'POST',
    body: JSON.stringify(someDataToSend),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Oops, something went wrong!');
      }
      return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error(error));
};
