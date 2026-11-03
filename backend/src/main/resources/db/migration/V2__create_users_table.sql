-- Flyway migration: create vehicles table with unique constraints
CREATE DATABASE IF NOT EXISTS vehicledb;
use vehicledb;

CREATE TABLE IF NOT EXISTS users (
    id       BIGINT       NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role     VARCHAR(50)  NOT NULL
);