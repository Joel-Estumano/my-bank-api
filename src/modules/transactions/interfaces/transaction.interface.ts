import { Document } from 'mongoose';
import { DescriptionType, TransactionType } from './transaction.enum';

export interface Transaction extends Document {

    transactionType: TransactionType
    bankAccount: string
    moveValue: number
    description: DescriptionType

}