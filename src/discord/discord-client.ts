import { Inject, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, IntentsBitField } from 'discord.js';

export type DiscordEvent = {
  name: string;
  descriptor: () => void;
};

export class DiscordClient {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService
  ) {}

  private readonly _client = new Client({
    intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.MessageContent
    ]
  });

  get client() {
    return this._client;
  }

  private readonly logger = new Logger(DiscordClient.name);

  async connect() {
    if (this.client.isReady()) {
      this.logger.log('Taurus Bot is already connected.');
      return;
    }

    await this.client
      .login(this.configService.get('DISCORD_TOKEN'))
      .then(() => {
        this.logger.log('Taurus Bot is online!');
      })
      .catch((e) => this.logger.error(e.message));
  }

  async loadEvents(events: DiscordEvent[]) {
    events.forEach((event) => {
      this.client.on(event.name, event.descriptor);
    });
  }

  close(server: Client): Promise<void> {
    return server.destroy();
  }
}
