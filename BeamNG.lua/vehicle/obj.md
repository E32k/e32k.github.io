---
title: obj
layout: beamlua
date: 2026-03-12
---

This is the main userdata, that includes functions which control the vehicles jbeam and the vehicle itself.

## Node Functions

### Creating a Node

<div class="funcTable"><div class="headerRow">
  <div class="func">obj:setNode</div>
  <div class="args">nodeID, x, y, z, nodeWeight, fixed, frictionCoef, slidingFrictionCoef, stribeckExponent, stribeckVelMult, noLoadCoef, fullLoadCoef, loadSensitivitySlope, softnessCoef, treadCoef, tag, couplerStrength, group, selfCollision, collision, staticCollision, materialID</div>
  <div class="desc">Creates a new node with the specified values</div>
  </div><div class="details">
  fixed (number): 0 - NORMALTYPE, 1 - NODE_FIXED<br>
  tag (string): <code>''</code> for no tag<br>
  group (number): -1 for no group, this is the ID? of the first group<br>
  (since only the first group is used for collision, other are flexybody related)<br><br>

  See <code>vehicle/jbeam/stage2.lua:215</code> for source.<br>
  See <a href="https://documentation.beamng.com/modding/vehicle/sections/nodes/" target="_blank">BeamNG Documentation - Nodes</a> for more information.
</div></div>

### Node things

<div class="funcTable"><div class="headerRow">
  <div class="func">obj:getNodeCount()</div>
  <div class="rets">number</div>
  <div class="desc">Returns the number of nodes</div>
</div></div>

### Mass

<div class="funcTable"><div class="headerRow">
  <div class="func">obj:setNodeMass</div>
  <div class="args">nodeID, weight</div>
  <div class="desc">Updates the mass of an existing node</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">obj:getNodeMass</div>
  <div class="args">nodeID</div>
  <div class="rets">mass</div>
  <div class="desc">Returns the mass of the node</div>
</div></div>

### Something

<div class="funcTable"><div class="headerRow">
  <div class="func">obj:setNodeMaterial</div>
  <div class="args">nodeID, material?</div>
  <div class="desc">Updates the material of an existing node (not tested)</div>
</div></div>



<div class="funcTable"><div class="headerRow">
  <div class="func">obj:getNodeFrictionCoef</div>
  <div class="args">nodeID</div>
  <div class="rets">frictionCoef</div>
  <div class="desc">Returns the friction coefficient of the node (not tested)</div>
</div></div>


<div class="funcTable"><div class="headerRow">
  <div class="func">obj:getNodeSlidingFrictionCoef</div>
  <div class="args">nodeID</div>
  <div class="rets">slidingFrictionCoef</div>
  <div class="desc">Returns the sliding friction coefficient of the node (not tested)</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">obj:setNodeFrictionSlidingCoefs</div>
  <div class="args">nodeID, frictionCoef, slidingFrictionCoef</div>
  <div class="desc">Sets the friction coefficients of the node</div>
</div></div>

### Positions

<div class="funcTable"><div class="headerRow">
  <div class="func">obj:setNodePosition</div>
  <div class="args">nodeID, LuaVec3</div>
  <div class="desc">Updates the position of an existing node</div>
</div></div>

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

### Velocities

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

### Forces

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

## Beam Functions

### Creating a Beam

<div class="funcTable"><div class="headerRow">
  <div class="func">obj:setBeam</div>
  <div class="args">beamID, id1, id2, beamStrength, beamSpring, beamDamp, dampCutoffHz, beamDeform, deformLimit, deformLimitExpansion, deformLimitStress, beamPrecompression</div>
  <div class="rets">bid</div>
  <div class="desc">Creates a new beam with the specified values</div>
  </div><div class="details">
  Source: <code>vehicle/jbeam/stage2.lua:96</code><br>
  See <a href="https://documentation.beamng.com/modding/vehicle/sections/beams/" target="_blank">BeamNG Documentation - Beams</a> for more information.
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">obj:setBeam</div>
  <div class="desc">Creates a new beam with the specified values</div>
  </div><div class="arguments">
  cid - probably the beam ID<br>
  id1 - ID of the first node<br>
  id2 - ID of the second node<br>
  //following descriptions are from <a href="https://documentation.beamng.com/modding/vehicle/sections/beams/" target="_blank">BeamNG Documentation - Beams</a><br>
  beamStrength - Strength of the beam. (N)<br>
  beamSpring - Rigidity of the beam (N/m)<br>
  beamDamp - Damping of the beam (N/m/s)<br>
  dampCutoffHz - Limits the vibration frequency (Hz) above which damping applies<br>
  beamDeform - How much force (N) is required to deform the beam permanently<br>
  deformLimit - Limits by how much of original length the beam can deform in compression<br>
  deformLimitExpansion - Limits by how much of original length the beam can deform in expansion<br>
  deformLimitStress - Limits the beamDeform gain to this value (N)<br>
  beamPrecompression - The length the beam will become as soon as it spawns
  </div><div class="returns">
  bid - Use this with the functions below, to make the beam anisotropic, bounded, support, pressured or an l-beam.
  </div><div class="details">
  Source: <code>vehicle/jbeam/stage2.lua:96</code><br>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">obj:setBeamAnisotropic</div>
  <div class="args">bid, springExpansion, dampExpansion, transitionZone, beamLongBound</div>
  <div class="desc">Sets an existing beam to be an anisotropic (or support) beam with the specified values</div>
  </div><div class="details">
  Source: <code>vehicle/jbeam/stage2.lua:106</code><br>
  See <a href="https://documentation.beamng.com/modding/vehicle/sections/beams/anisotropic/" target="_blank">BeamNG Documentation - Anisotropic Beams</a> for more information.<br><br>

  Notice how there is no function for creating a support beam, its because its created with:<br>
  <code>obj:setBeamAnisotropic(bid, 0, 0, 0, beamLongBound)</code><br><br>

  Source: <code>vehicle/jbeam/stage2.lua:129</code><br>
  See <a href="https://documentation.beamng.com/modding/vehicle/sections/beams/support/" target="_blank">BeamNG Documentation - Support Beams</a> for more information.
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">obj:setBeamBounded</div>
  <div class="args">bid, longBound, shortBound, beamLimitSpring, beamLimitDamp, beamLimitDampRebound, beamDampRebound, beamDampFast, beamDampReboundFast, beamDampVelocitySplit, beamDampVelocitySplitRebound, boundZone</div>
  <div class="desc">Sets an existing beam to be an bounded beam with the specified values</div>
  </div><div class="details">
  Source: <code>vehicle/jbeam/stage2.lua:120</code><br>
  See <a href="https://documentation.beamng.com/modding/vehicle/sections/beams/bounded/" target="_blank">BeamNG Documentation - Bounded Beams</a> for more information.
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">obj:setBeamPressured</div>
  <div class="args">bid, pressure, surface, volumeCoef, maxPressure, pressureLimit</div>
  <div class="desc">Sets an existing beam to be an l-beam with the specified values</div>
  </div><div class="details">
  Source: <code>vehicle/jbeam/stage2.lua:146</code><br>
  See <a href="https://documentation.beamng.com/modding/vehicle/sections/beams/pressured/" target="_blank">BeamNG Documentation - Pressured Beams</a> for more information.
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">obj:setBeamLbeam</div>
  <div class="args">bid, id3, springExpansion, dampExpansion</div>
  <div class="desc">Sets an existing beam to be an l-beam with the specified values</div>
  </div><div class="details">
  Source: <code>vehicle/jbeam/stage2.lua:148</code><br>
  See <a href="https://documentation.beamng.com/modding/vehicle/sections/beams/l-beam/" target="_blank">BeamNG Documentation - L-Beams</a> for more information.
</div></div>

### Powertrain

<div class="funcTable"><div class="headerRow">
  <div class="func">obj:screwBeam</div>
  <div class="args">outId, torqueForce, speedLimit, slipForce, helixAngleCos, face1Cos, face2Cos, frictionForceStick, frictionCoef, slipSpeedLimit, minExtend, maxExtend</div>
  <div class="rets">velocity?</div>
  <div class="desc">From <code>vehicle/powertrain/linearActuator.lua</code></div>
</div></div>