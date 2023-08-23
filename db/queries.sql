USE employees_db;

UPDATE employee
SET manager_id = new_manager_id
WHERE id = employee_id;

SELECT employee.id, employee.first_name, employee.last_name, rolr.title AS role_title
FROM employee
JOIN role.id ON employee.role_id = role.id
WHERE employee.manager_id = manager_id;

SELECT employee.id, employee.first_name, employee.last_name, role.title AS role_title
FROM employee
JOIN role.id ON employee.role_id = role.id
WHERE role.department_id = department_id;

DELETE FROM department WHERE id = department_id;
DELETE FROM role WHERE id = role_id;
DELETE FROM employee WHERE id = employee_id;

SELECT department.name AS department_name, SUM(role.salary) AS total_budget
FROM department
JOIN role.id ON department.id = role.department_id
JOIN employee ON role.id = employee.role_id
WHERE department.id = department_id
GROUP BY department.name;
