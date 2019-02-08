---
title: Option "retry"
---

# Option "retry" (number|boolean, optional, 1)

Setting the "retry" option provides control over how many time an action is re-scheduled on error before it is finally treated as a failure.

It is commonly used conjointly with the ["attempt" option](/options/attempt/) which provide an indicator over how many times an action was rescheduled.

## Usage

The default value is "1" which means that actions are not rescheduled on error.

If provided as an number, the value must be superior or equal to `1`. For example, the value 3 means the action will be executed at maximum 3 times. If the third time the action fail, then it will be treated by the Nikita session as a failed action.

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

Set the value as `true` for an unlimited number of retries. The value `false` is the same as `1`.
