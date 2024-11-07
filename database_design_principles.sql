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

-- A lookup table is a table intended to provide options for other table columns.
CREATE TABLE language_lookup (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    name text NOT NULL UNIQUE,
    country_of_origin text
);

-- If we want to allow multiple options (allow users to enter multiple languages) we would use a junction table (see later)

-- Superkey and candidate key
-- A super key combines multiple columns to uniquely identify a record. A candidate key is just the minimal
-- amount columns required to uniquely identify a record
CREATE TABLE users_with_superkey_and_candidate_key (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    language_id INT(11) NOT NULL,
    FOREIGN KEY (language_id) REFERENCES language_lookup(id)
);

-- Superkey: id, username, email, language_id
-- Candidate key: id, email

-- Primary key: is a candidate key that is the primary means of identifying a record.
-- Alternative key: is a candidate key that is not the primary means of identifying a record (like a username column that is unique)
-- Surrogate key: is a primary key that is not based on the data in the table (like an auto incrementing id)
-- Natural key: is a primary key that is based on the data in the table (like a username column that is unique)
CREATE TABLE users_with_key_examples (
    -- Primary key, and superkey, but not a natural key
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    -- Alternative key, and superkey, but is a natural key
    username VARCHAR(255) NOT NULL UNIQUE,
    -- Alternative key, and superkey, but is a natural key
    email VARCHAR(255) NOT NULL UNIQUE,
    -- Not a key at all as it cannot identify a record uniquely
    language_id INT(11) NOT NULL,
    FOREIGN KEY (language_id) REFERENCES language_lookup(id)
);

-- Natural keys mays be useful for lookup tables where the data is not a secret. 

-- Foreign key constraints:
-- Foreign key constraints are used to enforce referential integrity between two tables by
-- updating or deleting references to a parent table.
CREATE TABLE user_preferences (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    user_id INT(11) NOT NULL,
    language_id INT(11) NOT NULL,
    allow_email_notifications BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users_with_entity_integrity(id) ON UPDATE CASCADE ON DELETE SET NULL, -- If the user is deleted, set the user_id to NULL
    FOREIGN KEY (language_id) REFERENCES language_lookup(id) ON UPDATE NO ACTION ON DELETE SET NULL -- If the language is deleted, set the language_id to NULL
);

-- Simple key: a key that consists of a single column. We have seen many examples of this.

-- Composite key: a key that consists of multiple columns.
CREATE TABLE users_with_composite_key (
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY (username, email)
);

-- Compound key: same thing a composite key except it is a foreign key.
CREATE TABLE table_with_compound_key (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    FOREIGN KEY (username, email) REFERENCES users_with_composite_key(username, email)
);

-- RELATIONSHIPS!
-- ONE TO ONE:
-- -- A single record in one table is related to a single record in another table.
CREATE TABLE one_to_one_parent (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);
CREATE TABLE one_to_one_child (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    parent_id INT(11) NOT NULL,
    FOREIGN KEY (parent_id) REFERENCES one_to_one_parent(id)
);

-- ONE TO MANY:
-- -- A single record in one table is related to many records in another table.
-- In a one to many relationship, the parent table often is on the one side and the child table is on the many side.
CREATE TABLE one_to_many_parent (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);
CREATE TABLE one_to_many_child (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    parent_id INT(11) NOT NULL,
    FOREIGN KEY (parent_id) REFERENCES one_to_many_parent(id)
);

-- MANY TO MANY:
-- -- Many records in one table are related to many records in another table.
-- This requires a junction table. Junction tables hold relationships between two tables.
CREATE TABLE many_to_many_parent (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);
CREATE TABLE many_to_many_child (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    parent_id INT(11) NOT NULL
);
CREATE TABLE many_to_many_junction (
    parent_id INT(11) NOT NULL,
    child_id INT(11) NOT NULL,
    FOREIGN KEY (parent_id) REFERENCES many_to_many_parent(id),
    FOREIGN KEY (child_id) REFERENCES many_to_many_child(id)
);

-- NORMALIZATION!
-- Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity and facilitates data management.

-- First Normal Form (1NF): 
-- -- All columns must have an atomic value!

-- Second Normal From (2NF):
-- -- Follow First Normal Form.
-- -- No partial dependencies!
-- -- Meaning if there is a composite key, then all columns must depend of the combination of the key columns.
-- -- For example, if a composite key is made up of username and order_id then a column that contains information about the order should not be in that table because it only depends on the order_id.

-- Third Normal Form (3NF):
-- -- Follow Second Normal Form.
-- -- No transitive dependencies!
-- -- Meaning if there is a column that is only dependent on another column then it should be in a different table.
-- -- For example, if a table has a column for the color of an item and another column for the type of item, and the color only depends on the type of item, then the color column should be in a different table.

