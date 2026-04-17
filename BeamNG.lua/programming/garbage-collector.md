---
title: Garbage Collector
layout: beamlua
date: 2026-04-16
---

Every time you create a new object, which are things like tables, strings or userdata like vec3 or quats, it allocates memory. Because we dont have infinite memory yet, lua has a garbage colector, whichs role is to clean unused objects to free up ram. It doesnt run every frame, it runs when it decides to. That means that instead of your fps dropping, you get a way worse form of lag: rubber banding, where the game slow downs and speeds up right after, or it may freeze when it runs. Thats because when it runs, all lua is paused until it finishes its job. With small loads its unnoticeable.

You can measure how much garbage you are creating by running gcprobe(), like timeprobe() at the start and end of your measurement.



Every time you create a new object, which are things like tables, strings, or userdata like vec3 or quats, it allocates memory. Because we don't have infinite memory yet, Lua has a garbage collector, whose role is to clean unused objects to free up RAM. It doesn't run every frame, it runs when it decides to. That means that instead of your FPS dropping, you get a way worse form of lag: rubber banding, where the game slows down and speeds up right after, or it may freeze when it runs. That's because when it runs, all Lua is paused until it finishes its job. With small loads, it's unnoticeable.

You can measure how much garbage you are creating by running gcprobe(), like timeprobe(), at the start and end of your measurement.





Any time you create an object, it allocates memory. The object turns into garbage when its not referenced anymore. The garbage collector then collects the garbage when it needs to.

## What's Creating Objects

### Tables

With tables, it's pretty simple. You only create an object when you define a new table, so any time you use `{...}`.<br>
So if you can, prefer caching tables in hot loops, for example simple fixed positions like `{x = 2, y = 5}` that do not change.<br>
With changing tables, if you can, reuse the same table and just update its values instead of creating a new one each time.
Its still faster to create a new table than to nil all of its values if dealing with changing arrays.

### Strings

String objects aren't only created when you define them with something like `local text = "Hello World!"`, but also any time you concatenate them.<br>
Every concatenation creates a new string object, so `local text = player .. ": " .. msg .. "\n"` for example creates 4 new string objects.<br>
Same goes with most string functions like `string.format(...)`, `string.sub(...)` and similar.<br>
If you need to concatenate a lot of strings togheder, you can either use a temporary table and then use `table.concat(...)`, or you can use [string.buffer](/BeamNG.lua/common/string.buffer.html).

### UserData And CData

Of course any time you create an other kind of object, it turns into garbage eventually too, but since there are many different kinds of objects i will split them below

#### Vectors (and quats)

This is often the biggest garbage creator. Since every time you do math with them it creates a new object. So even things like this: `vecC = vecA + vecB` is creating garbage.



# TOC Test Document

This document tests all edge cases for heading parsing.

---

## Introduction

Some intro text.

## Basic Section

Content here.

### Subsection A

Details.

#### Deep Level 1

Even deeper.

##### Deep Level 2

Maximum depth.

### Subsection B

More content.

## Duplicate Section

This section appears twice in name.

### Child A

Text.

### Child A

Duplicate heading under same parent.

## Out of Order Structure

### This is a H3 before H4 parent context

#### Actually a H4 under H3

##### H5 under H4

### Another H3

#### H4 again

## Skipped Levels (important test)

#### H4 directly under H2 (no H3 before it)

##### H5 under skipped H4

## Back to H2

Regular reset section.

### Normal child

#### Deep child

## Repeated Titles Everywhere

## Repeated Titles Everywhere

### Repeated Titles Everywhere

#### Repeated Titles Everywhere

## Special Characters Test !@#$%^&*()

### !@# Subsection $$%%

#### Weird --- formatting ___ test

## Spacing & Normalization Test

###     Lots    of     Spaces

### CAPS LOCK HEADING

#### mixed CASE Heading Test

## Empty-ish edge cases

###

###

### Heading with trailing spaces

## Long Content Heading Example That Should Still Work Properly Without Breaking Anything In The TOC Generation Logic

### Another Extremely Long Subheading That Exists Only To Stress Test Link Rendering And Overflow Handling In The Table Of Contents UI

## Final Section

The end.

### Last Child

#### Final Deep Node