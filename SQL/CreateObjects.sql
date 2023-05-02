-- PostgreSQL commants
-- disconnect all active user sessions
--SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = 'mydb' AND pid <> pg_backend_pid();
--DROP DATABASE mydb;
--CREATE DATABASE mydb;
-- Prisma commants
-- use:
-- npx prisma db pull
-- npx prisma generate
-- npx prisma migrate

--CREATE USER dev_user WITH PASSWORD 'passwort';
GRANT ALL PRIVILEGES ON DATABASE mydb TO dev_user;
CREATE SCHEMA IF NOT EXISTS dev;
-- set standard schema for user dev_user:
ALTER USER dev_user SET search_path = dev;

--DROP TABLE dev.users;
--DROP TABLE IF EXISTS dev.users;
CREATE TABLE dev.users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL
);