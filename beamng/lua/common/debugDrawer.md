---
title: Debug Drawer - BeamNG.lua
layout: default
---

# Debug Drawer

These functions are meant to help modders by visualizing objects in 3D.<br>
Colors are `ColorF(r, g, b, a)` if not mentioned.<br>
Positions are alaways `vec3(x, y, z)`.<br>
useZ defaults to true, but if set to false, the item is alaways drawn on top.<br>
Call like this: `DebugDrawer:function()`

## Functions

### Drawing


<table class="api"><tr>
  <th class="func">drawDot</th>
  <td class="args">pos, size, ColorF, borderColor, borderSize</td>
  <td class="desc">Draws a dot (size in pixels)</td>
  </tr><tr><td colspan="4" class="details">
  borderColor and borderThickness is optional and increases vert count if used<br>
</td></tr></table>

<table class="api"><tr>
  <th class="func">drawCircle</th>
  <td class="args">pos, radius, resolution, ColorF</td>
  <td class="desc">Draws a circle, didn't find a way to rotate it</td>
</tr></table>

<table class="api"><tr>
  <th class="func">drawLine</th>
  <td class="args">posFrom, posTo, ColorF, number?</td>
  <td class="desc">Draws a 1px line, alaways on top, unknown 4th argument</td>
</tr></table>

<table class="api"><tr>
  <th class="func">drawLineInstance</th>
  <td class="args">posFrom, posTo, thickness, ColorF, useZ</td>
  <td class="desc">Draws line with constant thickness</td>
</tr></table>

<table class="api"><tr>
  <th class="func">drawArrow</th>
  <td class="args">posFrom, posTo, ColorI, useZ</td>
  <td class="desc">Draws an arrow. Uses <code>ColorI(r, g, b, a)</code> (0-255)</td>
</tr></table>

<table class="api"><tr>
  <th class="func">drawSphere</th>
  <td class="args">pos, radius, ColorF, useZ</td>
  <td class="desc">Draws a sphere</td>
</tr></table>

<table class="api"><tr>
  <th class="func">drawSphereOcclusionQuery</th>
  <td class="args">pos, radius, ColorF, useZ, GFXOcclusionQueryHandle</td>
  <td class="desc">Draws a sphere, that is probably occluded?</td>
</tr></table>

<table class="api"><tr>
  <th class="func">drawCylinder</th>
  <td class="args">posFrom, posTo, thickness, ColorF, useZ, bool?</td>
  <td class="desc">Draws a cylinder</td>
  </tr><tr><td colspan="4" class="details">
  I found a 6th argument in <code>ge/extensions/editor/rallyEditor/measurementsTab.lua:317</code>, but I don't know what it does.
</td></tr></table>

<table class="api"><tr>
  <th class="func">drawTriSolid</th>
  <td class="args">pos1, pos2, pos3, color, useZ</td>
  <td class="desc">Draws a filled triangle. Uses <code>color(r, g, b, a)</code> (0-255)</td>
</tr></table>


<table class="api"><tr>
  <th class="func">drawAxisGizmo()</th>
  <td class="desc">Draws the axis gizmo. See <code>ge/extensions/editor/api/gizmo.lua</code></td>
</tr></table>