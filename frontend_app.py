import requests
import pandas as pd

API_URL = "http://localhost:8000/query"
TABLE_API_URL = "http://localhost:8000/display_table/"
while True:
    table= input("Enter the table name to display (or 'exit' to quit): ")
    # print("Welcome to the SQL Query Interface!")
    # nl_query = input("Enter your natural language query: ")
    # response = requests.post(API_URL, json={"natural_language": nl_query})
    response = requests.get(TABLE_API_URL, params={"table_name": table})
    madda=requests.get("http://localhost:8000/list_tables")

    if response.status_code == 200:
        # Only print the generated SQL query
        print(response.json())
    if madda.status_code == 200:
        print(madda.json())