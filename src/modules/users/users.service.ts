import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { UserDto } from "./dto/user.dto";
import { User } from "./interfaces/user.interface";
import { BankAccountsService } from "../bank-accounts/bank-accounts.service";
import { BankAccountDto } from "../bank-accounts/dto/bank-account.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    private logger = new Logger(UsersService.name);

    constructor(@InjectModel('User') private readonly userModel: Model<User>,
        private readonly bankAccountsService: BankAccountsService) { }

    async add(userDto: UserDto): Promise<User> {
        const { cpf } = userDto;
        const userFound = await this.userModel.findOne({ cpf }).exec();
        if (userFound) {
            throw new BadRequestException(`There is already a CPF with the number informed ${cpf}`);
        }
        userDto.password = bcrypt.hashSync(userDto.password, 10)
        const user = new this.userModel(userDto);
        const userSaved = await user.save();

        if (!userSaved) {
            throw new NotFoundException(`Error creating user`);
        } else {

            let bankAccountDto = new BankAccountDto()

            bankAccountDto.agency = this.getRandomArbitrary(1000, 10000)
            bankAccountDto.accountNumber = this.getRandomArbitrary(10000, 1000000)
            bankAccountDto.verifyingDigit = this.getRandomArbitrary(10, 100)
            bankAccountDto.balance = 0
            bankAccountDto.user = userSaved._id
            bankAccountDto.isDeleted = false
            bankAccountDto.active = true

            let bankAccountSaved: any

            await this.bankAccountsService.add(bankAccountDto).then(response => {
                bankAccountSaved = response
            })

            if (bankAccountSaved) {
                return userSaved
            } else {
                this.deletUser(userSaved._id)
                throw new NotFoundException(`Error creating user`);
            }
        }
    }

    async get(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async findUserByEmail(email: string): Promise<User> {
        const userFound = await this.userModel.findOne({ email: email }).exec();
        if (!userFound) {
            throw new NotFoundException(`No user found with email: ${email}`);
        }
        return userFound;
    }

    private async deletUser(_id: string): Promise<any> {
        const userFoun = await this.userModel.findOne({ _id }).exec();
        if (!userFoun) {
            throw new NotFoundException(`No user found with _id: ${_id}`);
        }
        return await this.userModel.deleteOne({ _id }).exec();
    }

    private getRandomArbitrary(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    async delete(_id: string): Promise<any> {
        const user = await this.userModel.findById({ _id }).exec()
        if (!user) {
            throw new NotFoundException(`No user found with _id: ${_id}`)
        }
        return await this.userModel.deleteOne({ _id }).exec()
    }
}