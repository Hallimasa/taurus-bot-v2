import { Colors } from 'discord.js';
import { WarframeMod } from 'src/interfaces/warframe-mod.interface';

export function adaptModType(type: string) {
  switch (type) {
    case 'Primary Mod':
      return 'Arma Primária';
    case 'Secondary Mod':
      return 'Arma secundária';
    case 'Melee Mod':
      return 'Corpo a corpo';
    case 'Warframe Mod':
      return 'Warframe';
    case 'Shotgun Mod':
      return 'Escopeta';
    default:
      return type;
  }
}

export function adaptModCompatibility(compatibility: string) {
  switch (compatibility) {
    case 'Pistol':
      return 'Pistola';
    case 'Shotgun':
      return 'Escopeta';
    case 'Melee':
      return 'Corpo a corpo';
    default:
      return compatibility;
  }
}

export function adaptRarity(rarity: string) {
  switch (rarity) {
    case 'Rare':
      return 'Raro';
    case 'Legendary':
      return 'Lendário';
    case 'Uncommon':
      return 'Incomum';
    case 'Common':
      return 'Comum';
    default:
      return rarity;
  }
}

export function adaptColor(mod: WarframeMod): number {
  if (mod.isPrime || mod.name.includes('Primed')) {
    return Colors.White;
  }

  if (mod.name.includes('Archon')) {
    return Colors.Orange;
  }

  switch (mod.rarity) {
    case 'Common':
      return Colors.DarkOrange;
    case 'Uncommon':
      return Colors.DarkGrey;
    case 'Rare':
      return Colors.Gold;
    case 'Legendary':
      return Colors.Orange;
    default:
      return Colors.Navy;
  }
}
