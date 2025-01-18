
import { Bank } from '../src/bank';

const accounts = [{ id: 1234567890, balance: 5000 },
{ id: 1234567891, balance: 10000 }];

const usernames = ['user1', 'user2'];

const bank = new Bank(accounts, usernames);

// Scenario 1: successful account created
const acc = bank.createAccount('user1', 20, 1234567892);
if (acc.id !== 1234567892
    || acc.balance !== 0
    || acc.id.toString().length !== 10) {
    console.log('Create Scenario 1 failed');
}
else {
    console.log('Create Scenario 1 passed');
}

try {
    bank.createAccount('user1', 20, 1234567892);
    console.log('Create Scenario 1 failed');
}
catch(e) {
    console.log('Create Scenario 1 passed');
}

// scenario 2: unsuccessful account creation due to customer being below 18

try {
    bank.createAccount('user1', 17, 1234567899);
    console.log('Create Scenario 2 failed');
}
catch(e) {
    console.log('Create Scenario 2 passed');
}

// Scenario 3: unsuccessful account creation due to invalid username

try {
    bank.createAccount('user3', 20, 1234567888);
    console.log('Create Scenario 3 failed');
}
catch(e) {
    console.log('Create Scenario 3 passed');
}
//check balance
//scenario 1: check successfully
if (bank.checkBalance(1234567890) === 5000) {
    console.log("Check scenario 1 passed")
} else {
    console.log("Check scenario 1 failed")
}

//scenario 2: check falied due to invalid account
try {
    bank.checkBalance(1);
    console.log('Check Scenario 2 failed');
}
catch(e) {
    console.log('Check Scenario 2 passed');
}

//deposit 
//scenario 1: deposit successful
bank.deposit(1234567890, 3000);
bank.deposit(1234567892, 30);
if (acc.balance !== 30 || bank.checkBalance(1234567890) !== 8000){
    console.log("Deposit scenario 1 failed")
    console.log(acc.balance)
} else {
    console.log("Deposit scenario 1 passed")
}

//scenario 2: check falied due to invalid account
try {
    bank.deposit(1,200);
    console.log('Deposit Scenario 2 failed');
}
catch(e) {
    console.log('Deposit Scenario 2 passed');
}

//scenario 3: check falied due to invalid money amount
try {
    bank.deposit(1234567892,-200);
    console.log('Deposit Scenario 3 failed');
}
catch(e) {
    console.log('Deposit Scenario 3 passed');
}