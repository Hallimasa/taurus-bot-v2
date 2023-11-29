import { Injectable, Logger } from '@nestjs/common';
import { Message } from 'discord.js';
import { Event } from 'src/decorators/event.decorator';
import { CommandsService } from './commands.service';
import { ConfigService } from '@nestjs/config';
import { BOT_PREFIX } from 'src/environment-tokens';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(
    private readonly commandsService: CommandsService,
    private readonly configService: ConfigService
  ) {}

  @Event('messageCreate')
  onMessage(msg: Message) {
    if (msg.author.id === msg.client.user.id) return;
    const content = msg.content.split(' ');

    if (content[0] !== this.configService.get(BOT_PREFIX)) return;
    if (!content[1]) return;

    try {
      this.commandsService.handle(content[1])?.(
        msg,
        content.slice(2, content.length).join(' ')
      );
    } catch (e) {
      this.logger.error(e.message);
    }
  }
}
