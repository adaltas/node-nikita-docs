---
title: Option "sleep"
---

# Option "sleep"

The "sleep" option indicates the time lapse when an action is rescheduled. It only has effect if the "attempt" option is set to a value greater than 1 and when the action failed and is rescheduled.

## Usage

The sleep value is an integer and is interpreted in millisecond. The default value is "3000". Here is an example raising the sleep period to 5 seconds.

```js
require('nikita')
.system.execute({
  cmd: '[ `whoami` == "root"]',
  retry: 3,
  sleep: 5000
})
```

Any value not superior or equal to zero will generate an error.
