export interface IFC {
  id: number;
  name: string;
  description: string;
  owner: string;
  externalLink: string | null;
  tags: string | null;
  location: string | null;
  server: string | null;
  datacenter: string | null;
}

export interface IEditFC {
  id: number;
  name: string;
  description: string;
  externalLink: string | null;
  tags: string | null;
  location: string | null;
  owner: string;
  server: string | null;
  datacenter: string | null;
}

export class IFCList {
  results: IFC[] | [] = [];
  total: number | undefined;
}
