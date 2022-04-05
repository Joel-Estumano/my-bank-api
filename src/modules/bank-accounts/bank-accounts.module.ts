import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BankAccountsController } from './bank-accounts.controller';
import { BankAccountSchema } from './interfaces/bank-account.schema';
import { BankAccountsService } from './bank-accounts.service';
import { SearchPaginationService } from 'src/services/searchPagination.service';

@Module({
    controllers: [
        BankAccountsController
    ],
    imports: [
        MongooseModule.forFeature([
            { name: 'BankAccount', schema: BankAccountSchema }
        ]),
    ],
    providers: [
        BankAccountsService,
        SearchPaginationService
    ],
    exports: [
        BankAccountsService
    ]
})
export class BankAccountsModule { }