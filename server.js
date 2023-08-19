// Importing the required modules and setting up the sql database connection
const mysql = require('mysql2');
const express=require('express');
const app=express();
const PORT = process.env.PORT || 3001;

//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connection to our db
const connectDB = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: 'employees_db'
},
console.log(`Connected to the employees_db database.`)
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
    adminPrompt();
});

// Defining the function that initiates the app
function adminPrompt() {
    
}
