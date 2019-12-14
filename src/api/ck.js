import axios from 'axios';

const ckRequest = axios.create({
  baseURL: 'http://localhost:8080'
});

export default ckRequest;
