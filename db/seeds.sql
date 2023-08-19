--inserting data for departments--
INSERT INTO department (id, name)
VALUES
    (2, 'Engineering'),
    (1, 'Sales'),
    (5, 'Marketing'),
    (3, 'Finance'),
    (4, 'Legal'),
    (6, 'IT');

--inserting roles data for each department--
INSERT INTO role (id, title, salary, department_id)
VALUES
    (1, 'Lead Engineer', 80000.00, 2),
    (2, 'Sales Representative', 60000.00, 1),
    (3, 'Marketing Specialist', 80000.00, 5)
    (4, 'Sales Lead', 100000.00, 1)
    (5, 'Software Engineer', 120000.00, 2),
    (6, 'Account Manager', 160000.00, 3),
    (7, 'Accountant', 125000.00, 3)
    (8, 'Legal Team Lead', 250000.00, 4)
    (9, 'Lawyer', 190000.00, 4)
    (10, 'Data Analyst', 60000.00, 3),
    (11, 'Customer Support Specialist', 55000.00, 4),
    (12, 'Product Manager', 75000.00, 5);
    (13, 'Human Resources Manager', 65000.00, 4),
    (14, 'Graphic Designer', 120000.00, 6),
    (15, 'Quality Assurance Engineer', 90000.00, 2);
    (16, 'IT Technician', 100000.00, 6),


--inserting employees information--
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
    (1, 'John', 'Doe', 1, NULL),
    (2, 'Jane', 'Smith', 1, 1),
    (3, 'Mike', 'Chan', 1, 1),
    (4, 'Ashley', 'Rodriguez', 2, NULL),
    (5, 'Michael', 'Johnson', 2, 2),
    (6, 'Emily', 'Williams', 2, 2),
    (7, 'Mohammad', 'Khan', 3, NULL),
    (8, 'Kevin', 'Tupik', 3, 3),
    (9, 'Malia', 'Brown', 3, 3),
    (10, 'Sarah', 'Lourd', 4, NULL),
    (11, 'Tom', 'Allen', 4, 4),
    (12, 'Mila', 'Cruise', 4, 4),
    (13, 'Nina', 'Adams', 5, NULL),
    (14, 'Peter', 'Parker', 5, 5),
    (15, 'Michael', 'Scott', 5, 5),
    (16, 'Kunal', 'Singh', 6, NULL),
    (17, 'Abraham', 'Frost', 6, 6),
    (18, 'Jean', 'Grey', 6, 6);





