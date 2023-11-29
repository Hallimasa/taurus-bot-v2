export type WarframeMod = {
  name: string;
  uniqueName: string;
  description: string;
  type: string;
  tradable: boolean;
  category: string;
  isPrime: boolean;
  productCategory: string;
  drops: {
    chance: number;
    location: string;
    rarity: string;
    type: string;
  }[];
  introduced: {
    name: string;
    url: string;
    aliases: [string];
    parent: string;
    date: string;
  };
  estimatedVaultDate: string;
  baseDrain: number;
  compatName: string;
  fusionLimit: number;
  levelStats: [
    {
      stats: string[];
    }
  ];
  polarity: string;
  transmutable: true;
  wikiaThumbnail: string;
  wikiaUrl: string;
  rarity: string;
};
