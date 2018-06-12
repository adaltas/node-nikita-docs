---
title: Options
sort: 3
---

# Options

Options is a plain JavaScript object used to contextualize the execution of an action.

## Usage

Creating an option is as easy as passing one or multiple objects when calling an action:

```js
require('nikita')
.call({my_key: 'with a value'}, function(options){
  assert(options.my_key, 'with a value')
})
```

When multiple options are passed, they will be merged with the last keys taking precedence over previously defined keys:

```js
require('nikita')
.call({key: 'old value'}, {key: 'new value'}, function(options){
  assert(options.key, 'mew value')
})
```

## Available actions

Each actions in Nikita expect specific options. You must consult the documentation of each individual actions to know in detail which actions are available.

Some actions are defined and managed by Nikita itself and are available to every action. You can consult the documentation of each option to obtain detailed information about its usage and behavior.
