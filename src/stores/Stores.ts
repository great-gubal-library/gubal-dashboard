import LocationsStore, { ILocationsStore } from './LocationsStore';
import CharactersStore, { ICharactersStore } from './CharactersStore';
import FCStore, { IFCsStore } from './FCStore';

export class RootStore {
  public locationsStore: ILocationsStore;
  public charactersStore: ICharactersStore;
  public FCsStore: IFCsStore;

  constructor() {
    this.locationsStore = LocationsStore;
    this.charactersStore = CharactersStore;
    this.FCsStore = FCStore;
  }
}

const stores = new RootStore();
export default stores;
