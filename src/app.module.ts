import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscordClient, DiscordEvent } from './discord-client';
import { DiscordService } from './discord/discord.service';
import { PrismaService } from './prisma/prisma.service';
import { DISCORD_EVENTS } from './tokens';
import { WarframeService } from './warframe/warframe.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get('WF_API_URL'),
        headers: {
          'Content-Type': 'application/json'
        }
      })
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

    events.forEach((event) => {
      this.discordClient.register({
        ...event,
        descriptor: event.descriptor?.bind(this.discordService)
      });
    });
  }
}
