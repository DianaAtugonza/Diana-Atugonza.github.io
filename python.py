
def display_menu():
    """Display the main menu options"""
    print("\n" + "="*40)
    print("          MAIN MENU")
    print("="*40)
    print("1. Option 1")
    print("2. Option 2")
    print("3. Option 3")
    print("4. View Settings")
    print("5. Exit")
    print("="*40)

def option1():
    """Function for option 1"""
    print("\nYou selected Option 1")
    print("This is where you would put your functionality")
    
def option2():
    """Function for option 2"""
    print("\nYou selected Option 2")
    print("Performing some action...")
    
def option3():
    """Function for option 3"""
    print("\nYou selected Option 3")
    print("Another functionality here")

def view_settings():
    """Display current settings"""
    print("\nCurrent Settings:")
    print("- Setting A: Enabled")
    print("- Setting B: Disabled")
    print("- Theme: Dark")

def main():
    """Main program loop"""
    while True:
        display_menu()
        
        try:
            choice = input("\nEnter your choice (1-5): ").strip()
            
            if choice == '1':
                option1()
            elif choice == '2':
                option2()
            elif choice == '3':
                option3()
            elif choice == '4':
                view_settings()
            elif choice == '5':
                print("\nThank you for using the program. Goodbye!")
                break
            else:
                print("\nInvalid choice! Please enter a number between 1-5.")
                
        except KeyboardInterrupt:
            print("\n\nProgram interrupted by user. Goodbye!")
            break
        except Exception as e:
            print(f"\nAn error occurred: {e}")

if __name__ == "__main__":
    main()


## Enhanced Menu with Submenus

python
class MenuSystem:
    def __init__(self):
        self.settings = {
            'theme': 'light',
            'notifications': True,
            'language': 'English'
        }
    
    def clear_screen(self):
        """Clear the terminal screen"""
        import os
        os.system('cls' if os.name == 'nt' else 'clear')
    
    def display_main_menu(self):
        """Display the main menu"""
        self.clear_screen()
        print("\n" + "═"*50)
        print("           🏠 MAIN MENU")
        print("═"*50)
        print("1. 📊 Data Operations")
        print("2. ⚙  Settings")
        print("3. ℹ  About")
        print("4. 🚪 Exit")
        print("═"*50)
    
    def display_data_menu(self):
        """Display data operations submenu"""
        self.clear_screen()
        print("\n" + "═"*50)
        print("           📊 DATA OPERATIONS")
        print("═"*50)
        print("1. 📥 Import Data")
        print("2. 📤 Export Data")
        print("3. 🔍 Search Data")
        print("4. 📈 Generate Report")
        print("5. ↩  Back to Main Menu")
        print("═"*50)
    
    def display_settings_menu(self):
        """Display settings submenu"""
        self.clear_screen()
        print("\n" + "═"*50)
        print("           ⚙  SETTINGS")
        print("═"*50)
        print("1. 🎨 Change Theme")
        print("2. 🔔 Toggle Notifications")
        print("3. 🌐 Change Language")
        print("4. 📋 View Current Settings")
        print("5. ↩  Back to Main Menu")
        print("═"*50)
    
    def data_operations(self):
        """Handle data operations menu"""
        while True:
            self.display_data_menu()
            choice = input("\nEnter your choice (1-5): ").strip()
            
            if choice == '1':
                self.import_data()
            elif choice == '2':
                self.export_data()
            elif choice == '3':
                self.search_data()
            elif choice == '4':
                self.generate_report()
            elif choice == '5':
                break
            else:
                input("\nInvalid choice! Press Enter to continue...")
    
    def settings_menu(self):
        """Handle settings menu"""
        while True:
            self.display_settings_menu()
            choice = input("\nEnter your choice (1-5): ").strip()
            
            if choice == '1':
                self.change_theme()
            elif choice == '2':
                self.toggle_notifications()
            elif choice == '3':
                self.change_language()
            elif choice == '4':
                self.view_current_settings()
            elif choice == '5':
                break
            else:
                input("\nInvalid choice! Press Enter to continue...")
    
    # Data operation methods
    def import_data(self):
        print("\n📥 Importing data...")
        # Add your import logic here
        input("\nPress Enter to continue...")
    
    def export_data(self):
        print("\n📤 Exporting data...")
        # Add your export logic here
        input("\nPress Enter to continue...")
    
    def search_data(self):
        print("\n🔍 Searching data...")
        query = input("Enter search term: ")
        print(f"Searching for: {query}")
        input("\nPress Enter to continue...")
    
    def generate_report(self):
        print("\n📈 Generating report...")
        # Add report generation logic here
        input("\nPress Enter to continue...")
    
    # Settings methods
    def change_theme(self):
        print(f"\nCurrent theme: {self.settings['theme']}")
        new_theme = input("Enter new theme (light/dark): ").lower()
        if new_theme in ['light', 'dark']:
            self.settings['theme'] = new_theme
            print(f"Theme changed to: {new_theme}")
        else:
            print("Invalid theme! Use 'light' or 'dark'.")
        input("\nPress Enter to continue...")
    
    def toggle_notifications(self):
        self.settings['notifications'] = not self.settings['notifications']
        status = "enabled" if self.settings['notifications'] else "disabled"
        print(f"\nNotifications {status}")
        input("\nPress Enter to continue...")
    
    def change_language(self):
        print(f"\nCurrent language: {self.settings['language']}")
        new_lang = input("Enter new language: ")
        if new_lang:
            self.settings['language'] = new_lang
            print(f"Language changed to: {new_lang}")
        input("\nPress Enter to continue...")
    
    def view_current_settings(self):
        print("\n📋 Current Settings:")
        for key, value in self.settings.items():
            print(f"  {key.capitalize()}: {value}")
        input("\nPress Enter to continue...")
    
    def about(self):
        self.clear_screen()
        print("\n" + "═"*50)
        print("           ℹ  ABOUT")
        print("═"*50)
        print("Menu System v1.0")
        print("Created with Python")
        print("A comprehensive menu example")
        print("═"*50)
        input("\nPress Enter to return to main menu...")
    
    def run(self):
        """Main program loop"""
        while True:
            self.display_main_menu()
            choice = input("\nEnter your choice (1-4): ").strip()
            
            if choice == '1':
                self.data_operations()
            elif choice == '2':
                self.settings_menu()
            elif choice == '3':
                self.about()
            elif choice == '4':
                print("\n🚪 Thank you for using the program. Goodbye! 👋")
                break
            else:
                input("\nInvalid choice! Press Enter to continue...")

# Run the enhanced menu system
if __name__ == "__main__":
    menu = MenuSystem()
    menu.run()


## Simple Function-Based Menu

python
def simple_menu():
    """
    A simple menu system using a dictionary to map choices to functions
    """
    def add_numbers():
        num1 = float(input("Enter first number: "))
        num2 = float(input("Enter second number: "))
        print(f"Result: {num1} + {num2} = {num1 + num2}")
    
    def multiply_numbers():
        num1 = float(input("Enter first number: "))
        num2 = float(input("Enter second number: "))
        print(f"Result: {num1} × {num2} = {num1 * num2}")
    
    def calculator_menu():
        menu_options = {
            '1': ('Add Numbers', add_numbers),
            '2': ('Multiply Numbers', multiply_numbers),
            '3': ('Back', None)
        }
        
        while True:
            print("\n" + "─" * 30)
            print("     CALCULATOR MENU")
            print("─" * 30)
            for key, (description, _) in menu_options.items():
                print(f"{key}. {description}")
            print("─" * 30)
            
            choice = input("Enter your choice: ").strip()
            
            if choice in menu_options:
                description, function = menu_options[choice]
                if function is None:  # Back option
                    break
                function()
                input("\nPress Enter to continue...")
            else:
                print("Invalid choice! Please try again.")

    # Main menu options
    main_options = {
        '1': ('Calculator', calculator_menu),
        '2': ('Show Date', lambda: print(f"Current date: {__import__('datetime').datetime.now().date()}")),
        '3': ('Exit', exit)
    }
    
    while True:
        print("\n" + "★" * 40)
        print("           SIMPLE MENU SYSTEM")
        print("★" * 40)
        for key, (description, _) in main_options.items():
            print(f"{key}. {description}")
        print("★" * 40)
        
        choice = input("Enter your choice: ").strip()
        
        if choice in main_options:
            description, function = main_options[choice]
            if choice == '3':
                print("Goodbye!")
                break
            function()
        else:
            print("Invalid choice! Please try again.")


if __name__ == "__main__":
    simple_menu()

