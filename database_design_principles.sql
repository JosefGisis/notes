-- There are three forms of data integrity:
-- 1. Entity Integrity
-- 2. Referential Integrity
-- 3. Domain Integrity

-- Entity Integrity ensures that each entity is unique and can be identified by a primary key.
CREATE TABLE users_with_entity_integrity (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

-- Referential Integrity ensures that a foreign key in one table corresponds to a primary key in another table.
CREATE TABLE users_with_referential_integrity (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    user_id INT(11) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users_with_entity_integrity(id)
);

-- Domain integrity ensures that each column has a valid value.
CREATE TABLE users_with_domain_integrity (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE, -- Email must be unique
    password VARCHAR(255) NOT NULL, -- Should be long enough for hashed passwords
    age INT(3) NOT NULL CHECK (age >= 0 AND age <= 120) -- Age must be between 0 and 120
);

-- Atomic values are values that cannot be broken down anymore (similar to the common use for atomic, and the basis for the work atom)
-- This means it would be a bad idea to use an array of values
-- If we want to have something similar to an array we could use references or a lookup table.
-- A lookup table is a table intended to provide options for users 


