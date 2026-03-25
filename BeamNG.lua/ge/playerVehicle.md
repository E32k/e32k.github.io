---
title: Player Vehicle
layout: beamlua
date: 2026-03-11
---

Functions that are in the userdata after calling `getPlayerVehicle(0)`

## Functions

### Nodes

<div class="funcTable"><div class="headerRow">
  <div class="func">getNodeCount()</div>
  <div class="rets">number</div>
  <div class="desc">Returns the number of nodes</div>
</div></div>

### Refnodes

<div class="funcTable"><div class="headerRow">
  <div class="func">getRefNodeId()</div>
  <div class="rets">number</div>
  <div class="desc">Used to get the ID of the refnode</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">getRefNodeMatrix()</div>
  <div class="rets">MatrixF</div>
  <div class="desc">Returns the refnode matrix</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">getRefNodeRotation()</div>
  <div class="rets">QuatF</div>
  <div class="desc">Returns the refnode quaternion</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">setRefNodes</div>
  <div class="args">ref, back, left, up</div>
  <div class="desc">Sets the refnodes</div>
  </div><div class="details">
  The refnodes should be only set before adding the meshes, props, materials and mirrors.<br>
  I don't reccomend to set them at runtime as changing them will just offset the visuals.
</div></div>

### Positions

<div class="funcTable"><div class="headerRow">
  <div class="func">getPosition()</div>
  <div class="rets">LuaVec3</div>
  <div class="desc">Returns the position of the object, prefer the 0-gc XYZ alternative below</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">getPositionXYZ()</div>
  <div class="rets">x, y, z</div>
  <div class="desc">Returns the position of the object</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">getNodePosition</div>
  <div class="args">nodeID</div>
  <div class="rets">LuaVec3</div>
  <div class="desc">Returns the position of a node relative to the object position, prefer the 0-gc XYZ alternative below</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">getNodePositionXYZ</div>
  <div class="args">nodeID</div>
  <div class="rets">x, y, z</div>
  <div class="desc">Returns the position of a node relative to the object position</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">getNodeAbsPosition</div>
  <div class="args">nodeID</div>
  <div class="rets">LuaVec3</div>
  <div class="desc">Returns the absolute world position of a node, prefer the 0-gc XYZ alternative below</div>
  </div><div class="details">
  Same as doing <code>getNodePosition(nodeID) + getPosition()</code>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">getNodeAbsPositionXYZ</div>
  <div class="args">nodeID</div>
  <div class="rets">x, y, z</div>
  <div class="desc">Returns the absolute world position of a node</div>
  </div><div class="details">
  Same as doing <code>getNodePosition(nodeID) + getPosition()</code>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">getRefNodeAbsPosition()</div>
  <div class="rets">LuaVec3</div>
  <div class="desc">Returns the absolute world position of the refnode, prefer the 0-gc XYZ alternative below</div>
  </div><div class="details">
  Same as doing <code>getNodePosition(getRefNodeId()) + getPosition()</code>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">getRefNodeAbsPositionXYZ()</div>
  <div class="rets">x, y, z</div>
  <div class="desc">Returns the absolute world position of the refnode</div>
  </div><div class="details">
  Same as doing <code>getNodePosition(getRefNodeId()) + getPosition()</code>
</div></div>


### Node Clusters

<div class="funcTable"><div class="headerRow">
  <div class="func">getNodeClusterGeneration()</div>
  <div class="rets">number</div>
  <div class="desc">Returns the number of times the node clusters have been updated</div>
  </div><div class="details">
  At the start it retuns 0, after you for example break a part, it becomes 1.
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">getNodeClusterId()</div>
  <div class="args">number</div>
  <div class="rets">number</div>
  <div class="desc">Returns a number from the table</div>
  </div><div class="details">
  Its the same as doing <code>getNodeClusters()[number]</code> probably.
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">getNodeClusters()</div>
  <div class="rets">table</div>
  <div class="desc">Returns a table with numbers</div>
  </div><div class="details">
  Idk what the numbers are exactly.
</div></div>

### Forces And Teleporting

<div class="funcTable"><div class="headerRow">
  <div class="func">applyForceTorque</div>
  <div class="args">idk</div>
  <div class="desc">Applies a torque probably</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">applyForceTorqueStaticPoint</div>
  <div class="args">idk</div>
  <div class="desc">Applies a torque probably</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">getClusterRotationSlow</div>
  <div class="args">nodeID</div>
  <div class="rets">QuatF</div>
  <div class="desc">Returns the world rotation of the cluster</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">setClusterPosRelRot</div>
  <div class="args">nodeID, posX, posY, posZ, rotX, rotY, rotZ, rotW</div>
  <div class="desc">Sets the position and relative roation of a node cluster</div>
  </div><div class="details">
  Sets the global position of the node cluster at the node, and applies relative rotation.<br>
  You can set just the position with <code>nodeID, x, y, z, 0, 0, 0, 1</code><br>
  You can use <code>getRefNodeId</code> to apply it to the "whole" car.<br>
  Does not reset the car or cancel motion.
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">applyClusterVelocityScaleAdd</div>
  <div class="args">nodeID, originalVelocityScale, velX, velY, velZ</div>
  <div class="desc">Applies a force to a node cluster</div>
  </div><div class="details">
  Cancel all velocity: <code>nodeID, 0, 0, 0, 0</code><br>
  Double velocity: <code>nodeID, 2, 0, 0, 0</code><br>
  Set velocity: <code>nodeID, 0, x, y, z</code><br>
  Add velocity: <code>nodeID, 1, x, y, z</code><br>
  You can use <code>getRefNodeId</code> to apply it to the "whole" car.
</div></div>