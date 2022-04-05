import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getEnvPath } from './common/helper/env.helper';
import { AuthModule } from './modules/auth/auth.module';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs/`);
import gnconfig from './common/configs/gnconfig';
import dbconfig from './common/configs/dbconfig';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: envFilePath,
      isGlobal: true,
      load: [dbconfig, gnconfig]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('dbconfig.host')
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }