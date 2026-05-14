---
title: JBeam File Introduction
layout: beamlua
date: 2026-05-14
---

This page should be the first one you visit, as it explains how jbeam files work.


# JBeam Files

The jbeam file format is actually SJSON which is a JSON variant, that changes many things, for example making commas optional.

## Data Structures

There are only two (three) structures that jbeam has:

### Dictionaries
These are pairs of keys (blue text in quotation marks) and values (which can be simple numbers or strings or even another dictionaries or lists)
```lua
{
    "foo": 1,
    "bar": 2,
    "baz": "value"
}
```

### Lists/Arrays
```lua
[
    "foo",
    "bar",
    "baz"
]
```
Which are often written compactly as

```lua
["foo", "bar", "baz"]
```

### Tables
This is not a different format, its just an list of lists (array of arrays).<br>
See the main yellow and then the nested purple brackets<br>
(And also see how nice to look at it is when you keep the spacing consistent)
```lua
[
    ["brand",   "model",   "year"],
    ["Gavril",  "D-Series", 1997],
    ["Ibishu",  "Covet",    1992],
    ["Hirochi", "Sunburst", 2014],
]
```

## The JBeam Format

The jbeam format consists of a main dictionary, which are `name-part` pairs

```lua
--@@ 1
{
    "pickup_frame": {...},
    "pickup_engine": {...}
}
```

Each part itself is a dictionary of `section-data` pairs<br>
See how some are dictionaries (like information) while others are lists, and some are just values (mainly slotType)

```lua
--@@ 1
{
"pickup_frame": {
    "information": {...},
    "slotType": "pickup_frame",
    "slots": [...],
    "flexbodies": [...],
    "nodes": [...],
    "beams": [...],
    "triangles": [...],
},

"pickup_engine": {
    "information": {...},
    "slotType": "pickup_engine",
    "slots": [...],
    "flexbodies": [...],
    "nodes": [...],
    "beams": [...],
    "triangles": [...],
}
}
```