const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const api = require("./utils/axios.js");
const generateMarkdown = require("./utils/generateMarkdown.js");

const questions = [{
    type: "input",
    message: "What is your GitHub username?",
    name: "username",
},
{
    type: "input",
    message: "What is your email?",
    name: "email",
    default: "placeholder@email.com"
},
{
    type: "input",
    message: "What is the name of your Project?",
    name: "title",
    default: "Project Name Here"
},
{
    type: "input",
    message: "Please briefly describe your project here.",
    name: "description",
    default: "Description Here"
},
{
    type: "list",
    message: "What kind of license should your project have?",
    name: "license",
    choices: ["APACHE_2.0", "GPL_3.0", "BSD_3", "MPL_2.0", "None"]
},
{
    type: "input",
    message: "What command should be used to install dependencies?",
    default: "npm install",
    name: "install"
},
{
    type: "input",
    message: "What command should be used to run tests?",
    default: "npm test",
    name: "test"
},
{
    type: "input",
    message: "What does the user need to know about using the repo?",
    name: "usage",
    default: "Usage Details Here"
},
{
    type: "input",
    message: "What does the user need to know about contributing to the repo?",
    name: "contributing",
    default: "Contributing Details Here"
},
];

function writeToFile(fileName, data) {
    fs.writeFileSync(fileName, data);
    console.log(`READ-ME created successfully.`);
}

function init() {
    inquirer.prompt(questions).then(answers => {
        api.getUser(answers.username).then(response => {
            console.log(response)
            const data = {...response, ...answers };
            console.log(data)
            writeToFile("./output/README.md", generateMarkdown(data));
        })
    })
};

init();