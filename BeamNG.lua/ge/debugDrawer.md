---
title: Debug Drawer - GELUA
layout: default
date: 2026-03-09
---

# Debug Drawer

These functions help modders visualize objects in 3D.<br>
The newer [BNG_DBG_DRAW](/BeamNG.lua/common/BNG_DBG_DRAW.html) should be used instead, as it is much faster.

Positions are `vec3(x, y, z)`.<br>
Colors are `ColorF(r, g, b, a)` unless stated otherwise.<br>
useZ defaults to true, but if set to false, the item is always drawn on top.

## Functions

### Drawing

<table class="api"><tr>
  <th class="func">debugDrawer:drawText</th>
  <td class="args">pos, text, ColorF</td>
  <td class="desc">Draws text</td>
</tr></table>

<table class="api"><tr>
  <th class="func">debugDrawer:drawTextAdvanced</th>
  <td class="args">pos, string, ColorF, background, onScreen, ColorI</td>
  <td class="desc">Draws text</td>
  </tr><tr><td colspan="4" class="details">
  If <code>background</code> is false, its probably identical to drawText (ColorI still required for some reason)<br>
  If <code>onScreen</code> is true, the text position is in pixels on screen (dependent on screen resolution, still vec3).
</td></tr></table>

<table class="api"><tr>
  <th class="func">debugDrawer:drawDot</th>
  <td class="args">pos, size, ColorF, borderColor, borderSize</td>
  <td class="desc">Draws a dot (size in pixels)</td>
  </tr><tr><td colspan="4" class="details">
  borderColor and borderThickness is optional and increases vert count if used<br>
</td></tr></table>

<table class="api"><tr>
  <th class="func">debugDrawer:drawCircle</th>
  <td class="args">pos, radius, resolution, ColorF</td>
  <td class="desc">Draws a circle, didn't find a way to rotate it</td>
</tr></table>

<table class="api"><tr>
  <th class="func">debugDrawer:drawLine</th>
  <td class="args">posFrom, posTo, ColorF, number?</td>
  <td class="desc">Draws a 1px line, always on top, unknown 4th argument</td>
</tr></table>

<table class="api"><tr>
  <th class="func">debugDrawer:drawLineInstance</th>
  <td class="args">posFrom, posTo, thickness, ColorF, useZ</td>
  <td class="desc">Draws line with constant thickness</td>
</tr></table>

<table class="api"><tr>
  <th class="func">debugDrawer:drawArrow</th>
  <td class="args">posFrom, posTo, ColorI, useZ</td>
  <td class="desc">Draws an arrow. Uses <code>ColorI(r, g, b, a)</code> (0-255)</td>
</tr></table>

<table class="api"><tr>
  <th class="func">debugDrawer:drawSphere</th>
  <td class="args">pos, radius, ColorF, useZ</td>
  <td class="desc">Draws a sphere</td>
</tr></table>

<table class="api"><tr>
  <th class="func">debugDrawer:drawSphereOcclusionQuery</th>
  <td class="args">pos, radius, ColorF, useZ, GFXOcclusionQueryHandle</td>
  <td class="desc">Draws a sphere, that is probably occluded?</td>
</tr></table>

<table class="api"><tr>
  <th class="func">debugDrawer:drawCylinder</th>
  <td class="args">posFrom, posTo, thickness, ColorF, useZ, bool?</td>
  <td class="desc">Draws a cylinder</td>
  </tr><tr><td colspan="4" class="details">
  I found a 6th argument in <code>ge/extensions/editor/rallyEditor/measurementsTab.lua:317</code>, but I don't know what it does.
</td></tr></table>

<table class="api"><tr>
  <th class="func">debugDrawer:drawTri</th>
  <td class="args">pos1, pos2, pos3, ColorF, useZ</td>
  <td class="desc">Draws a 1px triangle border.</td>
</tr></table>

<table class="api"><tr>
  <th class="func">debugDrawer:drawTriSolid</th>
  <td class="args">pos1, pos2, pos3, color, useZ</td>
  <td class="desc">Draws a double-sided triangle. Uses <code>color(r, g, b, a)</code> (0-255)</td>
</tr></table>

<table class="api"><tr>
  <th class="func">debugDrawer:drawQuadSolid</th>
  <td class="args">pos1, pos2, pos3, pos4, color, useZ</td>
  <td class="desc">Draws a double-sided quad</td>
</tr></table>

<table class="api"><tr>
  <th class="func">debugDrawer:drawBox</th>
  <td class="args">pos1, pos2, ColorF, useZ</td>
  <td class="desc">Draws an axis aligned box</td>
</tr></table>

<table class="api"><tr>
  <th class="func">debugDrawer:drawSquarePrism</th>
  <td class="args">pos1, pos2, Point2F, Point2F, ColorF, useZ</td>
  <td class="desc">Draws a square prism</td>
</tr></table>

<table class="api"><tr>
  <th class="func">debugDrawer:drawFrustum</th>
  <td class="args">MatrixF, Frustum, ColorF</td>
  <td class="desc">Draws the frustum borders, forward and up arrows</td>
</tr></table>

<table class="api"><tr>
  <th class="func">debugDrawer:drawAxisGizmo()</th>
  <td class="desc">Draws the axis gizmo. See <code>ge/extensions/editor/api/gizmo.lua</code></td>
</tr></table>

### Drawing Control

<table class="api"><tr>
  <th class="func">debugDrawer:getDrawingEnabled</th>
  <td class="rets">bool</td>
  <td class="desc">Returns if drawing is enabled or disabled</td>
</tr></table>

<table class="api"><tr>
  <th class="func">debugDrawer:setDrawingEnabled</th>
  <td class="args">bool</td>
  <td class="desc">Enables or disables drawing</td>
</tr></table>