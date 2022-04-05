import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UserSchema } from './interfaces/user.schema';
import { UsersService } from './users.service';
import { BankAccountsModule } from '../bank-accounts/bank-accounts.module';

@Module({
    controllers: [
        UsersController
    ],
    imports: [
        MongooseModule.forFeature([
            { name: 'User', schema: UserSchema }
        ]),
        BankAccountsModule
    ],
    providers: [
        UsersService
    ],
    exports: [
        UsersService
    ]
})
export class UsersModule { }