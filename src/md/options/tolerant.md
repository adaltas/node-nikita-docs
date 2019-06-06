---
title: Option "tolerant"
---

# Option "tolerant" (boolean, optional, false)

## Description

The "tolerant" option Guaranty the execution of any action wether there was an error or not in a previous actions.

## Usage

The sleep value is a a boolean activating the option if `true`. By default, the option is set to `false`

```js
require('nikita')
.call(function(){
  throw Error('Oh no!')
})
.call({
  tolerant: true
}, function(){
  console.log('I am executed')
})
```
