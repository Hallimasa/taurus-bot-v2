import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ButtonInteraction, Colors } from 'discord.js';
import { Interaction } from 'src/decorators/interaction.decorator';
import { WarframeMod } from 'src/interfaces/warframe-mod.interface';
import { Warframe } from 'src/interfaces/warframe.interface';
import { capitalize } from 'src/utils/capitalize';
import { parseHabilityDescription } from 'src/utils/parse-wf-hability-description';
import spareParts from 'src/utils/spare-parts';
import { adaptRarity } from 'src/utils/wf-mod-compatibility-interpolation';

@Injectable()
export class InteractionsService {
  @Inject(CACHE_MANAGER)
  private readonly cache: Cache;

  @Interaction('mod-drop-info')
  async displayModDropLocations(interaction: ButtonInteraction) {
    const mod = await this.cache.get<WarframeMod>(interaction.message.id);

    if (!mod) {
      return interaction.reply({
        content:
          'Os dados para consulta deste mod para esta mensagem não estão mais disponíveis',
        ephemeral: true
      });
    }

    if (!mod.drops?.length) {
      return interaction.reply({
        content:
          'Ainda não tenho dados sobre as informações de drop desse mod 😓',
        ephemeral: true
      });
    }

    const drops = spareParts(mod.drops, 7);

    const contentCreator = (
      _drops: ReturnType<typeof drops.shift>,
      page: number
    ) => {
      return {
        embeds: [
          {
            title: `Informações de drop do ${mod.name}`,
            fields: _drops.map((drop) => ({
              name: drop.location,
              value: `
              Chance: ${(drop.chance * 100).toFixed(2)}%
              Raridade: ${capitalize(adaptRarity(mod.rarity))}
              `
            })),
            color: Colors.Red,
            footer: {
              text: `Página ${page}`
            }
          }
        ],
        ephemeral: true
      };
    };

    await interaction.reply(contentCreator(drops.shift(), 1));

    await Promise.all(
      drops.map((dropInfo, index) =>
        interaction.followUp(contentCreator(dropInfo, index + 1))
      )
    );
  }

  @Interaction('show-warframe-habilities')
  async warframeHabilities(interaction: ButtonInteraction) {
    const warframe = await this.cache.get<Warframe>(interaction.message.id);

    if (!warframe) {
      return interaction.reply({
        content:
          'Os dados para consulta deste Warframe não estão mais disponíveis',
        ephemeral: true
      });
    }

    await interaction.reply({
      embeds: [
        {
          title: `Habilidades do ${warframe.name}`,
          fields: [
            ...warframe.abilities.map((ability) => ({
              name: ability.name,
              value: parseHabilityDescription(ability.description)
            }))
          ]
        }
      ],
      ephemeral: true
    });
  }

  @Interaction('show-waframe-components')
  async warframeComponents(interaction: ButtonInteraction) {}
}
