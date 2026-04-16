---
title: Garbage Collector
layout: beamlua
date: 2026-04-16
---

Lua has an automatic garbage collector (GC). Its job is to free memory that your program no longer uses, so you don’t have to manually delete things.

## 1. What gets managed?
Lua automatically tracks and manages:
- tables
- strings
- functions
- userdata
- threads (coroutines)

Numbers, booleans, and nil are not managed (they are simple values).

## 2. Basic idea
When you create something like a table:

```lua
local t = {1, 2, 3}
```

Lua allocates memory for it. As long as something still references `t`, it stays in memory.

```lua
local a = {1, 2}
local b = a
a = nil
```

Here:
- the table is still kept alive because `b` points to it
- setting `a = nil` does not delete the table

When NOTHING references it anymore:

```lua
local a = {1, 2}
a = nil
```

Now the table becomes unreachable → garbage collector will eventually remove it.

## 3. How Lua decides what to delete
Lua uses a method similar to **mark-and-sweep**:

### Step 1: Mark
It starts from “roots”:
- global variables
- current stack variables
- references inside tables

It marks everything reachable from there as “alive”.

### Step 2: Sweep
Everything not marked is considered garbage and is freed.

## 4. When GC runs
You usually don’t control it directly.

Lua runs GC:
- automatically when memory usage grows
- periodically after allocations

So cleanup happens in the background.

## 5. Weak references (important concept)
Sometimes you want a table that does NOT keep objects alive.

Example use: caches.

```lua
t = {}
setmetatable(t, { __mode = "v" }) -- weak values
```

Now if nothing else references a value, it can still be collected even if it is inside `t`.

Types:
- `"k"` → weak keys
- `"v"` → weak values
- `"kv"` → both

## 6. Cycles are handled correctly
Lua can clean circular references:

```lua
local a = {}
local b = {}

a.other = b
b.other = a

a = nil
b = nil
```

Even though `a` and `b` reference each other, they are still garbage once unreachable from roots.

## 7. Manual control (optional)
You can influence GC, but normally you shouldn’t:

```lua
collectgarbage("collect")  -- force a cycle
collectgarbage("count")    -- memory usage (KB)
collectgarbage("stop")     -- pause GC
collectgarbage("restart")  -- resume GC
```

## 8. Key takeaway
- You do NOT free memory manually in Lua
- You only remove references
- Lua cleans up unreachable objects automatically
- GC is automatic, incremental, and usually invisible