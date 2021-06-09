import axios from 'axios';
import { API_URLS } from '../constants/siteSettings';
import { IEditLocation } from '../types/Location';
import errorHandler from './apiErrorService';

export const API_PATHS = Object.freeze({
  locations: {
    locations: `/locations`,
    singleLocation: `/locations/{ID}`
  }
});

// Select API URL to use
export let API_URL = API_URLS.production;
if (process.env.NODE_ENV === 'development') API_URL = API_URLS.local;

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Errors
api.interceptors.response.use(
  (response) => response,
  errorHandler,
);

api.interceptors.request.use((config) => {
  return config;
});

/**
 * Locations
 */
export const fetchLocations = async () => {
  const response = await api.get(API_PATHS.locations.locations);
  return response;
};

export const createLocation = async (location: IEditLocation) => {
  console.log("API CREATE LOCATION", location);
  return api.post(API_PATHS.locations.locations, location);
};

export const fetchSingleLocation = async (id: number) => {
  const path = API_PATHS.locations.singleLocation.replace('{ID}', id.toString());
  return api.get(path);
};

export const updateLocation = async (id: number, location: IEditLocation) => {
  const path = API_PATHS.locations.singleLocation.replace('{ID}', id.toString());
  return api.put(path, location);
};

export const deleteLocation = async (id: number) => {
  const path = API_PATHS.locations.singleLocation.replace('{ID}', id.toString());
  return api.delete(path);
}
