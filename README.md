# Nikita Website

The official Nikita website based on Gatsby and Material-UI.

To install and run the server:

```
git clone https://github.com/adaltas/node-nikita-docs.git nikita-docs
cd nikita-docs
npm install
./node_modules/.bin/gatsby develop
```

## TODO

* Improve inline code, currently padding is different between left and right
* Menu generation must be generic like in GitBook, using README.md for section
* Create homepage from the template
* Apply footer already design in the template
* Automatic conversion between CoffeeScript and JavaScript source code

## Request

Encrypt the token:

```
docker run --rm -v $PWD:/repo -v ~/.travis:/travis \
  andredumas/travis-ci-cli \
  encrypt GH_TOKEN="..your..token.."
```
