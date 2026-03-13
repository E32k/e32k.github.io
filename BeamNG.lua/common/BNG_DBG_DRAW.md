---
title: BNG_DBG_DRAW - GELUA
layout: beamlua
date: 2026-03-10
---

# BNG_DBG_DRAW
Source: `common/cdefDebugDraw.lua`

These functions are significantly faster than their `debugDrawer` alternatives.<br>
It is recommended to cache this into a local variable to improve performance, for example `local drawSphere = ffi.C.BNG_DBG_DRAW_Sphere`.<br>
Colors are packed integers: `color(r, g, b, a) 0-255`<br>
If useZ, then the item is always drawn on top.

## Functions

### 3D Shapes

<div class="funcTable"><div class="headerRow">
  <div class="func">ffi.C.BNG_DBG_DRAW_Sphere</div>
  <div class="args">x, y, z, radius, packedCol, useZ</div>
  <div class="desc">Draws a sphere</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">ffi.C.BNG_DBG_DRAW_TriSolid</div>
  <div class="args">x1, y1, z1, x2, y2, z2, x3, y3, z3, packedCol, useZ</div>
  <div class="desc">Draws a triangle</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">ffi.C.BNG_DBG_DRAW_Line</div>
  <div class="args">x1, y1, z1, x2, y2, z2, packedCol, useZ</div>
  <div class="desc">Draws a a 1px wide line</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">ffi.C.BNG_DBG_DRAW_LineInstance_MinArg</div>
  <div class="args">x1, y1, z1, x2, y2, z2, width, packedCol</div>
  <div class="desc">Draws a constant size line</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">ffi.C.BNG_DBG_DRAW_Cylinder</div>
  <div class="args">x1, y1, z1, x2, y2, z2, radius, packedCol, useZ</div>
  <div class="desc">Draws a cylinder</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">ffi.C.BNG_DBG_DRAW_SquarePrism</div>
  <div class="args">x1, y1, z1, x2, y2, z2, x3, y3, x4, y4, packedCol, useZ</div>
  <div class="desc">Draws a square prism.</div>
</div></div>

### Text

<div class="funcTable"><div class="headerRow">
  <div class="func">ffi.C.BNG_DBG_DRAW_Text</div>
  <div class="args">x1, y1, z1, text, packedCol</div>
  <div class="desc">Draws text</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">ffi.C.BNG_DBG_DRAW_TextAdvanced</div>
  <div class="args">x1, y1, z1, text, packedCol, bool useAdvancedText, bool twod, bgColorPacked, bool shadow, bool useZ</div>
  <div class="desc">Draws advanced text</div>
</div></div>

### Batch Drawing

<div class="funcTable"><div class="headerRow">
  <div class="func">ffi.C.BNG_DBG_DRAW_LineInstance_MinArgBatch</div>
  <div class="args">const float &data, lineCount, w1, packedCol</div>
  <div class="desc">Draws multiple lines</div>
</div></div>

<div class="funcTable"><div class="headerRow">
  <div class="func">ffi.C.BNG_DBG_DRAW_TriSolidBatch</div>
  <div class="args">const float &data, triCount, packedCol, useZ</div>
  <div class="desc">Draws multiple triangles</div>
</div></div>