import LocationsStore, { ILocationsStore } from './LocationsStore';

export class RootStore {
  public locationsStore: ILocationsStore;

  constructor() {
    this.locationsStore = LocationsStore;
  }
}

const stores = new RootStore();
export default stores;
