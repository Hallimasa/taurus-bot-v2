import { Module } from '@nestjs/common';
import { DiscordEvent } from 'src/interfaces/discord-event.interface';
import { DISCORD_EVENTS, DISCORD_INTERACTIONS } from 'src/tokens';
import { CommandsService } from './commands.service';
import { DiscordClient } from './discord-client';
import { EventsService } from './events.service';
import { InteractionsService } from './interactions.service';
import { DiscordInteraction } from 'src/interfaces/discord-interaction.interface';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { MAX_CACHE_TIME } from 'src/environment-tokens';

@Module({
  imports: [
    CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: +config.get(MAX_CACHE_TIME)
      })
    })
  ],
  providers: [
    EventsService,
    CommandsService,
    {
      provide: DiscordClient,
      useClass: DiscordClient
    },
    InteractionsService
  ]
})
export class DiscordModule {
  constructor(
    private readonly eventsService: EventsService,
    private readonly interactionsService: InteractionsService,
    private readonly client: DiscordClient
  ) {
    this.handleEvents();
    this.handleInteractions();
  }

  private handleEvents() {
    const events = (Reflect.getMetadata(DISCORD_EVENTS, this.eventsService) ||
      []) as DiscordEvent[];

    this.client.registerEvents(
      events.map((e) => ({
        ...e,
        descriptor: e.descriptor.bind(this.eventsService)
      }))
    );
  }

  private handleInteractions() {
    const interactions = (Reflect.getMetadata(
      DISCORD_INTERACTIONS,
      this.interactionsService
    ) || []) as DiscordInteraction[];

    this.client.registerInteractions(
      interactions.map((i) => ({
        ...i,
        action: i.action.bind(this.interactionsService)
      }))
    );
  }
}
