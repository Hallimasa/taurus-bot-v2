import { Colors, Embed } from 'discord.js';
import * as moment from 'moment';
import { Emojis } from 'src/enums/emojis.enum';
import { Warframe } from 'src/interfaces/warframe.interface';
import { parseWfDescription } from 'src/utils/emoji-interpolation';

export default function WarframeBuilder(warframe: Warframe): Partial<Embed> {
  const description = `
  **Atributos base**
  Armadura: ${warframe.armor}
  Energia: ${warframe.power} 
  Escudo: ${warframe.shield}
  Velocidade da corrida: ${warframe.sprintSpeed.toFixed(2)}
  Vida: ${warframe.health}
  
  **Descrição**
  ${warframe.description}

  **Passiva**
  ${warframe.passiveDescription || 'Não possui'}

  **Construção**
  Tempo: ${warframe.buildTime / 3600} horas
  Custo: ${warframe.buildPrice} ${Emojis.CREDITS}
  Custo de aceleração: ${warframe.skipBuildTimePrice} ${Emojis.PLATINUM}

  **Mercado**
  Custo: ${
    warframe.marketCost
      ? `${warframe.marketCost} ${Emojis.PLATINUM}`
      : 'Não pode ser adquirido no mercado'
  }

  **Informações gerais**
  Polaridades: ${
    !warframe.polarities?.length
      ? 'Não possui'
      : warframe.polarities
          .map((polarity) => Emojis[polarity.toUpperCase()])
          .join(' ')
  }
  Lançamento: ${moment(warframe.releaseDate).format('DD/MM/YYYY')}
  Vaultado: ${warframe.vaulted ? 'Sim' : 'Não'}
  `;

  parseWfDescription(description);

  return {
    title: parseWfDescription(warframe.name),
    color: warframe.isPrime ? Colors.Gold : Colors.Navy,
    image: {
      url: warframe.wikiaThumbnail,
      height: 120
    },
    url: warframe.wikiaUrl,
    description
  };
}
