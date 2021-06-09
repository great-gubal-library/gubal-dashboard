import { AxiosResponse } from 'axios';
import { flow, observable, action, makeObservable } from 'mobx';
import * as api from '../services/api';
import { ILocation, IEditLocation, ILocationList } from '../types';

type ProcessState = { loading: boolean, error: boolean };

export interface ILocationsStore {
  locations: ILocation[] | null;
  singleLocation: ILocation | null;

  loadingState: ProcessState;

  initializeLocationListing: () => Promise<void>;
  getLocation: (id: number) => Promise<void>;
  getAllLocations: () => Promise<void>;
  createLocation: (location: IEditLocation) => Promise<void>;
  updateLocation: (id: number, service: IEditLocation) => Promise<void>;
  deleteLocation: (id: number) => Promise<void>;
}

class LocationsModel implements ILocationsStore {
  constructor() {
    makeObservable(this);
  }
  
  @observable locations: ILocation[] | null = null;
  @observable singleLocation: ILocation | null = null;

  @observable loadingState: ProcessState = { loading: false, error: false };

  @action initializeLocationListing = flow(function* (this: LocationsModel) {
    console.log("Initializing locations")
    this.loadingState.loading = true;
    try {
      yield this.getAllLocations();

      this.loadingState.loading = false;
      this.loadingState.error = false;
    } catch (error) {
      this.loadingState.error = true;
      throw error;
    }
  }.bind(this));

  @action getLocation = flow(function* (this: LocationsModel, id: number) {
    this.loadingState.loading = true;
    try {
      const { data: location }: AxiosResponse<ILocation> = yield api.fetchSingleLocation(id);
      console.log("GET LOCATION", location);
      this.singleLocation = location;
      
      this.loadingState.loading = false;
      this.loadingState.error = false;
    } catch (error) {
      this.loadingState.error = true;
      throw error;
    }
  }).bind(this);

  @action getAllLocations = flow(function* (this: LocationsModel) {
    console.log("Fetching locations from API")
    this.loadingState.loading = true;
    try {
      const { data: response }: AxiosResponse<ILocationList> = yield api.fetchLocations();
      this.locations = response.results;
      console.log("Response from API", this.locations);

      this.loadingState.loading = false;
      this.loadingState.error = false;
    } catch (error) {
      this.loadingState.error = true;
      throw error;
    }
  }).bind(this);

  @action createLocation = flow(function* (this: LocationsModel, location: IEditLocation) {
    this.loadingState.loading = true;
    try {
      yield api.createLocation(location);

      this.loadingState.loading = false;
      this.loadingState.error = false;
    } catch (error) {
      this.loadingState.error = true;
      throw error;
    }
  }).bind(this);

  @action updateLocation = flow(function* (this: LocationsModel, id: number, location: IEditLocation) {
    this.loadingState.loading = true;
    try {
      yield api.updateLocation(id, location);

      this.loadingState.loading = false;
      this.loadingState.error = false;
    } catch (error) {
      this.loadingState.error = true;
      throw error;
    }
  }).bind(this);

  @action deleteLocation = flow(function* (this: LocationsModel, id: number) {
    this.loadingState.loading = true;
    try {
      yield api.deleteLocation(id);

      this.loadingState.loading = false;
      this.loadingState.error = false;
      this.getAllLocations();
    } catch (error) {
      this.loadingState.error = true;
      this.getAllLocations();
      throw error;
    }
  }).bind(this);
}

const LocationsStore = new LocationsModel();
export default LocationsStore;
