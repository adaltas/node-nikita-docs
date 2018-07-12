---
title: Option "handler"
---

# Option "handler"

The "handler" option is fundamental, this is the function that an action implements to get things done. Most of the time, you don't have to write an handler action on your own. 

Instead, you will use an existing action which has [registered](/usages/registry) its handler function. However, you should not be afraid to write your own handler, it is as easy as writing a plain vanilla JavaScript function and using the Nikita `call` action. Functions can run [synchronously or asynchronously](/usages/sync_async).

## Synchronous handlers

Synchronous handlers expect one arguments, the options passed to the action:

```js
require('nikita')
.call({
  key: 'value',
  handler: function(options){
    // do something
    assert(options.key, 'value')
  }
})
```

## Asynchronous handlers

asynchronous handlers expect two arguments, the options and a callback function to be called when the action has terminated:

```js
require('nikita')
.call({
  key: 'value',
  handler: function(options, callback){
    setImmediate(function(){
      // do something
      assert(options.key, 'value')
    })
  }
})
```

## Style

You will probably never see an handler function being defined by the "handler" option key. Instead, we define it with an alternative syntax by passing the handler function as an independent argument. The example above is preferably rewritten as:

```js
require('nikita')
.call({
  key: 'value'
}, function(options, callback){
  setImmediate(function(){
    // do something
    assert(options.key, 'value')
  })
})
```

The rule to interpret function arguments is as follow: the first encountered function is the handler unless the action is registered with an existing handler function; the second encountered function is the callback.

## Asynchronous handlers inside synchronous handlers

Synchronous functions may call child action which are executed asynchronously. The next sibling action will not be schedule for execution before all the child actions have been executed.

```js
require('nikita')
.call(function(options){
  console.log('1')
  this.call(function(options, callback){
    setImmediate(function(){
      console.log('2')
    })
  })
})
.call(function(options){
  console.log('3')
})
```
