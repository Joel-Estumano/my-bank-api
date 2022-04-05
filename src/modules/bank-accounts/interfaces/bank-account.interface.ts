import { Document } from 'mongoose';

export interface BankAccount extends Document {

    agency: number
    accountNumber: number
    verifyingDigit: number
    balance: number
    user: string
    isDeleted: boolean
    active: boolean

}