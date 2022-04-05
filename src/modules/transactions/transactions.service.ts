import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { Transaction } from "./interfaces/transaction.interface";
import { TransactionDto } from "./dto/transaction.dto";
import { BankAccountsService } from "../bank-accounts/bank-accounts.service";
import { SearchPaginationService } from "src/services/searchPagination.service";
import { BankAccount } from "../bank-accounts/interfaces/bank-account.interface";
import { TransactionType } from "./interfaces/transaction.enum";

@Injectable()
export class TransactionsService {

    private logger = new Logger(TransactionsService.name);

    constructor(@InjectModel('Transaction') private readonly transactionModel: Model<Transaction>,
        private readonly bankAccountsService: BankAccountsService,
        private readonly searchPaginationService: SearchPaginationService) { }

    async add(transactionDto: TransactionDto): Promise<Transaction> {
        const { bankAccount } = transactionDto;

        let bankAccountFound: BankAccount = await this.bankAccountsService.getOne(bankAccount);

        if (transactionDto.transactionType === TransactionType.INCOMING_TRANSACTION) {

            bankAccountFound.balance = bankAccountFound.balance + transactionDto.moveValue

        } else {
            if (bankAccountFound.balance >= transactionDto.moveValue) {
                bankAccountFound.balance = bankAccountFound.balance - transactionDto.moveValue
            } else {
                throw new BadRequestException(`transaction amount exceeds available balance`);
            }
        }

        await this.bankAccountsService.update(bankAccountFound._id, bankAccountFound)

        const transaction = new this.transactionModel(transactionDto);
        return await transaction.save();
    }

    async get(): Promise<Transaction[]> {
        return await this.transactionModel.find().populate(['bankAccount']).exec();
    }

    async search(request) {
        return await this.searchPaginationService.searchPagination(this.transactionModel, request);
    }
}