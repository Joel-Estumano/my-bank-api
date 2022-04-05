import { Module } from '@nestjs/common';
import { ChargeService } from './pix/charge/charge.service';
import { GerencianetController } from './gerencianet.controller';

@Module({
  providers: [ChargeService],
  controllers: [GerencianetController]
})
export class GerencianetModule {}
