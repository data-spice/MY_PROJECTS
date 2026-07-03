import re
from datetime import datetime
import json


print("======================================================")
print("            WELCOME TO THE EXPENSE MANAGER            ")
print("======================================================")
print("\n")


def enter_expense():
    description=input("Describe the expense (ie. Lunch, Swimming e.t.c): ")
    print()
    category=input("Enter the category of the expense (ie Food, Leisure): ")
    print()
    amount=(input(f"Enter the amount to be spent on {description} (ie 1200.56 , 100 etc): "))
    print()
    date=input("Enter the date that this expense occured (ie. dd/mm/yyyy 16/11/2026): ")
    print()

    return (description,category,amount,date)

def validate_details(description,category,amount,date):
    date_pattern=r"^\d{2}\/(0[1-9]|1[0-2])\/\d{4}$"
    if not re.fullmatch(date_pattern,date):
        print("The date must be in the format of DD/MM/YYYY")
        return False
    else:
        try:
            datetime.strptime(date,"%d/%m/%Y")
            print("Valid date")
        except ValueError:
            print("Invalid date")
            return False
            
        
    if description and category:
        pass
    else:
        print("Check if description or category is missing")
        return False

    if re.fullmatch(r"^\d+(\.\d+)?$",amount):
        pass
    else:
        print("Invalid amount details re enter details")
        return False
    
    return True

def loader_json(description,category,amount,date):
    amount=float(amount)
    try:
        with open("expenses.json","r") as file:
            current_data=json.load(file)
    except (FileNotFoundError,json.JSONDecodeError):
        current_data=[]
    new_data={
        "description":description,
        "category":category,
        "amount":amount,
        "date":date
    }

    current_data.append(new_data)

    with open("expenses.json",'w') as file:
        json.dump(current_data,file,indent=4)

    return True

def run():
    running=True
    while running:
        description, category,amount,date=enter_expense()

        if validate_details(description, category,amount,date):
            loader_json(description, category,amount,date)
            print("==================================")
            print("   EXPENSE LOADED SUCCESFULLY     ")
            print("==================================")
            choice=input("Do you wish to proceed? (y/n): ").lower()

            if choice != "y":
                break 

        else:
            print("An error occured. Please try again")
            continue

if __name__ == "__main__":
    run()