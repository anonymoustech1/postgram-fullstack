# pull official base image
FROM python:3.10-alpine

# set work directory
WORKDIR /app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# install psycopg2 and image dependencies
RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev jpeg-dev zlib-dev

# install python dependencies
COPY requirements.txt /app/requirements.txt
RUN pip install --upgrade pip
RUN pip install -U setuptools
RUN pip install --no-cache-dir -r requirements.txt

# copy project
COPY . .

# expose port 8000
EXPOSE 8000

# run migrations then start server
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]