import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountsRepository } from '../infrastructure/repositories/accounts.repository';
import { UpdateAccountDto } from '../api/dto/accounts-zod.dtos';
import { Account } from '../core/entities/accounts.entity';

@Injectable()
export class UpdateAccountUseCase {
  constructor(private accountsRepository: AccountsRepository) {}

  async execute(
    accountId: string,
    updateAccountDto: UpdateAccountDto,
    userId: string,
  ): Promise<Account> {
    const updatedAccount = await this.accountsRepository.update(
      accountId,
      updateAccountDto,
      userId,
    );
    if (!updatedAccount) {
      throw new NotFoundException(`Account with ID ${accountId} not found`);
    }
    return updatedAccount;
  }
}
