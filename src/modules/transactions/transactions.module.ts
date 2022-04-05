import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsController } from './transactions.controller';
import { TransactionSchema } from './interfaces/transaction.schema';
import { TransactionsService } from './transactions.service';
import { BankAccountsModule } from '../bank-accounts/bank-accounts.module';
import { SearchPaginationService } from 'src/services/searchPagination.service';

@Module({
    controllers: [
        TransactionsController
    ],
    imports: [
        MongooseModule.forFeature([
            { name: 'Transaction', schema: TransactionSchema }
        ]),
        BankAccountsModule
    ],
    providers: [
        TransactionsService,
        SearchPaginationService
    ]
})
export class TransactionsModule { }