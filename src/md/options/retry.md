---
title: Option "retry"
---

# Option "retry"

Setting the "retry" option provides control over how many time an action is reexecuted on error before it is finally treated as a failure.

It is expected to be used conjointly with the ["attempt" option](/options/attempt/) which provide an indicator over how many times an action was rescheduled.

## Usage

The value must be an integer superior or egal to `1`. For exemple, the value 3 means the action will be executed at maximum 3 times. If the third time the action fail, then it will be handled by the Nikita session as a failed action.

```js
count = 0
require('nikita')
.call({ attempt: 3 }, function(){
  count++
})
.next(function(){
  assert(count, 3)
})
```

The default value is "1" which means that actions are not rescheduled on error.
