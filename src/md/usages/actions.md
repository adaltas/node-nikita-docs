---
title: Actions
sort: 1
---

# Actions, options, handlers and callbacks

## Introduction

An action is the single unit of work in Nikita. Technically, it is a simple JavaScript object consisting of well defined properties as well as some specific properties related to each action. Such actions include writing a file in a given format, executing a shell command or controlling the life cycle of a Unix service.

The most important and only required option is the `handler` function, which does all the work. Handlers are designed to be stateless. They take some input information, do some work and send back some output information. They are executed sequentially, in order of appearance. They may themselves call other actions to achieve its purpose. Thus, actions are somehow organized as hierarchical trees.

The handler receives all the properties of an action as an argument. We call those properties options. They can define default values when declaring the action and the user may overwrite any of the properties. Thus, options are used to contextualize the handler.

The handler may be completed with a `callback` function which will be called once the handler has been executed. The callback is used to be notified when an action has complete or has failed. It also provides information such as an error object if one occurred, the status of the action or any additional information sent by the handler.

Remember, in the end, an action is an JavaScript object with the mandatory property "handler", and some optional properties. Those properties are common to any Nikita action, such as the "callback", or they can be specific to an action, such as the "target" option indicating the path of a file to be written.

## Options

Options are used to contextualize the handler function. The are usually an object but can be of any types. For example, the `execute` handler can receive on object with a "cmd" option or directly the command as a string:

```js
nikita
// Object with "cmd" option
.system.execute({cmd: 'whoami'})
// Command as a string
.system.execute('whoami');
```

The string options is here for conveniency. Internally, the execute handler receives options as an object and search for the "argument" option. Here's an example:

```js
nikita
.register('execute', function(options, callback){
  options.cmd = options.argument if typeof options.argument is 'string'
  // More code goes here
});
.execute('whoami', function(err, {stdout}){
  console.info('I am ' + stdout.trim());
})
```

## Handlers

Handlers are functions. They always receives an "options" object as its first argument.

The first argument is the "options" argument. It is always passed as an objects. It is composed of global options merged with user provided options. Note, the user can overwrite any global options. Such global options include "ssh", "retry" or "attempt".

In this example, the action expect a property "username" which defined by a configuration object passed as an argument.

```js
// Some configuration object
config = {
  username: 'whoami'
}
// Initialize a new session
nikita
// Call an action
.call(config, function(options){
  assert(options.username, 'whoami')
})
```

An action can also rely on some common options such as the "retry" and "attemp" options used below:

```js
nikita
.call({retry: 3}, function(options){
  if(options.attempt < 3) throw Error('Please retry')
})
```

Options passed to the Nikita session on instantiation are available globally to every handlers.

```js
nikita({my_option: 'my value'})
.call(function(options){
  console.info('Value of "my_option" is ' + options.my_option);
});
```

## Callbacks

Callbacks provides a solution to catch error, [status] information or data relative to its associated handler. The first two arguments are always the same. The first one is the error object if any. The second is a boolean value representing the [status]. [Status] is fundamental to idempotence and indicates if a handler had any impact. The remaining arguments are the one passed from the handler if it was executed asynchronously.

```js
nikita
.call(function(){
  
}, function(err, {status}){
  
})
```

[status]: ../status
