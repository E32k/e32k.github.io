---
title: Lua vec3 and quat Library
---

# Lua vec3 and quat Library

This module provides a **vector (`vec3`) and quaternion (`quat`) implementation** in Lua, designed for 3D math operations in games or simulations.

## Features

- **vec3**:
  - Creation from numbers, tables, or other vectors.
  - Arithmetic operations: addition, subtraction, multiplication, division.
  - Dot and cross products.
  - Normalization, length, squared length, resizing, and distance calculations.
  - Advanced operations like barycentric coordinates, line/segment distances, projections, and random point generation in spheres or circles.

- **quat**:
  - Creation from numbers, tables, vectors, Euler angles, or axis-angle.
  - Arithmetic operations: addition, subtraction, multiplication, scaling, division.
  - Normalization, conjugation, inversion.
  - Interpolation: nlerp and slerp.
  - Rotations applied to vectors.

## Usage

```lua
local a = vec3(1, 2, 3)
local b = vec3({1, 2, 3})
local c = vec3({x = 1, y = 2, z = 3})

print(a == b)            -- true
print((a - b) == vec3(0, 0, 0))  -- true
print(c * 1)             -- vec3(1, 2, 3)
print(vec3(10, 0, 0):dot(vec3(10, 0, 0))) -- 100


function LuaVec3:setToBase(nx, ny, nz)
  local x, y, z = self.x, self.y, self.z
  self:setScaled2(nx, x)
  tmpv1:setScaled2(ny, y)
  self:setAdd(tmpv1)
  tmpv1:setScaled2(nz, z)
  self:setAdd(tmpv1)
end

function LuaVec3:toBase(nx, ny, nz)
  local t = newLuaVec3xyz(self.x, self.y, self.z)
  t:setToBase(nx, ny, nz)
  return t
end

function LuaVec3:componentMul(b)
  return newLuaVec3xyz(self.x * b.x, self.y * b.y, self.z * b.z)
end

--MARK: vec3 set

function LuaVec3:setMin(a)
  local x, y, z = a:xyz()
  self.x, self.y, self.z = min(self.x, x), min(self.y, y), min(self.z, z)
end

function LuaVec3:setMax(a)
  local x, y, z = a:xyz()
  self.x, self.y, self.z = max(self.x, x), max(self.y, y), max(self.z, z)
end

function LuaVec3:setAddXYZ(x, y, z)
  self.x, self.y, self.z = self.x + x, self.y + y, self.z + z
end
```

## License

This code is distributed under the **bCDDL, v1.1**:

> This Source Code Form is subject to the terms of the bCDDL, v. 1.1.
> If a copy of the bCDDL was not distributed with this file,
> you can obtain one at [http://beamng.com/bCDDL-1.1.txt](http://beamng.com/bCDDL-1.1.txt)
