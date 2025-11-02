import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateAccountDto, UpdateAccountDto } from '../dto/accounts-zod.dtos';
import { JwtAuthGuard } from '../../../auth/api/guards/jwt-auth.guard';
import { User } from '../../../users/api/decorators/user.decorator';
import { RequestUser } from '../../../users/api/dto/request-user';
import { CreateAccountUseCase } from '../../application/create-account.use-case';
import { FindAccountByIdAndUserIdUseCase } from '../../application/find-account-by-id-and-userid.use-case';
import { FindAllAccountsUseCase } from '../../application/find-all-accounts.use-case';
import { GetAccountBalanceUseCase } from '../../application/get-account-balance.use-case';
import { RemoveAccountUseCase } from '../../application/remove-account.use-case';
import { GetBalanceForAllUserAccountsUseCase } from '../../application/get-balance-for-all-user-accounts.use-case';
import { UpdateAccountUseCase } from '../../application/update-account.use-case';

@ApiTags('accounts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly createAccountUseCase: CreateAccountUseCase,
    private readonly findAccountByIdAndUserIdUseCase: FindAccountByIdAndUserIdUseCase,
    private readonly findAllAccountsUseCase: FindAllAccountsUseCase,
    private readonly getAccountBalanceUseCase: GetAccountBalanceUseCase,
    private readonly getBalanceForAllUserAccountsUseCase: GetBalanceForAllUserAccountsUseCase,
    private readonly removeAccountUseCase: RemoveAccountUseCase,
    private readonly updateAccountUseCase: UpdateAccountUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new financial account' })
  @ApiResponse({ status: 201, description: 'Account created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(
    @Body() createAccountDto: CreateAccountDto,
    @User() user: RequestUser,
  ) {
    return this.createAccountUseCase.execute(createAccountDto, user.userId);
  }

  @Get(':id/balance')
  @ApiOperation({ summary: 'Get the current balance for an account' })
  @ApiResponse({ status: 200, description: 'Return the account balance' })
  @ApiResponse({ status: 404, description: 'Account not found' })
  getBalance(@Param('id') id: string, @User() user: RequestUser) {
    return this.getAccountBalanceUseCase.execute(user.userId, id);
  }

  @Get('total-balance')
  @ApiOperation({ summary: 'Get the total balance for an user' })
  @ApiResponse({
    status: 200,
    description: 'Return the total balance for user',
  })
  @ApiResponse({ status: 404, description: 'Accounts not found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getBalanceForAllUserAccounts(@User() user: RequestUser) {
    return this.getBalanceForAllUserAccountsUseCase.execute(user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific account by ID' })
  @ApiResponse({ status: 200, description: 'Return the account' })
  @ApiResponse({ status: 404, description: 'Account not found' })
  findOne(@Param('id') id: string, @User() user: RequestUser) {
    return this.findAccountByIdAndUserIdUseCase.execute(id, user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all accounts for the current user' })
  @ApiResponse({ status: 200, description: 'Return all accounts' })
  findAll(@User() user: RequestUser) {
    return this.findAllAccountsUseCase.execute(user.userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an account' })
  @ApiResponse({ status: 200, description: 'Account updated successfully' })
  @ApiResponse({ status: 404, description: 'Account not found' })
  update(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
    @User() user: RequestUser,
  ) {
    return this.updateAccountUseCase.execute(id, updateAccountDto, user.userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an account' })
  @ApiResponse({ status: 200, description: 'Account deleted successfully' })
  @ApiResponse({ status: 404, description: 'Account not found' })
  remove(@Param('id') id: string, @User() user: RequestUser) {
    return this.removeAccountUseCase.execute(id, user.userId);
  }
}
