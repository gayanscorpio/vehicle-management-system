-- Flyway migration: create vehicles table with unique constraints
CREATE DATABASE IF NOT EXISTS vehicledb;
use vehicledb;

CREATE TABLE vehicles (
    id CHAR(36) NOT NULL,
    vin VARCHAR(17) NOT NULL,
    plate_number VARCHAR(20) NOT NULL,
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    color VARCHAR(50),
    owner_id CHAR(36),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    version BIGINT,
    PRIMARY KEY (id),
    CONSTRAINT uk_vehicle_vin UNIQUE (vin),
    CONSTRAINT uk_vehicle_plate UNIQUE (plate_number)
);