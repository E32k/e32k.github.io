---
title: Player Vehicle - GELUA
layout: default
---

# Player Vehicle

These are all the functions that are in the obj after calling getPlayerVehicle()

## Functions
<table class="api"><tr>
  <th class="func">getNodeAbsPosition</th>
  <td class="args">nodeID</td>
  <td class="rets">vec3()</td>
  <td class="desc">Returns the absolute world position of a node</td>
  </tr><tr><td colspan="4" class="details">
  You should prefer using the -XYZ function to save on gc  
</td></tr></table>


<table class="api"><tr>
  <th class="func">getNodeAbsPositionXYZ</th>
  <td class="args">nodeID</td>
  <td class="rets">XYZ tuple</td>
  <td class="desc">Returns the absolute world position of a node</td>
  </tr><tr><td colspan="4" class="details">
  This function returns three numbers and thus doesn't generate garbage
</td></tr></table>

<table class="api"><tr>
  <th class="func">getNodeClusterGeneration()</th>
  <td class="rets">number</td>
  <td class="desc">Returns the number of times the node clusters have been updated</td>
  </tr><tr><td colspan="4" class="details">
  At the start it retuns 0, after you for example break a part, it becomes 1.
</td></tr></table>
