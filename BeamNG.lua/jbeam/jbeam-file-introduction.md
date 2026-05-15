q---
title: JBeam File Introduction
layout: beamlua
date: 2026-05-14
---

This page should be the first one you visit, as it explains how jbeam files work.


# JBeam Files

The jbeam file format is actually SJSON which is a JSON variant, that changes many things, for example making commas optional.

## Data Structures

There are only two structures that jbeam has, defined by which brackets you use.

### Dictionaries
Formed with curly brackets `{}`.<br>
These are pairs of keys (blue text in quotation marks) and values separated by a colon.
```jbeam
{
    "foo": 1,
    "bar": 2,
    "baz": "value"
}
```

### Lists/Arrays
Formed with square brackets `[]`.<br>
These store just values separated by commas (or spaces).
```jbeam
[
    "foo",
    "bar",
    "baz"
]
```
They are often written compactly as
```jbeam
["foo", "bar", "baz"]
```

### Tables
This is not a different format, its just an list of lists (array of arrays).<br>
They have a first "header" list/row and then the data lists/rows.<br>
See the main yellow and then the nested purple brackets<br>
(And also see how nice to look at it is when you keep the spacing consistent)
```jbeam
[
    ["brand",   "model",   "year"],
    ["Gavril",  "D-Series", 1997],
    ["Ibishu",  "Covet",    1992],
    ["Hirochi", "Sunburst", 2014],
]
```

## The JBeam Format

The JBeam file consists of a main dictionary, where are `name: part` pairs are.
```jbeam
//@@ 1
{
    "pickup_frame": {...},
    "pickup_engine": {...}
}
```
Each part itself is another dictionary of `section: data` pairs<br>
See how some are dictionaries (like information) while others are lists, and some are just values (mainly slotType)
```jbeam
//@@ 1
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
