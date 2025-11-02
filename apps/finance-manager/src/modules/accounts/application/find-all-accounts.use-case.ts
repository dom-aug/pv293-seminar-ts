import { Injectable } from '@nestjs/common';
import { AccountsRepository } from '../infrastructure/repositories/accounts.repository';

@Injectable()
export class FindAllAccountsUseCase {
  constructor(private accountsRepository: AccountsRepository) {}

  async execute(userId: string) {
    const accounts = await this.accountsRepository.findAll(userId);
    return accounts;
  }
}
