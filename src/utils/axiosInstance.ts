import axios from 'axios';

const APIinstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_BACKEND_SERVER_IP ?? 'http://localhost:3000/',
  timeout: 5000,
});

export default APIinstance;
