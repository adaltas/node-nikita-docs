---
title: Actions
sort: 1
---

# Actions, options, handlers and callbacks

An action is a single unit of work in Nikita. It is made of a simple JavaScript object which we call options.

The most important and only required option is the `handler` function, which does all the work. Handlers are designed to be stateless. They may itself call other actions to achieve its purpose. Such actions include writing a file in a given format, executing a shell command or controlling the life cycle of a Unix service.

The handler may be completed with a `callback` function which will be called once the callback has been executed. The callback is used to be notified when an action has complete or has failed. It also provides information such as the status of the action or any additional information sent by the handler.

We call this an action. At the end, it is an JavaScript object with the mandatory property "handler" and optional properties including "callback".

## Options

Options are use to contextualize the handler function. The are usually an object but can be of any types. For example, the `execute` handler can receive on object with a "cmd" option or directly the command as a string:

```js
nikita
// Object with "cmd" option
.system.execute({cmd: 'whoami'})
// Command as a string
.system.execute('whoami');
```

The string options is here for conveniency. Internally, the execute handler receive options as an object and search for the "argument" option. Here's an exemple:

```js
nikita
.register('execute', function(options, callback){
  options.cmd = options.argument if typeof options.argument is 'string'
  // More code goes here
});
.execute('whoami', function(err, status, stdout){
  console.info('I am ' + stdout.trim());
})
```

## Handlers

Handlers always receive options as its first argument. The second argument is a callback to call if the handler is meant to be executed asynchronously.

The options argument is always passed as an objects. It is composed of global options merged with user provided options. Note, the user can overwrite any global options. Such global options include "ssh", "retry" or "attempt". In this example, Nikita is set to execute remotely over SSH by default except for on handler. The example also illustrates the usage for the "retry" and "attempt" options.

```js
nikita({
  ssh: {host: 'localhost', username: process.env.USER}
})
.call({ssh: null}, function(options){
  assert(options.ssh === null); // Locally execution
})
.call({retry: 3}, function(options){
  assert(options.ssh !== null); // Remotely execution
  if(options.attempt < 3){ throw Error('Please retry'); }
});
```

Options passed on Nikita instantiation are available globally to every handlers.

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
  
}, function(err, status){
  
})
```

[status]: ../status
