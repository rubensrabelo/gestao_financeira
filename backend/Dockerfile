FROM python:3.12-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir uv

COPY pyproject.toml uv.lock ./

RUN python -m venv /venv
ENV PATH="/venv/bin:$PATH"

RUN uv pip install -e ".[dev]"

COPY . .

CMD ["uvicorn", "main:app", "--host", "127.0.0.1", "--port", "8000"]