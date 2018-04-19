---
title: Contribute
description: Helps us by providing feedbacks, reporting issues, improving the documentation and submitting patches.
sort: 4
community: yes
layout: doc
---

# Contributing

Nikita is an Open Source project hosted on [GitHub](https://github.com/adaltas/node-nikita) originally written by [Adaltas](http://www.adaltas.com).

Contributions go far beyond pull requests and commits. we are thrilled to receive a variety of other contributions including the following:

- Write and publish your own actions
- Write articles and blog posts, create tutorial and spread the words
- Submit new ideas of features and documentation
- Submitting documentation updates, enhancements, designs, or bugfixes
- Submitting spelling or grammar fixes
- Additional unit or functional tests
- Help answering questions and issues on GitHub

## Open Development

All work on Nikita happens directly on GitHub. Both core team members and external contributors send pull requests which go through the same review process.

## Branch Organization

We will do our best to keep the master branch in good shape, with tests passing at all times. But in order to move fast, we will make API changes that your application might not be compatible with. We recommend that you use the latest stable version of React.

If you send a pull request, please do it against the master branch. We maintain stable branches for major versions separately but we don’t accept pull requests to them directly. Instead, we cherry-pick non-breaking changes from master to the latest stable major version.

## Semantic Versioning

React follows semantic versioning. We release patch versions for bugfixes, minor versions for new features, and major versions for any breaking changes. When we make breaking changes, we also introduce deprecation warnings in a minor version so that our users learn about the upcoming changes and migrate their code in advance.

Every significant change is documented in the changelog file.

## Documentation

Managing an open source project a huge time sink and most of us are non native English speaker. We greatly appreciate any time spent fixing typos or clarifying sections in the documentation.

## Discussions

There are currently no channel dedicated to discuss about Nikita. For now, you may simply [open an new issue](https://github.com/adaltas/node-nikita/issues/new).

## Proposing a Change

If you intend to change the public API, or make any non-trivial changes to the implementation, we recommend [filing an issue](https://github.com/adaltas/node-nikita/issues/new). This lets us reach an agreement on your proposal before you put significant effort into it.

If you’re only fixing a bug, it’s fine to submit a pull request right away but we still recommend to file an issue detailing what you’re fixing. This is helpful in case we don’t accept that specific fix but want to keep track of the issue.

## Bugs

### Where to Find Known Issues

We are using GitHub Issues for our public bugs. We keep a close eye on this and try to make it clear when we have an internal fix in progress. Before filing a new task, try to make sure your problem doesn’t already exist.

### Reporting New Issues

The best way to get your bug fixed is to provide a reduced test case. You can get inspiration from our current [test suite](https://github.com/adaltas/node-nikita/tree/master/test). Some test require a specific environment which is provided through [docker environments](https://github.com/adaltas/node-nikita/tree/master/docker).

### Security Bugs

Facebook has a bounty program for the safe disclosure of security bugs. With that in mind, please do not file public issues; go through the process outlined on that page.

## Running the tests

Nikita target Unix-like system including Linux and macOS.

Windows is not supported as a targeting node where to execute actions. It is however know to host Nikita. This mean you can run Nikita from a Windows host as long as you are targeting Linux nodes over SSH.

### Test configuration

To filter and configure your tests, you can either create a "test.coffee" at the root of this project or point the "MECANO_TEST" environment variable to such a file. You can use the file "test.coffee.sample" as a starting point.

### Running tests locally

The majority of the tests run locally on any supported OS. The full test suite is launch with the `npm test` command. If you wish to execute a subset of the source case, use `./node_modules/.bin/mocha test/${file_or_glob_expression}`. For example, here is how to execute the file tests:

```bash
# Download the source code
git clone https://github.com/adaltas/node-nikita.git nikita
cd nikita
# Install dependencies with NPM or Yarn
npm install
# Run some tests
./node_modules/.bin/mocha test/file/*.coffee
```

### Running tests in containers

Some tests require a dedicated environment. For example, the `service` actions pilote service life cycle with "init" on CentOS 6 and "systemd" on CentOS 7. Another example are the Kerberos actions which require a Kerberos server.

Those tests require a specific environment provided by Docker. Inside the [docker folder](https://github.com/adaltas/node-nikita/tree/master/docker) are sub-folders listing systems or functionalities which are currently supported for testing. Inside each sub-folder are:

- a [docker-compose file](https://docs.docker.com/compose/) describing the Nikita container with its test environment as well as the service dependencies such as databases services.
- a [Dockerfile](https://docs.docker.com/engine/reference/builder/) which build the Nikita container
- a test.coffee file which configure which tests are configured ans activated for execution

Here's an example to run tests on CentOS &:

```bash
# Download the source code
git clone https://github.com/adaltas/node-nikita.git nikita
cd nikita
# Install dependencies with NPM or Yarn
npm install
# Move to your targeted environment
cd docker/centos7
# Run all tests
docker-compose up --abort-on-container-exit
# Enter bash console
docker-compose run --rm nodejs
# Run a subset of the tests
docker-compose run --rm nodejs test/core
```
