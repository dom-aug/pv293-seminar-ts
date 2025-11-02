import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountsRepository } from '../infrastructure/repositories/accounts.repository';

@Injectable()
export class RemoveAccountUseCase {
  constructor(private accountsRepository: AccountsRepository) {}

  async execute(accountId: string, userId: string): Promise<boolean> {
    try {
      const result = await this.accountsRepository.remove(accountId, userId);
      if (!result) {
        throw new NotFoundException(`Account with ID ${accountId} not found`);
      }
      return true;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      // Rethrow the "Cannot delete account with transactions" error
      throw error;
    }
  }
}
