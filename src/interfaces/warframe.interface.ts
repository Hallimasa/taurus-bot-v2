export type Warframe = {
  name: string;
  uniqueName: string;
  description: string;
  type: string;
  tradable: boolean;
  category: string;
  productCategory: string;
  passiveDescription: string;
  masteryReq: number;
  releaseDate: string;
  isPrime: boolean;
  skipBuildTimePrice: number;
  bpCost: number;
  buildTime: number;
  marketCost: number;
  buildPrice: number;
  vaulted: boolean;
  abilities: {
    uniqueName: string;
    name: string;
    description: string;
  }[];
  patchlogs: [
    {
      name: string;
      date: string;
      url: string;
      additions: string;
      changes: string;
      fixes: string;
    }
  ];
  components: [
    {
      name: string;
      uniqueName: string;
      description: string;
      type: string;
      tradable: boolean;
      category: string;
      productCategory: string;
    }
  ];
  introduced: {
    name: string;
    url: string;
    aliases: string[];
    parent: string;
    date: string;
  };
  estimatedVaultDate: string;
  shield: number;
  polarities: string[];
  color: number;
  conclave: boolean;
  speed: string;
  aura: string;
  power: number;
  info: string;
  thumbnail: string;
  mr: string;
  health: number;
  sprintSpeed: number;
  sprint: number;
  url: string;
  regex: string;
  armor: number;
  location: string;
  prime_conclave: string;
  wikiaThumbnail: string;
  wikiaUrl: string;
};
