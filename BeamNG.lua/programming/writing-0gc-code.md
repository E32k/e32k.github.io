---
title: Writing 0-GC Code - BeamNG.lua
layout: default
date: 2026-03-08
---

# Writing Zero-Garbage Code

This section will show you some examples of code before and after 0-gc optimization. See [LuaVec3 library](/beamng/lua/common/LuaVec3.html) for all aviable vec3() functions.

## Vehicle Position Predictor

This is a simple code example, that gets the players vehicle, reads its position and velocity, adds them togedher and then draws a sphere in that position.

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
- `be:getPlayerVehicle()` returns a new object from the C++ territory each call. Not only this produces garbage, its also slow. Using the cached function `getPlayerVehicle()` avoids this and is effectively 0-GC.
- `ColorF()` creates a new object each frame. Preallocating it once and reusing it eliminates this allocation.
- `:getPosition()` and `:getVelocity()` return a new LuaVec3 object every call. Using their XYZ alternatives avoids this.
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
return M
```

## Raycasting function

This function computes the intersection of a ray with a triangle in 3D space using the Möller–Trumbore algorithm.<br>
It returns the distance along the ray to the intersection point and the barycentric coordinates (u, v) of the hit on the triangle, or 0 if the ray does not intersect the triangle.<br>
Functions like these are particularly susceptible to performance issues caused by Garbage Collection.

### Original code
```lua
local function raycastTriangle(pos, dir, triA, triB, triC)

  -- triangle edges
  local edgeAB = triB - triA
  local edgeAC = triC - triA

  -- vector perpendicular to ray and AC
  local pVec = dir:cross(edgeAC)

  -- determinant (checks if ray is parallel)
  local det = edgeAB:dot(pVec)
  if math.abs(det) < 1e-6 then return 0, 0, 0 end

  local invDet = 1 / det

  -- vector from A to ray origin
  local tVec = pos - triA

  -- barycentric coordinate u
  local u = tVec:dot(pVec) * invDet
  if u < 0 or u > 1 then return 0, 0, 0 end

  -- helper vector for v
  local qVec = tVec:cross(edgeAB)

  -- barycentric coordinate v
  local v = dir:dot(qVec) * invDet
  if v < 0 or (u + v) > 1 then return 0, 0, 0 end

  -- distance along the ray
  local dist = edgeAC:dot(qVec) * invDet
  if dist < 1e-6 then return 0, 0, 0 end

  return dist, u, v
end
```

### Optimizing Process
First we declare all vectors above the function.<br>
Then we can replace:
- `a = b - c` with `a:setSub2(b, c)`
- `a = b:cross(c)` with `a:setCross(b, c)`

### 0-GC Code
```lua
local edgeAB = vec3()
local edgeAC = vec3()

local pVec = vec3()
local tVec = vec3()
local qvec = vec3()

local function raycastTriangle(pos, dir, triA, triB, triC)

  -- triangle edges
  edgeAB:setSub2(triB, triA)
  edgeAC:setSub2(triC, triA)

  -- vector perpendicular to ray and AC
  pVec:setCross(dir, edgeAC)

  -- determinant (checks if ray is parallel)
  local det = edgeAB:dot(pVec)
  if math.abs(det) < 1e-6 then return 0, 0, 0 end

  local invDet = 1 / det

  -- vector from A to ray origin
  tVec:setSub2(pos, triA)

  -- barycentric coordinate u
  local u = tVec:dot(pVec) * invDet
  if u < 0 or u > 1 then return 0, 0, 0 end

  -- helper vector for v
  qvec:setCross(tVec, edgeAB)

  -- barycentric coordinate v
  local v = dir:dot(qvec) * invDet
  if v < 0 or (u + v) > 1 then return 0, 0, 0 end

  -- distance along the ray
  local dist = edgeAC:dot(qvec) * invDet
  if dist < 1e-6 then return 0, 0, 0 end

  return dist, u, v
end
```