import axios from 'axios';
import { API_URLS } from '../constants/siteSettings';
import { IEditLocation } from '../types/Location';
import { IEditCharacter } from '../types/Character';
import { IEditFC } from '../types/FC';
import errorHandler from './apiErrorService';

export const API_PATHS = Object.freeze({
  locations: {
    locations: `/locations`,
    singleLocation: `/locations/{ID}`
  },
  characters: {
    characters: `/characters`,
    singleCharacter: `/characters/{ID}`
  },
  FCs: {
    FCs: `free-companies`,
    singleFC: `/free-companies/{ID}`
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

/**
 * Characters
 */
 export const fetchCharacters = async () => {
  const response = await api.get(API_PATHS.characters.characters);
  return response;
};

export const createCharacter = async (character: IEditCharacter) => {
  console.log("API CREATE CHARACTER", character);
  return api.post(API_PATHS.characters.characters, character);
};

export const fetchSingleCharacter = async (id: number) => {
  const path = API_PATHS.characters.singleCharacter.replace('{ID}', id.toString());
  return api.get(path);
};

export const updateCharacter = async (id: number, location: IEditCharacter) => {
  const path = API_PATHS.locations.singleLocation.replace('{ID}', id.toString());
  return api.put(path, location);
};

export const deleteCharacter = async (id: number) => {
  const path = API_PATHS.characters.singleCharacter.replace('{ID}', id.toString());
  return api.delete(path);
}

/**
 * FCs
 */
 export const fetchFCs = async () => {
  const response = await api.get(API_PATHS.FCs.FCs);
  return response;
};

export const createFC = async (FC: IEditFC) => {
  console.log("API CREATE FC", FC);
  return api.post(API_PATHS.FCs.FCs, FC);
};

export const fetchSingleFC = async (id: number) => {
  const path = API_PATHS.FCs.singleFC.replace('{ID}', id.toString());
  return api.get(path);
};

export const updateFC = async (id: number, FC: IEditFC) => {
  const path = API_PATHS.FCs.singleFC.replace('{ID}', id.toString());
  return api.put(path, FC);
};

export const deleteFC = async (id: number) => {
  const path = API_PATHS.FCs.singleFC.replace('{ID}', id.toString());
  return api.delete(path);
}