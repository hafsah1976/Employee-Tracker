-- inserting data for departments --
INSERT INTO department (id, department_name)
VALUES
    (2, 'Engineering'),
    (1, 'Sales'),
    (5, 'Marketing'),
    (3, 'Finance'),
    (4, 'Legal'),
    (6, 'IT');

-- inserting roles data for each department --
INSERT INTO role (id, title, salary, department_id)
VALUES
    (1, 'Lead Engineer', 80000.00, 2),
    (2, 'Sales Representative', 60000.00, 1),
    (3, 'Marketing Specialist', 80000.00, 5),
    (4, 'Sales Lead', 100000.00, 1),
    (5, 'Software Engineer', 120000.00, 2),
    (6, 'Account Manager', 160000.00, 3),
    (7, 'Accountant', 125000.00, 3),
    (8, 'Legal Team Lead', 250000.00, 4),
    (9, 'Lawyer', 190000.00, 4),
    (10, 'Data Analyst', 60000.00, 3),
    (11, 'Customer Support Specialist', 55000.00, 4),
    (12, 'Product Manager', 75000.00, 5),
    (13, 'Human Resources Manager', 65000.00, 4),
    (14, 'Graphic Designer', 120000.00, 6),
    (15, 'Quality Assurance Engineer', 90000.00, 2),
    (16, 'IT Technician', 100000.00, 6);


-- inserting employees information --
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
    (1, 'John', 'Doe', 1, NULL),
    (3, 'Mike', 'Chan', 4, NULL),
    (7, 'Mohammad', 'Khan', 6, NULL),
    (11, 'Tom', 'Allen', 8, NULL),
    (13, 'Nina', 'Adams', 12, NULL),
    (16, 'Kunal', 'Singh', 14, NULL),
    (2, 'Jane', 'Smith', 5, 1),
    (4, 'Ashley', 'Rodriguez', 2, 3),
    (5, 'Michael', 'Johnson', 3, 3),
    (6, 'Emily', 'Williams', 3, 3),
    (8, 'Kevin', 'Tupik', 7, 7),
    (9, 'Malia', 'Brown', 5, 1),
    (10, 'Sarah', 'Lourd', 16, 16),
    (12, 'Mila', 'Cruise', 9, 11),
    (14, 'Peter', 'Parker', 13, 11),
    (15, 'Michael', 'Scott', 8, 11),
    (17, 'Abraham', 'Frost', 15, 16),
    (18, 'Jean', 'Grey', 9, 11),
    (19, 'Clark', 'Kent', 10, 7),
    (20, 'Bruce', 'Wayne', 10, 7),
    (21, 'Diana', 'Wonder', 11, 11),
    (22, 'Paula', 'Carlos', 11, 11),
    (23, 'Richard', 'Gray', 12, 13),
    (24, 'Liam', 'Neeson', 12, 13),
    (25, 'Bernard', 'Miller', 13, 11),
    (26, 'Jackie', 'Brown', 13, 11),
    (27, 'Michael', 'Harrison', 14, 16),
    (28, 'Neo', 'Anderson', 14, 16),
    (29, 'Louis', 'Biden', 15, 1),
    (30, 'Damien', 'Wayne', 15, 1),
    (31, 'Margo', 'Stark', 16, 16),
    (32, 'Cara', 'Johnson', 16, 16);