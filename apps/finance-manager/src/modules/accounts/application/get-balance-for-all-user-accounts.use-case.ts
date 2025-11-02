import { Injectable } from '@nestjs/common';
import { AccountsRepository } from '../infrastructure/repositories/accounts.repository';

@Injectable()
export class GetBalanceForAllUserAccountsUseCase {
  constructor(private accountsRepository: AccountsRepository) {}

  async execute(userId: string): Promise<number> {
    const accounts =
      await this.accountsRepository.getBalanceForAllUserAccounts(userId);

    return accounts;
  }
}
