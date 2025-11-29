FROM python:3.12-slim

# Avoid .pyc and force unbuffered logs
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Install deps
RUN pip install --no-cache-dir --upgrade pip
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app
COPY app ./app

# Expose app port
EXPOSE 3000

# Default command
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "3000"]
