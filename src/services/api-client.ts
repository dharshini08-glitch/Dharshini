import axios from 'axios';

export const apiKey = import.meta.env.VITE_RAWG_API_KEY;
export const hasApiKey = Boolean(apiKey);

export const apiClient = axios.create({
  baseURL: 'https://api.rawg.io/api',
  timeout: 12000,
  headers: {
    Accept: 'application/json'
  }
});

apiClient.interceptors.request.use((config) => {
  if (apiKey) {
    config.params = {
      ...(config.params ?? {}),
      key: apiKey
    };
  }
  return config;
});
