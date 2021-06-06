export interface ILocation {
  id: number;
  name: string;
  inGameLocation: string;
  owner: string;
  description: string;
  externalLink: string | null;
  tags: string | null;
  server: string | null;
  datacenter: string | null;
}

export interface IEditLocation {
  name: string;
  inGameLocation: string;
  owner: string;
  description: string;
  externalLink: string | null;
  tags: string | null;
  server: string | null;
  datacenter: string | null;
}

export class ILocationList {
  results: ILocation[] | [] = [];
  total: number | undefined;
}
