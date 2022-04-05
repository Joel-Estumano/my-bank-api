import * as mongoose from 'mongoose';

export const BankAccountSchema = new mongoose.Schema({

    agency: { type: Number, required: true },
    accountNumber: { type: Number, required: true },
    verifyingDigit: { type: Number, required: true },
    balance: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isDeleted: { type: Boolean, default: false, required: true },
    active: { type: Boolean, default: true, required: true }

}, { timestamps: true, collection: 'bankAccounts' });