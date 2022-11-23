CREATE TABLE accounts (
    account_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email_address VARCHAR(18) NOT NULL, -- must be n########@unf.edu
    role VARCHAR(8) NOT NULL, -- student, admin, or faculty
    UNIQUE (username)
);

CREATE TABLE entries (
    entry_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL FOREIGN KEY REFERENCES accounts(account_id),
    faculty_id INT NOT NULL FOREIGN KEY REFERENCES accounts(account_id),
    event_name VARCHAR(255) NOT NULL,
    event_date DATE NOT NULL,
    time_accrued TIME NOT NULL,
    latest_comment VARCHAR(255),
    latest_commentor_id INT FOREIGN KEY REFERENCES accounts(account_id),
    entry_status VARCHAR(255) -- approved, denied, unreviewed
);

