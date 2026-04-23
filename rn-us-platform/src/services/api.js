import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('rnus_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function publishNewsletter(payload) {
  const { data } = await api.post('/newsletters/publish', payload);
  return data;
}

export async function fetchNewsletters() {
  const { data } = await api.get('/newsletters');
  return data;
}

export async function addSubscriber(payload) {
  const { data } = await api.post('/subscribers', payload);
  return data;
}

export async function fetchSubscribers() {
  const { data } = await api.get('/subscribers');
  return data;
}

export async function fetchEvents() {
  const { data } = await api.get('/events');
  return data;
}

export async function createEvent(payload) {
  const { data } = await api.post('/events', payload);
  return data;
}
