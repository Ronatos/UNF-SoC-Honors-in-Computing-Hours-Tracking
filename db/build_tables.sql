CREATE TABLE accounts (
    account_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email_address VARCHAR(18) NOT NULL, -- must be n########@unf.edu
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
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
    event_date DATE NOT NULL, -- but there could be a multi-day event. add start and end
    time_accrued INT NOT NULL, -- hours requested
    latest_comment VARCHAR(255),
    entry_status VARCHAR(255), -- Approved, Denied, Status Pending
    semester VARCHAR(255), -- Fall, Spring, Summer
    FOREIGN KEY (student_id) REFERENCES accounts(account_id),
    FOREIGN KEY (faculty_id) REFERENCES accounts(account_id)
);

CREATE TABLE notifications (
    notification_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    account_id INT NOT NULL,
    message VARCHAR(255) NOT NULL,
    link VARCHAR(255) NOT NULL,
    FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);

CREATE TABLE password_reset_codes (
    code_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    account_id INT NOT NULL,
    code VARCHAR(8) NOT NULL,
    creation_time DATETIME NOT NULL DEFAULT NOW(),
    FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);

CREATE TABLE report_filters (
    report_filter_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    filter_options TEXT NOT NULL, -- JSON objects. these may eventually be replaced by individual fields corresponding to key:value pairs
    FOREIGN KEY (admin_id) REFERENCES accounts(account_id)
);
