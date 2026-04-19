---
title: Garbage Collector
layout: beamlua
date: 2026-04-16
---

Every time you create a new object, which are things like tables, strings or userdata like vec3 or quats, it allocates memory. Because we dont have infinite memory yet, lua has a garbage colector, whichs role is to clean unused objects to free up ram. It doesnt run every frame, it runs when it decides to. That means that instead of your fps dropping, you get a way worse form of lag: rubber banding, where the game slow downs and speeds up right after, or it may freeze when it runs. Thats because when it runs, all lua is paused until it finishes its job. With small loads its unnoticeable.

You can measure how much garbage you are creating by running gcprobe(), like timeprobe() at the start and end of your measurement.



Every time you create a new object, which are things like tables, strings, or userdata like vec3 or quats, it allocates memory. Because we don't have infinite memory yet, Lua has a garbage collector, whose role is to clean unused objects to free up RAM. It doesn't run every frame, it runs when it decides to. That means that instead of your FPS dropping, you get a way worse form of lag: rubber banding, where the game slows down and speeds up right after, or it may freeze when it runs. That's because when it runs, all Lua is paused until it finishes its job. With small loads, it's unnoticeable.

You can measure how much garbage you are creating by running gcprobe(), like timeprobe(), at the start and end of your measurement.





Any time you create an object, it allocates memory. The object turns into garbage when it's not referenced anymore. The garbage collector then collects the garbage when it needs to.

## What's Creating Objects

### Tables

With tables, it's pretty simple. You only create an object when you define a new table, so any time you use `{...}`. So if you can, prefer caching tables in hot loops.<br>
For simple fixed tables like `{x = 2, y = 5}` you can assign them to a variable above the function to avoid creating the table every time it runs.<br>
With changing tables, if you can, reuse the same table and just update its values instead of creating a new one each time, but it's still faster to create a new table than to nil all of its values.

### Strings

String objects are created when you define them: `local text = "Hello World!"`, but also any time you concatenate them: `local text = "Hello " .. "World!"`
- Most functions create new strings, like `string.format(...)` or `string.sub(...)`
Every concatenation creates a new string object, so `local text = player .. ": " .. msg .. "\n"` for example creates 4 new string objects.<br>
If you need to concatenate a lot of strings togheder, you can either use a temporary table and then use `table.concat(...)`, or you can use [string.buffer](/BeamNG.lua/common/string.buffer.html).

### Strings

String literals (e.g. `local text = "Hello World!"`) are created when the chunk is loaded and do not allocate at runtime.

Most string operations create new strings, such as `string.format(...)` or `string.sub(...)`.

Concatenation (`..`) usually creates a new string at runtime, unless it can be resolved at compile time (e.g. `"Hello " .. "World!"` may be constant-folded).

LuaJIT optimizes chained concatenations, so expressions like:
`local text = player .. ": " .. msg .. "\n"`
typically allocate only one new string, not one per `..`.

If you need to concatenate many strings repeatedly (e.g. in a loop), consider using a temporary table with `table.concat(...)`, or a buffer such as [`string.buffer`](/BeamNG.lua/common/string.buffer.html).

### UserData And CData

Of course any time you create an other kind of object, it turns into garbage eventually too, but since there are many different kinds of objects i will split them below

#### Vectors (and quats)

This is often the biggest garbage creator. Since every time you do math with them it creates a new object. So even things like this: `vecC = vecA + vecB` is creating garbage.
