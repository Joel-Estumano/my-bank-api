import * as mongoose from 'mongoose';
import { AddressType } from 'src/common/types/address.type';

export const UserSchema = new mongoose.Schema({

    name: { type: String, required: true },
    lastName: { type: String, required: true },
    cpf: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    telephone: { type: String, required: true },
    address: { type: AddressType, _id: false, required: true },
    password: { type: String, required: true },
    isDeleted: { type: Boolean, default: false, required: true },
    active: { type: Boolean, default: true, required: true }

}, { timestamps: true, collection: 'users' });