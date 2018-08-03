---
title: Developer
sort: 3
---

# Developer information

## Introduction

You are encouraged to [contribute](/about/contribute/) to Nikita. There are multiple way to offer assistance to the project. To fix and write actions, you will have get your hands dirty and dive into the source code. This page describe the project layout and how to run the tests.

## Project layout

Nikita is organized as one monolithic GIT repository. It includes the core engine, user actions as well as some utils functions.

### Core engine

Core engine modules are at the root of the "./lib" directory.

* "index"   
  The main Nikita entry point when issuing `require('nikita')`.
* "register"   
  Register actions into the global namespace. All actions available by default are listed in this module.
* "registry"   
  Management facility to register and unregister actions.
* "session"   
  The Nikita session where most of the logic is wired.

### Actions

Actions modules are all the modules in the "./lib" directory which are neither at the root of the directory nor inside the "./lib/misc" directory.

### Utils function

Utils function exports simple JavaScript functions and are located inside the "./lib/misc" directory. 

## Tests execution

Nikita target Unix-like system including Linux and macOS. Windows is not supported as a targeting node where to execute actions. It is however know to host Nikita. This mean you can run Nikita from a Windows host as long as you are targeting Linux nodes over SSH.

Tests are executed with [Mocha](https://mochajs.org/) and [Should.js](https://shouldjs.github.io/). They are all located inside the "./test" folder.

For the tests to execute successfully, you must:   

*   be online (attempt to fetch an ftp file)
*   be able to ssh yourself (eg `ssh $(whoami)@localhost`) without a password

`npm test` execute the full test suite while `./node_modules/.bin/mocha test/${glob}` execute a subset of the test suite.

For example, to only test the `nikita.file.ini` actions, run `./node_modules/.bin/mocha test/file.ini/*.coffee`

### SSH or locally

Why even choose? All tests when it makes sense are executed twice. Once without an SSH connection and once with an SSH connection pointing to localhost. To achieve this behavior, we extended [Mocha](https://mochajs.org/) by providing an alternative to the `it` function in the name of `they`. You can find it in the [ssh2-they package](https://github.com/adaltas/node-ssh2-they).

For example, this test will only be executed locally:

```js
nikita = require('nikita')
describe('Simple Test', function(){
  it('Check a file is touched', function(){
    nikita
    .file.touch('/tmp/a_file')
    .file.assert('/tmp/a_file')
    .promise()
  })
})
```

While the same test using `they` will be executed locally and remotely:

```js
nikita = require('nikita')
they = require('they')
describe('Simple Test', function(){
  they('Check a file is touched', function(ssh){
    nikita({ssh: ssh})
    .file.touch('/tmp/a_file')
    .file.assert('/tmp/a_file')
    .promise()
  })
})
```

### Customization

Tests will look by default for a configuration module located at "./test" file located inside "./test.coffee". If they do not find it, they will copy the default file "./test.sample.coffee" into "./test.coffee". Use the sample file as a starting point to configure your own environment.

You can customize the path to the configuration module by setting the environmental variable named "NIKITA\_TEST\_MODULE".

### Environments

Some tests depends on a particular settings to run successfully. Some actions are specific to a particular Linux distribution or issue internally alternatives commands which must be validated. Other actions depends on a service which is not always available on the hosts machine such as a database connection.

Based on your environment support, targeted tests may be activated from the configuration. For example, to activate the MariaDB tests, set the `disable_db` property to `true` and configure the `db.mariadb` properties accordingly.

### Docker

To ensure tests are executed in a proper environment, we leverage [Docker](https://docs.docker.com/) and [Docker Compose](https://docs.docker.com/compose/). To each environment corresponds a directory inside the "./env" folder. Inside each folder, you will find the "docker-compose.yml" declaration file and its associated resources.

- `docker-compose.yml`   
  The [Docker Compose](https://docs.docker.com/compose/) file declare the Nikita container with its test environment as well as its service dependencies such as databases services.
- `Dockerfile`
  The [Dockerfile](https://docs.docker.com/engine/reference/builder/) declare instructions to build the containers
- `test.coffee` 
   The configuration file is used to activate selected tests and configured the Nikita sessions executed inside.

The commands to execute the tests are commons to every Docker environments and provide a lot of flexibility. From any environment directory:

* `docker-compose up --abort-on-container-exit`   
  Run the all test suite from the host shell.
* `docker-compose run --rm nodejs`   
  Enter inside the Nikita container and execute your commands.
* `docker-compose run --rm nodejs 'test/**/*.coffee'`   
  Run a subset of the tests from the host shell.

Here's an example to run tests on CentOS 7:

```bash
# Download the source code
git clone https://github.com/adaltas/node-nikita.git nikita
cd nikita
# Install dependencies with NPM or Yarn
npm install
# Move to your targeted environment
cd env/centos7
# Run all tests
docker-compose up --abort-on-container-exit
# Enter bash console
docker-compose run --rm nodejs
# Run a subset of the tests
docker-compose run --rm nodejs test/core
```
