
USE employees_db;

-- update query --
UPDATE employee
SET manager_id = new_manager_id
WHERE id = employee_id;

-- joining tables include the employee and role table --
SELECT employee.id, employee.first_name, employee.last_name, role.title AS role_title
FROM employee
JOIN role.id ON employee.role_id = role.id
WHERE employee.manager_id = manager_id;

-- joining the department and employee table --
SELECT employee.id, employee.first_name, employee.last_name, role.title AS role_title
FROM employee
JOIN role.id ON employee.role_id = role.id
WHERE role.department_id = department_id;

-- deleting from department, role and employee tables, respectively --
DELETE FROM department WHERE id = department_id;
DELETE FROM role WHERE id = role_id;
DELETE FROM employee WHERE id = employee_id;

-- sum of the salaries of all the employees to be viewed AS total_budget --
SELECT department.name AS department_name, SUM(role.salary) AS total_budget
FROM department
JOIN role.id ON department.id = role.department_id
JOIN employee ON role.id = employee.role_id
WHERE department.id = department_id
GROUP BY department.name;