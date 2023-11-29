import { Embed } from 'discord.js';
import { WarframeMod } from 'src/interfaces/warframe-mod.interface';
import { capitalize } from 'src/utils/capitalize';
import {
  adaptColor,
  adaptModCompatibility,
  adaptModType,
  adaptRarity
} from 'src/utils/wf-mod-compatibility-interpolation';

export default function ModBuilder(mod: WarframeMod): Partial<Embed> {
  return {
    title: mod.name,
    color: adaptColor(mod),
    description: `
    Tipo: ${capitalize(adaptModType(mod.type))}
    Compatibilidade: ${capitalize(adaptModCompatibility(mod.compatName))}
    Aprimoramentos: ${mod.fusionLimit}
    Polaridade: ${capitalize(mod.polarity)}
    Custo: ${mod.baseDrain}
    `,
    image: {
      url: mod.wikiaThumbnail,
      height: 120
    },
    url: mod.wikiaUrl,
    footer: {
      text: `
      Este é um mod ${adaptRarity(mod.rarity).toLowerCase()} e ${
        mod.tradable ? 'comercializável' : 'não comercializável'
      }
      `
    }
  };
}
