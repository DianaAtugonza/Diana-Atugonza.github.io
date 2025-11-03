

## 1. Basic "Hello World"

print("Hello, World!")


## 2. Simple Calculator

def calculator():
    print("Simple Calculator")
    num1 = float(input("Enter first number: "))
    num2 = float(input("Enter second number: "))
    operation = input("Enter operation (+, -, *, /): ")
    
    if operation == '+':
        result = num1 + num2
    elif operation == '-':
        result = num1 - num2
    elif operation == '*':
        result = num1 * num2
    elif operation == '/':
        if num2 != 0:
            result = num1 / num2
        else:
            return "Error: Division by zero!"
    else:
        return "Invalid operation!"
    
    return f"Result: {result}"

print(calculator())


## 3.File Operations

# Write to file
with open('example.txt', 'w') as file:
    file.write("Hello, this is a text file!\n")
    file.write("Python file handling example.")

# Read from file
with open('example.txt', 'r') as file:
    content = file.read()
    print(content)


## 4. Data Analysis with Pandas

import pandas as pd

# Create a sample DataFrame
data = {
    'Name': ['Alice', 'Bob', 'Charlie', 'Diana'],
    'Age': [25, 30, 35, 28],
    'City': ['New York', 'London', 'Tokyo', 'Paris'],
    'Salary': [50000, 60000, 70000, 55000]
}

df = pd.DataFrame(data)
print("Original DataFrame:")
print(df)
print("\nBasic Statistics:")
print(df.describe())


## 5. Web Scraping Example

import requests
from bs4 import BeautifulSoup

def get_website_title(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')
        return soup.title.string if soup.title else "No title found"
    except Exception as e:
        return f"Error: {e}"

# Example usage
url = "https://www.example.com"
print(f"Title of {url}: {get_website_title(url)}")


## 6. API Request
import requests

def get_random_user():
    response = requests.get('https://randomuser.me/api/')
    if response.status_code == 200:
        data = response.json()
        user = data['results'][0]
        return f"Name: {user['name']['first']} {user['name']['last']}"
    return "Failed to fetch user"

print(get_random_user())


## 7. Class Example
class BankAccount:
    def __init__(self, account_holder, balance=0):
        self.account_holder = account_holder
        self.balance = balance
    
    def deposit(self, amount):
        self.balance += amount
        return f"Deposited ${amount}. New balance: ${self.balance}"
    
    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
            return f"Withdrew ${amount}. New balance: ${self.balance}"
        return "Insufficient funds!"
    
    def get_balance(self):
        return f"Account balance: ${self.balance}"

# Usage
account = BankAccount("John Doe", 1000)
print(account.deposit(500))
print(account.withdraw(200))
print(account.get_balance())


## 8. List Comprehensions

# Square numbers
numbers = [1, 2, 3, 4, 5]
squares = [x**2 for x in numbers]
print(f"Squares: {squares}")

# Filter even numbers
evens = [x for x in numbers if x % 2 == 0]
print(f"Even numbers: {evens}")


## 9. Error Handling

def safe_divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        return "Error: Cannot divide by zero!"
    except TypeError:
        return "Error: Please provide numbers!"
    else:
        return f"Result: {result}"

print(safe_divide(10, 2))
print(safe_divide(10, 0))
print(safe_divide(10, 'a'))


## 10. Working with Dates

from datetime import datetime, timedelta

# Current date and time
now = datetime.now()
print(f"Current datetime: {now}")

# Format date
formatted = now.strftime("%Y-%m-%d %H:%M:%S")
print(f"Formatted: {formatted}")

# Add days to current date
future_date = now + timedelta(days=7)
print(f"One week from now: {future_date.date()}")


