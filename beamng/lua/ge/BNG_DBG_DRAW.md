---
title: BNG_DBG_DRAW - GELUA
layout: default
date: 2026-03-08
---

# BNG_DBG_DRAW
`common/cdefDebugDraw.lua`

These functions are significantly faster than their `debugDrawer` alternatives.<br>
It is highly recommended to cache this into a local variable, for example `local drawSphere = ffi.C.BNG_DBG_DRAW_Sphere`.
Colors are packed integers: `color(r, g, b, a) 0-255`<br>
If useZ, then the item is always drawn on top.<br>

Called like `ffi.C.function()`

## Functions

<table class="api"><tr>
  <th class="func">BNG_DBG_DRAW_Sphere</th>
  <td class="args">x, y, z, radius, packedCol, useZ</td>
  <td class="desc">Draws a sphere</td>
</tr></table>

<table class="api"><tr>
  <th class="func">BNG_DBG_DRAW_Cylinder</th>
  <td class="args">x1, y1, z1, x2, y2, z2, radius, packedCol, useZ</td>
  <td class="desc">Draws a sphere</td>
</tr></table>

<table class="api"><tr>
  <th class="func">BNG_DBG_DRAW_Line</th>
  <td class="args">x1, y1, z1, x2, y2, z2, packedCol, useZ</td>
  <td class="desc">Draws a sphere</td>
</tr></table>

<table class="api"><tr>
  <th class="func">BNG_DBG_DRAW_Text</th>
  <td class="args">x1, y1, z1, text, packedCol</td>
  <td class="desc">Draws a sphere</td>
</tr></table>

<table class="api"><tr>
  <th class="func">BNG_DBG_DRAW_LineInstance_MinArg</th>
  <td class="args">x1, y1, z1, x2, y2, z2, width, packedCol</td>
  <td class="desc">Draws a sphere</td>
</tr></table>

<table class="api"><tr>
  <th class="func">BNG_DBG_DRAW_SquarePrism</th>
  <td class="args">x1, y1, z1, x2, y2, z2, x3, y3, x4, y4, packedCol, useZ</td>
  <td class="desc">Draws a sphere</td>
</tr></table>

<table class="api"><tr>
  <th class="func">BNG_DBG_DRAW_TextAdvanced</th>
  <td class="args">x1, y1, z1, text, packedCol, useAdvancedText, twod, bgColorPacked, shadow, useZ</td>
  <td class="desc">Draws a sphere</td>
</tr></table>

<table class="api"><tr>
  <th class="func">BNG_DBG_DRAW_TriSolid</th>
  <td class="args">x1, y1, z1, x2, y2, z2, x3, y3, z3, packedCol, useZ</td>
  <td class="desc">Draws a sphere</td>
</tr></table>

<table class="api"><tr>
  <th class="func">BNG_DBG_DRAW_LineInstance_MinArgBatch</th>
  <td class="args">const float &data, lineCount, w1, packedCol</td>
  <td class="desc">Draws a sphere</td>
</tr></table>

<table class="api"><tr>
  <th class="func">BNG_DBG_DRAW_TriSolidBatch</th>
  <td class="args">const float &data, triCount, packedCol, useZ</td>
  <td class="desc">Draws a sphere</td>
</tr></table>