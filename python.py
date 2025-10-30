
import json
import getpass
import re
from datetime import datetime

class AccountManager:
    def __init__(self, filename="accounts.json"):
        self.filename = filename
        self.accounts = self.load_accounts()
    
    def load_accounts(self):
        """Load existing accounts from JSON file"""
        try:
            with open(self.filename, 'r') as file:
                return json.load(file)
        except (FileNotFoundError, json.JSONDecodeError):
            return {}
    
    def save_accounts(self):
        """Save accounts to JSON file"""
        with open(self.filename, 'w') as file:
            json.dump(self.accounts, file, indent=4)
    
    def validate_username(self, username):
        """Validate username requirements"""
        if len(username) < 4:
            return False, "Username must be at least 4 characters long"
        
        if not re.match("^[a-zA-Z0-9_]+$", username):
            return False, "Username can only contain letters, numbers, and underscores"
        
        if username in self.accounts:
            return False, "Username already exists"
        
        return True, "Username is valid"
    
    def validate_password(self, password):
        """Validate password strength"""
        if len(password) < 8:
            return False, "Password must be at least 8 characters long"
        
        if not re.search(r"[A-Z]", password):
            return False, "Password must contain at least one uppercase letter"
        
        if not re.search(r"[a-z]", password):
            return False, "Password must contain at least one lowercase letter"
        
        if not re.search(r"[0-9]", password):
            return False, "Password must contain at least one number"
        
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
            return False, "Password must contain at least one special character"
        
        return True, "Password is strong"
    
    def validate_email(self, email):
        """Validate email format"""
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if re.match(pattern, email):
            return True, "Email is valid"
        return False, "Invalid email format"
    
    def create_account(self):
        """Create a new user account"""
        print("\n=== Create New Account ===")
        
        # Get username
        while True:
            username = input("Enter username: ").strip()
            is_valid, message = self.validate_username(username)
            if is_valid:
                break
            print(f"Error: {message}")
        
        # Get password (hidden input)
        while True:
            password = getpass.getpass("Enter password: ")
            is_valid, message = self.validate_password(password)
            if is_valid:
                break
            print(f"Error: {message}")
        
        # Confirm password
        while True:
            confirm_password = getpass.getpass("Confirm password: ")
            if password == confirm_password:
                break
            print("Error: Passwords do not match!")
        
        # Get email (optional)
        email = input("Enter email (optional): ").strip()
        if email:
            is_valid, message = self.validate_email(email)
            if not is_valid:
                print(f"Warning: {message}")
                email = ""  # Clear invalid email
        
        # Get full name
        full_name = input("Enter full name: ").strip()
        
        # Create account
        self.accounts[username] = {
            'password': password,  # In real applications, never store plain text passwords!
            'email': email,
            'full_name': full_name,
            'created_at': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            'last_login': None
        }
        
        self.save_accounts()
        print(f"\n✅ Account created successfully for {username}!")
        return username
    
    def login(self):
        """Login to existing account"""
        print("\n=== Login ===")
        username = input("Username: ").strip()
        password = getpass.getpass("Password: ")
        
        if username in self.accounts and self.accounts[username]['password'] == password:
            self.accounts[username]['last_login'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            self.save_accounts()
            print(f"\n✅ Login successful! Welcome back, {username}!")
            return username
        else:
            print("\n❌ Invalid username or password!")
            return None
    
    def view_account_info(self, username):
        """View account information"""
        if username in self.accounts:
            account = self.accounts[username]
            print(f"\n=== Account Information ===")
            print(f"Username: {username}")
            print(f"Full Name: {account['full_name']}")
            print(f"Email: {account['email'] if account['email'] else 'Not provided'}")
            print(f"Account Created: {account['created_at']}")
            print(f"Last Login: {account['last_login'] if account['last_login'] else 'Never'}")
        else:
            print("Account not found!")
    
    def delete_account(self, username):
        """Delete user account"""
        if username in self.accounts:
            confirm = input(f"Are you sure you want to delete account '{username}'? (y/n): ").lower()
            if confirm == 'y':
                password = getpass.getpass("Enter password to confirm: ")
                if self.accounts[username]['password'] == password:
                    del self.accounts[username]
                    self.save_accounts()
                    print(f"✅ Account '{username}' deleted successfully!")
                    return True
                else:
                    print("❌ Incorrect password!")
            else:
                print("Account deletion cancelled.")
        else:
            print("Account not found!")
        return False

def main():
    account_manager = AccountManager()
    
    while True:
        print("\n" + "="*40)
        print("          ACCOUNT MANAGEMENT SYSTEM")
        print("="*40)
        print("1. Create Account")
        print("2. Login")
        print("3. Exit")
        
        choice = input("\nEnter your choice (1-3): ").strip()
        
        if choice == '1':
            username = account_manager.create_account()
            if username:
                # After creating account, show options
                while True:
                    print(f"\nWelcome, {username}!")
                    print("1. View Account Info")
                    print("2. Delete Account")
                    print("3. Logout")
                    
                    user_choice = input("Enter your choice (1-3): ").strip()
                    
                    if user_choice == '1':
                        account_manager.view_account_info(username)
                    elif user_choice == '2':
                        if account_manager.delete_account(username):
                            break
                    elif user_choice == '3':
                        print("Logged out successfully!")
                        break
                    else:
                        print("Invalid choice!")
        
        elif choice == '2':
            username = account_manager.login()
            if username:
                while True:
                    print(f"\nWelcome back, {username}!")
                    print("1. View Account Info")
                    print("2. Delete Account")
                    print("3. Logout")
                    
                    user_choice = input("Enter your choice (1-3): ").strip()
                    
                    if user_choice == '1':
                        account_manager.view_account_info(username)
                    elif user_choice == '2':
                        if account_manager.delete_account(username):
                            break
                    elif user_choice == '3':
                        print("Logged out successfully!")
                        break
                    else:
                        print("Invalid choice!")
        
        elif choice == '3':
            print("Thank you for using the Account Management System!")
            break
        
        else:
            print("Invalid choice! Please try again.")

if __name__ == "__main__":
    main()


## Features of this account creation system:

### 🔐 *Security Features:*
- Password validation (length, uppercase, lowercase, numbers, special characters)
- Hidden password input using getpass
- Password confirmation

### 📝 *Validation:*
- Username validation (length, allowed characters, uniqueness)
- Email format validation
- Input sanitization

### 💾 *Data Storage:*
- Saves accounts to JSON file
- Persistent storage between sessions
- Tracks creation date and last login

### 🎯 *Functionality:*
- Create new accounts
- Login to existing accounts
- View account information
- Delete accounts
- User-friendly menu system

### ⚠ *Important Security Note:*
In a real application, *never store passwords in plain text*. This example stores passwords plainly for simplicity, but you should use password hashing:

python
# For real applications, replace password storage with:
import hashlib

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

