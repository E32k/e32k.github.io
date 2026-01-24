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

- `vec3(x, y, z)` → Creates a vector with given components. `z` defaults to 0 if not provided.  
- `vec3({x=?, y=?, z=?})` → Creates a vector from a dictionary.  
- `vec3({?, ?, ?})` → Creates a vector from a list.  
- `vec3()` → Defaults to (0,0,0).  

---

### Methods

#### Component Access & Mutation

- `:set(x, y, z)` → Sets components. Can also pass another vec3.  
- `:xyz()` → Returns `x, y, z`.  
- `:xy()` → Returns `x, y`.  
- `:copy()` → Returns a new vec3 with same values.  
- `:fromString(s)` → Parses `"x, y, z"` string into vector.  
- `:toTable()` → Returns components as a list `{x, y, z}`.  
- `:setFromTable(t)` → Sets vector from a list.  
- `:toDict()` → Returns dictionary `{x=?, y=?, z=?}`.  

#### Arithmetic Operators

- `+` → Vector addition  
- `-` → Vector subtraction  
- `-a` → Unary negation  
- `*` → Scalar or component-wise multiplication  
- `/` → Scalar division  
- `==` → Equality check  

#### Vector Operations

- `:dot(a)` → Dot product  
- `:cross(a)` → Cross product  
- `:length()` → Euclidean length  
- `:lengthGuarded()` → Length with small epsilon to avoid division by zero  
- `:squaredLength()` → Squared length  
- `:normalize()` → Normalizes in-place  
- `:normalized()` → Returns normalized copy  
- `:resize(m)` → Resizes in-place  
- `:resized(m)` → Returns resized copy  
- `:distance(a)` → Distance to another vector  
- `:squaredDistance(a)` → Squared distance  
- `:perpendicular()` → Returns a perpendicular vector  
- `:perpendicularN()` → Returns normalized perpendicular vector  

#### Advanced Geometry

- `:slerp(b, t)` → Spherical linear interpolation (normalized vectors)  
- `:cosAngle(a)` → Cosine of angle between vectors  
- `:ropeRock(cutOff)` → Scales vector length to cutoff  
- `:xnormPlaneWithLine(pnorm, a, b)` → Line-plane intersection in normalized space  
- `:xnormsSphereWithLine(radius, a, b)` → Sphere-line intersection (returns xnorms)  
- `:basisCoordinates(c1, c2, c3)` → Vector coordinates in a custom basis  
- `:toBase(nx, ny, nz)` / `:setToBase(nx, ny, nz)` → Converts to/from basis vectors  

#### Triangle & Polygon Functions

- `:triangleBarycentricNorm(a, b, c)` → Returns barycentric coordinates and normal  
- `:setTrianglePointFromUV(a, b, c, u, v)` → Sets vector from triangle UV coordinates  
- `:triangleClosestPointUV(a, b, c)` → Returns closest point UV on triangle  
- `:triangleClosestPoint(a, b, c)` → Returns closest point on triangle  
- `:inPolygon(...)` → Point-in-polygon check  

#### Plane & Projection

- `:projectToOriginPlane(pnorm)` → Projects vector onto plane through origin  
- `:setProjectToOriginPlane(pnorm, a)` → Sets projection of vector `a`  

#### Component-Wise Operations

- `:componentMul(b)` → Multiplies components by another vector  
- `:setComponentMul(a)` → In-place component-wise multiplication  
- `:setAdd(a)` / `:setAdd2(a, b)` → Add vectors  
- `:setSub(a)` / `:setSub2(a, b)` → Subtract vectors  
- `:setScaled(b)` / `:setScaled2(a, b)` → Scale vector  
- `:setMin(a)` / `:setMax(a)` → Component-wise min/max  
- `:setLerp(from, to, t)` → Linear interpolation between vectors  
- `:setCross(a, b)` → Sets vector as cross product of `a` and `b`  
- `:setRotate(q, a)` → Rotates vector by quaternion `q`  
- `:setEulerYXZ(q)` → Converts quaternion to Euler angles (YXZ order)  
- `:setPerpendicular(a)` → Sets a vector perpendicular to `a`  

#### Random & Blue-Noise Functions

- `:getBlueNoise1d(x)` → 1D blue-noise value `[0..1)`  
- `:getBlueNoise2d()` → Modifies vector, returns `[0..1)` for x and y  
- `:getBlueNoise3d()` → Modifies vector, returns `[0..1)` for x, y, z  
- `:getRandomPointInSphere(radius)` → Uniform random point in sphere  
- `:getRandomPointInCircle(radius)` → Uniform random point in circle  
- `:getBluePointInSphere(radius)` → Blue-noise point in sphere  
- `:getBluePointInCircle(radius)` → Blue-noise point in circle  

---

## push3 (Stack Vectors)

- Efficient temporary vectors to reduce allocations  
- Supports the same arithmetic and methods as vec3  
- `push3(x, y, z)` → Push a vector onto the stack  
- `:xyz()` → Pops vector and returns components  
- `:copy()` → Pops vector and returns a new vec3  
- All arithmetic operators (`+`, `-`, `*`, `/`) work with stack vectors  

---

## quat (Quaternions)

### Construction

- `quat(x, y, z, w)` → Quaternion from components  
- `quat({x, y, z, w})` → From table  
- `quat()` → Defaults to identity quaternion `(1, 0, 0, 0)`  

### Methods

- `:xyz()` / `:xyzw()` → Returns components  
- `:toTable()` / `:toDict()` → Returns as table or dictionary  
- `:copy()` → Returns a copy  
- `:set(x, y, z, w)` → Sets components  
- `:norm()` / `:squaredNorm()` → Magnitude  
- `:normalize()` / `:normalized()` → Normalization  
- `:inverse()` / `:inversed()` → Quaternion inverse  
- `:conjugated()` → Returns conjugate  

### Arithmetic Operators

- `+` / `-` / `*` / `/` → Support quaternion arithmetic and scalar multiplication  
- `*` → Also supports rotation of vec3 by quaternion  

### Rotations & Interpolation

- `:setFromAxisAngle(axle, angleRad)` → Sets quaternion from axis-angle  
- `:setRotationFromTo(fromV, toV)` → Quaternion rotating from one vector to another  
- `:setFromEuler(x, y, z)` → Euler angles to quaternion  
- `:setFromDir(dir, up)` → Constructs quaternion from direction and optional up vector  
- `:nlerp(a, t)` → Normalized linear interpolation  
- `:slerp(a, t)` → Spherical linear interpolation  

---

## Utilities

- `randomGauss3()` → Sum of three uniform random numbers `[0..3]`  
- `randomState(v)` → Deterministic pseudo-random number `[0..1]` based on input  
- `closestLinePoints(l1p1, l1p2, l2p1, l2p2)` → Returns xnorms for minimum distance between two lines  
- `closestLineSegmentPoints(l1p1, l1p2, l2p1, l2p2)` → Returns normalized line coordinates of closest points  
- `linePointFromXnorm(p0, p1, xnorm)` → Returns point on line at normalized distance `xnorm`  

---

## Notes

- The library is optimized for performance: `push3` reduces allocations and FFI is used if available.  
- Many functions handle degenerate cases using small epsilon values (`1e-30`) to avoid division by zero.  
- Supports backward compatibility functions like `:len()`, `:lenSquared()`, `:normalizeSafe()`.  

---

This documentation covers **all functions and behavior** of the `vec3` + `quat` library.
