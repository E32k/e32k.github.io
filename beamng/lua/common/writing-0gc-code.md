---
title: Writing 0-GC Code - BeamNG.lua
layout: default
---

# Writing Zero-Garbage Code

This section will show you some examples of code before and after 0-gc optimization

## Vehicle Position Predictor
```lua
local M = {}

local function onUpdate()
  local playerVeh = be:getPlayerVehicle(0)
  if playerVeh then
    local playerPos = playerVeh:getPosition()
    local playerVel = playerVeh:getVelocity()
    local nextPlayerPos = playerPos + playerVelocity
    debugDrawer:drawSphere(nextPlayerPos, 0.1, ColorF(1, 1, 0, 1))
  end
end

M.onUpdate = onUpdate
end
```
First i will inverse the if statement into an early exit. This doesn't make the code faster, but it makes it (in my opinion) cleaner.
```lua
if not playerVeh then return end
```

Next i will use the cached getPlayerVehicle function
```lua
local playerVeh = getPlayerVehicle(0)
```

Then i will add a vector that i will modify
```lua
local nextPlayerPos = vec3()
local function onUpdate()
  ...
end
```

With that, i will replace the functions for their XYZ alternatives and use the :set function to avoid creating a new object
```lua
nextPlayerPos:set(playerVeh:getPositionXYZ())
nextPlayerPos:setAddXYZ(playerVeh:getVelocityXYZ())
```

`ColorF()` is also creating a new object every frame, so since its not changing, I will define it only once in a variable
```lua
local yellow = ColorF(1, 1, 0, 1)
local function onUpdate()
  ...
  debugDrawer:drawSphere(nextPlayerPos, 0.1, yellow)
end
```

At the end, this function becomes 0-gc and looks like this:

```lua
local M = {}

local yellow = ColorF(1, 1, 0, 1)
local nextPlayerPos = vec3()

local function onUpdate()
  local playerVeh = getPlayerVehicle(0)
  if not playerVeh then return end
  nextPlayerPos:set(playerVeh:getPositionXYZ())
  nextPlayerPos:setAddXYZ(playerVeh:getVelocityXYZ())
  debugDrawer:drawSphere(nextPlayerPos, 0.1, yellow)
end

M.onUpdate = onUpdate
end
```