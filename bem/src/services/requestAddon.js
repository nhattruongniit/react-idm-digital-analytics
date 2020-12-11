import axios from 'axios';

const requestAddon = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_ADDON_URL,
  // withCredentials: true,
});

export default requestAddon;
