import { Inject, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ButtonInteraction, Client, IntentsBitField } from 'discord.js';
import { DiscordEvent } from 'src/interfaces/discord-event.interface';
import { DiscordInteraction } from 'src/interfaces/discord-interaction.interface';

export class DiscordClient {
  private readonly _client = new Client({
    intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.MessageContent
    ]
  });

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService
  ) {
    this.connect();
  }

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
        this.client.user.setUsername('Taurus');
        this.client.user.setActivity({
          name: `${this.configService.get('BOT_PREFIX')} help`
        });

        this.logger.log(`✅ ${this.client.user.tag} is online!`);
      })
      .catch((e) => this.logger.error(e.message));
  }

  registerEvents(events: DiscordEvent[]) {
    events.forEach((event) => {
      if (event.name === 'interactionCreate') {
        throw new Error(
          'To add an interaction event use DiscordClient.registerInteractions instead.'
        );
      }

      this.client.on(event.name, (...args) => {
        if (this.configService.get('DISCORD_EVENTS_DEBUG') === 'true') {
          this.logger.debug(`Event [${event.name}] called`);
        }

        event.descriptor?.(...args);
      });
    });
  }

  registerInteractions(interactions: DiscordInteraction[]) {
    this.client.on('interactionCreate', (interaction: ButtonInteraction) => {
      interactions
        .find((i) => i.customId === interaction.customId)
        ?.action?.(interaction);
    });
  }

  close(server: Client): Promise<void> {
    return server.destroy();
  }
}
