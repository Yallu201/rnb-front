export default async function fetchSample() {
  return fetch('/users', {
    headers: {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
    },
  });
}
