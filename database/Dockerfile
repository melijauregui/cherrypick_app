FROM mysql:latest

# Copy the .database.env file to the container
COPY .env /docker-entrypoint-initdb.d/.env
# Load the environment variables
RUN set -a && . /docker-entrypoint-initdb.d/.env && set +a

# Copy the database schema to the container
COPY init/* /docker-entrypoint-initdb.d/
RUN chown -R mysql:mysql /docker-entrypoint-initdb.d/
