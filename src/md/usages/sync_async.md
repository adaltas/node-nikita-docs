---
title: Sync and async
layout: page
sort: 2
---

# Sync and async execution

The asynchrone nature of JavaScript coupled with how Nikita register new action can be a little tricky.

## Nikita context

A Nikita context is run asynchronously. Thus, any function declared after Nikita will be executed before Nikita has completed:

```js
require('nikita')
.then(function(){
  console.log('This is executed after');
});
console.log('This is executed before');
```

## The `call` action

When using the [`call`] action, handlers in Nikita are be executed synchronously or asynchronously. Detection is based on the argument signature. Here's a simple exemple with the Node.js `fs.touch` function:

```js
nikita
# Synchronous call
.call({file: '/tmp/sync_file'}, function(options){
  fs.touchSync(options.file);
})
# Asynchronous call
.call file: '/tmp/async_file', function(options, callback){
  fs.touch(options.file, callback;
)};
```

### Synchronous execution

Synchronous handlers take an optional "options" argument. The function signature is `handler([options])`.

Error are simply thrown and catched by Nikita. There is no direct way to modify the status unless asynchronous handlers are called as children.

```js
require('nikita')
.call(function(){
  console.log('a first sync user function');
});
.call({type: 'sync'}, function(options){
  console.log('a second ' + options.type + ' user function');
});
```

A powerfull feature of Nikita is the ability to call asynchrous handlers inside synchronous handlers. This coding style is encouraged for the sake of code readability but can get a little triky. Take the following code in consideration:

```js
require('nikita')
.call(function(){
  this.execute({
    cmd: "echo hostname: `hostname`"
  });
})
.then(function(){
  console.log('done');
});
```

The `execute` action is run asynchronously but it is declared inside a sync `call` action. This is made possible because calling an action in Nikita is like registering an instruction which will be scheduled later for execution. Think of it as stack in which we register an action `call`, then an action `execute` and finally an action `then`.

Status of the synchronous parent handler is bubbled up from asynchronous child handlers. The rule is as follow, if any child has a status set to "true", then the parent has a status set to "true".

```js
nikita
.call(function(){
  @call(function(options, callback){
    callback(null, false);
  });
  @call(function(options, callback){
    callback(null, true);
  });
}, function(err, status){
  if(err){ throw err; }
  assert(status === true);
});
```

### Asynchronous execution

Asynchronous handlers take 2 arguments. The function signature is `handler(options, callback)`.

If any, errors are passed to the callback as its first argument. Otherwise, a value of null or undefined indicate a success. The second value is the status passed as boolean. Set it to "true" to indicate a change in state. Additional arguments will be transmitted to the callback function.

```js
require('nikita')
.call(function(options, callback){
  setImmediate(function(){
    console.log('An async user function indicating a change in state');
    callback(null, true);
  });
})
.call(function(options, callback){
  setImmediate(function(){
    console.log('An async user function passing an error');
    callback(Error('CatchMe'));
  });
});
```

## Action registration inside callbacks

Synchronous and asynchronous handlers can also be registered inside a callback. Back to the Node.js `fs.touch` function, an example is:

```js
nikita
.file.wait({target: '/tmp/wait_for_file'}, function(err, status){
  # Entering the callback
  if(err){ return throw err };
  # Synchronous call
  @call({file: '/tmp/sync_file'}, function(options){
    fs.touchSync(options.file);
  })
  # Asynchronous call
  @call file: '/tmp/async_file', function(options, callback){
    fs.touch(options.file, callback;
  )};
})
```

## Status

Getting the right status can also be a bit confusing. It is quite common to condition the execution of an action to the a change in state. In such case, a call to `@status()` is associated to a condition such as `if`.

However, setting the value of the `if` property directly as the value returned `@status()` will give you the state of the current scope, probably not the one you expect.

```js
require('nikita')
.call({header: 'Install MyComponent'}, function(){
  this.tools.git({
    source: "http://localhost/my_component.git",
    target: "/tmp/my_component"
  });
  this.execute({
    if: this.status(),
    cmd: '/tmp/my_component/bin/restart.sh'
  });
});
```

Here, the call to `this.status()` does not return the state of after the git action but the parent one which is always "false". Instead, this exemple should be rewritten with `this.status()` wrapped inside a function:

```js
require('nikita')
.call({header: 'Install MyComponent'}, function(){
  this.tools.git({
    source: "http://localhost/my_component.git",
    target: "/tmp/my_component"
  });
  this.execute({
    if: function(){ this.status() },
    cmd: '/tmp/my_component/bin/restart.sh'
  });
});
```

[`call`]: ../call
