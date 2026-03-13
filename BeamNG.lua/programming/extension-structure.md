---
title: Writing 0-GC Code - BeamNG.lua
layout: default
date: 2026-03-08
---

# Extension Structure

This section explains how extensions work, how they are loaded, and how they interact with the extension manager.

## How do extensions work?

Extensions are Lua files that return a table containing functions. These functions act as hooks that the extension manager calls at specific times.

The extension manager `extensions` is responsible for loading, managing, and executing extensions. It provides functions such as:
- loading extensions
- resolving dependencies
- calling extension hooks
- unloading extensions
- serializing extension state
- dispatching events to extensions

When an extension is loaded, the manager executes the Lua file using `require`. The file must return a table, which becomes the extension module.

```lua
local M = {}

return M
```

Once the extension is loaded, the returned table is stored internally and also exposed globally using the extension name.
The extension name is generated like this:
for an extension: `ui/myExetnsion.lua` the extension will be aviable under `ui_myExtension`.



When the game loads you extension, it runs the whole lua file once and then never touches it again. So first you create a new local variable named M (name doesnt matter but consistency does) and you make it a table.
```lua
local M = {}
```
Then you define your local variables and other stuff. For example your functions and variables
```lua
local welcome = "hi"

local function hello()
  print(welcome)
end
```

Then you assign the functions to the table

```lua
M.onUpdate = hello
```

You can also define functions directly in the M table

```lua
M.onExtensionLoaded = function() print("Hello World!") end
```