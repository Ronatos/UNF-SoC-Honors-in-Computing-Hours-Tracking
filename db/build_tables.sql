CREATE TABLE accounts (
    account_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username TINYTEXT NOT NULL,
    password TINYTEXT NOT NULL,
    email_address TINYTEXT NOT NULL,
    n_number VARCHAR(9) NOT NULL,
    first_name TINYTEXT NOT NULL,
    last_name TINYTEXT NOT NULL ,
    role VARCHAR(15) NOT NULL
);