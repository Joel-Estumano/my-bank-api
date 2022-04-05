import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './shared/auth.service';
import { LocalStrategy } from './shared/local.strategy';
import { JwtStrategy } from './shared/jwt.strategy';
import { jwtConstants } from './shared/constants';
import { BankAccountsModule } from '../bank-accounts/bank-accounts.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { GerencianetModule } from '../gerencianet/gerencianet.module';

@Module({
  imports: [
    UsersModule,
    BankAccountsModule,
    TransactionsModule,
    /*  */
    GerencianetModule,
    /*  */
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '15h' }
    })
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy
  ]
})
export class AuthModule { }