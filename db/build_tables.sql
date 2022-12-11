CREATE TABLE accounts (
    account_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email_address VARCHAR(18) NOT NULL, -- must be n########@unf.edu
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    role VARCHAR(8) NOT NULL, -- student, admin, or faculty
    account_status VARCHAR(255) NOT NULL, -- active, email unverified, pending admin approval
    UNIQUE (username)
);

CREATE TABLE email_verification_codes (
    code_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    account_id INT NOT NULL,
    code VARCHAR(8) NOT NULL,
    creation_time DATETIME NOT NULL DEFAULT NOW(),
    FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);

CREATE TABLE entries (
    entry_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    faculty_id INT NOT NULL,
    event_name VARCHAR(255) NOT NULL,
    event_date DATE NOT NULL,
    time_accrued TIME NOT NULL,
    latest_comment VARCHAR(255),
    latest_commentor_id INT,
    entry_status VARCHAR(255), -- approved, denied, unreviewed
    FOREIGN KEY (student_id) REFERENCES accounts(account_id),
    FOREIGN KEY (faculty_id) REFERENCES accounts(account_id),
    FOREIGN KEY (latest_commentor_id) REFERENCES accounts(account_id)
);

CREATE TABLE notifications (
    notification_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    account_id INT NOT NULL,
    message VARCHAR(255) NOT NULL,
    link VARCHAR(255) NOT NULL,
    FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);

CREATE TABLE report_filters (
    report_filter_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    filter_options TEXT NOT NULL, -- JSON objects. these may eventually be replaced by individual fields corresponding to key:value pairs
    FOREIGN KEY (admin_id) REFERENCES accounts(account_id)
);

CREATE TABLE sessions (
    session_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    account_id INT NOT NULL,
    session_token INT UNSIGNED NOT NULL,
    expiration_time DATETIME NOT NULL DEFAULT NOW(), -- sessions need to expire 30 minutes after creation. mysql doesn't support functions in datetime initilization, so it must be set manually afterwards
    FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);