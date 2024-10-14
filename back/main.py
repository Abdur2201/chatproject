from fastapi import FastAPI, Request
from webquery import WebQuery
import os

app = FastAPI()

# Load OpenAI API Key
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
webquery = WebQuery(OPENAI_API_KEY)

@app.post("/ask")
async def ask(request: Request):
    data = await request.json()
    question = data.get("question")
    try:
        response = webquery.ask(question)
        return {"response": response}
    except Exception as e:
        return {"error": str(e)}, 500


@app.post("/ingest")
async def ingest(request: Request):
    data = await request.json()
    url = data.get("url")
    response = webquery.ingest(url)
    return {"response": response}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
