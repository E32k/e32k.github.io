# Color Utilities
These are functions that help converting colors or making some other stuff
## RGBtoHSV() and HSVtoRGB()
Converts color tuples between **RGB** and **HSV**.  
Uses **0-1** range.

#### Examples:
```lua
local h, s, v = RGBtoHSV(1, 0, 0)  
-- h=0, s=1, v=1 (pure red)  

local r, g, b = HSVtoRGB(0, 1, 1)  
-- r=1, g=0, b=0 (back to red)  
```
```lua
local h, s, v = RGBtoHSV(0.25, 0.5, 0.75)  
-- r≈0.58, g=0.67, b=0.75

local r, g, b = HSVtoRGB(0.25, 0.8, 0.5)  
-- r≈0.3, g≈0.5, b≈0.1
```


## color() and colorGetRGBA()
Compacts RGBA values into a **single 32-bit integer** and allows unpacking them back.  
All channels are floored and in **0-255** range.

- `color(r, g, b, a)` - packs RGBA into one number, alpha is optional (`a or 255`)
- `colorGetRGBA(col)` - unpacks the number back into `r, g, b, a`

#### Examples:
```lua
local myColor = color(64, 128, 255, 200)  
-- myColor = 1082195912  (0x4080FFC8)
local r, g, b, a = colorGetRGBA(myColor)  
-- r=64, g=128, b=255, a=200  
```
```lua
local myColor = color(255, 80, 80)  
-- myColor = 4283453695 (0xFF5050FF)
local r, g, b, a = colorGetRGBA(4283453695)  
-- r=255, g=80, b=80, a=255  
```
```lua
local myColor = color(0, 255, 0)  
-- myColor = 16711935  (0x00FF00FF)
local r, g, b = colorGetRGBA(0x00FF00FF)  
-- r=0, g=255, b=0
```

## colorHex()
```lua
function colorHex(rgbHex, a)
  return rgbHex * 256 + max(0, min(255, floor(a or 255)))
end
```
Input: 24-bit hex RGB + optional alpha  
Output: single 32-bit packed integer representing RGBA

#### Examples:
```lua
local myColor = color(64, 128, 255, 200)  
-- myColor = 1082195912  (0x4080FFC8)
local r, g, b, a = colorGetRGBA(myColor)  
-- r=64, g=128, b=255, a=200  
```
## tableToColor()
```lua
function tableToColor(v)
  return v and color(v.r, v.g, v.b, v.a) or 0
end
```
## parseColor()
Converts a color input in multiple formats into a **single 32-bit integer** using `color()`.  

**Inputs:**  
- a table `{r=.., g=.., b=.., a=..}` with RGBA values (0-255) (alpha optional)
- a hex string `"#RRGGBBAA"` (9 characters, must include alpha)
- `nil`, which defaults to transparent black  

Returns a **32-bit packed integer** representing the color.  

```lua
local colorTable = {r=64, g=128, b=255, a=200}
local myColor = parseColor(colorTable)  
-- myColor = 1082195912  (0x4080FFC8)
```
```lua
local colorTable = {r=255, g=80, b=80}
local myColor = parseColor(colorTable)  
-- myColor = 4283453695  (0xFF5050FF) (alpha defaults to 255)  
```
```lua
local myColor = parseColor("#4080FFC8")  
-- myColor = 1082195912  (0x4080FFC8)
```
```lua
local myColor = parseColor(nil)  
-- myColor = 0  (transparent black)
```
## Color gradients
### ironbowColor(), jetColor() and greyColor()
These functions output a color gradient.  
**Arguments:**  
- number between 0 and 1.  
- optional alpha value (0-255).  

Returns a 32-bit packed integer (RGBA) using `color()`.

#### Ironbow:
![Output of ironbowColor()](ironbow.jpg "Output of ironbowColor()")  

#### Jet:
![Output of jetColor()](jet.jpg "Output of jetColor()")  

#### Grey:
![Output of greyColor()](grey.jpg "Output of greyColor()")  


### rainbowColor(numOfSteps, step, format)
Exactly the same as jetColor() but more complicated  
Arguments:  
- `numOfSteps` - The total scale of the gradient. The function divides `step` by this value to get a normalized position `x` in [0,1]:  
  - For `1`, `step` should already be in [0,1].  
  - For `255`, `step` should be in [0,255].  
- `step` - The current position along the rainbow gradient.  
- `format` - Determines output range:  
  - If `255` or not set, returns a table of floored `0-255` RGBA values.  
  - Otherwise, returns a table of `0-1` RGBA values.

![Output of rainbowColor()](rainbow.jpg "Output of rainbowColor()")  
```lua
local col = rainbowColor(1, 0.0)  -- start of gradient (blue)
-- col = {0, 0, 255, 255}
local col = rainbowColor(1, 0.5, 255)  -- middle (green)
-- col = {0, 255, 0, 255}
local col = rainbowColor(255, 255)  -- end (red)
-- col = {255, 0, 0, 255}
```


# Show Me The Code
<pre data-start="30"><code class="language-lua">function RGBtoHSV(r, g, b)
  local cMax = max(r,g,b)
  local cDelta = cMax - min(r,g,b)

  local h
  if r == cMax then h = (g-b)/(cDelta + 1e-10) % 6
  elseif g == cMax then h = 2 + (b-r)/(cDelta + 1e-10)
  else h = 4 + (r-g)/(cDelta + 1e-10)
  end

  return h / 6, cDelta/(cMax + 1e-10), cMax
end

function HSVtoRGB(h, s, v)
  s = v * s
  local h6, is = h * 6, v - s
  return is + s*min(max(abs(h6-3)-1, 0), 1), is + s*min(max(2-abs(h6-2), 0), 1), is + s*min(max(2-abs(h6-4), 0), 1)
end

function rainbowColor(numOfSteps, step, format)
  local x = step / max(numOfSteps, 1e-10)
  local r, g, b = min(1, max(0, 4 * x - 2)), min(1, max(0, 2 - abs(4 * x - 2))), min(1, max(0, 2 - 4 * x))
  if (format or 255) == 255 then
    return {floor(r*255), floor(g*255), floor(b*255), 255}
  else
    return {r, g, b, 1}
  end
end

-- r,g,b,a in [0..255]
function color(r, g, b, a)
  return max(0, min(255, floor(r))) * 16777216 + max(0, min(255, floor(g))) * 65536 + max(0, min(255, floor(b))) * 256 + max(0, min(255, floor(a or 255)))
end

function colorGetRGBA(col)
  return floor(col / 16777216), floor(col / 65536) % 256, floor(col / 256) % 256, col % 256
end

function colorHex(rgbHex, a)
  return rgbHex * 256 + max(0, min(255, floor(a or 255)))
end

function tableToColor(v)
  return v and color(v.r, v.g, v.b, v.a) or 0
end

function parseColor(v)
  if type(v) == 'table' then
    return color(v.r, v.g, v.b, v.a)
  elseif type(v) == 'string' and string.len(v) > 7 and v:sub(1,1) == '#' then
    v = v:gsub("#","")
    return color(tonumber("0x"..v:sub(1,2)), tonumber("0x"..v:sub(3,4)), tonumber("0x"..v:sub(5,6)), tonumber("0x"..v:sub(7,8)))
  elseif v == nil then
    return color(0,0,0,0)
  end
end

-- x in [0..1]
function ironbowColor(x, a)
  return color(255*min(1, max(0, x*1.55/(0.11+x) - 0.4)), 255*min(1, max(0,x*1.47 - 0.35)), 255*min(1, max(0, x*6-5, 0.63544-9.4*(x-0.26)*(x-0.26))), a)
end

-- x in [0..1]
function jetColor(x, a)
  return color(255*min(1, max(0, 4 * x - 2)), 255*min(1, max(0, 2 - abs(4 * x - 2))), 255*min(1, max(0, 2 - 4 * x)), a)
end

-- x in [0..1]
function greyColor(x, a)
  local c = 255*x
  return color(c, c, c, a)
end
</code></pre>
