---
title: Player Vehicle - GELUA
layout: default
---

# Player Vehicle

These are all the functions that are in the obj after calling getPlayerVehicle()

## Functions
<table class="api">
  <tr>
    <th class="func">getNodeAbsPosition</th>
    <td class="args">Node ID</td>
    <td class="rets">vec3()</td>
    <td class="desc">Returns the absolute world position of a node</td>
  </tr><tr>
    <td colspan="4" class="details">
      You should prefer using the -XYZ function to save on gc  
    </td>
  </tr>
</table>
<table class="api">
  <tr>
    <th class="func">getNodeAbsPositionXYZ</th>
    <td class="args">Node ID</td>
    <td class="rets">XYZ tuple</td>
    <td class="desc">Returns the absolute world position of a node</td>
  </tr><tr>
    <td colspan="4" class="details">
      This function returns three numbers and thus doesn't generate garbage
    </td>
  </tr>
</table>