# Nikita Website

The official website of the [Nikita project](https://github.com/adaltas/node-nikita). It is written with Gatsby and Material-UI.

To install and run the server:

```
git clone https://github.com/adaltas/node-nikita-docs.git nikita-docs
cd nikita-docs
npm install
./node_modules/.bin/gatsby develop
```

## TODO

* Automatic conversion between CoffeeScript and JavaScript source code
* Import Nikita source code written in CoffeeScript Literate.

## Request

Encrypt the token:

```
docker run --rm -v $PWD:/repo -v ~/.travis:/travis \
  andredumas/travis-ci-cli \
  encrypt GH_TOKEN="..your..token.."
```
