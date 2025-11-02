import { Module } from '@nestjs/common';

import { AccountsController } from './api/controllers/accounts.controller';
import { AuthModule } from '../auth/auth.module';
import { AccountsRepository } from './infrastructure/repositories/accounts.repository';
import { CreateAccountUseCase } from './application/create-account.use-case';
import { FindAllAccountsUseCase } from './application/find-all-accounts.use-case';
import { FindAccountByIdAndUserIdUseCase } from './application/find-account-by-id-and-userid.use-case';
import { UpdateAccountUseCase } from './application/update-account.use-case';
import { RemoveAccountUseCase } from './application/remove-account.use-case';
import { GetAccountBalanceUseCase } from './application/get-account-balance.use-case';
import { GetBalanceForAllUserAccountsUseCase } from './application/get-balance-for-all-user-accounts.use-case';

const useCases = [
  CreateAccountUseCase,
  FindAllAccountsUseCase,
  FindAccountByIdAndUserIdUseCase,
  UpdateAccountUseCase,
  RemoveAccountUseCase,
  GetAccountBalanceUseCase,
  GetBalanceForAllUserAccountsUseCase,
];

@Module({
  imports: [AuthModule],
  controllers: [AccountsController],
  providers: [AccountsRepository, ...useCases],
  exports: [AccountsRepository, CreateAccountUseCase],
})
export class AccountsModule {}
