const axios = require('axios');

let url;
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
  url = 'http://localhost:3003';
} else {
  url = 'https://jabberwocky.hackback.tech/api';
}

const instance = axios.create({
  baseURL: url,
  timeout: 5000,
  headers: {'X-Custom-Header': 'I love ponies!'}
});

export default instance;
