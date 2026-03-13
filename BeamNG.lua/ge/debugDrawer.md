---
title: Debug Drawer - GELUA
layout: beamlua
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

<div class="funcTable"><div class="headerRow">
  <div class="func">debugDrawer:drawText</div>
  <div class="args">pos, text, ColorF</div>
  <div class="desc">Draws text</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">debugDrawer:drawTextAdvanced</div>
  <div class="args">pos, string, ColorF, background, onScreen, ColorI</div>
  <div class="desc">Draws text</div>
  </div><div class="details">
  If <code>background</code> is false, its probably identical to drawText (ColorI still required for some reason)<br>
  If <code>onScreen</code> is true, the text position is in pixels on screen (dependent on screen resolution, still vec3).
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">debugDrawer:drawDot</div>
  <div class="args">pos, size, ColorF, borderColor, borderSize</div>
  <div class="desc">Draws a dot (size in pixels)</div>
  </div><div class="details">
  borderColor and borderThickness is optional and increases vert count if used<br>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">debugDrawer:drawCircle</div>
  <div class="args">pos, radius, resolution, ColorF</div>
  <div class="desc">Draws a circle, didn't find a way to rotate it</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">debugDrawer:drawLine</div>
  <div class="args">posFrom, posTo, ColorF, number?</div>
  <div class="desc">Draws a 1px line, always on top, unknown 4th argument</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">debugDrawer:drawLineInstance</div>
  <div class="args">posFrom, posTo, thickness, ColorF, useZ</div>
  <div class="desc">Draws line with constant thickness</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">debugDrawer:drawArrow</div>
  <div class="args">posFrom, posTo, ColorI, useZ</div>
  <div class="desc">Draws an arrow. Uses <code>ColorI(r, g, b, a)</code> (0-255)</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">debugDrawer:drawSphere</div>
  <div class="args">pos, radius, ColorF, useZ</div>
  <div class="desc">Draws a sphere</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">debugDrawer:drawSphereOcclusionQuery</div>
  <div class="args">pos, radius, ColorF, useZ, GFXOcclusionQueryHandle</div>
  <div class="desc">Draws a sphere, that is probably occluded?</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">debugDrawer:drawCylinder</div>
  <div class="args">posFrom, posTo, thickness, ColorF, useZ, bool?</div>
  <div class="desc">Draws a cylinder</div>
  </div><div class="details">
  I found a 6th argument in <code>ge/extensions/editor/rallyEditor/measurementsTab.lua:317</code>, but I don't know what it does.
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">debugDrawer:drawTri</div>
  <div class="args">pos1, pos2, pos3, ColorF, useZ</div>
  <div class="desc">Draws a 1px triangle border.</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">debugDrawer:drawTriSolid</div>
  <div class="args">pos1, pos2, pos3, color, useZ</div>
  <div class="desc">Draws a double-sided triangle. Uses <code>color(r, g, b, a)</code> (0-255)</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">debugDrawer:drawQuadSolid</div>
  <div class="args">pos1, pos2, pos3, pos4, color, useZ</div>
  <div class="desc">Draws a double-sided quad</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">debugDrawer:drawBox</div>
  <div class="args">pos1, pos2, ColorF, useZ</div>
  <div class="desc">Draws an axis aligned box</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">debugDrawer:drawSquarePrism</div>
  <div class="args">pos1, pos2, Point2F, Point2F, ColorF, useZ</div>
  <div class="desc">Draws a square prism</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">debugDrawer:drawFrustum</div>
  <div class="args">MatrixF, Frustum, ColorF</div>
  <div class="desc">Draws the frustum borders, forward and up arrows</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">debugDrawer:drawAxisGizmo()</div>
  <div class="desc">Draws the axis gizmo. See <code>ge/extensions/editor/api/gizmo.lua</code></div>
</div></div>

### Drawing Control

<div class="funcTable"><div class="headerRow">
  <div class="func">debugDrawer:getDrawingEnabled</div>
  <div class="rets">bool</div>
  <div class="desc">Returns if drawing is enabled or disabled</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">debugDrawer:setDrawingEnabled</div>
  <div class="args">bool</div>
  <div class="desc">Enables or disables drawing</div>
</div></div>