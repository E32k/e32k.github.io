---
title: Garbage Collector
layout: beamlua
date: 2026-03-08
---

<@user> Quick explanation of how Lua GC works and why it can cause stutters.

Every time you create an object in Lua (tables, vec3, strings, etc.), it stays in memory until **nothing references it anymore**. After that, it becomes *garbage* and waits to be cleaned up.

```lua
local function something()
  local vehicle = be:getPlayerVehicle(0)
  local veh_pos = vehicle:getPosition()

  -- ...

  -- function ends → both variables lose their references
end
```

That data is now unused, but not deleted immediately.

## The important part

Lua’s garbage collector:
- runs **whenever it decides to**
- is **blocking** (it pauses Lua while running)

So if a lot of garbage builds up → GC runs → **frame stutter**

## Easy way to visualize it

Think of memory like a pile:

```text
[used][used][used][garbage][garbage][garbage]
```

Lua keeps adding garbage during gameplay.
Then suddenly:

```text
GC runs → cleans everything → pause
```

That pause is your stutter.

## What creates garbage

Even simple code can generate a lot:

```lua
local str = ""
for i = 1, 1000 do
  str = str .. i -- new string every loop
end
```

Each `..` creates a new string → old ones become garbage.

## Example with actual cost

```lua
local function dirBetweenVehicles()
  local vehicle_1 = be:getPlayerVehicle(0) -- big object
  local vehicle_2 = be:getPlayerVehicle(1)

  local pos1 = vehicle_1:getPosition()
  local pos2 = vehicle_2:getPosition()

  local dir = (pos1 - pos2):normalized()

  return dir
end
```

This creates multiple temporary objects:
- vehicle refs
- vec3 positions
- result vector

All of these can turn into garbage quickly if called often.

## Why this becomes a problem

If this runs every frame:
- garbage builds up fast
- GC has to clean more
- bigger pause → visible lag spike

## How to reduce GC pressure

Instead of creating new objects, **reuse them**.

### Bad (allocates every call)

```lua
local function f()
  local v = vec3(0, 0, 0)
  return v
end
```

### Better (reuse)

```lua
local TMP = vec3()

local function f()
  TMP:set(0, 0, 0)
  return TMP
end
```

### Even better: cache multiple objects

```lua
local CACHE = {
  pos1 = vec3(),
  pos2 = vec3(),
  dir  = vec3()
}

local function dirBetweenVehicles()
  local pos1 = CACHE.pos1
  local pos2 = CACHE.pos2
  local dir  = CACHE.dir

  local v1 = getPlayerVehicle(0)
  local v2 = getPlayerVehicle(1)

  pos1:set(v1:getPositionXYZ())
  pos2:set(v2:getPositionXYZ())

  dir:set(pos1)
  dir:setSub(pos2)
  dir:normalize()

  return dir:xyz()
end
```

Now:
- no new vec3 objects are created
- almost zero garbage
- GC runs less → smoother game

## Key takeaway

- Creating objects = future GC work
- GC runs randomly and blocks execution
- Spikes happen when too much garbage accumulates
- Reuse objects and avoid temporary allocations