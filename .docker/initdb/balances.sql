DROP DATABASE IF EXISTS balances;

CREATE DATABASE balances;

CREATE TABLE balances.account_balances (id BIGINT PRIMARY KEY AUTO_INCREMENT, account_id varchar(255), balance int, created_at date, updated_at date);

INSERT INTO balances.account_balances (account_id, balance, created_at, updated_at) VALUES ('e3fd4bc6-f76c-4f52-8546-08bfe453321c', 1000, NOW(), NOW());
INSERT INTO balances.account_balances (account_id, balance, created_at, updated_at) VALUES ('aa463b9c-61d9-4436-ba5c-9c0e3ff6402e', 100, NOW(), NOW());