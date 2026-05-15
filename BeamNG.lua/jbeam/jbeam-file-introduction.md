---
title: JBeam File Introduction
layout: beamlua
date: 2026-05-14
---

I strongly recommend downloading <a href="https://code.visualstudio.com/download" target="_blank">Visual Studio Code</a> and installing the <a href="https://marketplace.visualstudio.com/items?itemName=beamng.jbeam-editor" target="_blank">JBeam Editor Extension</a>.

# JBeam Syntax

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

## The JBeam Format

### Parts

The JBeam file consists of a main dictionary, where are `"name": part` pairs are.<br>
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

### Sections
Each part itself is another dictionary of `"section": data` pairs.<br>
See how some are dictionaries (like information) while others are lists, and some are just values (mainly slotType).

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

### Example Cone Jbeam Section

I have modified the cone jbeam to be very simple.<br>
At line 1 we can see the main jbeam dictionary. It has one entry, `"simple_cone"`, which is an another dictionary, which has the entries `"information"`, `"slot"` and `"nodes"`.

The `"information"` entry is a dictionary which defines `"authors"`, `"name"` and `"value"`.<br>
Then we have the `"slot"` which is just assigned a string directly.

Looking at the `"nodes"` section, we can see its a table, which according to the header row is in the format of the node name followed by the 3D position coordinates.<br>
- `id` is the nodes name
- `posX` is the lateral axis (+left, -right)
- `posY` is the longitudinal axis (+back, -front)
- `posZ` is the vertical axis (+up, -down)

You might have noticed the occasional dictionaries like `{"nodeWeight":0.6}` in the table. Curly brackets (a dictionary) in a table usually means a modifier. Those are frequently used in sections like nodes, beams and triangles.

Looking closer at the `"group"` modifier, you can see it is cancelled at the end of the node section, and that is because it if weren't, any following node section (even in different jbeams) would have that group. This is known as "leaking". Thats why we alaways set common things like `nodeMaterial`, `frictionCoef`, `collision`, `selfCollision` and `nodeWeight` at the start of every section.

See how on line 17, the tip node has the dictionary inside it. That changes it to only affect the current row. Its often used on things like couplers, which have different names per-node.

```jbeam
//@@ 1
{
"simple_cone": {
    "information": {
        "authors": "E32k",
        "name": "Traffic Cone",
        "value": 10,
    }
    "slot": "some_slot"
    "nodes": [
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

        {"group":""}, // the group is reset, because these parameters overflow to ALL jbeam files loaded after this one
    ]
}
}
```

# Useful links
<a href="https://documentation.beamng.com/modding/vehicle/intro_jbeam/jbeamsyntax/" target="_blank">BeamNG Documentation - JBeam Syntax</a><br>
<a href="https://documentation.beamng.com/modding/vehicle/intro_jbeam/" target="_blank">BeamNG Documentation - Introduction to JBeam</a><br>
<a href="https://documentation.beamng.com/modding/vehicle/intro_jbeam/partslotsystem/" target="_blank">BeamNG Documentation - The Part/Slot System</a><br>
<a href="https://documentation.beamng.com/modding/vehicle/sections/" target="_blank">BeamNG Documentation - JBeam File Sections</a><br>