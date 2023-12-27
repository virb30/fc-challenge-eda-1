DROP DATABASE IF EXISTS wallet;

CREATE DATABASE wallet;

CREATE TABLE wallet.clients (id varchar(255), name varchar(255), email varchar(255), created_at date, updated_at date);
CREATE TABLE wallet.accounts (id varchar(255), client_id varchar(255), balance int, created_at date, updated_at date);
CREATE TABLE wallet.transactions (id varchar(255), account_id_from varchar(255), account_id_to varchar(255), amount int, created_at date);


INSERT INTO wallet.clients (id, name, email, created_at, updated_at) VALUES ('418f7029-bd93-463b-ad60-34eea59f2855', 'John Doe', 'john@j.com', NOW(), NOW());
INSERT INTO wallet.clients (id, name, email, created_at, updated_at) VALUES ('7c40ea7e-74e8-4457-9786-170f4899a7c6', 'Jane Doe', 'jane@j.com', NOW(), NOW());

INSERT INTO wallet.accounts (id, client_id, balance, created_at, updated_at) VALUES ('e3fd4bc6-f76c-4f52-8546-08bfe453321c', '418f7029-bd93-463b-ad60-34eea59f2855', 1000, NOW(), NOW());
INSERT INTO wallet.accounts (id, client_id, balance, created_at, updated_at) VALUES ('aa463b9c-61d9-4436-ba5c-9c0e3ff6402e', '7c40ea7e-74e8-4457-9786-170f4899a7c6', 100, NOW(), NOW());
