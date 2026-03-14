---
title: Player Vehicle
layout: beamlua
date: 2026-03-11
---

Functions that are in the userdata after calling `getPlayerVehicle(0)`

## Functions

### Nodes

<table class="api"><tr>
  <th class="func">getNodeCount()</th>
  <td class="rets">number</td>
  <td class="desc">Returns the number of nodes</td>
</tr></table>

### Refnodes

<table class="api"><tr>
  <th class="func">getRefNodeId()</th>
  <td class="rets">number</td>
  <td class="desc">Used to get the ID of the refnode</td>
</tr></table>

<table class="api"><tr>
  <th class="func">getRefNodeMatrix()</th>
  <td class="rets">MatrixF</td>
  <td class="desc">Returns the refnode matrix</td>
</tr></table>

<table class="api"><tr>
  <th class="func">getRefNodeRotation()</th>
  <td class="rets">QuatF</td>
  <td class="desc">Returns the refnode quaternion</td>
</tr></table>

<table class="api"><tr>
  <th class="func">setRefNodes</th>
  <td class="args">ref, back, left, up</td>
  <td class="desc">Sets the refnodes</td>
  </tr><tr><td colspan="4" class="details">
  The refnodes should be only set before adding the meshes, props, materials and mirrors.<br>
  I don't reccomend to set them at runtime as changing them will just offset the visuals.
</td></tr></table>

### Positions

<table class="api"><tr>
  <th class="func">getPosition()</th>
  <td class="rets">LuaVec3</td>
  <td class="desc">Returns the position of the object, prefer the 0-gc XYZ alternative below</td>
</tr></table>

<table class="api"><tr>
  <th class="func">getPositionXYZ()</th>
  <td class="rets">x, y, z</td>
  <td class="desc">Returns the position of the object</td>
</tr></table>

<table class="api"><tr>
  <th class="func">getNodePosition</th>
  <td class="args">nodeID</td>
  <td class="rets">LuaVec3</td>
  <td class="desc">Returns the position of a node relative to the object position, prefer the 0-gc XYZ alternative below</td>
</tr></table>

<table class="api"><tr>
  <th class="func">getNodePositionXYZ</th>
  <td class="args">nodeID</td>
  <td class="rets">x, y, z</td>
  <td class="desc">Returns the position of a node relative to the object position</td>
</tr></table>

<table class="api"><tr>
  <th class="func">getNodeAbsPosition</th>
  <td class="args">nodeID</td>
  <td class="rets">LuaVec3</td>
  <td class="desc">Returns the absolute world position of a node, prefer the 0-gc XYZ alternative below</td>
  </tr><tr><td colspan="4" class="details">
  Same as doing <code>getNodePosition(nodeID) + getPosition()</code>
</td></tr></table>

<table class="api"><tr>
  <th class="func">getNodeAbsPositionXYZ</th>
  <td class="args">nodeID</td>
  <td class="rets">x, y, z</td>
  <td class="desc">Returns the absolute world position of a node</td>
  </tr><tr><td colspan="4" class="details">
  Same as doing <code>getNodePosition(nodeID) + getPosition()</code>
</td></tr></table>

<table class="api"><tr>
  <th class="func">getRefNodeAbsPosition()</th>
  <td class="rets">LuaVec3</td>
  <td class="desc">Returns the absolute world position of the refnode, prefer the 0-gc XYZ alternative below</td>
  </tr><tr><td colspan="4" class="details">
  Same as doing <code>getNodePosition(getRefNodeId()) + getPosition()</code>
</td></tr></table>

<table class="api"><tr>
  <th class="func">getRefNodeAbsPositionXYZ()</th>
  <td class="rets">x, y, z</td>
  <td class="desc">Returns the absolute world position of the refnode</td>
  </tr><tr><td colspan="4" class="details">
  Same as doing <code>getNodePosition(getRefNodeId()) + getPosition()</code>
</td></tr></table>


### Node Clusters

<table class="api"><tr>
  <th class="func">getNodeClusterGeneration()</th>
  <td class="rets">number</td>
  <td class="desc">Returns the number of times the node clusters have been updated</td>
  </tr><tr><td colspan="4" class="details">
  At the start it retuns 0, after you for example break a part, it becomes 1.
</td></tr></table>

<table class="api"><tr>
  <th class="func">getNodeClusterId()</th>
  <td class="args">number</td>
  <td class="rets">number</td>
  <td class="desc">Returns a number from the table</td>
  </tr><tr><td colspan="4" class="details">
  Its the same as doing <code>getNodeClusters()[number]</code> probably.
</td></tr></table>

<table class="api"><tr>
  <th class="func">getNodeClusters()</th>
  <td class="rets">table</td>
  <td class="desc">Returns a table with numbers</td>
  </tr><tr><td colspan="4" class="details">
  Idk what the numbers are exactly.
</td></tr></table>

### Forces And Teleporting

<table class="api"><tr>
  <th class="func">applyForceTorque</th>
  <td class="args">idk</td>
  <td class="desc">Applies a torque probably</td>
</tr></table>

<table class="api"><tr>
  <th class="func">applyForceTorqueStaticPoint</th>
  <td class="args">idk</td>
  <td class="desc">Applies a torque probably</td>
</tr></table>

<table class="api"><tr>
  <th class="func">getClusterRotationSlow</th>
  <td class="args">nodeID</td>
  <td class="rets">QuatF</td>
  <td class="desc">Returns the world rotation of the cluster</td>
</tr></table>

<table class="api"><tr>
  <th class="func">setClusterPosRelRot</th>
  <td class="args">nodeID, posX, posY, posZ, rotX, rotY, rotZ, rotW</td>
  <td class="desc">Sets the position and relative roation of a node cluster</td>
  </tr><tr><td colspan="4" class="details">
  Sets the global position of the node cluster at the node, and applies relative rotation.<br>
  You can set just the position with <code>nodeID, x, y, z, 0, 0, 0, 1</code><br>
  You can use <code>getRefNodeId</code> to apply it to the "whole" car.<br>
  Does not reset the car or cancel motion.
</td></tr></table>

<table class="api"><tr>
  <th class="func">applyClusterVelocityScaleAdd</th>
  <td class="args">nodeID, originalVelocityScale, velX, velY, velZ</td>
  <td class="desc">Applies a force to a node cluster</td>
  </tr><tr><td colspan="4" class="details">
  Cancel all velocity: <code>nodeID, 0, 0, 0, 0</code><br>
  Double velocity: <code>nodeID, 2, 0, 0, 0</code><br>
  Set velocity: <code>nodeID, 0, x, y, z</code><br>
  Add velocity: <code>nodeID, 1, x, y, z</code><br>
  You can use <code>getRefNodeId</code> to apply it to the "whole" car.
</td></tr></table>