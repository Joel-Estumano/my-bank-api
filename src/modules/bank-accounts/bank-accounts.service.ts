import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { BankAccount } from "./interfaces/bank-account.interface";
import { BankAccountDto } from "./dto/bank-account.dto";
import { SearchPaginationService } from "src/services/searchPagination.service";

@Injectable()
export class BankAccountsService {

    private logger = new Logger(BankAccountsService.name);

    constructor(@InjectModel('BankAccount') private readonly bankAccountModel: Model<BankAccount>,
        private readonly searchPaginationService: SearchPaginationService) { }

    async add(bankAccountDto: BankAccountDto): Promise<BankAccount> {
        const bankAccount = new this.bankAccountModel(bankAccountDto);
        return await bankAccount.save();
    }

    async get(): Promise<BankAccount[]> {
        return await this.bankAccountModel.find().populate(['user']).exec();
    }

    async getOne(_id: string): Promise<BankAccount> {
        const bankAccount = await this.bankAccountModel.findById({ _id }).exec();
        if (!bankAccount) {
            throw new NotFoundException(`No bank account found with id: ${_id}`);
        }
        return bankAccount;
    }

    async update(_id: string, bankAccount: BankAccountDto | BankAccount): Promise<BankAccount> {
        const bankAccountFound = await this.bankAccountModel.findOne({ _id }).exec();
        if (!bankAccountFound) {
            throw new NotFoundException(`No bank account found with id: ${_id}`);
        }
        return await this.bankAccountModel.findOneAndUpdate({ _id }, { $set: bankAccount }).exec();
    }

    async search(request) {
        return await this.searchPaginationService.searchPagination(this.bankAccountModel, request);
    }
}