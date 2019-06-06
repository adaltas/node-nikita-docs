---
title: Options
sort: 3
---

# Options

Options is a plain JavaScript object used to contextualise the execution of an action.

## Global options

* [`attempt`](/options/attempt/) (number, readonly, 0)
  Indicates the number of times an action has been rescheduled for execution when an error occurred. 
* [`cascade`](/options/cascade/) (object|array, optional)   
  Propagates an option and its value to every child actions.
* [`debug`](/options/debug/) (boolean, optional, false)   
  Print detailed logs to the standard error output (`stderr`).
* [`handler`](/options/handler/) (function, required)   
  Define the function that an action implements to get things done.
* [`header`](/options/header/) (string, optional)   
  Title of an actions or of a group of actions.
* [`once`](/options/once/) (boolean|array|string, optional, false)   
  Ensure that the same actions are only executed once.
* [`relax`](/options/relax/) (boolean, optional, false)   
  Makes an action tolerant to internal errors.
* [`retry`](/options/retry/) (number|boolean, optional, 1)   
  Control over how many time an action is re-scheduled on error before it is finally treated as a failure.
* [`shy`](/options/shy/) (boolean, optional, false)   
  Disables the modification of the session status.
* [`sleep`](/options/sleep/) (number, optional, 3000)   
  Time lapse when a failed action is rescheduled.
* [`tolerant`](/options/tolerant/) (boolean, optional, false)   
  Guaranty the execution of any action wether there was an error or not in a previous actions.
* [`sudo`](/options/sudo/) (boolean, optional, false)   
  Escalates the right of the current user with `root` privileges.

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

Some actions are globally available to every actions. They are defined and managed by Nikita itself. You can consult the documentation of each option to obtain detailed information about its usage and behaviour.
