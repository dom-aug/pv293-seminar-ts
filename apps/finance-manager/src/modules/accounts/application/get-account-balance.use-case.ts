import { Injectable } from '@nestjs/common';
import { AccountsRepository } from '../infrastructure/repositories/accounts.repository';

@Injectable()
export class GetAccountBalanceUseCase {
  constructor(private accountsRepository: AccountsRepository) {}

  async execute(
    userId: string,
    accountId: string,
  ): Promise<{ balance: number }> {
    const account = await this.accountsRepository.getAccountBalance(
      accountId,
      userId,
    );
    return { balance: account.balance };
  }
}
