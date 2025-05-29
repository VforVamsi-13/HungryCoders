from fastapi import FastAPI, Request
from pydantic import BaseModel
from pygame import init
import requests
import sqlite3

app = FastAPI()

OLLAMA_URL = "http://localhost:11434/api/generate"
DB_PATH = "nlp_sql.db"

class QueryRequest(BaseModel):
    natural_language: str

def generate_sql_from_nlp(prompt: str) -> str:
    response = requests.post(
        OLLAMA_URL,
        json={
            "model": "llama2",
            "prompt": f"Generate a SQL query that answers the question \"{prompt}\" Give only the SQL query, no explanation",
            "stream": False
        }
    )
    result = response.json()
    return result["response"].strip()

def init__init():
    response = requests.post(
        OLLAMA_URL,
        json={
            "model": "llama2",
            "prompt": f"ollama run sqlcoder2:7b --no-cache",
            "stream": False
        }
    )

def execute_sql_query(query: str):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    try:
        cursor.execute(query)
        columns = [desc[0] for desc in cursor.description]
        rows = cursor.fetchall()
        return {"columns": columns, "rows": rows}
    except Exception as e:
        return {"error": str(e)}
    finally:
        conn.close()

@app.post("/query")
def query_sql(req: QueryRequest):
    sql = generate_sql_from_nlp(req.natural_language)
    result = execute_sql_query(sql)
    return {
        "natural_language": req.natural_language,
        "generated_sql": sql,
        "result": result
    }
init__init()
q=QueryRequest(natural_language="Select all customers")
print(query_sql(q))