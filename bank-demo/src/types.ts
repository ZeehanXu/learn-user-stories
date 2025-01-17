export type AccountType = {
    id: number,
    balance: number
}

export interface BankType  {
    createAccount(username: String, age: number, accountNumber: number): AccountType;
}