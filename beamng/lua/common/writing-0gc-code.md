---
title: Writing 0-GC Code - BeamNG.lua
layout: default
---

# Writing Zero-Garbage Code

This section will show you some examples of code before and after 0-gc optimization

## Vehicle Position Predictor

This is a simple code example, that gets the players vehicle, reads its position and velocity, adds them (this will compute a predicted position 1 second in the future) and then draws a sphere in that position.

### Original code
```lua
local M = {}

local function onUpdate()
  -- Get the players vehicle object
  local playerVeh = be:getPlayerVehicle(0)
  if playerVeh then

    -- Get the position and velocity, to predict where the player will be
    local playerPos = playerVeh:getPosition()
    local playerVel = playerVeh:getVelocity()
    local nextPlayerPos = playerPos + playerVelocity

    -- Draw the predicted position
    debugDrawer:drawSphere(nextPlayerPos, 0.1, ColorF(1, 1, 0, 1))
  end
end

M.onUpdate = onUpdate
return M
```

### Optimizing process
The original code produces 5 temporary objects (garbage) each frame:
- `be:getPlayerVehicle()` returns a new object from the C++ territory. The cached function `getPlayerVehicle()` avoids this and is effectively 0-GC.
- `ColorF()` creates a new object each frame. Preallocating it once and reusing it eliminates this allocation.
- `:getPosition()` and `:getVelocity()` return a new LuaVec3 object every call. We should instead use their XYZ alternatives, which are 0-gc.
-  Adding the two vectors creates a new object. We will use the `:setAdd2()` function instead which modifies the vector.

I will also inverse the if statement into an early exit like this: `if not playerVeh then return end`.<br>
This doesn't make the code faster, but it makes it (in my opinion) cleaner.

### 0-GC Code
This is how the code looks like translated into 0-gc literally:
```lua
local M = {}

-- Preallocate variables
local yellow = ColorF(1, 1, 0, 1)
local playerPosition = vec3()
local playerVelocity = vec3()
local nextPlayerPos = vec3()

local function onUpdate()
  local playerVeh = getPlayerVehicle(0)
  if not playerVeh then return end -- Early exit if no vehicle

  playerPosition:set(playerVeh:getPositionXYZ())
  playerVelocity:set(playerVeh:getVelocityXYZ())

  nextPlayerPos:setAdd2(playerPosition, playerVelocity)

  debugDrawer:drawSphere(nextPlayerPos, 0.1, yellow)
end

M.onUpdate = onUpdate
return M
```

### Final Optimized Code
For maximum performance, we can allocate only a single vector and perform all operations on it:
```lua
local M = {}

-- Preallocate variables
local yellow = ColorF(1, 1, 0, 1)
local nextPlayerPos = vec3()

local function onUpdate()
  local playerVeh = getPlayerVehicle(0)
  if not playerVeh then return end -- Early exit if no vehicle

  nextPlayerPos:set(playerVeh:getPositionXYZ())
  nextPlayerPos:setAddXYZ(playerVeh:getVelocityXYZ())

  debugDrawer:drawSphere(nextPlayerPos, 0.1, yellow)
end

M.onUpdate = onUpdate
return M
```