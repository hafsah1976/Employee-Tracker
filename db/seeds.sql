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
    (01, 'John', 'Doe', 1, NULL),
    (02, 'Jane', 'Smith', 1, 1),
    (03, 'Mike', 'Chan', 2, 1),
    (04, 'Ashley', 'Rodriguez', 2, NULL),
    (05, 'Michael', 'Johnson', 3, 2),
    (06, 'Emily', 'Williams', 3, 2),
    (07, 'Mohammad', 'Khan', 4, NULL),
    (08, 'Kevin', 'Tupik', 4, 3),
    (09, 'Malia', 'Brown', 5, 3),
    (10, 'Sarah', 'Lourd', 5, NULL),
    (11, 'Tom', 'Allen', 6, 4),
    (12, 'Mila', 'Cruise', 6, 4),
    (13, 'Nina', 'Adams', 7, NULL),
    (14, 'Peter', 'Parker', 7, 5),
    (15, 'Michael', 'Scott', 8, 5),
    (16, 'Kunal', 'Singh', 8, NULL),
    (17, 'Abraham', 'Frost', 9, 6),
    (18, 'Jean', 'Grey', 9, 6),
    (19, 'Clark', 'Kent', 10,1),
    (20, 'Bruce','Wayne', 10, 3),
    (21, 'Diana','Wonder', 11, 6),
    (22, 'Paula','Carlos', 11, 6),
    (23, 'Richard', 'Gray', 12, 1),
    (24, 'Liam', 'Neeson', 12, 2),
    (25, 'Bernard', 'Miller', 13, 3),
    (26, 'Jackie' ,'Brown', 13, 4),
    (27, 'Michael', 'Harrison', 14, 5),
    (28, 'Neo','Anderson', 14, 6),
    (29, 'Louis', 'Biden', 15, 1),
    (30, 'Damien', 'Wayne', 15, 2),
    (31, 'Margo', 'Stark', 16, 3),
    (32, 'Cara','Johnson', 16, 4);