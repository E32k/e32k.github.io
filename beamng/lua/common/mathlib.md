# Lua vec3 and quat Library Documentation

This library provides 3D mathematics utilities in Lua, including vectors (`vec3`) and quaternions (`quat`), along with temporary stack vectors and random point generators.

---

## Overview

- **vec3**: 3D vector operations (arithmetic, normalization, distances, projections, barycentric coordinates, etc.)
- **quat**: Quaternion operations (rotation, interpolation, conversion to/from Euler angles, etc.)
- **push3**: Stack-based temporary vectors for efficient calculations
- **Random & Blue-Noise Generators**: Produce pseudo-random points in circles and spheres

The library uses **FFI** if available for performance. Otherwise, it uses Lua tables with metatables.

---

## vec3

### Construction

- `vec3(x, y, z)` - Creates a vector with given components. `z` defaults to 0 if not provided.
- `vec3({x=?, y=?, z=?})` - Creates a vector from a dictionary.
- `vec3({?, ?, ?})` - Creates a vector from a list.
- `vec3()` - Defaults to (0,0,0).

---
### LuaVec3:projectToOriginPlane(pnorm)
```lua
-- pnorm is plane's normal
function LuaVec3:projectToOriginPlane(pnorm)
  local t = self.x*pnorm.x + self.y*pnorm.y + self.z*pnorm.z
  return newLuaVec3xyz(self.x - t*pnorm.x, self.y - t*pnorm.y, self.z - t*pnorm.z)
end
```
Projects the vector onto a plane that passes through the **origin**, defined by its normal.
- `pnorm` - plane normal (`LuaVec3`)

**Notes:**  
- Removes the component of the vector along the plane normal.  
- The resulting vector lies entirely in the plane perpendicular to `pnorm`.  
- Returns a **new vector** (allocates).  
- Equivalent to subtracting the projection onto the normal.  
- Related: [Vector projection - Wikipedia](https://en.wikipedia.org/wiki/Vector_projection)


---

### LuaVec3:xnormPlaneWithLine(pnorm, a, b)
```lua
-- self is a plane' point, pnorm is plane's normal
function LuaVec3:xnormPlaneWithLine(pnorm, a, b)
  return (pnorm.x*(self.x-a.x) + pnorm.y*(self.y-a.y) + pnorm.z*(self.z-a.z)) *
          max(min(1 / (pnorm.x*(b.x-a.x) + pnorm.y*(b.y-a.y) + pnorm.z*(b.z-a.z)), 1e300), -1e300) -- pnorm:dot(self-a)/pnorm:dot(b-a)
end
```
Computes the **normalized intersection parameter** between a line segment and a plane.
- `pnorm` - plane normal  
- `a`, `b` - line start and end points

**Notes:**  
- Treats `self` as a point on the plane.  
- Returns the parameter `t` such that `a + (b - a) * t` lies on the plane.  
- Useful for ray/line-plane intersection tests.  
- The value is clamped to avoid division overflow.  
- Related: [Line-plane intersection - Wikipedia](https://en.wikipedia.org/wiki/Line%E2%80%93plane_intersection)


---

### LuaVec3:xnormsSphereWithLine(radius, a, b)
```lua
-- self is center of sphere, returns (low, high) xnorms. Returns pair 1,0 if no hit found
function LuaVec3:xnormsSphereWithLine(radius, a, b)
  local lDif, ac = b - a, a - self
  local invDif2len = 1 / max(lDif:squaredLength(), 1e-30)
  local dotab = -ac:dot(lDif) * invDif2len
  local D = dotab * dotab + (radius * radius - ac:squaredLength()) * invDif2len
  if D >= 0 then
    D = sqrt(D)
    return dotab - D, dotab + D
  else
    return 1, 0
  end
end
```
Computes the **intersection parameters** between a line and a sphere.
- `radius` - sphere radius  
- `a`, `b` - line start and end points

**Notes:**  
- Treats `self` as the center of the sphere.  
- Returns two normalized parameters `(low, high)` along the line.  
- If no intersection exists, returns `(1, 0)`.  
- Commonly used for ray-sphere collision tests.  
- Related: [Line-sphere intersection - Wikipedia](https://en.wikipedia.org/wiki/Line%E2%80%93sphere_intersection)


---

### LuaVec3:basisCoordinates(c1, c2, c3)
```lua
function LuaVec3:basisCoordinates(c1, c2, c3)
  local c2xc3 = c2:cross(c3)
  local invDet = 1 / c1:dot(c2xc3)
  return newLuaVec3xyz(c2xc3:dot(self)*invDet, c3:cross(c1):dot(self)*invDet, c1:cross(c2):dot(self)*invDet)
end
```
Converts the vector into **coordinates relative to a custom basis**.
- `c1`, `c2`, `c3` - basis vectors

**Notes:**  
- Solves the linear system `self = x*c1 + y*c2 + z*c3`.  
- Uses scalar triple products (cross + dot).  
- Returns a **new vector** containing the basis coordinates.  
- The basis vectors must be linearly independent.  
- Related: [Change of basis - Wikipedia](https://en.wikipedia.org/wiki/Change_of_basis)


---

### LuaVec3:setToBase(nx, ny, nz) and LuaVec3:toBase(nx, ny, nz)
```lua
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
```
Transforms the vector **from local coordinates into world space** using a basis.
- `nx`, `ny`, `nz` - basis vectors

**Notes:**  
- Interprets the vector’s components as weights of the basis vectors.  
- `LuaVec3:setToBase(nx, ny, nz)` Modifies the vector **in-place** (0-GC).  
- `LuaVec3:toBase(nx, ny, nz)` returns a new vector, which means it produces garbage.
- Equivalent to a linear combination of the basis vectors.


---

### LuaVec3:componentMul(b)
```lua
function LuaVec3:componentMul(b)
  return newLuaVec3xyz(self.x * b.x, self.y * b.y, self.z * b.z)
end
```
Returns a component-wise multiplied vector. Avoid, and instead use the 0-GC alternative: [`LuaVec3:setComponentMul(a)`](#luavec3setscaledb-luavec3setscaled2a-b-and-luavec3setcomponentmula)

`local myVectorC = myVectorA * myVectorB` = `local myVectorC = myVectorA:componentMul(myVectorB)`


---

# Zero-Garbage Vec3 Set Functions
## Basic Math
### LuaVec3:setMin() and LuaVec3:setMax()

```lua
function LuaVec3:setMin(a)
  local x, y, z = a:xyz()
  self.x, self.y, self.z = min(self.x, x), min(self.y, y), min(self.z, z)
end

function LuaVec3:setMax(a)
  local x, y, z = a:xyz()
  self.x, self.y, self.z = max(self.x, x), max(self.y, y), max(self.z, z)
end
```
Updates the vector so that each component (`x`, `y`, `z`) becomes the **minimum/maximum** of itself and the corresponding component of another vector.


---

### LuaVec3:setAddXYZ(),  LuaVec3:setAdd() and LuaVec3:setAdd2()
```lua
function LuaVec3:setAddXYZ(x, y, z)
  self.x, self.y, self.z = self.x + x, self.y + y, self.z + z
end

function LuaVec3:setAdd(a)
  local x, y, z = a:xyz()
  self.x, self.y, self.z = self.x + x, self.y + y, self.z + z
end

function LuaVec3:setAdd2(a, b)
  local x, y, z = a:xyz()
  local bx, by, bz = b:xyz()
  self.x, self.y, self.z = x + bx, y + by, z + bz
end
```
Updates the vector by **adding** values component-wise.
- `LuaVec3:setAddXYZ(x, y, z)` - adds numbers (XYZ tuple)
- `LuaVec3:setAdd(a)` - adds another vector
- `LuaVec3:setAdd2(a, b)` - sets to sum of two vectors

**Replacements:**  
- `myVectorA.x = myVectorA.x + x`, `myVectorA.y = myVectorA.y + y`, `myVectorA.z = myVectorA.z + z` = `myVectorA:setAddXYZ(x, y, z)`  
- `myVectorA = myVectorA + myVectorB` = `myVectorA:setAdd(myVectorB)`  
- `myVectorA = myVectorB + myVectorC` = `myVectorA:setAdd2(myVectorB, myVectorC)`  


---

### LuaVec3:setSub() and LuaVec3:setSub2()
```lua
function LuaVec3:setSub(a)
  local x, y, z = a:xyz()
  self.x, self.y, self.z = self.x - x, self.y - y, self.z - z
end

function LuaVec3:setSub2(a, b)
  local x, y, z = a:xyz()
  local bx, by, bz = b:xyz()
  self.x, self.y, self.z = x - bx, y - by, z - bz
end
```
Updates the vector by **subtracting** values component-wise.
- `LuaVec3:setSub(a)` - subtracts another vector
- `LuaVec3:setSub2(a, b)` - sets to difference of two vectors

**Replacements:**  
- `myVectorA = myVectorA - myVectorB` = `myVectorA:setSub(myVectorB)`  
- `myVectorA = myVectorB - myVectorC` = `myVectorA:setSub2(myVectorB, myVectorC)`  


---

### LuaVec3:setScaled(b), LuaVec3:setScaled2(a, b) and LuaVec3:setComponentMul(a)
```lua
function LuaVec3:setScaled(b)
  self.x, self.y, self.z = self.x * b, self.y * b, self.z * b
end

function LuaVec3:setScaled2(a, b)
  local x, y, z = a:xyz()
  self.x, self.y, self.z = x * b, y * b, z * b
end

function LuaVec3:setComponentMul(a)
  local x, y, z = a:xyz()
  self.x, self.y, self.z = self.x * x, self.y * y, self.z * z
end
```
Updates the vector by **multiplying** values component-wise.
- `LuaVec3:setScaled(b)` - scales the vector by a number
- `LuaVec3:setScaled2(a, b)` - sets to vector * number
- `LuaVec3:setComponentMul(a)` - scales the vector by another vector

**Replacements:**  
- `myVectorA = myVectorA * myNumber` = `myVectorA:setScaled(myNumber)`
- `myVectorA = myVectorB * myNumber` = `myVectorA:setScaled2(myVectorB, myNumber)`
- `myVectorA = myVectorA * myVectorB` = `myVectorA:setComponentMul(myVectorB)`




## Vector Algebra
### LuaVec3:setLerp(from, to, t)
```lua
function LuaVec3:setLerp(from, to, t)
  local x, y, z = from:xyz()
  local bx, by, bz = to:xyz()
  local t1 = 1 - t
  self.x, self.y, self.z = x*t1 + bx*t, y*t1 + by*t, z*t1 + bz*t  -- preserves from and to, non monotonic
end
```
Updates the vector by **linearly interpolating** between two vectors.
- `LuaVec3:setLerp(from, to, t)`
  - `from` - starting vec3
  - `to` - ending vec3
  - `t` - interpolation factor (0 = from, 1 = to, 0.5 = in the middle)

**Notes:**  
- You can visualize this as a **straight line connecting `from` and `to`**, and the vector moves along this line as `t` goes from 0 to 1.  
- `from` and `to` Vectors are not modified.  
- `myVectorA = myVectorB*(1-t) + myVectorC*t` = `myVectorA:setLerp(myVectorB, myVectorC, t)`  


---

### LuaVec3:setCross(a, b)
```lua
function LuaVec3:setCross(a, b)
  local x, y, z = a:xyz()
  local bx, by, bz = b:xyz()
  self.x, self.y, self.z = y*bz - z*by, z*bx - x*bz, x*by - y*bx
end
```
Updates the vector by **computing the cross product** of two vectors.
- `LuaVec3:setCross(a, b)` - sets the vector to the cross product of `a` and `b`

**Notes:**  
- The resulting vector is perpendicular to both `a` and `b`.  
- For more on the cross product, see [Cross Product - Wikipedia](https://en.wikipedia.org/wiki/Cross_product). 




## Rotations and Coversions
### LuaVec3:setRotate(q, a)
```lua
function LuaVec3:setRotate(q, a)
  local x, y, z = (a or self):xyz()
  local tx,ty,tz = (push3(q):cross(push3(x,y,z)) * 2):xyz()
  self:set(push3(x,y,z) - push3(tx,ty,tz) * q.w + push3(q):cross(push3(tx,ty,tz)))
end
```
Updates the vector by **rotating it with a quaternion**.
- `LuaVec3:setRotate(q, a)` - rotates `a` (or itself if `a` is nil) by quaternion `q`

**Notes:**  
- Uses quaternion rotation formula for 3D vectors.  
- If `a` is omitted, the vector rotates itself.  
- For more on quaternion rotations, see [Quaternions and spatial rotation - Wikipedia](https://en.wikipedia.org/wiki/Quaternions_and_spatial_rotation)


---

### LuaVec3:setEulerYXZ(q)
```lua
--http://bediyap.com/programming/convert-quaternion-to-euler-rotations/
function LuaVec3:setEulerYXZ(q)
  local wxsq = q.w*q.w - q.x*q.x
  local yzsq = q.z*q.z - q.y*q.y
  self.x, self.y, self.z = math.atan2(2*(q.x*q.y+q.w*q.z), wxsq-yzsq), math.asin(max(min(-2*(q.y*q.z-q.w*q.x), 1), -1)), math.atan2(2*(q.x*q.z+q.w*q.y), wxsq+yzsq)
end
```
Updates the vector by **converting a quaternion to Euler angles** in YXZ order.
- `LuaVec3:setEulerYXZ(q)` - sets the vector components to the Euler angles derived from quaternion `q`

**Notes:**  
- Computes rotation angles around Y, X, and Z axes in YXZ order.  
- Handles gimbal lock by clamping the input to `asin` between -1 and 1.  


---

### LuaVec3:setProjectToOriginPlane(pnorm, a)
```lua
function LuaVec3:setProjectToOriginPlane(pnorm, a)
  local x,y,z = (a or self):xyz()
  local px,py,pz = pnorm:xyz()
  local t = x*px + y*py + z*pz
  self.x, self.y, self.z = x - t*px, y - t*py, z - t*pz
end
```
Projects the vector onto a plane that passes through the origin, defined by its normal vector.  
- `LuaVec3:setProjectToOriginPlane(pnorm, a)`  
  - `pnorm` - normal vector of the plane  
  - `a` - optional vector to project (defaults to `self`)  

**Notes:**  
- The resulting vector lies in the plane and is perpendicular to `pnorm`.  
- Only `self` is modified; `pnorm` and `a` are preserved.  


---

### LuaVec3:setPerpendicular(a)
```lua
function LuaVec3:setPerpendicular(a)
  local x,y,z = (a or self):xyz()
  local k = abs(x) + 0.5
  k = k - floor(k)
  self.x, self.y, self.z = -y, x - k*z, k*y
end
```
Sets the vector to be **perpendicular** to another vector.  
- `LuaVec3:setPerpendicular(a)`  
  - `a` - optional vector to base perpendicular calculation on (defaults to `self`)  

**Notes:**  
- The resulting vector is perpendicular to `a` (or `self` if `a` is omitted).  
- Useful for generating an orthogonal vector in 3D space.  
- Only `self` is modified; the original vector is preserved.  
