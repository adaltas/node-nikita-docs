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
.call({my_key: 'with a value'}, function({options}){
  assert(options.my_key, 'with a value')
})
```

## Available actions

Each actions in Nikita expect specific options. You must consult the documentation of each individual actions to know in detail which options are available.

Some actions are globally available to every actions. They are defined and managed by Nikita itself. You can consult the documentation of each option to obtain detailed information about its usage and behavior.
