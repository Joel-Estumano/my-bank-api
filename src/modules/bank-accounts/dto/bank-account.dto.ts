import { IsNotEmpty, IsString, IsNumber, IsOptional } from "class-validator";

export class BankAccountDto {

    readonly _id: string

    @IsNumber()
    @IsNotEmpty({
        message: 'Agency number cannot be empty'
    })
    agency: number

    @IsNumber()
    @IsNotEmpty({
        message: 'Account Number cannot be empty'
    })
    accountNumber: number

    @IsNumber()
    @IsNotEmpty({
        message: 'Verifying Digit number cannot be empty'
    })
    verifyingDigit: number

    @IsOptional()
    balance: number

    @IsString()
    @IsNotEmpty({
        message: 'User cannot be empty'
    })
    user: string

    isDeleted: boolean
    active: boolean

}