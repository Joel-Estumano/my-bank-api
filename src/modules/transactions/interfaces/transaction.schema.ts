import * as mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema({

    transactionType: { type: Number, enum: [1, 2], required: true },
    bankAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'BankAccount', required: true },
    moveValue: { type: Number, required: true },
    description: { type: Number, enum: [1, 2, 3], required: true }

}, { timestamps: true, collection: 'transactions' });