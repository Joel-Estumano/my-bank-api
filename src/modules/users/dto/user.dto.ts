import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserDto {

    @IsString()
    @IsNotEmpty({
        message: 'Name user cannot be empty'
    })
    name: string

    @IsString()
    @IsNotEmpty({
        message: 'Last name user cannot be empty'
    })
    lastName: string

    @IsString()
    @IsNotEmpty({
        message: 'CPF number cannot be empty'
    })
    cpf: string

    @IsEmail({
        message: 'Email format invalid'
    })
    @IsNotEmpty({
        message: 'Email user cannot be empty'
    })
    email: string

    @IsString()
    @IsNotEmpty({
        message: 'Telephone number cannot be empty'
    })
    telephone: string

    @IsNotEmpty({
        message: 'Address cannot be empty'
    })
    address: JSON

    @IsString()
    @IsNotEmpty({
        message: 'Password cannot be empty'
    })
    password: string

}