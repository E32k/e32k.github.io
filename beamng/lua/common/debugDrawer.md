---
title: Debug Drawer - BeamNG.lua
layout: default
---

# Debug Drawer

These functions are meant to help modders by visualizing objects in 3D.<br>
Colors are alaways a `ColorF(r, g, b, a)` and positions are alaways `vec3(x, y, z)`.<br>
useZ defaults to true, but if set to false, the item is alaways drawn on top.<br>
Call like this: `DebugDrawer:function()`

## Functions

### Drawing


<table class="api"><tr>
  <th class="func">drawSphere</th>
  <td class="args">pos, radius, color, useZ</td>
  <td class="desc">Draws a sphere.</td>
</tr></table>

<table class="api"><tr>
  <th class="func">drawSphereOcclusionQuery</th>
  <td class="args">pos, radius, color, useZ, GFXOcclusionQueryHandle</td>
  <td class="desc">Draws a sphere, that is probably occluded?</td>
</tr></table>

<table class="api"><tr>
  <th class="func">drawCylinder</th>
  <td class="args">startPos, endPos, thickness, color, useZ</td>
  <td class="desc">Draws a sphere.</td>
</tr></table>

<table class="api"><tr>
  <th class="func">drawDot</th>
  <td class="args">pos, size, color, borderColor, borderSize</td>
  <td class="desc">Draws a dot.</td>
  </tr><tr><td colspan="4" class="details">
  borderColor and borderThickness is optional and increases vert count if used
</td></tr></table>

<table class="api"><tr>
  <th class="func">drawCircle</th>
  <td class="args">pos, radius, resolution, color</td>
  <td class="desc">Draws a circle, didn't find a way to rotate it</td>
</tr></table>