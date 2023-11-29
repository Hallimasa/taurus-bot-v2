import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ButtonStyle, ComponentType, Message } from 'discord.js';
import { Command, RegisteredCommand } from 'src/decorators/command.decorator';
import { BOT_COMMAND } from 'src/tokens';
import { capitalize } from 'src/utils/capitalize';
import {
  adaptColor,
  adaptModCompatibility,
  adaptModType,
  adaptRarity
} from 'src/utils/wf-mod-compatibility-interpolation';
import { WarframeService } from 'src/warframe/warframe.service';

@Injectable()
export class CommandsService {
  @Inject(CACHE_MANAGER)
  private readonly cache: Cache;

  constructor(private warframeService: WarframeService) {}

  handle(command: string) {
    const actions = (Reflect.getMetadata(BOT_COMMAND, this) ||
      []) as RegisteredCommand[];

    const action = actions.find((_command) => _command.alias.includes(command));

    if (!action) {
      throw new Error('Attempting to use an unregistered command');
    }

    return action.action.bind(this);
  }

  @Command('mod', 'mod-info', 'mi', 'm')
  async displayModInfo(msg: Message, modName: string) {
    try {
      const message = await msg.channel.send(
        `Buscando informações de ${modName} no codex...`
      );

      const mod = await this.warframeService.fetchMod(modName);

      message.edit({
        content: '',
        embeds: [
          {
            title: mod.name,
            color: adaptColor(mod),
            description: `
            Tipo: ${capitalize(adaptModType(mod.type))}
            Compatibilidade: ${capitalize(
              adaptModCompatibility(mod.compatName)
            )}
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
          }
        ],
        components: [
          {
            type: ComponentType.ActionRow,
            components: [
              {
                type: ComponentType.Button,
                style: ButtonStyle.Secondary,
                custom_id: 'drop-located-info',
                label: 'Ver drops'
              }
            ]
          }
        ]
      });

      const cacheKey = `drop-located-info:${message.id}`;

      this.cache.set(cacheKey, mod);

      setTimeout(
        () => {
          message.edit({
            components: []
          });

          this.cache.del(cacheKey);
        },
        1000 * 60 * 2
      );
    } catch (e) {
      msg.reply(e.message);
    }
  }
}
