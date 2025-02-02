import { BankType, AccountType } from './types';

/**
 * This class implements a bank that can
 * maintain accounts and create new accounts
 */

export class Bank implements BankType {
    private accounts: AccountType[] = [];
    private usernames: string[] = [];

    /**
     * The constructor initialized the bank with accounts and usernames
     * @param accounts - array of accounts
     * @param usernames - array of usernames
     */
    public constructor(accounts: AccountType[], usernames: string[]) {
        this.accounts = accounts;
        this.usernames = usernames;
    }

    /**
     * finds the account in accounts by id
     * 
     * @param id - account id
     * @returns - true if account id ezists, false otherwise
     */
    private findAccountById(id: number): AccountType | undefined {
        return this.accounts.find(account => account.id === id);
    }

    /**
     * check account number validity
     * 
     * @param accountNumber the proposed account number
     * @returns if it's valid
     */
    private isAccountNumberInvalid(accountNumber: number): boolean {
        return accountNumber.toString().length !== 10;
    }

    private isUsernameExisits(username: string): boolean {
        return this.usernames.includes(username);
    }

    /**
     * Creates a new account if it passes the constraints
     * 
     * @param username 
     * @param age 
     * @param accountNumber 
     * @returns a new account with a ten-digit unique id and zero balance
     */
    createAccount(username: string, age: number, accountNumber: number): AccountType {
        if(this.isAccountNumberInvalid(accountNumber)) {
            throw new Error('Invalid account number');
        }
        if(!this.isUsernameExisits(username)) {
            throw new Error('User not found');
        }
        if(age < 18) {
            throw new Error('User is under 18');
        }
        if(this.findAccountById(accountNumber)) {
            throw new Error('Account already exists');
        }
        const account: AccountType = {
            id: accountNumber,
            balance: 0
        };
        this.accounts.push(account);
        return account;
    }

    /**
     * Check the balance in the given account
     * 
     * @param accountNumber the account number to check
     * @returns the balance in that account
     */
    checkBalance(accountNumber: number):number {
        const acc = this.findAccountById(accountNumber)
        if (acc) {
            return acc.balance;
        } else {
            throw new Error('Account not found')
        }
    }

    /**
     * Deposit a give namount into the given account
     * 
     * @param accountNumber the account number to deposit into
     * @param amount the amount to deposit
     */
    deposit(accountNumber: number, amount: number): void {
        if (amount<0) throw new Error('Cannot deposit negative amount');
        const acc = this.findAccountById(accountNumber)
        if (acc) {
            acc.balance += amount;
        } else {
            throw new Error('Account not found')
        }
    }

    /**
     * Withdraw a given amount from the given account
     * 
     * @param accountNumber the account number to deposit into
     * @param amount the amount to withdraw 
     */
    withdraw(accountNumber: number, amount: number): void {
        if (amount<0 || amount>this.checkBalance(accountNumber)) {
            throw new Error('Invalid withdrawl amount');
        }
        const acc = this.findAccountById(accountNumber)
        if (acc) {
            acc.balance -= amount;
        } else {
            throw new Error('Account not found')
        }
    }

}
