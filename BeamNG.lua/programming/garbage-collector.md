---
title: Garbage Collector
layout: beamlua
date: 2026-03-08
---

# Lua Garbage Collection and performance stutters

Lua manages memory automatically using a **garbage collector (GC)**.
You do not free memory manually. Instead, Lua tracks whether objects are still reachable and cleans them when they are not.

Any value that allocates memory (tables, userdata like vec3/quat, strings, closures) eventually becomes GC-managed once it is no longer referenced.

## Object lifetime in practice

```lua
local function update()
  local vehicle = be:getPlayerVehicle(0)
  local pos = vehicle:getPosition()

  -- work happens here

  -- function ends → vehicle and pos go out of scope
end
```

When the function exits:
- local references disappear
- Lua may now consider those objects collectible
- actual deletion is deferred

Nothing is immediately freed.

## Why GC can cause frame drops

Lua GC runs periodically and performs work in chunks, but it is still **synchronous with the Lua thread**.

When it runs:
- Lua execution pauses
- memory graph is scanned
- unused objects are freed

If a lot of allocations happened recently, that cleanup step becomes heavier, producing a visible spike.

## Visual model

Memory behaves like a network of references:

```text
root → A → B → C
```

As long as a path exists, objects stay alive.

Once references are broken:

```text
root → A     B → C
            (no path from root)
```

B and C are no longer reachable and become candidates for cleanup.

## Small allocations still accumulate

Even simple operations can generate temporary objects:

```lua
local s = ""
for i = 1, 1000 do
  s = s .. i
end
```

Each concatenation:
- creates a new string
- leaves the old one behind
- produces garbage immediately

Repeated patterns like this increase GC workload quickly.

## Hidden cost in common game logic

Frequent queries often create short-lived objects:

```lua
local function computeDirection()
  local v1 = be:getPlayerVehicle(0)
  local v2 = be:getPlayerVehicle(1)

  local p1 = v1:getPosition()
  local p2 = v2:getPosition()

  return (p1 - p2):normalized()
end
```

Even though the code is small:
- multiple temporary vectors are created
- intermediate results are allocated
- all of them become garbage shortly after use

If executed every frame, this compounds into noticeable GC pressure.

## Why spikes happen instead of smooth cost

GC does not distribute all work evenly every frame.

Instead:
- memory accumulates gradually
- GC runs when thresholds are reached
- cleanup happens in bursts

That burst is what appears as a **frame-time spike**.

## Reducing GC pressure

Main idea: avoid frequent short-lived allocations.

### Bad pattern

```lua
local function step()
  local v = vec3(0, 0, 0)
  return v
end
```

Every call creates a new object.

### Better pattern (reuse)

```lua
local tmp = vec3()

local function step()
  tmp:set(0, 0, 0)
  return tmp
end
```

### Cached buffer approach

```lua
local BUF = {
  p1 = vec3(),
  p2 = vec3(),
  dir = vec3()
}

local function direction()
  local v1 = getPlayerVehicle(0)
  local v2 = getPlayerVehicle(1)

  BUF.p1:set(v1:getPositionXYZ())
  BUF.p2:set(v2:getPositionXYZ())

  BUF.dir:set(BUF.p1)
  BUF.dir:setSub(BUF.p2)
  BUF.dir:normalize()

  return BUF.dir:xyz()
end
```

This reduces:
- temporary allocations
- GC frequency
- runtime spikes

## Summary

- Lua frees memory automatically via GC
- GC runs periodically and blocks execution
- frequent allocations increase GC load
- reuse objects to reduce stutter risk