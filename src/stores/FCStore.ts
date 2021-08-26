import { AxiosResponse } from 'axios';
import { flow, observable, action, makeObservable } from 'mobx';
import * as api from '../services/api';
import { IFC, IEditFC, IFCList } from '../types';

type ProcessState = { loading: boolean, error: boolean };

export interface IFCsStore {
  FCs: IFC[] | null;
  singleFC: IFC | null;

  loadingState: ProcessState;

  initializeFCListing: () => Promise<void>;
  getFC: (id: number) => Promise<void>;
  getAllFCs: () => Promise<void>;
  createFC: (FC: IEditFC) => Promise<void>;
  updateFC: (id: number, service: IEditFC) => Promise<void>;
  deleteFC: (id: number) => Promise<void>;
}

class FCsModel implements IFCsStore {
  constructor() {
    makeObservable(this);
  }
  
  @observable FCs: IFC[] | null = null;
  @observable singleFC: IFC | null = null;

  @observable loadingState: ProcessState = { loading: false, error: false };

  @action initializeFCListing = flow(function* (this: FCsModel) {
    console.log("Initializing FCs")
    this.loadingState.loading = true;
    try {
      yield this.getAllFCs();

      this.loadingState.loading = false;
      this.loadingState.error = false;
    } catch (error) {
      this.loadingState.error = true;
      throw error;
    }
  }.bind(this));

  @action getFC = flow(function* (this: FCsModel, id: number) {
    this.loadingState.loading = true;
    try {
      const { data: FC }: AxiosResponse<IFC> = yield api.fetchSingleFC(id);
      console.log("GET FC", FC);
      this.singleFC = FC;
      
      this.loadingState.loading = false;
      this.loadingState.error = false;
    } catch (error) {
      this.loadingState.error = true;
      throw error;
    }
  }).bind(this);

  @action getAllFCs = flow(function* (this: FCsModel) {
    console.log("Fetching FCs from API")
    this.loadingState.loading = true;
    try {
      const { data: response }: AxiosResponse<IFCList> = yield api.fetchFCs();
      this.FCs = response.results;
      console.log("Response from API", this.FCs);

      this.loadingState.loading = false;
      this.loadingState.error = false;
    } catch (error) {
      this.loadingState.error = true;
      throw error;
    }
  }).bind(this);

  @action createFC = flow(function* (this: FCsModel, FC: IEditFC) {
    this.loadingState.loading = true;
    try {
      yield api.createFC(FC);

      this.loadingState.loading = false;
      this.loadingState.error = false;
    } catch (error) {
      this.loadingState.error = true;
      throw error;
    }
  }).bind(this);

  @action updateFC = flow(function* (this: FCsModel, id: number, FC: IEditFC) {
    this.loadingState.loading = true;
    try {
      yield api.updateFC(id, FC);

      this.loadingState.loading = false;
      this.loadingState.error = false;
    } catch (error) {
      this.loadingState.error = true;
      throw error;
    }
  }).bind(this);

  @action deleteFC = flow(function* (this: FCsModel, id: number) {
    this.loadingState.loading = true;
    try {
      yield api.deleteFC(id);

      this.loadingState.loading = false;
      this.loadingState.error = false;
      this.getAllFCs();
    } catch (error) {
      this.loadingState.error = true;
      this.getAllFCs();
      throw error;
    }
  }).bind(this);
}

const FCsStore = new FCsModel();
export default FCsStore;
