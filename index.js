// Importing the required modules and setting up the SQL database connection
const inquirer = require("inquirer");
const { table } = require("table"); // Import console.table
const mysql = require("mysql2");

const connection = mysql.createConnection(
  {
    host: "localhost",
    // port: 3001,
    user: "root",
    password: "S@@dkh@n",
    database: "employees_db",
  }
  // console.log("Successfully Connected to the Employees Database.")
);
connection.connect(function (error) {
  if (error) throw error;
});
// Defining the function that initiates the app
console.log(`

░█▀▀▀ ░█▀▄▀█ ░█▀▀█ ░█─── ░█▀▀▀█ ░█──░█ ░█▀▀▀ ░█▀▀▀ 　 ░█▀▄▀█ ─█▀▀█ ░█▄─░█ ─█▀▀█ ░█▀▀█ ░█▀▀▀ ░█▀▀█ 
░█▀▀▀ ░█░█░█ ░█▄▄█ ░█─── ░█──░█ ░█▄▄▄█ ░█▀▀▀ ░█▀▀▀ 　 ░█░█░█ ░█▄▄█ ░█░█░█ ░█▄▄█ ░█─▄▄ ░█▀▀▀ ░█▄▄▀ 
░█▄▄▄ ░█──░█ ░█─── ░█▄▄█ ░█▄▄▄█ ──░█── ░█▄▄▄ ░█▄▄▄ 　 ░█──░█ ░█─░█ ░█──▀█ ░█─░█ ░█▄▄█ ░█▄▄▄ ░█─░█  \n`);

function admin() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "taskChoice",
        message: "What would you like to do?\n",
        choices: [
          "View All Employees\n",
          "Add Employee\n",
          "Update Employee Role\n",
          "View All Roles\n",
          "Add Employee Role\n",
          "Add a Department\n",
          "View Employees By Department\n",
          "View Department Budgets\n",   
          "Delete a record\n",
          "View Employee Count\n",
          "Exit\n",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.taskChoice) {
        case "View All Employees\n":
          //  view employees grouped by manager
          viewEmployees();
          break;
        case "Add a Department\n":
          addDepartment();
          break;
        case "Add Employee\n":
          addEmployee();
          break;
        case "Add Employee Role\n":
        //  add a new role for potential employees
          addEmployeeRole();
          break;
        case "Update Employee Role\n":
          // update an existing employee's role
          updateEmployeeRole();
          break;
        case "View All Roles\n":
          viewRoles();
          break;
        case "View Employees By Department\n":
         //  viewing all employees grouped by department
          viewEmployeesByDepartment();
          break;
        case "View Department Budgets\n":
        //  View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
          viewDepartmentBudgets();
          break;
        case "Delete a record\n":
        //  delete a record prompts
        inquirer
        .prompt([
          {
            type: "list",
            name: "deleteChoice",
            message: "What would you like to Delete?\n",
            choices: [
              "Delete an employee",
              "Delete a role",
              "Delete a department",
              "Go back to Main",
            ],
            },
        ])
        .then((answers) => {
            switch(answers.deleteChoice) {
              case "Delete an employee":
                deleteEmployee();
                break; 
              case "Delete a role":
                deleteRole();
                break;
              case "Delete a department":
                deleteDepartment();
                break;
              case "Go back to Main":
                admin();
                break;
              default:
                console.log("Select an option to delete.");
                admin();
                break;
              }
            });
        break;
        case "View Employee Count\n":
          //  view the exisiting number of employees
          viewEmployeesCount();
          break;
        case "Exit\n":
          // Exit the program
          console.log("\n***Thank you for using Employee Managing System.***\n");
          connection.end();
          break;
        default:
          //  invalid input
          console.log("\nInvalid Input. Please Choose a task from the list.\n");
          admin();
          break;
      }
    });
}

//this function is used to view all the employees under a particular manager.

function viewEmployees() {
 
  console.log("\n-: You are viewing Employees Grouped By Manager :-\n");

  //creates a query string that is used to select all the relevant information about the employees and their managers from the database.
  var query = ` 
SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.department_name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
FROM employee 
LEFT JOIN employee manager on manager.id = employee.manager_id 
INNER JOIN role 
ON (role.id = employee.role_id) 
INNER JOIN department 
ON (department.id = role.department_id) 
ORDER BY employee.id;`;

  // `SELECT e.id, e.first_name, e.last_name, r.title, d.department_name AS department, r.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
  // FROM employee AS e
  // LEFT JOIN role AS r ON e.role_id = r.id
  // LEFT JOIN department AS d ON r.department_id = d.id
  // LEFT JOIN employee AS manager ON e.manager_id = manager.id
  // `;

  //executes the query and passes the results to the callback function.
  connection.query(query, function (error, results) {
    //checks if there was an error executing the query.
    if (error) throw error;
    //logs the results of the query to the console in a table format.
    console.table(results);
    console.log("\nYou just viewed all Employees and their Managers.\n");
    // calls the admin function, which returns the user to the main menu.
    admin();
  });
}

//viewing roles in a joint table , role id from role and department id from department
function viewRoles() {
  const query = `SELECT role.id, role.title AS role, role.salary, department.department_name AS department 
  FROM role 
  INNER JOIN department ON (department.id = role.department_id)
  ORDER BY role.id;`;
  connection.query(query, (error, results) => {
    if (error) {
      console.log(error);
      return;
    }
    console.table(results);
    console.log("\nYou just viewed Existing Employee Roles.\n");
    admin();
  });
}

//this function is used to view all the employees grouped by department.
function viewEmployeesByDepartment() {
  var query = `SELECT department.id, department.department_name
  FROM department
  GROUP BY department.id, department.department_name
  ORDER BY department.id;`;
  //executes the query and passes the results to the callback function.
  connection.query(query, function (error, results) {
        //checks if there was an error executing the query.
    if (error) {
      console.log("Error fetching department data:", error);
      return admin();
    }
    const departmentNames = results.map((department) => {
      return{ name: department.department_name,
              value:  department.id,
          };
        });
   console.table(results);
    console.log("\nYou are viewing Departments list to fetch Employees in the chosen department.\n");
    selectDepartmentPrompts(departmentNames);
      });
    }

//select department prompts - for the user to choose a department and view employees in that department
function selectDepartmentPrompts(departmentNames) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "departments",
        message: "Please select a Department:",
        choices: departmentNames,
      },
    ])
    .then(function (answer) {
      console.log("\nYou have selected ", answer.departments);
      var query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department 
        FROM employee
        JOIN role
        ON employee.role_id = role.id
        JOIN department
        ON department.id = role.department_id
        WHERE department.id = ?`;
      connection.query(query, answer.departments, function (error, results) {
        if (error) {
          console.log("\nError fetching employees by department:", error);
          return admin();
        }

        console.table(results);
        console.log(
          "\nYou viewed employees grouped by department ID of " + answer.departments + ".\n");

        admin();
      });
    });
}
     
  // Adding a department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "Please enter the name of the department you want to add:",
        validate: function (input) {
          if (input.trim() === "") {
            return "\nDepartment name cannot be empty.";
          }
          return true;
        },
      },
    ])
    .then((answer) => {
      const departmentName = answer.department.trim(); // Remove leading/trailing spaces

      // Check if the department name already exists
      const checkQuery = "SELECT * FROM department WHERE department_name = ?";
      connection.query(checkQuery, [departmentName], (checkError, checkResults) => {
        if (checkError) {
          console.log("\nError checking for department:\n", checkError);
          return admin();
        }

        if (checkResults.length > 0) {
          console.log("\nDepartment already exists.\n");
          return admin();
        }

        const query = "INSERT INTO department (department_name) VALUES (?)";
        connection.query(query, [departmentName], (error, results) => {
          if (error) {
            console.log("\nFailed to add department:\n", error);
            // Retry
            return addDepartment();
          }
          console.log("\n You have successfully inserted the " + departmentName + " to the database.\n");
          console.table(results);
          admin();
        });
      });
      });
    }
  
    function addEmployee() {
      // Fetch existing employees to populate the manager selection list
      var query = `SELECT * FROM employee`;
      var viewManagerQuery = 
    
      `SELECT e.id, r.title, d.department_name AS department, r.salary, CONCAT(e.first_name, ' ', e.last_name) AS manager_name
      FROM employee AS e
      LEFT JOIN role AS r ON e.role_id = r.id
      LEFT JOIN department AS d ON r.department_id = d.id
      LEFT JOIN
      employee AS manager ON e.manager_id = manager.id
      WHERE e.id IN (SELECT DISTINCT manager_id FROM employee WHERE manager_id IS NOT NULL)
      AND e.manager_id IS NULL;`;
          
      connection.query(viewManagerQuery, function (error, managersResults) {
        if (error) throw error;
    
        // Create a list of existing employees for manager selection because we are working under the assumption that the six departments each have a manager
        const employeesList = managersResults.map((manager) => ({
          name: manager.manager_name,
          value: manager.manager_id,
        }));
        console.table(managersResults);
      
        // Fetch existing roles for role selection
        var query = `SELECT * FROM role`;
        connection.query(query, (error, rolesResults) => {
          if (error) {
            console.log("\nFailed to fetch roles:", error);
            //  return to the main menu option here
            return admin();
          }
    
          // Map roles to choices for role selection
          const rolesList = rolesResults.map((role) => ({
            name: role.title,
            value: role.id,
          }));
    
          console.table(rolesResults);
          console.log("\nPlease follow the prompts to insert employee information.\n");
          return inquirer
            .prompt([
              // Prompt user for employee information
              {
                type: "input",
                name: "first_name",
                message: "\nPlease enter employee's first name: ",
                validate: function (input) {
                  if (input.trim() === "") {
                    return "First name cannot be empty.";
                  }
                  return true;
                },
              },
              {
                type: "input",
                name: "last_name",
                message: "\nPlease enter employee's last name: ",
                validate: function (input) {
                  if (input.trim() === "") {
                    return "\nLast name cannot be empty.";
                  }
                  return true;
                },
              },
              {
                type: "list",
                name: "role",
                message: "\nPlease enter employee's role: ",
                choices: rolesList,
              },
              {
                type: "list",
                name: "managerID",
                message: "\nPlease select a manager to this employee or Go back to Main:",
                choices: employeesList.concat([{ name: "Go back to Main", value: "main" }]),
              },
            ])
            .then((answers) => {
              if (answers.managerID === "main") {
                admin();
              } else (answers.managerID)
                // Insert the employee record with the selected role and existing manager
                const employeeQuery = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                const employeeValues = [
                  answers.first_name.trim(),
                  answers.last_name.trim(),
                  answers.role,
                  answers.manager_id,
                ];
    
                connection.query(employeeQuery, employeeValues, (employeeError, employeeResults) => {
                  if (employeeError) {
                    console.log("\nFailed to Insert Employee Information.", employeeError);
                    return admin();
                  }
                  console.table(employeeResults);
                  console.log(
                    "\nYou have successfully inserted " +
                      answers.first_name +
                      " " +
                      answers.last_name +
                      "'s information to the database." + "\n");
    
                  admin();
                });
              }
            );
        });
      });
    }
    
//delete an employee
function deleteEmployee() {

  console.log("\nYou are now viewing information to delete an employee.\n");
  
  var query = `
  SELECT employee.id, employee.first_name, employee.last_name, department.department_name AS department
  FROM employee
  JOIN role ON employee.role_id = role.id
  JOIN department ON role.department_id = department.id
  ORDER BY employee.id ASC
`;
  connection.query(query, function (error, results) {
    if (error) throw error;
    //creating employees array to select and delete an employee 
    const employeesList = results.map(({ id, first_name, last_name }) => ({
      value: id,
      name: `${id} ${first_name} ${last_name}`,
    }));

    console.table(results);
    console.log("You are viewing employees in their respective departments.\n");

    // User views the employee list, deletes an employee, admin() prompts module iterates
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

          console.log("\nYou have successfully removed " + answer.emp_ID + "\n" );
          console.table(results);

          admin();
        });
      });
  });
}


// Function to delete a department
function deleteDepartment() {
  // Fetch existing departments for deletion
  var query = `SELECT * FROM department`;

  connection.query(query, function (error, results) {
    if (error) {
      console.log('Error fetching department data:', error);
      return admin();
    }

    // Create a list of existing departments for deletion
    const departmentList = results.map((department) => ({
      name: department.department_name,
      value: department.id,
    }));

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'departmentToDelete',
          message: 'Please select a department to delete:',
          choices: departmentList,
        },
        {
          type: 'confirm',
          name: 'confirmDelete',
          message: 'Are you sure you want to delete this department?',
        },
      ])
      .then(function (answers) {
        if (!answers.confirmDelete) {
          console.log('Department deletion cancelled.\n');
          return admin();
        }

        // Delete the selected department
        var deleteQuery = `DELETE FROM department WHERE id = ?`;

        connection.query(deleteQuery, [answers.departmentToDelete], function (
          error,
          results
        ) {
          if (error) {
            console.log('Failed to delete department:', error);
            return admin();
          }
          console.table(results);
          console.log('Department deleted successfully.\n');
          admin();
        });
      });
  });
}

// Function to delete a role
function deleteRole() {
  // Fetch existing roles for deletion
  var query = `SELECT * FROM role`;

  connection.query(query, function (error, results) {
    if (error) {
      console.log('Error fetching role data:', error);
      return admin();
    }

    // Create a list of existing roles for deletion
    const roleList = results.map((role) => ({
      name: role.title,
      value: role.id,
    }));

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'roleToDelete',
          message: 'Please select a role to delete:',
          choices: roleList,
        },
        {
          type: 'confirm',
          name: 'confirmDelete',
          message: 'Are you sure you want to delete this role?',
        },
      ])
      .then(function (answers) {
        if (!answers.confirmDelete) {
          console.log('You have cancelled Role deletion .\n');
          return admin();
        }

        // Delete the selected role
        var deleteQuery = `DELETE FROM role WHERE id = ?`;

        connection.query(deleteQuery, [answers.roleToDelete], function (
          error,
          results
        ) {
          if (error) {
            console.log('Failed to delete role:', error);
            return admin();
          }

          console.log('Role deleted successfully.\n');
          admin();
        });
      });
  });
}

// updating an employee's role
function updateEmployeeRole() {
  const employeeQuery = `SELECT * FROM employee`;
  connection.query(employeeQuery, (error, employeeResults) => {
    if (error) throw error;

    const chooseEmployee = employeeResults.map((employee) => ({
      name: employee.first_name.concat(" ", employee.last_name),
      value: employee.id,
    }));

    const roleQuery = `SELECT * FROM role`;
    connection.query(roleQuery, (error, roleResults) => {
      if (error) throw error;

      const chooseRole = roleResults.map((role) => ({
        name: role.title,
        value: role.id,
      }));

      return inquirer
        .prompt([
          {
            type: "list",
            name: "emp_ID",
            message: "Please select an employee to update their role:",
            choices: chooseEmployee,
          },
          {
            type: "list",
            name: "role_ID",
            message:
              "Please select a new role for the employee to update their current:",
            choices: chooseRole,
          },
          {
            type: "list",
            name: "manager_ID",
            message: "Please select the employee's manager:",
            choices: chooseEmployee,
          },
        ])
        .then((answers) => {
          const updateQuery = `UPDATE employee SET role_id=${answers.role_ID}, manager_id=${answers.manager_ID} WHERE id=${answers.emp_ID};`;
          connection.query(updateQuery, (error, updateResults) => {
            if (error) {
              console.log("\nFailed to update role!\n", error);
              return;
            }
            const selectedEmployee = chooseEmployee.find(
              (employee) => employee.value === answers.emp_ID
            );
            console.log(`\nYou have successfully updated ${selectedEmployee.name}'s role.\n`);
            console.table(updateResults);
            admin();
          });
        });
    });
  });
}

//function to add a new employee role
function addEmployeeRole() {
  var query = `SELECT * FROM department`;

  connection.query(query, function (error, results) {
    if (error) throw error;
    _Departments = results.map((department) => ({
      name: department.department_name,
      value: department.id,
    }));
    console.table(results);
    console.log("\nPlease follow the prompts to insert a Role!\n");
    return inquirer
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
      .then((answers) => {
        const query = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`;
        const values = [
          answers.roleTitle,
          answers.roleSalary,
          answers.department_ID,
        ];

        connection.query(query, values, (error, results) => {
          if (error) {
            console.log(error);
            return;
          }
          console.table(results);
          console.log("\nAdded " + answers.roleTitle + " to the Roles table.\n");
          admin();
        });
      });
  });
}

// Function to fetch and display the employee count
function viewEmployeesCount() {
  // Querying to get the employee count
  var countQuery = "SELECT COUNT(*) AS employee_count FROM employee";
  connection.query(countQuery, (error, countResults) => {
    if (error) {
      console.error("\nError fetching employees count:", error);
      return;
    }
//variable to hold the total number of employees
    let employeeCount = countResults[0].employee_count;

    // Display the employee count in a table
    const data = [{ "Total Number of Employees": employeeCount }];
    console.table(data);
    // call admin function again to view the tasks list for the user
    admin();
  });
}

//function to fetch and display the total budget of each department
function viewDepartmentBudgets() {
  // SQL query to view the budget by department
  // gets the department name and the sum of all salaries for each department
  const query = `SELECT department.department_name AS department_name, SUM(role.salary) AS Total_budget
  FROM department
  JOIN role ON department.id = role.department_id
  JOIN employee ON role.id = employee.role_id
  GROUP BY department_name;`;
  connection.query(query, (error, sumResults) => {
    if (error) {
      console.log("\nError viewing department budgets.\n", error);
      return;
    }
    console.log("\nFetching Department Budgets...\n");
    // Maps the results to an object with the department name and total budget
    const data = sumResults.map((row) => 
    ({"Department Name": row.department_name,
      "Total Budget": row.Total_budget,
  }));
    console.table(data); // display the data
    admin();    // call admin function again to view the tasks list for the user
  })};
admin();