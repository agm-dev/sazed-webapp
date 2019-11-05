export const serviceIsUp = async baseUrl => fetch(`${baseUrl}/api/status`)
  .then(res => res.status === 204);
