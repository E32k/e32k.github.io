---
title: obj
layout: beamlua
date: 2026-03-12
---

This is the main userdata, that includes functions which control the vehicles jbeam and the vehicle itself.

## Get Functions

### Node

<div class="funcTable"><div class="headerRow">
  <div class="func">obj:getNodeCount()</div>
  <div class="rets">nodesCount</div>
  <div class="desc">Returns the number of nodes</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">obj:getNodeFrictionCoef</div>
  <div class="args">nodeID</div>
  <div class="rets">frictionCoef</div>
  <div class="desc">Returns the friction coefficient of the node (not tested)</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">obj:getNodeMass</div>
  <div class="args">nodeID</div>
  <div class="rets">mass</div>
  <div class="desc">Returns the mass of the node</div>
</div></div>

#### Positions

<div class="funcTable"><div class="headerRow">
  <div class="func">obj:getNodePosition</div>
  <div class="args">nodeID</div>
  <div class="rets">LuaVec3</div>
  <div class="desc">Returns the global position of the node</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">obj:getNodePositionRelative</div>
  <div class="args">nodeID</div>
  <div class="rets">LuaVec3</div>
  <div class="desc">Returns the relative position of the node (to the objects position)</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">obj:getNodePositionRelativeXYZ</div>
  <div class="args">nodeID</div>
  <div class="rets">x, y, z</div>
  <div class="desc">Returns the relative position of the node (as a tuple, 0-gc)</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">obj:getNodesVector</div>
  <div class="args">nodeID1, nodeID2</div>
  <div class="rets">LuaVec3</div>
  <div class="desc">Returns the vector between the two nodes (with :normalized() you get the direction)</div>
</div></div>

#### Velocities

<div class="funcTable"><div class="headerRow">
  <div class="func">obj:getNodeVelocity</div>
  <div class="args">nodeID1, nodeID2</div>
  <div class="rets">velocity</div>
  <div class="desc">Returns the velocity between the two nodes</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">obj:getNodeVelocityVector</div>
  <div class="args">nodeID1</div>
  <div class="rets">LuaVec3</div>
  <div class="desc">Returns the velocity vector of the node</div>
</div></div>

#### Forces

<div class="funcTable"><div class="headerRow">
  <div class="func">obj:getNodeForce</div>
  <div class="args">nodeID1, nodeID2</div>
  <div class="rets">number</div>
  <div class="desc">Returns the force between the two nodes</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">obj:getNodeForceNonInertial</div>
  <div class="args">nodeID1, nodeID2</div>
  <div class="rets">forceZ, forceXY</div>
  <div class="desc">Returns two numbers of forces between the two nodes?</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">obj:getNodeForceNonInertialZ</div>
  <div class="args">?</div>
  <div class="rets">?</div>
  <div class="desc">?</div>
</div></div>

## Set Functions

### New Objects
<div class="funcTable"><div class="headerRow">
  <div class="func">obj:setNode</div>
  <div class="args">nodeID, x, y, z, nodeWeight, fixed, frictionCoef, slidingFrictionCoef, stribeckExponent, stribeckVelMult, noLoadCoef, fullLoadCoef, loadSensitivitySlope, softnessCoef, treadCoef, tag, couplerStrength, group, selfCollision, collision, staticCollision, materialID</div>
  <div class="desc">Creates a new node with the specified values</div>
  </div><div class="details">
  fixed (number): 0 - NORMALTYPE, 1 - NODE_FIXED
  tag (string): <code>''</code> for no tag
  group (number): -1 for no group, this is the ID? of the first group (since only the first group is used for collision, other are flexybody related)

  See <code>vehicle/jbeam/stage2:215</code> for source.
  See <a href="https://documentation.beamng.com/modding/vehicle/sections/nodes/" target="_blank">BeamNG Documentation - Nodes</a> for more information.
</div></div>
### Node

<div class="funcTable"><div class="headerRow">
  <div class="func">obj:setNodeMass</div>
  <div class="args">nodeID, weight</div>
  <div class="desc">Updates the mass of an existing node</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">obj:setNodeMaterial</div>
  <div class="args">nodeID, material?</div>
  <div class="desc">Updates the material of an existing node (not tested)</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">obj:setNodePosition</div>
  <div class="args">nodeID, LuaVec3</div>
  <div class="desc">Updates the position of an existing node</div>
</div></div>

### Beams

### Adding

<div class="funcTable"><div class="headerRow">
  <div class="func">getNodeCount()</div>
  <div class="rets">number</div>
  <div class="desc">Returns the number of nodes</div>
</div></div>

### Forces

<div class="funcTable"><div class="headerRow">
    <div class="func">dragCoef</div>
    <div class="args">number</div>
    <div class="rets">100</div>
    <div class="desc">Drag coefficient of the triangle as a percentage of a flat plate of the same size.</div>
  </div><div class="details">
    Typical values are around 10 for most exposed body panels.
</div></div>

### Powertrain

<div class="funcTable"><div class="headerRow">
  <div class="func">obj:screwBeam</div>
  <div class="args">
  int  outId<br>
  float torqueForce<br>
  float speedLimit<br>
  float slipForce<br>
  float helixAngleCos<br>
  float face1Cos<br>
  float face2Cos<br>
  float frictionForceStick<br>
  float frictionCoef<br>
  float slipSpeedLimit<br>
  float minExtend<br>
  float maxExtend
  </div>
  <div class="rets">velocity?</div>
  <div class="desc">From <code>vehicle/powertrain/linearActuator.lua</code></div>
</div></div>