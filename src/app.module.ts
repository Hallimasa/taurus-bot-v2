import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { WarframeService } from './warframe/warframe.service';
import { DiscordModule } from './discord/discord.module';

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
        },
        params: {
          language: 'pt'
        }
      })
    }),
    DiscordModule
  ],
  controllers: [],
  providers: [PrismaService, WarframeService],
  exports: [PrismaService, WarframeService]
})
export class AppModule {}
