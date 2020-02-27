const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const api = require("./utils/api.js");

const writeFileAsync = util.promisify(fs.writeFile);

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
      type: "input",
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

function generateMD(answers) {
  return `
# ${answers.project}

## Description

${answers.description}

## Table of Contents

* [Installation](#installation)

* [Usage](#usage)

* [License](#license)

* [Contributing](#contributing)

* [Tests](#tests)

* [Questions](#questions)

## Installation

To install necessary dependencies, run the following command:

${answers.install}

## Usage

## License

This porject is licensed under the ${answers.license} license.

## Contributing

${answers.contributing}

## Tests

To run tests, run the following command:

${answers.tests}

## Questions


  `;
}

async function init() {
  console.log("hi")
  try {
    const answers = await promptUser();

    const md = generateMD(answers);

    await writeFileAsync("README2.md", md);

    console.log("Successfully wrote to README2.md");
  } catch(err) {
    console.log(err);
  }
}

init();