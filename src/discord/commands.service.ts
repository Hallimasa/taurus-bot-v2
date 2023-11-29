import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { ButtonStyle, ComponentType, Message } from 'discord.js';
import { Command, RegisteredCommand } from 'src/decorators/command.decorator';
import { MAX_CACHE_TIME } from 'src/environment-tokens';
import { BOT_COMMAND } from 'src/tokens';
import { WarframeService } from 'src/warframe/warframe.service';
import ModBuilder from './components/mod-builder';
import WarframeBuilder from './components/warframe-builder';

@Injectable()
export class CommandsService {
  @Inject(CACHE_MANAGER)
  private readonly cache: Cache;

  constructor(
    private warframeService: WarframeService,
    private configService: ConfigService
  ) {}

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

      await message.edit({
        content: '',
        embeds: [ModBuilder(mod)],
        components: [
          {
            type: ComponentType.ActionRow,
            components: [
              {
                type: ComponentType.Button,
                style: ButtonStyle.Secondary,
                custom_id: 'mod-drop-info',
                label: 'Onde dropar'
              }
            ]
          }
        ]
      });

      this.cache.set(message.id, mod);

      setTimeout(() => {
        message.edit({
          components: []
        });
      }, +this.configService.get(MAX_CACHE_TIME));
    } catch (e) {
      msg.reply(e.message);
    }
  }

  @Command('warframe', 'wf', 'frame')
  async fetchWarframe(msg: Message, wf: string) {
    try {
      const message = await msg.channel.send(
        'Buscando informações sobre este Warframe no codex...'
      );

      const warframe = await this.warframeService.fetchWaframe(wf);

      await message.edit({
        content: '',
        embeds: [WarframeBuilder(warframe)],
        components: [
          {
            type: ComponentType.ActionRow,
            components: [
              {
                type: ComponentType.Button,
                style: ButtonStyle.Secondary,
                label: 'Habilidades',
                custom_id: 'show-warframe-habilities'
              },
              {
                type: ComponentType.Button,
                style: ButtonStyle.Secondary,
                label: 'Construção',
                custom_id: 'show-warframe-components'
              }
            ]
          }
        ]
      });

      this.cache.set(message.id, warframe);

      setTimeout(() => {
        message.edit({
          components: []
        });
      }, +this.configService.get(MAX_CACHE_TIME));
    } catch (e) {
      msg.reply(e.message);
    }
  }
}
