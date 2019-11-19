export const serviceIsUp = baseUrl => fetch(`${baseUrl}/api/status`)
  .then(res => res.status === 204);

export const getUserInfo = (baseUrl, token) => fetch(`${baseUrl}/api/user/me`, { headers: { Authorization: `JWT ${token}` } })
  .then(res => res.status === 200 ? res.json() : {})
  .catch(err => {
    console.error('error on getUserInfo: ', err.message);
    return {};
  });

export const getCustomers = (baseUrl, token) => fetch(`${baseUrl}/api/customer`, { headers: { Authorization: `JWT ${token}` }})
  .then(res => res.json())
  .then(res => res.data)
  .catch(err => {
    console.error('error on getCustomers: ', err.message);
    return [];
  });
