const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const api = require("./utils/api.js");
const writeFileAsync = util.promisify(fs.writeFile);
const generateMarkdown = require("./utils/generateMarkdown");


function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "username",
      message: "What is your GitHub username?"
    },
    {
      type: "input",
      name: "project",
      message: "What is your project name?"
    },
    {
      type: "input",
      name: "description",
      message: "Please write a short description of your project."
    },
    {
      type: "list",
      name: "license",
      message: "What kind of license should your project have?",
      choices: ['MIT', 'APACHE 2.0', 'GPL 3.0', 'BSD 3', 'None'],
    },
    {
      type: "input",
      name: "install",
      message: "What command should be run to install dependencies?",
      default: "npm i"
    },
    {
      type: "input",
      name: "tests",
      message: "What command should be run to run tests?",
      default: "npm test"
    },
    {
        type: "input",
        name: "usage",
        message: "What does the user need to know about using the repo?"
    },
    {
        type: "input",
        name: "contributing",
        message: "What does the user need to know about contributing to the repo?"
    }
  ]);
}



promptUser()
    .then(function(data) {
        const username = data.username;
        api.getUser(username).then(function(getUserResponse) {
            const markDown = generateMarkdown(data, getUserResponse);
            return writeFileAsync("README2.MD", markDown);
        })
    })

.then(function() {
        console.log("Successfully wrote to README.MD");
    })
    .catch(function(err) {
        console.log(err);
    });