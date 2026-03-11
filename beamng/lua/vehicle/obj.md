---
title: obj - GELUA
layout: default
date: 2026-03-07
---

# obj

This is the main userdata, that includes functions which control the vehicles jbeam and the vehicle itself.

## Functions

### Adding

<table class="api"><tr>
  <th class="func">getNodeCount()</th>
  <td class="rets">number</td>
  <td class="desc">Returns the number of nodes</td>
</tr></table>

### Powertrain

<table class="api"><tr>
  <th class="func">obj:screwBeam</th>
  <td class="args">
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
  </td>
  <td class="rets">number</td>
  <td class="desc">From <code>vehicle/powertrain/linearActuator.lua</code></td>
</tr></table>