---
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

The JBeam file consists of a main dictionary, where are `"name": part` pairs are.
Lets look at `vehicles/cones/cones.jbeam`
```jbeam
//@@ 1
{
    "cones": {...},
    "cone_01a": {...},
    "cone_01b": {...},
    "cone_skin_single": {...},
    "cone_skin_double": {...}
}
```
Each part itself is another dictionary of `"section": data` pairs.<br>
See how some are dictionaries (like information) while others are lists, and some are just values (mainly slotType)
```jbeam
//@@ 1
{
"cones": {
    "information":{...},
    "slotType" : "main",
    "sounds": {...},
    "slots": [...],
},
"cone_01a": {
    "information":{...},
    "slotType" : "cone",
    "flexbodies": [...],
    "cameraExternal":{...},
    "refNodes": [...],
    "nodes": [...],
    "beams": [...],
    "triangles": [...],
},
"cone_01b": {
    "information":{...},
    "slotType" : "cone",
    "flexbodies": [...],
    "cameraExternal": {...},
    "refNodes": [...],
    "nodes": [...],
    "beams": [...],
    "triangles": [...],
  },
"cone_skin_single": {
    "information":{...},
    "slotType" : "paint_design",
    "skinName" : "single"
  },
"cone_skin_double": {
    "information":{...},
    "slotType" : "paint_design",
    "skinName" : "double"
},
}
```
Lets only look at the `"cones"` and `"cone_01a"` part, so this doesnt get long
```jbeam
//@@ 1
{
"cones": {
    "information":{
        "authors":"BeamNG",
        "name":"Small Traffic Cone",
    },
    "slotType" : "main",
    "sounds": {
        "impactPlastic":false
        "scrapePlastic":false
        "wind":false
    },
    "slots": [
        ["type", "default", "description"],
        ["cone", "cone_01a", "Cone Type", {"coreSlot":true}],
        ["paint_design", "", "Paint Design"],
    ],
},

"cone_01a": {
    "information":{
        "authors":"BeamNG",
        "name":"Small Traffic Cone",
    },
    "slotType" : "cone",

    "flexbodies": [
        ["mesh", "[group]:"],
        {"rot":{"x":0, "y":0, "z":0}, "pos":{"x":0, "y":0, "z":0}},
        ["cone_01a", ["cone"]],
    ],
    "cameraExternal":{
        "distance":4.0,
        "distanceMin":2,
        "offset":{"x":0.15, "y":0.15, "z":0.2},
        "fov":65,
    },
    "refNodes":[
        ["ref:", "back:", "left:", "up:"],
        ["c2r", "c1r", "c2l", "c3"],
    ],
    "nodes": [
        ["id", "posX", "posY", "posZ"],
        {"nodeWeight":0.4},
        {"group":"cone"},
        {"frictionCoef":1.3},
        {"nodeMaterial":"|NM_PLASTIC"},
        {"collision":true},
        {"selfCollision":false},
        {"nodeWeight":0.6},
        ["c1r", -0.15, 0.15, 0.0],
        ["c1l", 0.15, 0.15, 0.0],
        ["c2r", -0.15, -0.15, 0.0],
        ["c2l", 0.15, -0.15, 0.0],
        {"nodeWeight":0.2},
        ["c3", 0.0, 0.0, 0.47],
        {"group":""},
    ],
    "beams": [
        ["id1:", "id2:"],
        {"beamPrecompression":1, "beamType":"|NORMAL", "beamLongBound":1, "beamShortBound":1},
        {"beamSpring":20000,"beamDamp":100},
        {"beamDeform":10000,"beamStrength":"FLT_MAX"},
        //--EXPANSION DEFORM LIMIT DEFAULT--
        {"deformLimitExpansion":1.1},
        ["c1r","c3"],
        ["c1l","c3"],
        ["c2r","c3"],
        ["c2l","c3"],

        ["c1r","c1l"],
        ["c2r","c2l"],
        ["c1r","c2r"],
        ["c1l","c2l"],
        ["c1r","c2l"],
        ["c1l","c2r"],

        //no stretch
        {"beamType":"|BOUNDED", "beamLongBound":0, "beamShortBound":1},
        {"beamSpring":0,"beamDamp":0},
        {"beamLimitSpring":20000,"beamLimitDamp":100},
        {"beamDeform":"FLT_MAX","beamStrength":"FLT_MAX"},
        ["c1r","c3"],
        ["c1l","c3"],
        ["c2r","c3"],
        ["c2l","c3"],
        {"beamPrecompression":1, "beamType":"|NORMAL", "beamLongBound":1, "beamShortBound":1},
    ],
    "triangles": [
        ["id1:","id2:","id3:"],
        {"group":"cone"},
        ["c3","c2r","c2l"],
        ["c3","c1r","c2r"],
        ["c3","c1l","c1r"],
        ["c3","c2l","c1l"],

        ["c1l","c2l","c2r"],
        ["c1l","c2r","c1r"],
        {"group":""},
    ],
},
}
```