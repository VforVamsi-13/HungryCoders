from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
app = FastAPI()
DB_PATH = "nlp_sql.db"

class QueryRequest(BaseModel):
    natural_language: str
    table_name: str

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with actual domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/display_table")
def execute_sql_query(table_name: str):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    print(table_name)
    query=f"SELECT * FROM {table_name};"
    try:
        cursor.execute(query)
        columns = [desc[0] for desc in cursor.description]
        rows = cursor.fetchall()
        return {"columns": columns, "rows": rows}
    except Exception as e:
        print("Error executing SQL query:", e)
        return {"error": "Please enter a valid question."}
    finally:
        conn.close()

@app.get("/list_tables")
def list_tables():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Query for all tables and their creation SQL
    cursor.execute("SELECT name, sql FROM sqlite_schema WHERE type='table'")
    tables = cursor.fetchall()

    for table in tables:
        print(f"Table: {table[0]}")
        print(f"Creation SQL: {table[1]}\n")
    conn.close()
    return {"tables": [table[0] for table in tables]}