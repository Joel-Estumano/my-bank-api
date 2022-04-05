import { IsNotEmpty, IsString } from "class-validator"

export class PixCreateImmediateChargeDto {

    calendario: {
        expiracao: number
    }

    devedor: {
        cpf: number
        nome: string
    }

    valor: {
        original: number
    }

    chave: string
}