import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { PixCreateImmediateChargeDto } from './pix/charge/dtos/pix-create-immediate-charge.dto';
import { ChargeService } from './pix/charge/charge.service';
import { JwtAuthGuard } from '../auth/shared/jwt-auth.guard';

@Controller('api/v1/gerencianet')
export class GerencianetController {

    constructor(private gerencianetService: ChargeService) { }

   // @UseGuards(JwtAuthGuard)
    @Post()
    @UsePipes(ValidationPipe)
    async add(
        @Body() dto: PixCreateImmediateChargeDto): Promise<any> {
        return await this.gerencianetService.pixCreateImmediateCharge(dto);
    }
}
