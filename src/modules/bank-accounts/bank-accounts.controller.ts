import { Body, Controller, Get, Logger, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { BankAccountDto } from "./dto/bank-account.dto";
import { BankAccount } from "./interfaces/bank-account.interface";
import { BankAccountsService } from "./bank-accounts.service";
import { JwtAuthGuard } from "../auth/shared/jwt-auth.guard";

@Controller('api/v1/bankAccounts')
export class BankAccountsController {

    constructor(private readonly bankAccountsService: BankAccountsService) { }
    private readonly logger = new Logger(BankAccountsController.name);

    @UseGuards(JwtAuthGuard)
    @Post()
    @UsePipes(ValidationPipe)
    async add(
        @Body() userDto: BankAccountDto): Promise<BankAccount> {
        return await this.bankAccountsService.add(userDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/search')
    async search(@Req() request: any): Promise<BankAccount[] | {}> {
        return await this.bankAccountsService.search(request);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async get(): Promise<BankAccount[]> {
        return await this.bankAccountsService.get();
    }
}