import api from './api';

export const register = (login, password) => {
  return api.post('/registration/', { login, password });
};

export const login = (login, password) => {
  return api.post('/authorization/', { login, password });
};
