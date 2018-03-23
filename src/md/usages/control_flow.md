---
title: Control Flow
layout: page
sort: 7
---

# Control Flow

Nikita run every actions sequentially. This behavior ensures there are no concflict between two commands executed simultanously and is aligned with SSH which execute one command at a time for a given connection.

## Sequential execution

Since an action may contain child actions, the way Nikita run is similar to how you might want to traverse a file system. For every action scheduled, Nikita will run its children recursivelly before passing to the next schedules action. Let's imaging we want to install 2 packages "my_pkg_1" and "my_pkg_2" before modify a configuration file:

```js
require('nikita')
.call(function{
  this.service('my_pkg_1');
  this.service('my_pkg_2');
})
.file.yaml({
  target: '/etc/my_pkg/config.yaml',
  	content: { my_property: 'my value' }
});
```

The actions will be executed in this sequence:

* "call"
* "service" for "my_pkg_1"
* "service" for "my_pkg_2"
* "file.yaml"

This tree-like traversal is leverage by the "header" option and the "log.cli" action to display a report to the therminal.

```bash
require('nikita')
.log.cli({pad: {header: 20}})
.call({header: 'Packages'}, function(){
  this.service({header: 'My PKG 1'}, 'my_pkg_1');
  this.service({header: 'My PKG 2'}, 'my_pkg_2');
})
.file.yaml({
  header: 'Config',
  target: '/etc/my_pkg/config.yaml',
  content: { my_property: 'my value' }
});
```

Will output:

```
localhost   Packages : My PKG 1  -  1ms
localhost   Packages : My PKG 2  -  1ms
localhost   Packages             -  3ms
localhost   Config               -  10ms
```

## Interupting the execution

At any point in time, it is possible to interrupt the execution of the current action by calling `end`. If executed on a parent action, the context will simply exit. It is common to call `end` from inside a callback, for exemple after executing a shell command:

```js
require('nikita')
.execute({
  cmd: "node -v"
}, function(err, status, stdout){
  if(stdout.split('.')[0] != 'v1'){
    console.log('That was a century ago');
    @end()
  }
})
.call(function(){
  console.log('This will not be executed if version is 1')
})
.then(function(){
  console.log('Done');
});
```

Note, the function `end` may receive condition options. For example, the callback function from the previous exemple could be rewritten as:

```js
function(err, status, stdout){
  @end({if: stdout.split('.')[0] != 'v1'})
}
```