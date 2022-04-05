import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import gnconfig from 'src/common/configs/gnconfig';
import { PixCreateImmediateChargeDto } from './dtos/pix-create-immediate-charge.dto';
var Gerencianet = require('gn-api-sdk-node');

@Injectable()
export class ChargeService {

    private readonly gerencianet: any
    private readonly chave_pix: string
    private readonly tempo_expiracao: number

    constructor(private readonly configService: ConfigService) {

        const gnconfig = this.configService.get<any>('gnconfig');

        this.gerencianet = Gerencianet(gnconfig.credentials);
        this.chave_pix = gnconfig.chave_pix
        this.tempo_expiracao = 3600 // 3600 segundos = 1 hora

    }

    async pixCreateImmediateCharge(dto: PixCreateImmediateChargeDto): Promise<any> {

        dto.chave = this.chave_pix
        dto.calendario = { expiracao: this.tempo_expiracao }

        const response = await this.gerencianet.pixCreateImmediateCharge({}, dto)
        const QRCode = await this.generateQRCode(response.loc.id)

        return {
            imagem: QRCode.imagemQrcode,
            copiaecola: QRCode.qrcode,
            valor: response.valor.original,
            expiracao: this.timeGenerator(response.calendario.expiracao)
        }
    }

    private async generateQRCode(locId: any) {
        let params = {
            id: locId
        }
        const response = await this.gerencianet.pixGenerateQRCode(params)
        return response
    }

    private timeGenerator(s: number = 0) {
        let time = new Date()
        time.setTime(time.getTime() + (s * 1000))
        return time.toISOString()
    }
}