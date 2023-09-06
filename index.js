// Importing the required modules and setting up the SQL database connection
const mysql = require("mysql2/promise");
// const express = require("express");
// const app = express();
// const PORT = process.env.PORT || 3001;
const inquirer = require("inquirer");
const { table } = require('table'); // Import console.table
//Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

//connection to our db
const connection = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "S@@dkh@n",
    database: "employees_db",
  },
  console.log(`Successfully connected to the Employees Database.`)
);


connection.createConnection(function(error){
  if (error) throw error;
  console.log(`Connected as ID ${connection.threadId}`);
  console.log(`
    ███████╗███╗   ███╗██████╗ ██╗      ██████╗ ██╗   ██╗███████╗███████╗    ███╗   ███╗ █████╗ ███╗   ██╗ █████╗  ██████╗ ███████╗██████╗ 
    ██╔════╝████╗ ████║██╔══██╗██║     ██╔═══██╗╚██╗ ██╔╝██╔════╝██╔════╝    ████╗ ████║██╔══██╗████╗  ██║██╔══██╗██╔════╝ ██╔════╝██╔══██╗
    █████╗  ██╔████╔██║██████╔╝██║     ██║   ██║ ╚████╔╝ █████╗  █████╗      ██╔████╔██║███████║██╔██╗ ██║███████║██║  ███╗█████╗  ██████╔╝
    ██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██║   ██║  ╚██╔╝  ██╔══╝  ██╔══╝      ██║╚██╔╝██║██╔══██║██║╚██╗██║██╔══██║██║   ██║██╔══╝  ██╔══██╗
    ███████╗██║ ╚═╝ ██║██║     ███████╗╚██████╔╝   ██║   ███████╗███████╗    ██║ ╚═╝ ██║██║  ██║██║ ╚████║██║  ██║╚██████╔╝███████╗██║  ██║
    ╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝    ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝
   `);
  // Run the main application //this will be the first prompt
  admin();
});

// Defining the function that initiates the app

function admin() {
  inquirer
    .createPromptModule([
      {
        type: "list",
        name: "taskChoice",
        message: "What would you like to do?",
        choices: [
          "1. View Employees by Department",
          "2. View Employees By Manager",
          "3. Add Employee",
          "4. Delete Employee",
          "5. Update Employee Role",
          "6. Add Employee Role",
          "7. View Employee Count",
          "8. View Budget",
          "9. Exit.",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.taskChoice) {
        case "1. View Employees by Department":
          //  viewing all employees grouped by department
          viewEmployeesByDepartment();
          break;
        case "2. View Employees By Manager":
          //  view employees grouped by manager
          viewEmployeesByManager();
          break;
        case "3. Add Employee":
          // add an employee
          addEmployee();
          break;
        case "4. Delete Employee":
          //  delete an employee
          deleteEmployees();
          break;
        case "5. Update Employee Role":
          // update an existing employee's role
          updateEmployeeRole();
          break;
        case "6. Add Employee Role":
          //  add a new role for potential employees
          addEmployeeRole();
          break;
        case "7. View Employee Count":
          //  view the exisiting number of employees
          viewEmployeesCount();
          break;
        case "8. View Department Budgets":
          //  View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
          viewDepartmentBudgets();
          break;
        case "9. Exit.":
          // Exit the program
          console.log("Thank you for using Employee Managing System.");
          connection.end();
          break;
        default:
          //  invalid input
          console.log("Invalid Input. Please Choose a task from the list.");
          inquirer.createPromptModule();
          break;
      }
    });
}

//this function is used to view all the employees under a particular manager.

function viewEmployeesByManager() {
  console.log("You are viewing Employees By Manager\n");

  //creates a query string that is used to select all the relevant information about the employees and their managers from the database.
  var query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM employee e
LEFT JOIN role r
ON e.role_id = r.id
LEFT JOIN department d ON d.id = r.department_id
LEFT JOIN employee m ON m.id = e.manager_id`;

  //executes the query and passes the results to the callback function.
  connection.query(query, function (error, results) {
    //checks if there was an error executing the query.
    if (error) throw error;
    //logs the results of the query to the console in a table format.
    console.table(results);
    console.log("You just viewed Employees.\n");
    // calls the admin function, which returns the user to the main menu.
    admin();
  });
}

//this function is used to view all the employees grouped by department.

function viewEmployeesByDepartment() {
  //confirmation function is being executed
  console.log("You are viewing Employees grouped by Department\n");
  //creates a query string that is used to select all the relevant information about the employees and their departments from the database.
  var query = `SELECT d.id, d.name, r.salary AS Budget
    FROM employee e
    LEFT JOIN role r
    ON e.role_id=r.id
    LEFT JOIN department d
    N d.id=r.department_id
    GROUP BY d.id, d.name`;

  //executes the query and passes the results to the callback function.
  connection.query(query, function (error, results) {
    //checks if there was an error executing the query.
    if (error) throw error;
    // creates an array of objects, each representing a department, that the user can choose from.
    const departments = results.map((data) => ({
      value: data.id,
      name: data.name,
    }));
    console.log("You just viewed Employees by department.\n");
    console.table(results);
    // calls the department Prompts function, which prompts the user to choose a department
    departmentPrompts(departments);
  });
}
function departmentPrompts(departments) {
  // prompts the user to choose a department
  inquirer
    .prompt([
      {
        type: "list",
        name: "department",
        message: "Please select a Department:",
        choices: departments,
      },
    ])
    .then(function (answer) {
      // console indicating which department the user chose.
      console.log("You chose " + answer.department);
      var query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department 
          FROM employee e
          JOIN role r
          ON e.role_id = r.id
          JOIN department d
          ON d.id = r.department_id
          WHERE d.id = ?`;

          connection.query(query, answer.department, function (error, res) {
        if (error) throw err;

        console.table("View Response ", res);
        console.log(
          res.affectedRows + "You viewed employees grouped by departments!\n"
        );

        admin();
      });
    });
}

function addEmployee() {
  console.log("Please follow the prompts to insert employee information.");
  var query = `SELECT r.id, r.title, r.salary
    FROM role r`;
    connection.query(query, function (error, results) {
    if (error) throw error;
    const Roles = results.map(({ id, title, salary }) => ({
      value: id,
      title: `${title}`,
      salary: `${salary}`,
    }));
    console.table(results);
    console.log("Please follow the prompts to insert roles.");
    insertRolesPrompt(Roles);
  });
}

function insertRolesPrompt(Roles) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Please enter employee's first name: ",
      },
      {
        type: "input",
        name: "last_name",
        message: "Please enter employee's last name: ",
      },
      {
        type: "list",
        name: "role",
        message: "Please enter employee's role: ",
        choices: Roles,
      },
    ])
    .then(function (answer) {
      console.log(answer);

      var query = `INSERT INTO employee SET ?`;
      // when done entering employee information, insert something new into the database with that information
      connection.query(
        query,
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role,
          manager_id: answer.manager_Id,
        },
        function (error, results) {
          if (error) throw error;

          console.log(
            results.insertedRows +
              "You have successfully inserted new information!\n"
          );
          console.table(results);

          admin();
        }
      );
    });
}

function deleteEmployees() {
  console.log("You are now viewing information to delete an employee.");

  var query = `SELECT e.id, e.first_name, e.last_name
        FROM employee e`;

        connection.query(query, function (error, results) {
    if (error) throw error;
    //creating employees array to selecct and delete an employee
    const employeesList = results.map(({ id, first_name, last_name }) => ({
      value: id,
      name: `${id} ${first_name} ${last_name}`,
    }));

    console.table(results);
    console.log("Please follow the prompts to delete an Employee(s)!\n");

    deleteEmployeesPrompts(employeesList);
  });
}

// User views the employee list, deletes an employee, admin() prompts module iterates
function deleteEmployeesPrompts(employeesList) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "emp_ID",
        message: "Please select which employee you would like to remove: ",
        choices: employeesList,
      },
    ])
    .then(function (answer) {
      var query = `DELETE FROM employee WHERE ?`;
      connection.query(query, { id: answer.emp_ID }, function (error, results) {
        if (error) throw error;

        console.log(
          results.affectedRows + "You have successfully deleted an employee!\n"
        );
        console.table(results);

        admin();
      });
    });
}

//Update An Employee Role / UPDATE,
function updateEmployeeRole() {
  employeesList();
}

function employeesList() {
  console.log("You are now viewing to UPDATE an employee's role");
  var query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employee e
  JOIN role r
	ON e.role_id = r.id
  JOIN department d
  ON d.id = r.department_id
  JOIN employee m
	ON m.id = e.manager_id`;
  connection.query(query, function (error, results) {
    if (error) throw error;

    const chooseEmployee = results.map(({ id, first_name, last_name }) => ({
      value: id,
      name: `${first_name} ${last_name}`,
    }));

    console.log("You are viewing the list of employees to Update a role!\n");
    console.table(results);

    rolesArray(chooseEmployee);
  });
}

function rolesArray(chooseEmployee) {
  console.log("You are now viewing employees to Update a role");
  let chooseRole;

  var query = `SELECT r.id, r.title, r.salary 
        FROM role r`;

  connection.query(query, function (error, results) {
    if (error) throw error;

    chooseRole = results.map(({ id, title, salary }) => ({
      value: id,
      title: `${title}`,
      salary: `${salary}`,
    }));
    console.log("You are viewing to choose an employee to Update a role!\n");
    console.table(results);

    employeeRolesPrompt(chooseEmployee, chooseRole);
  });
}

function employeeRolesPrompt(chooseEmployee, chooseRole) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "emp_ID",
        message: "Please select an employee to update their role:- ",
        choices: chooseEmployee,
      },
      {
        type: "list",
        name: "role_ID",
        message:
          "Please select a new role for the employee to update their current: ",
        choices: chooseRole,
      },
    ])
    .then(function (answer) {
      var query = `UPDATE employee SET role_id = ? WHERE id = ?`;
      connection.query(
        query,
        [answer.role_ID, answer.emp_ID],
        function (error, results) {
          if (error) throw error;
          console.log(
            results.affectedRows + "You have successfully updated a role!"
          );
          console.table(results);

          admin();
        }
      );
    });
}

function addEmployeeRole() {
  var query = `SELECT d.id, d.name, r.salary AS budget
          FROM employee e
          JOIN role r
          ON e.role_id = r.id
          JOIN department d
          ON d.id = r.department_id
          GROUP BY d.id, d.name`;

          connection.query(query, function (error, results) {
    if (error) throw error;

    // (callbackfn: (value: T, index: number, array: readonly T[]) => U, thisArg?: any)
    const _Departments = res.map(({ id, name }) => ({
      value: id,
      name: `${id} ${name}`,
    }));

    console.table(results);
    console.log("Please follow the prompts to insert a Role!");

    addEmployeeRolePrompts(_Departments);
  });
}

function addEmployeeRolePrompts(_Departments) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "Please enter the role title you want to add:",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "Please assign a salary to the role you have entered above:",
      },
      {
        type: "list",
        name: "department_ID",
        message: "Please choose a Department you want to add this role to:",
        choices: _Departments,
      },
    ])
    .then(function (answer) {
      var query = `INSERT INTO role SET ?`;

      connection.query(
        query,
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.department_ID,
        },
        function (error, results) {
          if (error) throw error;

          console.table(results);
          console.log(
            "You have successfully inserted a new employee Role in your database!"
          );
          // call admin function again to view the tasks list for the user
          admin();
        }
      );
    });
}

// Function to fetch and display the employee count
function viewEmployeesCount() {
  // Querying to get the employee count
  var countQuery = "SELECT COUNT(*) AS employee_count FROM employee";
  connection.query(countQuery, (error, countResults) => {
    if (error) {
      console.error("Error fetching employees count:", error);
      return;
    }

    let employeeCount = countResults[0].employee_count;

    // Display the employee count in a table
    const data = [{ "Total Number of Employees": employeeCount }];
    console.table(data);
    // call admin function again to view the tasks list for the user
    admin();
  });
}

// Function to fetch and display the total budget of each department
async function viewDepartmentBudgets() {
  try {
    // SQL query to view the budget by department
    const query = `
      SELECT department.name AS department_name, SUM(role.salary) AS total_budget
      FROM department
      JOIN role ON department.id = role.department_id
      JOIN employee ON role.id = employee.role_id
      GROUP BY department.name;
    `;

    console.log('\nFetching Department Budgets...\n');

    // Executing the query
    const [budgetRows] = await connection.execute(query);

    // Display the budget by department using console.table
    const data = budgetRows.map((row) => ({
      'Department Name': row.department_name,
      'Total Budget': row.total_budget,
    }));

    console.table(data);
  } catch (error) {
    console.error("Error viewing departments budget:", error); // Log the error message
  } finally {
    admin();
  }
}

admin();
