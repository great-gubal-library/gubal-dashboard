import { AxiosResponse } from 'axios';
import { flow, observable, action, makeObservable } from 'mobx';
import * as api from '../services/api';
import { ICharacter, IEditCharacter, ICharacterList } from '../types';

type ProcessState = { loading: boolean, error: boolean };

export interface ICharactersStore {
  Characters: ICharacter[] | null;
  singleCharacter: ICharacter | null;

  loadingState: ProcessState;

  initializeCharacterListing: () => Promise<void>;
  getCharacter: (id: number) => Promise<void>;
  getAllCharacters: () => Promise<void>;
  createCharacter: (Character: IEditCharacter) => Promise<void>;
  updateCharacter: (id: number, service: IEditCharacter) => Promise<void>;
  deleteCharacter: (id: number) => Promise<void>;
}

class CharactersModel implements ICharactersStore {
  constructor() {
    makeObservable(this);
  }
  
  @observable Characters: ICharacter[] | null = null;
  @observable singleCharacter: ICharacter | null = null;

  @observable loadingState: ProcessState = { loading: false, error: false };

  @action initializeCharacterListing = flow(function* (this: CharactersModel) {
    console.log("Initializing Characters")
    this.loadingState.loading = true;
    try {
      yield this.getAllCharacters();

      this.loadingState.loading = false;
      this.loadingState.error = false;
    } catch (error) {
      this.loadingState.error = true;
      throw error;
    }
  }.bind(this));

  @action getCharacter = flow(function* (this: CharactersModel, id: number) {
    this.loadingState.loading = true;
    try {
      const { data: Character }: AxiosResponse<ICharacter> = yield api.fetchSingleCharacter(id);
      console.log("GET Character", Character);
      this.singleCharacter = Character;
      
      this.loadingState.loading = false;
      this.loadingState.error = false;
    } catch (error) {
      this.loadingState.error = true;
      throw error;
    }
  }).bind(this);

  @action getAllCharacters = flow(function* (this: CharactersModel) {
    console.log("Fetching Characters from API")
    this.loadingState.loading = true;
    try {
      const { data: response }: AxiosResponse<ICharacterList> = yield api.fetchCharacters();
      this.Characters = response.results;
      console.log("Response from API", this.Characters);

      this.loadingState.loading = false;
      this.loadingState.error = false;
    } catch (error) {
      this.loadingState.error = true;
      throw error;
    }
  }).bind(this);

  @action createCharacter = flow(function* (this: CharactersModel, Character: IEditCharacter) {
    this.loadingState.loading = true;
    try {
      yield api.createCharacter(Character);

      this.loadingState.loading = false;
      this.loadingState.error = false;
    } catch (error) {
      this.loadingState.error = true;
      throw error;
    }
  }).bind(this);

  @action updateCharacter = flow(function* (this: CharactersModel, id: number, Character: IEditCharacter) {
    this.loadingState.loading = true;
    try {
      yield api.updateCharacter(id, Character);

      this.loadingState.loading = false;
      this.loadingState.error = false;
    } catch (error) {
      this.loadingState.error = true;
      throw error;
    }
  }).bind(this);

  @action deleteCharacter = flow(function* (this: CharactersModel, id: number) {
    this.loadingState.loading = true;
    try {
      yield api.deleteCharacter(id);

      this.loadingState.loading = false;
      this.loadingState.error = false;
      this.getAllCharacters();
    } catch (error) {
      this.loadingState.error = true;
      this.getAllCharacters();
      throw error;
    }
  }).bind(this);
}

const CharactersStore = new CharactersModel();
export default CharactersStore;
