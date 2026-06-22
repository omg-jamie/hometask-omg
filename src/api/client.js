import axios from 'axios';

const client = axios.create({
  /* eslint-env browser */
  baseURL: '/',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Attach request timestamps for performance tracking
client.interceptors.request.use((config) => {
  config.metadata = { startTime: Date.now() };
  return config;
});

// Normalise responses and surface errors clearly
client.interceptors.response.use(
  (response) => {
    const duration = Date.now() - response.config.metadata.startTime;
    if (process.env.NODE_ENV === 'development') {
      console.debug(
        `[API] ${response.config.method?.toUpperCase()} ${response.config.url} → ${
          response.status
        } (${duration}ms)`
      );
    }
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.error || error.message || 'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

export default client;
