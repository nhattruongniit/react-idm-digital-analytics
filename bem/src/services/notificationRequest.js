import axios from 'axios';

const notificationRequest = axios.create({
  // baseURL: REACT_APP_BACKEND_URL,
  withCredentials: true,
});

export default notificationRequest;
