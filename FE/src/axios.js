import axios from 'axios';
import store from './redux/store';

let API = 'http://localhost:4000';

export const Instance = axios.create({
  baseURL: API,
});

Instance.defaults.headers.get['Accept'] = 'application/json';
Instance.defaults.headers.post['Accept'] = 'application/json';

Instance.interceptors.request.use(
  (request) => {
    request.headers['Authorization'] = "Bearer " + store.getState().user?.token;
    return request;
  },
  (error) => {
    return error;
  }
);