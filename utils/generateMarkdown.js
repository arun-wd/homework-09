function generateMarkdown(data, getUserResponse) {
  return `
# ${data.project}

![License](https://img.shields.io/badge/License-${data.license}-blue)

## Description

${data.description}


## Table of Contents

* [Installation](#installation)

* [Usage](#usage)

* [License](#license)

* [Contributing](#contributing)

* [Tests](#tests)

* [Questions](#questions)

## Installation

To install necessary dependencies, run the following command:

${data.install}

## Usage

## License

This porject is licensed under the ${data.license} license.

## Contributing

${data.contributing}

## Tests

To run tests, run the following command:

${data.tests}

## Questions

![ME](${getUserResponse.data.avatar_url}) 

  If you have any questions about the repo contact me directly at ${getUserResponse.data.email}. Thank you.

  `;
}

module.exports = generateMarkdown;
