import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscordEvent } from '../decorators/discord-event.decorator';
import { DiscordClient } from './discord-client';

@Injectable()
export class DiscordService implements OnModuleInit {
  constructor(private readonly discordClient: DiscordClient) {}

  onModuleInit() {
    this.discordClient.connect();
  }

  @DiscordEvent('ready')
  onReady() {}
}
