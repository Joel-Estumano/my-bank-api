import { Body, Controller, Get, Logger, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/shared/jwt-auth.guard";
import { TransactionDto } from "./dto/transaction.dto";
import { Transaction } from "./interfaces/transaction.interface";
import { TransactionsService } from "./transactions.service";

@Controller('api/v1/transactions')
export class TransactionsController {

    constructor(private readonly transactionsService: TransactionsService) { }
    private readonly logger = new Logger(TransactionsController.name);

    @UseGuards(JwtAuthGuard)
    @Post()
    @UsePipes(ValidationPipe)
    async add(
        @Body() transactionDto: TransactionDto): Promise<Transaction> {
        return await this.transactionsService.add(transactionDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/search')
    async search(@Req() request: any): Promise<Transaction[] | {}> {
        return await this.transactionsService.search(request);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async get(): Promise<Transaction[]> {
        return await this.transactionsService.get();
    }
}