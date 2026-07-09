---
title: BNG_DBG_DRAW
layout: beamlua
date: 2026-07-08
---

Source: `common/cdefDebugDraw.lua`

These functions are significantly faster than their `debugDrawer` alternatives.<br>
To improve performance, always cache `ffi.C` into a local variable like `local C = ffi.C`.<br>
Never cache individual functions directly. Source: [LuaJIT FFI Tutorial - To Cache or Not to Cache](https://luajit.org/ext_ffi_tutorial.html#cache)<br>
Colors are packed integers: `color(r, g, b, a)`<br>
If useZ is false, then its alaways drawn on top (no z buffer).

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