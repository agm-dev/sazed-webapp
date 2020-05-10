export const serviceIsUp = baseUrl => fetch(`${baseUrl}/api/status`)
  .then(res => res.status === 204);

export const getUserInfo = (baseUrl, token) => fetch(`${baseUrl}/api/user/me`, { headers: { Authorization: `JWT ${token}` } })
  .then(res => res.status === 200 ? res.json() : {})
  .catch(err => {
    console.error('error on getUserInfo: ', err.message);
    return {};
  });

export const getCustomers = (baseUrl, token, search = "") => {
  const endpoint = `${baseUrl}/api/customer`;
  const url = search.length ? `${endpoint}?search=${search}` : endpoint;

  return fetch(url, { headers: { Authorization: `JWT ${token}` }})
    .then(res => res.json())
    .then(res => res.data)
    .catch(err => {
      console.error('error on getCustomers: ', err.message);
      return [];
    });
}

export const updateCustomer = (baseUrl, token, customer) => {
  const { id, nif, firstname, lastname, phone, email, birthdate, notes, LGPD } = customer
  const endpoint = `${baseUrl}/api/customer/${id}`;

  return fetch(endpoint, {
    headers: {
      Authorization: `JWT ${token}`,
      'Content-type': 'application/json; charset=UTF-8'
    },
    method: "PUT",
    body: JSON.stringify({ nif, firstname, lastname, phone, email, birthdate, notes, LGPD }),
  })
    .then(res => res.json())
    .catch(err => console.error("error on updateCustomer: ", err.message))
}
