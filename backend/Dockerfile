FROM python:3.12-slim

WORKDIR /app

# Instalar dependências do sistema necessárias
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Instalar uv
RUN pip install --no-cache-dir uv

# Copiar arquivos de dependências
COPY pyproject.toml uv.lock ./

# Criar ambiente virtual
RUN python -m venv /venv
ENV PATH="/venv/bin:$PATH"

# Compilar dependências para requirements.txt e instalar
RUN uv pip compile pyproject.toml -o requirements.txt && \
    uv pip install -r requirements.txt

# Copiar aplicação
COPY . .

# Executar aplicação
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]