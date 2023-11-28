import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DiscordEvent } from '../decorators/discord-event.decorator';
import { DiscordClient } from '../discord-client';

@Injectable()
export class DiscordService implements OnModuleInit {
  constructor(
    private readonly discordClient: DiscordClient,
    private readonly prisma: PrismaService
  ) {}

  async onModuleInit() {
    this.discordClient.connect();
  }

  @DiscordEvent('ready')
  async onReady() {}
}
