const prompt = require('prompt-sync')();
const express = require('express');
const morgan = require("morgan");
const mongoose = require('mongoose');
require('dotenv').config();

//DATABASE
require('./config/database');
const CRM = require("./models/CRM.js");

const app = express();

//MIDDLEWARE
app.use(morgan('dev'));

//ROUTES
const home = app.get('/', (req, res) =>{
    res.send('Welcome!')
});

let customers = [
    { id: 1, name: 'Ahmed', age: 21 }
];
console.log('-----------------------------------------');
console.log('Welcome to the CRM')
console.log('\nWhat would you like to do?');
console.log('\n1. Create a new customer');
console.log('2. View existing customers');
console.log('3. Update a customer');
console.log('4. Delete a customer');
console.log('5. Quit');

const choice = prompt('\nNumber of action to run: ');
handleChoice();

function handleChoice() {
    switch (choice) {
      case '1':
        createCustomer();
        break;
      case '2':
        viewCustomers();
        break;
      case '3':
        updateCustomer();
        break;
      case '4':
        deleteCustomer();
        break;
      case '5':
        console.log('Closing ..');
        break;
      default:
        console.log('Enter a number from 1 to 5 only');
        break;
    }
}

function createCustomer() {
    const name = prompt('Enter the customer name: ');
    const age = prompt('Enter the customer age: ');
    const newCustomer = { id: customers.length + 1, name, age };
    customers.push(newCustomer);
    console.log('Customer created successfully!');
}
  
function viewCustomers() {
  customers.forEach((user) => {
    console.log('Name: '+user.name);
    console.log('Age: '+user.age);
  })
}

function updateCustomer() {
    console.log('Below is a list of customers: ');
    customers.forEach((user) => {
        console.log('ID: '+user.id+', Name: '+user.name+', Age: '+user.age);
      })
    
    const customerId = prompt('Copy and paste the id of the customer you would like to update here:');
    const customer = customers.find((user) => user.id === parseInt(customerId));
  
    if (!customer) {
      console.log('Customer not found.');
      return;
    }
  
    const newName = prompt(`What is the customers new name? `);
    const newAge = prompt(`What is the customers new age? `);
    customer.name = newName;
    customer.age = newAge;
    console.log('Customer updated successfully!');
}

function deleteCustomer() {
    console.log('Below is a list of customers: ');
    customers.forEach((user) => {
        console.log('ID: '+user.id+', Name: '+user.name+', Age: '+user.age);
    })

    const customerId = prompt('Copy and paste the id of the customer you would like to delete here: ');
    const customerIndex = customers.findIndex((user) => user.id === parseInt(customerId));
  
    const deletedCustomer = customers.splice(customerIndex, 1)[0];
    console.log(`Customer "${deletedCustomer.name}" deleted successfully!`);
}

//I HAVE TWO INCOMPLETE CONDITIONS .. I didn't know how to do 
//The NEXT ACTION and Connecting data to database