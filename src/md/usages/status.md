---
title: Status
sort: 3
---

# Status

The status is an information indicating whether an action had any impact or not. It's meaning may differ from one action to another, here are a few examples:

- modification of a file   
  The tatus is "true" if the content or any metadata associated with the file has changed. This include the content signature, a modification time or a change of ownership.
- modification of a property (json, yaml, ini...) file   
  The status is true if a property or any metadata associated with the file has changed. A change of format, like prettifying the source code, will not affect the status while the addition of a new property and the modification on the value of an existing property will set the status to "true".
- checking if a port is open
  The status is set to "true" if a server is listening on that port and "false" otherwise. This is arguably an alternative usage. In such case, it is often used conjointly with the "shy" option to ensure that parent actions don't get their status modified.

Status is a central concept in Nikita implemented inside every action. Early on, it was decided that actions will be idempotent and indicate whether a change occurred or not. The latter is what we call the status. It is formalized as a simple boolean passed to the callback.

When a handler is made of multiple child actions, the status will be `true` if at least one of the child action has a status of `true`.

## Sync versus Async handlers

Asynchronous handlers receive a callback. On complete, the callback may be call with an error argument followed by the status as its second argument.

```javascript
require('nikita')
// Parent action
.call(function(options, callback){
  // Do something
  setImmediate(function(){
    // Set the status to "true"
    callback(null, true)
  });
}, function(err, status){
  // Status is now "true"
})
```
Synchronuous handlers doesn't modify the status directly. Instead it is derived from its child handlers.

```javascript
require('nikita')
// Parent action
.call(function(){
  // Do something
}, function(err, status){
  // By default, status is "false"
})
// Parent action
.call(function(){
  // Child action
  this.call(function(options, callback){
    // Set the status to "true"
    callback(null, true)
  })
}, function(err, status){
  // Status is now "true"
})
```

## Using it with `next`

The `next` function is called once a list of actions has terminated or if any error occurred before. When called, it expect a function with the error and status provided as arguments. Once `next` is called, the status is reset and a new run of actions may be scheduled.

```js
require('nikita')
// All actions are false
.call(function(options, callback){
  callback(null, false)
})
.call(function(options, callback){
  callback(null, false)
})
// Then status is false
.next(function(err, status){
  console.log(status == false)
})
// One actions is true
.call(function(options, callback){
  callback(null, false)
})
.call(function(options, callback){
  callback(null, true)
})
.call(function(options, callback){
  callback(null, false)
})
// Then status is true
.next(function(err, status){
  console.log(status == true)
})
```
