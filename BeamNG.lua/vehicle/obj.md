---
title: obj
layout: beamlua
date: 2026-03-12
---

This is the main userdata, that includes functions which control the vehicles jbeam and the vehicle itself.

## Functions

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