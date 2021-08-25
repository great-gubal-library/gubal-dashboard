import LocationsStore, { ILocationsStore } from './LocationsStore';
import CharactersStore, { ICharactersStore } from './CharactersStore';

export class RootStore {
  public locationsStore: ILocationsStore;
  public charactersStore: ICharactersStore;

  constructor() {
    this.locationsStore = LocationsStore;
    this.charactersStore = CharactersStore;
  }
}

const stores = new RootStore();
export default stores;
