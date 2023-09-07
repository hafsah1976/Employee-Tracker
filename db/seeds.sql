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
INSERT INTO role (title, salary, department_id)
VALUES
    ('Lead Engineer', 80000.00, 2),
    ('Sales Representative', 60000.00, 1),
    ('Marketing Specialist', 80000.00, 5),
    ('Sales Lead', 100000.00, 1),
    ('Software Engineer', 120000.00, 2),
    ('Account Manager', 160000.00, 3),
    ('Accountant', 125000.00, 3),
    ('Legal Team Lead', 250000.00, 4),
    ('Lawyer', 190000.00, 4),
    ('Data Analyst', 60000.00, 3),
    ('Customer Support Specialist', 55000.00, 4),
    ('Product Manager', 75000.00, 5),
    ('Human Resources Manager', 65000.00, 4),
    ('Graphic Designer', 120000.00, 6),
    ('Quality Assurance Engineer', 90000.00, 2),
    ('IT Technician', 100000.00, 6);


-- inserting employees information --
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Smith', 5, 1),
    ('Mike', 'Chan', 4, NULL),
    ('Ashley', 'Rodriguez', 2, 3),
    ('Michael', 'Johnson', 3, 3),
    ('Emily', 'Williams', 3, 3),
    ('Mohammad', 'Khan', 6, NULL),
    ('Kevin', 'Tupik', 7, 7),
    ('Malia', 'Brown', 5, 1),
    ('Sarah', 'Lourd', 16, 5),
    ('Tom', 'Allen', 8, NULL),
    ('Mila', 'Cruise', 9, 11),
    ('Nina', 'Adams', 12, NULL),
    ('Peter', 'Parker', 13, 11),
    ('Michael', 'Scott', 8,11),
    ('Kunal', 'Singh', 14, NULL),
    ('Abraham', 'Frost', 15, 16),
    ('Jean', 'Grey', 9, 11),
    ('Clark', 'Kent', 10, 7),
    ('Bruce','Wayne', 10, 7),
    ('Diana','Wonder', 11, 11),
    ('Paula','Carlos', 11, 11),
    ('Richard', 'Gray', 12, 13),
    ('Liam', 'Neeson', 12, 13),
    ('Bernard', 'Miller', 13, 11),
    ('Jackie' ,'Brown', 13, 11),
    ('Michael', 'Harrison', 14, 16),
    ('Neo','Anderson', 14, 16),
    ('Louis', 'Biden', 15, 1),
    ('Damien', 'Wayne', 15,1),
    ('Margo', 'Stark', 16, 5),
    ('Cara','Johnson', 16, 5);