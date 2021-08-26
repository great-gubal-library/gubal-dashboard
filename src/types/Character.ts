export interface ICharacter {
  id: number;
  name: string;
  description: string;
  externalLink: string | null;
  tags: string | null;
  server: string | null;
  datacenter: string | null;
}

export interface IEditCharacter {
  name: string;
  description: string;
  externalLink: string | null;
  tags: string | null;
  server: string | null;
  datacenter: string | null;
}

export class ICharacterList {
  results: ICharacter[] | [] = [];
  total: number | undefined;
}
