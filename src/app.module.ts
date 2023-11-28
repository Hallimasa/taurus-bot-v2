import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscordClient, DiscordEvent } from './discord/discord-client';
import { DiscordService } from './discord/discord.service';
import { PrismaService } from './prisma/prisma.service';
import { WarframeService } from './warframe/warframe.service';
import { DISCORD_EVENTS } from './tokens';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    WarframeService,
    {
      provide: DiscordClient,
      useClass: DiscordClient
    },
    DiscordService
  ],
  exports: [PrismaService, WarframeService]
})
export class AppModule {
  constructor(
    private readonly discordService: DiscordService,
    private readonly discordClient: DiscordClient
  ) {
    const events = Reflect.getMetadata(
      DISCORD_EVENTS,
      this.discordService
    ) as DiscordEvent[];

    this.discordClient.loadEvents(events);
  }
}
