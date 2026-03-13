---
title: LuaVec3 - BeamNG.lua
layout: default
date: 2026-03-11
---

# The LuaVec3 library

These are all the functions you can use on vec3()

## Basic Operations

### Creating

<table class="api"><tr>
  <th class="func">vec3</th>
  <td class="args">see below</td>
  <td class="rets">LuaVec3</td>
<td class="desc">Returns a new LuaVec3 object (creates garbage)</td>
</tr><tr><td colspan="4" class="details">
Supports <code>vec3()</code>, <code>vec3(x, y)</code>, <code>vec3(x, y, z)</code>, <code>vec3(LuaVec3)</code>, <code>vec3({x, y, z})</code> and <code>vec3({x=x, y=y, z=z})</code>
</td></tr></table>

<table class="api"><tr>
  <th class="func">LuaVec3:copy()</th>
  <td class="rets">LuaVec3</td>
  <td class="desc">Returns a new LuaVec3 object (creates garbage) with the same values</td>
</tr></table>

<table class="api"><tr>
  <th class="func">LuaVec3:z0()</th>
  <td class="rets">LuaVec3</td>
  <td class="desc">Returns a new LuaVec3 object (creates garbage) with <code>x, y, 0</code></td>
</tr></table>

### Modifying

<table class="api"><tr>
  <th class="func">LuaVec3:set</th>
  <td class="args">x, y, z <small>or</small> LuaVec3</td>
  <td class="desc">Changes the values of the vector (0 garbage)</td>
</tr><tr><td colspan="4" class="details">
Commonly used with XYZ functions to avoid garbage.<br>
</td></tr></table>

<table class="api"><tr>
  <th class="func">LuaVec3:setFromTable</th>
  <td class="args">{x, y, z}</td>
  <td class="desc">same as :set but for an array</td>
</tr></table>

<table class="api"><tr>
  <th class="func">LuaVec3:fromString</th>
  <td class="args">string</td>
  <td class="rets">self</td>
  <td class="desc">Modifies itself and returns self</td>
</tr><tr><td colspan="4" class="details">
Parses three numbers from the string, separated by commas or whitespace.<br>
Numbers can be anything that works with <code>tonumber()</code>.<br>
Non-numeric or missing values are treated as 0.
</td></tr></table>

### Converting

<table class="api"><tr>
  <th class="func">tostring(LuaVec3)</th>
  <td class="rets">string</td>
  <td class="desc">Returns a string like <code>"vec3(x,y,z)"</code></td>
</tr></table>

<table class="api"><tr>
  <th class="func">LuaVec3:xyz()</th>
  <td class="rets">self.x, self.y, self.z</td>
  <td class="desc">Returns a XYZ tuple</td>
</tr></table>

<table class="api"><tr>
  <th class="func">LuaVec3:xy()</th>
  <td class="rets">self.x, self.y</td>
  <td class="desc">Returns a XY tuple</td>
</tr></table>

<table class="api"><tr>
  <th class="func">LuaVec3:toTable()</th>
  <td class="rets">{self.x, self.y, self.z}</td>
  <td class="desc">Returns an array</td>
</tr></table>

<table class="api"><tr>
  <th class="func">LuaVec3:toDict()</th>
  <td class="rets">{x = self.x, y = self.y, z = self.z}</td>
  <td class="desc">Returns a dictionary</td>
</tr></table>

## Math

### Basic Operations

These return a **new LuaVec3** (creates garbage). For zero-garbage alternatives, prefer the corresponding `:set` functions described in the next section.

Supported operators:

- `LuaVec3 + LuaVec3`
- `LuaVec3 - LuaVec3`
- `LuaVec3 * number` or `number * LuaVec3`
- `LuaVec3 / number`
- `-LuaVec3`
- `LuaVec3 == LuaVec3`

All other uses will result in an error.

Use the following function if you want to do `LuaVec3 * LuaVec3`:

<table class="api"><tr>
  <th class="func">LuaVec3:componentMul</th>
  <td class="args">LuaVec3</td>
  <td class="rets">LuaVec3</td>
  <td class="desc">Returns a new LuaVec3 where each component is multiplied by the corresponding component of <code>b</code></td>
</tr></table>

### Zero-Garbage set Functions

These functions modify the vector in place, avoiding memory allocation. Examples are provided for clarity.<br>
`a` and `b` are always LuaVec3 objects.

<table class="api"><tr>
  <th class="func">LuaVec3:setMin</th>
  <td class="args">a</td>
  <td class="desc">Sets each component to the minimum of itself and <code>a</code></td>
</tr></table>

<table class="api"><tr>
  <th class="func">LuaVec3:setMax</th>
  <td class="args">a</td>
  <td class="desc">Sets each component to the maximum of itself and <code>a</code></td>
</tr></table>

<table class="api"><tr>
  <th class="func">LuaVec3:setAddXYZ</th>
  <td class="args">x, y, z</td>
  <td class="desc">Adds the given values to self</td>
</tr></table>

<table class="api"><tr>
  <th class="func">LuaVec3:setAdd</th>
  <td class="args">a</td>
  <td class="desc">Adds vector <code>a</code> to self</td>
</tr></table>

<table class="api"><tr>
  <th class="func">LuaVec3:setAdd2</th>
  <td class="args">a, b</td>
  <td class="desc">Sets the vector to <code>a + b</code></td>
</tr></table>

<table class="api"><tr>
  <th class="func">LuaVec3:setSub</th>
  <td class="args">a</td>
  <td class="desc">Subtracts vector <code>a</code> from self</td>
</tr></table>

<table class="api"><tr>
  <th class="func">LuaVec3:setSub2</th>
  <td class="args">a, b</td>
  <td class="desc">Sets the vector to <code>a - b</code></td>
</tr></table>

<table class="api"><tr>
  <th class="func">LuaVec3:setScaled</th>
  <td class="args">scale</td>
  <td class="desc">Scales self by <code>scale</code></td>
</tr></table>

<table class="api"><tr>
  <th class="func">LuaVec3:setScaled2</th>
  <td class="args">a, scale</td>
  <td class="desc">Sets self to <code>a</code> scaled by <code>scale</code></td>
</tr></table>

<table class="api"><tr>
  <th class="func">LuaVec3:setComponentMul</th>
  <td class="args">a</td>
  <td class="desc">Sets the vector to <code>self * a</code> (multiplies each component separately)</td>
</tr></table>

### Length

<table class="api"><tr>
  <th class="func">LuaVec3:length()</th>
  <td class="rets">number</td>
  <td class="desc">Returns the length of the vector</td>
</tr></table>

<table class="api"><tr>
  <th class="func">LuaVec3:lengthGuarded()</th>
  <td class="rets">number</td>
  <td class="desc">Returns the length of the vector + 1e-30 making it safe to use with division</td>
</tr></table>

<table class="api"><tr>
  <th class="func">LuaVec3:squaredLength()</th>
  <td class="rets">number</td>
  <td class="desc">Returns the squared length of the vector, avoiding a square root</td>
</tr></table>

### Resizing

<table class="api"><tr>
  <th class="func">LuaVec3:normalize()</th>
  <td class="desc">Modifies the vector so its 1 meter long</td>
</tr></table>
<table class="api"><tr>
  <th class="func">LuaVec3:normalized()</th>
  <td class="desc">Returns a new LuaVec3 object (creates garbage) thats 1 meter long</td>
</tr></table>

<table class="api"><tr>
  <th class="func">LuaVec3:resize</th>
  <td class="args">length</td>
  <td class="desc">Modifies the vector so its x meters long</td>
</tr></table>
<table class="api"><tr>
  <th class="func">LuaVec3:resized</th>
  <td class="args">length</td>
  <td class="desc">Returns a new LuaVec3 object (creates garbage) thats x meters long</td>
</tr></table>

<table class="api"><tr>
  <th class="func">LuaVec3:ropeRock</th>
  <td class="args">maxLength</td>
  <td class="desc">Clamps the vector to x meters long (if its shorter, it doesnt resize it)</td>
</tr></table>

### Distance

<table class="api"><tr>
  <th class="func">LuaVec3:distance</th>
  <td class="args">LuaVec3</td>
  <td class="rets">distance</td>
  <td class="desc">Returns the distance between two vectors</td>
</tr></table>
<table class="api"><tr>
  <th class="func">LuaVec3:squaredDistance</th>
  <td class="args">LuaVec3</td>
  <td class="rets">squaredDistance</td>
  <td class="desc">Returns the squared distance between two vectors, avoiding a square root</td>
</tr></table>

### Vector Products

<table class="api"><tr>
  <th class="func">LuaVec3:dot</th>
  <td class="args">LuaVec3</td>
  <td class="rets">number</td>
  <td class="desc">Returns the dot product of the vector with another vector <code>a</code></td>
</tr></table>

<table class="api"><tr>
  <th class="func">LuaVec3:cross</th>
  <td class="args">LuaVec3</td>
  <td class="rets">LuaVec3</td>
  <td class="desc">Returns a new LuaVec3 representing the cross product of the vector with <code>a</code> (creates garbage)</td>
</tr></table>

<table class="api"><tr>
  <th class="func">LuaVec3:setCross</th>
  <td class="args">LuaVec3, LuaVec3</td>
  <td class="desc">Sets the vector to the cross product of <code>a</code> and <code>b</code> (0-gc)</td>
</tr></table>

## Shapes and stuff

### Lines

<table class="api"><tr>
  <th class="func">LuaVec3:distanceToLine</th>
  <td class="args">LuaVec3, LuaVec3</td>
  <td class="rets">distance</td>
  <td class="desc">Returns the distance to the infinite line defined by the two points</td>
</tr></table>
<table class="api"><tr>
  <th class="func">LuaVec3:squaredDistanceToLine</th>
  <td class="args">LuaVec3, LuaVec3</td>
  <td class="rets">squaredDistance</td>
  <td class="desc">Same as above, avoiding a square root</td>
</tr></table>

<table class="api"><tr>
  <th class="func">LuaVec3:distanceToLineSegment</th>
  <td class="args">LuaVec3, LuaVec3</td>
  <td class="rets">distance</td>
  <td class="desc">Returns the distance to the line segment defined by the two points</td>
</tr></table>
<table class="api"><tr>
  <th class="func">LuaVec3:squaredDistanceToLineSegment</th>
  <td class="args">LuaVec3, LuaVec3</td>
  <td class="rets">squaredDistance</td>
  <td class="desc">Same as above, avoiding a square root</td>
</tr></table>

<table class="api"><tr>
  <th class="func">LuaVec3:xnormDistanceToLineSegment</th>
  <td class="args">LuaVec3 (a), LuaVec3 (b)</td>
  <td class="rets">xnorm, distance</td>
  <td class="desc">Returns the normalized projection and distance to the line segment defined by the two points</td>
</tr><tr><td colspan="4" class="details">
<code>xnorm</code> is the normalized position of the perpendicular projection on the line from <code>a</code> to <code>b</code>.<br>
<code>xnorm = 0</code> at <code>a</code>, <code>xnorm = 1</code> at <code>b</code>. Values outside this range mean the closest point lies beyond the segment ends.
</td></tr></table>
<table class="api"><tr>
  <th class="func">LuaVec3:xnormSquaredDistanceToLineSegment</th>
  <td class="args">LuaVec3, LuaVec3</td>
  <td class="rets">xnorm, squaredDistance</td>
  <td class="desc">Same as above, avoiding a square root</td>
</tr></table>

<table class="api"><tr>
  <th class="func">LuaVec3:xnormOnLine</th>
  <td class="args">LuaVec3, LuaVec3</td>
  <td class="rets">xnorm</td>
  <td class="desc">Same as above, withouth computing the distance</td>
</tr></table>

### Triangles

<table class="api"><tr>
  <th class="func">LuaVec3:setTrianglePointFromUV</th>
  <td class="args">LuaVec3, LuaVec3, LuaVec3, u, v</td>
  <td class="desc">Sets the vector to the point inside the triangle using barycentric coordinates</td>
</tr><tr><td colspan="4" class="details">
If <code>0 ≤ u,v,w ≤ 1</code>, then the point lies inside the triangle, else outside.
</td></tr></table>

<table class="api"><tr>
  <th class="func">LuaVec3:triangleBarycentricNorm</th>
  <td class="args">LuaVec3, LuaVec3, LuaVec3</td>
  <td class="rets">u, v, normal</td>
  <td class="desc">Returns the barycentric coordinates of the point relative to the triangle and the triangle normal</td>
</tr><tr><td colspan="4" class="details">
The third barycentric coordinate can be obtained with: <code>w = 1 - u - v</code>.<br>
Coordinates are not clamped, so points outside the triangle may have negative or >1 coordinates.<br>
For more information, see <a href="https://en.wikipedia.org/wiki/Barycentric_coordinate_system" target="_blank">Barycentric coordinate system</a>.
</td></tr></table>

<table class="api"><tr>
  <th class="func">LuaVec3:triangleClosestPointUV</th>
  <td class="args">LuaVec3, LuaVec3, LuaVec3</td>
  <td class="rets">u, v</td>
  <td class="desc">Returns the barycentric coordinates (u,v) of the closest point on the triangle to the vector</td>
</tr><tr><td colspan="4" class="details">
Coordinates are **clamped** to ensure the point lies on the triangle or its edges.
</td></tr></table>

<table class="api"><tr>
  <th class="func">LuaVec3:triangleClosestPoint</th>
  <td class="args">LuaVec3, LuaVec3, LuaVec3</td>
  <td class="rets">LuaVec3, u, v</td>
  <td class="desc">Returns a new LuaVec3 representing the closest point on the triangle to the vector, along with its barycentric coordinates u and v</td>
</tr><tr><td colspan="4" class="details">
Coordinates are clamped, so the resulting point is always on the triangle or its edges.
</td></tr></table>

### Quads and Polygons

<table class="api"><tr>
  <th class="func">LuaVec3:invBilinear2D</th>
  <td class="args">LuaVec3, LuaVec3, LuaVec3, LuaVec3</td>
  <td class="rets">u, v</td>
  <td class="desc">Returns the UV coordinates of the point inside the quad defined by the four vectors</td>
</tr><tr><td colspan="4" class="details">
Coordinates can be used to reconstruct the point using bilinear interpolation:<br>
<code>p = (1-u)*(1-v)*a1 + u*(1-v)*a2 + (1-u)*v*b1 + u*v*b2</code>.
Only the <code>x</code> and <code>y</code> components of the vector are used, <code>z</code> is ignored.
</td></tr></table>

<table class="api"><tr>
  <th class="func">LuaVec3:inPolygon</th>
  <td class="args">see below</td>
  <td class="rets">bool</td>
  <td class="desc">Returns true if the vector lies inside the 2D polygon defined by the points, false otherwise</td>
</tr><tr><td colspan="4" class="details">
The function accepts either a single table of points or multiple points as separate arguments.<br>
Points should be in order around the polygon (clockwise or counterclockwise).<br>
Only the <code>x</code> and <code>y</code> components of the vector are used, <code>z</code> is ignored.
</td></tr></table>

### Planes

<table class="api"><tr>
  <th class="func">LuaVec3:projectToOriginPlane</th>
  <td class="args">LuaVec3 (pnorm)</td>
  <td class="rets">LuaVec3</td>
  <td class="desc">Projects the vector onto the plane passing through the origin with the given normal</td>
</tr><tr><td colspan="4" class="details">
The returned vector lies on the plane defined by <code>pnorm</code>.<br>
Effectively removes the component of the vector in the direction of the plane's normal.
</td></tr></table>

<table class="api"><tr>
  <th class="func">LuaVec3:xnormPlaneWithLine</th>
  <td class="args">LuaVec3 (pnorm), LuaVec3 (a), LuaVec3 (b)</td>
  <td class="rets">xnorm</td>
  <td class="desc">Computes the normalized intersection of the line segment from <code>a</code> to <code>b</code> with the plane defined by <code>self</code> and <code>pnorm</code></td>
</tr><tr><td colspan="4" class="details">
Returns a scalar <code>xnorm</code> where:<br>
<code>xnorm = 0</code> at <code>a</code>, <code>xnorm = 1</code> at <code>b</code>.<br>
The function clamps extreme values to ±1e300 to avoid overflow.
Useful for projecting a line onto a plane and getting the relative position along the line.
</td></tr></table>

### Spheres

<table class="api"><tr>
  <th class="func">LuaVec3:xnormsSphereWithLine</th>
  <td class="args">radius, LuaVec3 a, LuaVec3 b</td>
  <td class="rets">lowXnorm, highXnorm</td>
  <td class="desc">Computes the intersection of the line segment <code>a, b</code> with the sphere centered at <code>self</code> with the given radius</td>
</tr><tr><td colspan="4" class="details">
Returns two normalized positions along the line segment:<br>
- <code>lowXnorm</code> corresponds to the first intersection, <code>highXnorm</code> to the second.<br>
- <code>xnorm = 0</code> at <code>a</code>, <code>xnorm = 1</code> at <code>b</code>.<br>
If the line does not intersect the sphere, returns <code>1, 0</code>.<br>
Useful for finding entry and exit points of a line through a sphere.
</td></tr></table>

### Basis and Base Coordinates

<table class="api"><tr>
  <th class="func">LuaVec3:basisCoordinates</th>
  <td class="args">c1, c2, c3</td>
  <td class="rets">LuaVec3</td>
  <td class="desc">Returns the coordinates of the vector in the basis defined by <code>c1, c2, c3</code></td>
</tr><tr><td colspan="4" class="details">
The returned vector <code>v</code> satisfies: <code>v.x * c1 + v.y * c2 + v.z * c3 = self</code>.<br>
Useful for converting a vector from the global frame into an arbitrary basis.<br>
Produces quite a bit of gc load.
</td></tr></table>

<table class="api"><tr>
  <th class="func">LuaVec3:setToBase</th>
  <td class="args">nx, ny, nz</td>
  <td class="desc">Transforms the vector from a local basis to world coordinates using the basis vectors <code>nx, ny, nz</code></td>
</tr></table>

<table class="api"><tr>
  <th class="func">LuaVec3:toBase</th>
  <td class="args">nx, ny, nz</td>
  <td class="rets">LuaVec3</td>
  <td class="desc">Same as above, returns a new LuaVec3 (garbage)</td>
</tr></table>






<!---
# other stuff
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
-->