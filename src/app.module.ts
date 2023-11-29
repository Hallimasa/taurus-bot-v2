import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DiscordModule } from './discord/discord.module';
import { WF_API_URL } from './environment-tokens';
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
        baseURL: configService.get(WF_API_URL),
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          language: 'pt'
        }
      })
    }),
    DiscordModule
  ],
  controllers: [],
  providers: [WarframeService],
  exports: [WarframeService]
})
export class AppModule {}
