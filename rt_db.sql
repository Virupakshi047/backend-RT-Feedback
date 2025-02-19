CREATE TABLE employees (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    band_level ENUM('B6', 'B7', 'B8') NOT NULL,
    manager_id BIGINT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);

INSERT INTO employees (name, email, password_hash, band_level, manager_id) VALUES
('Alice Johnson', 'alice@example.com', 'hashed_password', 'B6', NULL),
('Bob Smith', 'bob@example.com', 'hashed_password', 'B7', 1),
('Charlie Brown', 'charlie@example.com', 'hashed_password', 'B8', 2);

CREATE TABLE admins (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO admins (name, email, password_hash) VALUES
('Admin User', 'admin@example.com', 'hashed_password');

CREATE TABLE monthly_feedback (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    emp_id BIGINT NOT NULL,
    feedback_month VARCHAR(7) NOT NULL, -- Stores 'MM-YYYY'
    attachment_url VARCHAR(500) DEFAULT NULL,
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_submitted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (emp_id) REFERENCES employees(id) ON DELETE CASCADE,
    UNIQUE (emp_id, feedback_month)
);


INSERT INTO monthly_feedback (emp_id, feedback_month, is_submitted) VALUES
(1, '06-2024', TRUE),
(2, '06-2024', TRUE),
(3, '06-2024', FALSE);


CREATE TABLE rt_cycles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    start_date DATE NOT NULL,  -- Stores the first day of the start month
    end_date DATE NOT NULL,    -- Stores the first day of the end month
    status ENUM('ACTIVE', 'COMPLETED') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO rt_cycles (start_date, end_date, status) VALUES
('2024-06-01', '2024-12-01', 'ACTIVE');


CREATE TABLE rt_submissions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    cycle_id BIGINT NOT NULL,
    emp_id BIGINT NOT NULL,
    additional_comments TEXT,
    calculated_score DECIMAL(4,2) NOT NULL,
    final_grade VARCHAR(10),
    admin_override_score DECIMAL(4,2) NULL,
    admin_comments TEXT NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cycle_id) REFERENCES rt_cycles(id) ON DELETE CASCADE,
    FOREIGN KEY (emp_id) REFERENCES employees(id) ON DELETE CASCADE,
    UNIQUE (cycle_id, emp_id)
);


INSERT INTO rt_submissions (cycle_id, emp_id, calculated_score, final_grade, is_approved) VALUES
(1, 1, 8.5, 'A', FALSE),
(1, 2, 7.8, 'B+', FALSE);


CREATE TABLE feedback_scores (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    feedback_id BIGINT NOT NULL,
    param_id BIGINT NOT NULL,
    score DECIMAL(4,2) CHECK (score >= 0 AND score <= 10),
    comments TEXT,
    FOREIGN KEY (feedback_id) REFERENCES monthly_feedback(id) ON DELETE CASCADE,
    FOREIGN KEY (param_id) REFERENCES feedback_parameters(id) ON DELETE CASCADE
);


CREATE TABLE feedback_parameters (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    param_name VARCHAR(255) NOT NULL,
    band_level ENUM('B6', 'B7', 'B8') NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

INSERT INTO feedback_parameters (param_name, band_level) VALUES
('Leadership', 'B6'),
('Communication', 'B7'),
('Technical Skills', 'B8');


CREATE TABLE rt_approvals (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    rt_submission_id BIGINT NOT NULL,
    admin_id BIGINT NOT NULL,
    approval_status ENUM('APPROVED', 'REJECTED', 'PENDING') DEFAULT 'PENDING',
    comments TEXT,
    approved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rt_submission_id) REFERENCES rt_submissions(id) ON DELETE CASCADE,
    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
);


CREATE TABLE attachments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    feedback_id BIGINT NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (feedback_id) REFERENCES monthly_feedback(id) ON DELETE CASCADE
);


CREATE INDEX idx_employee_band ON employees (band_level);
CREATE INDEX idx_feedback_month ON monthly_feedback (feedback_month);
CREATE INDEX idx_rt_submissions ON rt_submissions (emp_id, cycle_id);
CREATE INDEX idx_rt_approvals ON rt_approvals (approval_status);
