---
title: Option "attempt"
---

# Option "attempt"

The "attempt" option is an indicator of the number of times an action has been rescheduled for execution when an error occurred. 

The "attempt" option is only readable from inside an handler function. An attempt to pass this option when calling an action will have no incidence. It is expected to be used conjointly with the ["retry" option](/options/retry).

## Usage

The associated value is incremented after each retry starting with the value "0". The following example will failed on the first attempt before finally succeed on its second attempt.

```js
require('nikita')
.call({
  retry: 2
}, function(options, callback){
  throw Error 'Oups' unless options.attempt is 0
  callbac(null, true)
}, function(err, status){
  // The first attempt failed with an error
  assert(err, undefined)
  // but the second attempt succeed
  assert(status, true)
})
```
## With "relax" option

When used with the ["relax" option](/options/relax), all the attempts will rescheduled. Said differently, marking an action as relax will not prevent to action to be re-executed on error.

```js
require('nikita')
.call({
  retry: 2,
  relax: true
}, function(options, callback){
  // Will fail two times
  throw Error 'Oups'
}
.call(function(){
  // Will be executed because last action was not fatal
}))
```
