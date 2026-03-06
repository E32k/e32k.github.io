---
title: Player Vehicle - GELUA
layout: default
---

# Player Vehicle

These are all the functions that are in the obj after calling getPlayerVehicle()

## Functions

### Nodes

<table class="api"><tr>
  <th class="func">getNodeCount()</th>
  <td class="rets">number</td>
  <td class="desc">Returns the number of nodes</td>
</tr></table>

<table class="api"><tr>
  <th class="func">getRefNodeId()</th>
  <td class="rets">number</td>
  <td class="desc">Returns the id of the ref node</td>
</tr></table>

### Positions

<table class="api"><tr>
  <th class="func">getPosition()</th>
  <td class="rets">vec3() + XYZ alternative</td>
  <td class="desc">Returns the position of the object</td>
</tr></table>

<table class="api"><tr>
  <th class="func">getNodePosition</th>
  <td class="args">nodeID</td>
  <td class="rets">vec3() + XYZ alternative</td>
  <td class="desc">Returns the position of a node relative to the object position</td>
</tr></table>

<table class="api"><tr>
  <th class="func">getNodeAbsPosition</th>
  <td class="args">nodeID</td>
  <td class="rets">vec3() + XYZ alternative</td>
  <td class="desc">Returns the absolute world position of a node</td>
  </tr><tr><td colspan="4" class="details">
  Same as doing getNodePosition(nodeID) + getPosition()
</td></tr></table>

<table class="api"><tr>
  <th class="func">getRefNodeAbsPosition()</th>
  <td class="rets">vec3() + XYZ alternative</td>
  <td class="desc">Returns the absolute world position of the refnode</td>
  </tr><tr><td colspan="4" class="details">
  Same as doing getNodePosition(getRefNodeId()) + getPosition()
</td></tr></table>


### Node Clusters

<table class="api"><tr>
  <th class="func">getNodeClusterGeneration()</th>
  <td class="rets">number</td>
  <td class="desc">Returns the number of times the node clusters have been updated</td>
  </tr><tr><td colspan="4" class="details">
  At the start it retuns 0, after you for example break a part, it becomes 1.
</td></tr></table>
