// Importing the required modules and setting up the sql database connection
const mysql = require('mysql2');
const express=require('express');
const app=express();
const PORT = process.env.PORT || 3001;
const inquirer=require("inquirer");
const table=require("console.table");
//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connection to our db
const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employees_db'
},
console.log(`Successfully connected to the Employees Database.`)
);


connectDB.connect((err) => {
    if (err) throw err;
    console.log(`Connected as ID ${connectDB.threadId}`);
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
const inquirer = require('inquirer');

function admin() {
    inquirer
        .createPromptModule([
            {
                type: "list",
                name: 'taskChoice',
                message: "What would you like to do?",
                choices: [
                    "1. View Departments",
                    "2. View Roles",
                    "3. View Budgets",
                    "4. View Employees",
                    "5. View Employees by Manager",
                    "6. View Employees by Department",
                    "7. Add an Employee",
                    "8. Delete an Employee",
                    "9. Update Employee Role",
                    "10. Add a Role",
                    "11. Delete A Role",
                    "12. Add a Department",
                    "13. Delete a Department",
                    "14. Exit."
                ]
            },
        ])
        .then(answers => {
            switch (answers.taskChoice) {
                case "1. View Departments":
                    //  viewing all departments
                    viewDepartments();
                    break;
                case "2. View Roles":
                    //  view all roles
                    viewRoles();
                    break;
                case "3. View Budgets":
                    // updating employee role
                    viewBudgets();
                    break;
                case "4. View Employees":
                    //  viewing all roles
                    viewEmployees();
                    break;
                case "5. View Employees by Manager":
                    // adding a role
                    viewEmployeesByManager();
                    break;
                case "6. View Employees by Department":
                    //  viewing all departments
                    viewEmployeesByDepartment();
                    break;
                case "7. Add an Employee":
                    //  viewing all employees
                    addEmployee();
                    break;
                case "8. Delete an Employee":
                    //  adding an employee
                    deleteEmployee();
                    break;
                case "9. Update Employee Role":
                    // updating employee role
                    updateEmployeeRole();
                    break;
                case "10. Add a Role":
                    //  viewing all roles
                    addRole();
                    break;
                case "11. Delete a Role":
                    // adding a role
                    deleteRole();
                    break;
                case "12. Add a Department":
                    //  viewing all departments
                    addDepartment();
                    break;
                case "13. Delete a Department":
                    //  adding a department
                    deleteDepartment();
                    break;
                case "14. Exit.":
                    // Exit the program
                    connectDB.end();
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
var query =
`SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM employee e
LEFT JOIN role r
ON e.role_id = r.id
LEFT JOIN department dON d.id = r.department_id
LEFT JOIN employee mON m.id = e.manager_id`

//executes the query and passes the results to the callback function.
connectDB.query(query, function (error, res) {
    //checks if there was an error executing the query.
    if (error) throw error;
    //logs the results of the query to the console in a table format.
    console.table(res);
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
    var query =`SELECT d.id, d.name, r.salary AS Budget
    FROM employee e
    LEFT JOIN role r
    ON e.role_id=r.id
    LEFT JOIN department d
    N d.id=r.department_id
    GROUP BY d.id, d.name`
    
    //executes the query and passes the results to the callback function.
    connectDB.query(query, function (error, res) {
        //checks if there was an error executing the query.
        if (error) throw error;
// creates an array of objects, each representing a department, that the user can choose from.
        const departments = res.map(data => ({
            value: data.id, name: data.name
          }));
      
        console.table(res);
        console.log("You just viewed Employees by department.\n");
        // calls the departmentPrompts function, which prompts the user to choose a department to view employees for.
        callDepartmentPrompts(departments);
    });
}
        function callDepartmentPrompts(departments) {
            // prompts the user to choose a department 
            inquirer
            .prompt([
        {
            type: "list",
            name: "department",
            message: "Please select a Department:",
            choices: departments
        }
    ])
            .then(function (answer) {
                // console indicating which department the user chose.
                console.log("You chose " + answer.department);
            var query =
                `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department 
          FROM employee e
          JOIN role r
            ON e.role_id = r.id
          JOIN department d
          ON d.id = r.department_id
          WHERE d.id = ?`
        
              connectDB.query(query, answer.department, function (error, res) {
                if (error) throw err;
        
                console.table("View Response ", res);
                console.log(res.affectedRows + "You viewed employees!\n");
        
                admin();
              });
            });
        }
          




admin();
