---
title: JBeam File Introduction
layout: beamlua
date: 2026-05-14
---

I very strongly reccomend downloading <a href="https://code.visualstudio.com/download" target="_blank">Visual Studio Code</a> along with the <a href="https://marketplace.visualstudio.com/items?itemName=beamng.jbeam-editor" target="_blank">JBeam Editor Extension</a>.

# JBeam Files

The jbeam file format is actually SJSON which is a JSON variant, that changes many things, for example making commas optional.<br>
There are single line `//` comments and multi-line `/* ... */` comments.

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
As you can see by the main yellow and then nested purple brackets, this is just a list of lists (array of arrays).<br>
They have a first "header" list/row and then the data lists/rows.<br>
(And also see how nice to look at it is when you keep the spacing consistent)
```jbeam
[
    ["brand",   "model",   "year"],
    ["Gavril",  "D-Series", 1997],
    ["Ibishu",  "Covet",    1992],
    ["Hirochi", "Sunburst", 2014],
]
```

Curly brackets (a dictionary) in a table usually means a modifier. Those are frequently used in sections like nodes, beams and triangles. Here you can see a (edited) section from the cone jbeam.

Looking closer at the `"group"` modifier, you can see it is cancelled at the end of the node section, and that is because it if weren't, any following node section (even in different jbeams) would have that group. This is known as "leaking". Thats why we alaways set common things like `nodeMaterial`, `frictionCoef`, `collision`, `selfCollision` and `nodeWeight` at the start of every section.

See how on line 17, the tip node has the dictionary inside it. That changes it to only set the value on the current row. Its often used on things like couplers, which have different names per-node.

The most interesting part are the nodes themselfes, which according to the header row are in the format of the node name followed by the 3D position coordinates.<br>
- `posX` is the lateral axis (+left, -right)
- `posY` is the longitudinal axis (+back, -front)
- `posZ` is the vertical axis (+up, -down)

```jbeam
[
    ["id", "posX", "posY", "posZ"], // header row
    {"frictionCoef":1.3},           // all nodes after this line will have frictionCoef of 1.3
    {"nodeMaterial":"|NM_PLASTIC"}, // all nodes after this line will have the plastic material
    {"collision":true},             // following nodes will have collision
    {"selfCollision":false},        // following nodes will not have selfCollision

    // square base
    {"group":"cone"},    // all nodes after this line will have the group "cone"
    {"nodeWeight":0.6},  // all nodes after this line will have a weight of 0.6 kg
    ["c1r", -0.15,  0.15, 0.0],
    ["c1l",  0.15,  0.15, 0.0],
    ["c2r", -0.15, -0.15, 0.0],
    ["c2l",  0.15, -0.15, 0.0],

    // tip of cone
    ["c3", 0.0, 0.0, 0.47 {"nodeWeight":0.2}], // only this node has weight of 0.2 kg
    {"group":""}, //the group is reset, because these parameters overflow to ALL jbeam files loaded after this one
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