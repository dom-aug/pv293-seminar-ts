import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountsRepository } from '../infrastructure/repositories/accounts.repository';

@Injectable()
export class FindAccountByIdAndUserIdUseCase {
  constructor(private accountsRepository: AccountsRepository) {}

  async execute(accountId: string, userId: string) {
    const account = await this.accountsRepository.findOne(accountId, userId);
    if (!account) {
      throw new NotFoundException(`Account with ID ${accountId} not found`);
    }
    return account;
  }
}
