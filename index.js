const inquirer = require('inquirer');
const fs = require('fs');
// Makes sure the users puts inputs a value after each question
function inputValidation(value){
    if (value == "") {
        "An input is required"
    } else {
        return true;
    }
}
// Returns the correct license image for the license selected 
function getLicenseImage(license) {
    switch (license) {
      case "Apache License 2.0":
        return "https://img.shields.io/badge/License-Apache%202.0-blue.svg";
      case "Boost Software License 1.0":
        return "https://img.shields.io/badge/License-Boost%201.0-lightblue.svg";
      case "Eclipse Public License 2.0":
        return "https://img.shields.io/badge/License-EPL%202.0-red.svg";
      case "Mozilla Publice License 2.0":
        return "https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg";
      case "MIT License":
        return "https://img.shields.io/badge/License-MIT-yellow.svg";
      default:
        return "";
    }
  }
// Questions prompts after running 'node index.js' in command line 
inquirer
  .prompt([
// User names their project .
    {
      type: 'input',
      message: 'What is name of your project?',
      name: 'title',
      validate: inputValidation,
    },
// User gives a description of their project 
    {
      type: 'input',
      message: 'Could you please give a description of your project?',
      name: 'description',
      validate: inputValidation,
    },
// User gives any info regarding installation
    {
      type: 'input',
      message: 'Please provide any information regarding installation.',
      name: 'install',
      validate: inputValidation,
    },
// User gives any information regarding usage of the project
    {
        type: 'input',
        message: 'Please provide any information regarding how to use your project.',
        name: 'usage',
        validate: inputValidation,
    },
// User provides any information on how to collaborate on their project
    {
        type: 'input',
        message: 'Please give any information as to how someone could collaborate on your project.',
        name: 'collab',
        validate: inputValidation,
    },
//  User provides any information regarding testing their project
    {
        type: 'input',
        message: 'Please give any information on how to test your project.',
        name: 'test',
        validate: inputValidation,
    },
// User selects their license from a list of options
    {
        type: 'list',
        message: 'Please select the license you would like to use.',  
        name: 'license',
        choices: [
            "Apache License 2.0",
            "Boost Software License 1.0",
            "Eclipse Public License 2.0",
            "Mozilla Publice License 2.0",
            "MIT License",
        ],
        validate: inputValidation,
    },
// User provides Github username
    {
        type: 'input',
        message: 'Please provide your Github username.',
        name: 'github',
        validate: inputValidation,
    },
// User provides email address

    {
        type: 'input',
        message: 'Please provide an email address you would like people to reach you through.',
        name: 'email',
        validate: inputValidation,
    }
  ])
  .then((data) => {
    const readMeContent = createReadMe(data);
    fs.writeFile('userReadME.md', readMeContent, (err) =>
      err ? console.log(err) : console.log('Thank you, your ReadME is created! Check your local files within this repository!')
    );
  });
  
  function createReadMe(data) {
    const licenseImage = getLicenseImage(data.license);
    return `# ${data.title}  ![license badge](${licenseImage})

## Description

 - ${data.description}

## Table of Contents
    
 - [Installation](#installation)
 - [Usage](#usage)
 - [How To Test](#test)
 - [How To Contribute](#collab)
 - [Contact Info](#contactInfo)

## Installation

 - ${data.install}

## Usage 

- ${data.usage}

## How To Test My Project

- ${data.test}

## How To Contribute

- ${data.collab}

## Contact Info 

- If you would like to visit my Github you can click here https://github.com/${data.github} and if you have further questions you can reach me at ${data.email}
`
}