---
title: BNG_DBG_DRAW - GELUA
layout: default
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

<table class="api"><tr>
  <th class="func">ffi.C.BNG_DBG_DRAW_Sphere</th>
  <td class="args">x, y, z, radius, packedCol, useZ</td>
  <td class="desc">Draws a sphere</td>
</tr></table>

<table class="api"><tr>
  <th class="func">ffi.C.BNG_DBG_DRAW_TriSolid</th>
  <td class="args">x1, y1, z1, x2, y2, z2, x3, y3, z3, packedCol, useZ</td>
  <td class="desc">Draws a triangle</td>
</tr></table>

<table class="api"><tr>
  <th class="func">ffi.C.BNG_DBG_DRAW_Line</th>
  <td class="args">x1, y1, z1, x2, y2, z2, packedCol, useZ</td>
  <td class="desc">Draws a a 1px wide line</td>
</tr></table>

<table class="api"><tr>
  <th class="func">ffi.C.BNG_DBG_DRAW_LineInstance_MinArg</th>
  <td class="args">x1, y1, z1, x2, y2, z2, width, packedCol</td>
  <td class="desc">Draws a constant size line</td>
</tr></table>

<table class="api"><tr>
  <th class="func">ffi.C.BNG_DBG_DRAW_Cylinder</th>
  <td class="args">x1, y1, z1, x2, y2, z2, radius, packedCol, useZ</td>
  <td class="desc">Draws a cylinder</td>
</tr></table>

<table class="api"><tr>
  <th class="func">ffi.C.BNG_DBG_DRAW_SquarePrism</th>
  <td class="args">x1, y1, z1, x2, y2, z2, x3, y3, x4, y4, packedCol, useZ</td>
  <td class="desc">Draws a square prism.</td>
</tr></table>

### Text

<table class="api"><tr>
  <th class="func">ffi.C.BNG_DBG_DRAW_Text</th>
  <td class="args">x1, y1, z1, text, packedCol</td>
  <td class="desc">Draws text</td>
</tr></table>

<table class="api"><tr>
  <th class="func">ffi.C.BNG_DBG_DRAW_TextAdvanced</th>
  <td class="args">x1, y1, z1, text, packedCol, bool useAdvancedText, bool twod, bgColorPacked, bool shadow, bool useZ</td>
  <td class="desc">Draws advanced text</td>
</tr></table>

### Batch Drawing

<table class="api"><tr>
  <th class="func">ffi.C.BNG_DBG_DRAW_LineInstance_MinArgBatch</th>
  <td class="args">const float &data, lineCount, w1, packedCol</td>
  <td class="desc">Draws multiple lines</td>
</tr></table>

<table class="api"><tr>
  <th class="func">ffi.C.BNG_DBG_DRAW_TriSolidBatch</th>
  <td class="args">const float &data, triCount, packedCol, useZ</td>
  <td class="desc">Draws multiple triangles</td>
</tr></table>