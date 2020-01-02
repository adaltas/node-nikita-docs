---
title: Metadata "sudo"
redirects:
- /options/sudo/
---

# Metadata "sudo" (boolean, optional, false)

## Introduction

The "sudo" option escalates the right of the current user with `root` privileges. Passwordless sudo for the user must be enabled. The "sudo" option is cascaded to all its children.

## Usage

The expected value is a boolean which default to `false`.

```js
require('nikita')
.system.execute({
  sudo: true,
  cmd: 'whoami'
}, function(err, {stdout}){
  assert(stdout.trim() === 'root')
})
```
