import { Document } from 'mongoose';

export interface User extends Document {

    name: string
    lastName: string
    cpf: string
    email: string
    telephone: string
    address: JSON
    password: string
    isDeleted: boolean
    active: boolean
    
}