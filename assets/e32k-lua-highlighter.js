function findMatchingBrackets(code, pos) {
  if (code[pos] !== '[') return false;

  let i = pos+1;
  while (code[i] === '=') i++;

  if (code[i] !== '[') return false;

  const closing = ']' + '='.repeat(i - (pos+1)) + ']'
  const end = code.indexOf(closing, i+1);

  return end === -1 ? -1 : end + closing.length;
}


function isDigit(code, pos) {
    const codePoint = code.charCodeAt(pos);
    return codePoint >= 48 && codePoint <= 57;
}

function isStringEscape(char) {
  switch (char) {
    case 92:  // \
    case 34:  // "
    case 39:  // '
    case 97:  // a
    case 98:  // b
    case 102: // f
    case 110: // n
    case 114: // r
    case 116: // t
    case 118: // v
      return true;
    default:
      return false;
  }
}

function isHexDigit(c) {
  return (c >= 48 && c <= 57) || (c >= 65 && c <= 70) || (c >= 97 && c <= 102);
}

function highlightLua(code) {
  const tokens = [];
  const closingBrackets = {')':'(','}':'{',']':'['};
  const bracketColors = ['bracket1','bracket2','bracket3'];
  let bracketStack = [];
  let pos = 0;

  const keywords = /\b(function|if|else|end|for|do|then|return|break|in)\b/y;
  const specials = /\b(self|local|nil|true|false)\b/y;
  const operators = /\b(and|or|not|nor)\b|<=|>=|~=|==|[\+\-\*\/=:\.^<>]+|\.\.|,/y;
  const numberPattern = /\b(?:0[xX][0-9a-fA-F]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\b/y;
  const variablePattern = /\b[a-zA-Z_]\w*\b/y;
  const anyNumber = /[0-9]/;

  while (pos < code.length) {
    let m, match;
    const current = code.charCodeAt(pos);

    // comments
    if (code.startsWith('--', pos)) {
      const start = pos;
      let end = findMatchingBrackets(code, start+2)
      if (end === false) end = code.indexOf('\n', pos + 2);

      pos = end === -1 ? code.length : end;
      tokens.push({ type: 'comment', value: code.slice(start, pos) });
      continue;
    }

    // multiline strings
    let multilineString = findMatchingBrackets(code,pos)
    if (multilineString !== false) {
      const start = pos;
      pos = multilineString === -1 ? code.length : multilineString;
      tokens.push({ type: 'string', value: code.slice(start, pos) });
      continue;
    }

    // strings      ""                ''
    if (current === 34 || current === 39) {
      const quote = current;
      let start = pos;
      pos++;
      while (pos < code.length) {
        const char = code[pos];
        if (char === quote) {
          tokens.push({ type: 'string', value: code.slice(start, pos + 1) });
          pos++;
          break;
        } else if (char === '\\') {
          // push string before escape
          if (pos > start) tokens.push({ type: 'string', value: code.slice(start, pos) });
          // handle escape
          start = pos;
          pos++;
          if (pos < code.length) {
            tokens.push({ type: 'escape', value: code.slice(start, pos + 1) });
            start = pos + 1;
            pos++;
          }
        } else {
          pos++;
        }
      }
      // if not closed, push the rest
      if (pos >= code.length) {
        tokens.push({ type: 'string', value: code.slice(start, pos) });
      }
      continue;
    }

    // 5. Function calls before (
    m = /\b[a-zA-Z_]\w*(?=\()/y; m.lastIndex=pos;
    match = m.exec(code);
    if(match && match.index===pos){ tokens.push({type:'function', value:match[0]}); pos+=match[0].length; continue; }

    // 6. Methods before and after colon
    m = /([a-zA-Z_]\w*)(?=:)/y; m.lastIndex=pos;
    match = m.exec(code);
    if(match && match.index===pos){ tokens.push({type:'method', value:match[1]}); pos+=match[1].length; continue; }
    m = /(?<=:)([a-zA-Z_]\w*)/y; m.lastIndex=pos;
    match = m.exec(code);
    if(match && match.index===pos){ tokens.push({type:'method', value:match[1]}); pos+=match[1].length; continue; }

    // 7. Methods after dot
    m = /(?<=\.)[a-zA-Z_]\w*/y; m.lastIndex=pos;
    match = m.exec(code);
    if(match && match.index===pos){ tokens.push({type:'method', value:match[0]}); pos+=match[0].length; continue; }

    // 8. Numbers
    m = numberPattern; m.lastIndex=pos; match=m.exec(code);
    if(match && match.index===pos){ tokens.push({type:'number', value:match[0]}); pos+=match[0].length; continue; }

    // 9. Specials
    m = specials; m.lastIndex=pos; match=m.exec(code);
    if(match && match.index===pos){ tokens.push({type:'special', value:match[0]}); pos+=match[0].length; continue; }

    // 10. Operators
    m = operators; m.lastIndex=pos; match=m.exec(code);
    if(match && match.index===pos){ tokens.push({type:'operator', value:match[0]}); pos+=match[0].length; continue; }

    // 11. Keywords
    m = keywords; m.lastIndex=pos; match=m.exec(code);
    if(match && match.index===pos){ tokens.push({type:'keyword', value:match[0]}); pos+=match[0].length; continue; }

    // 12. Brackets
    m = /[\{\[\(]/y; m.lastIndex=pos; match=m.exec(code);
    if(match && match.index === pos){
            let colorIndex = bracketStack.length % 3;
            // store index of token in tokens array
            bracketStack.push({char: match[0], colorIndex, index: tokens.length});
            tokens.push({type: bracketColors[colorIndex], value: match[0]});
            pos += match[0].length;
            continue;
    }

    m = /[\}\]\)]/y; m.lastIndex=pos; match=m.exec(code);
    if(match && match.index === pos){
            if(bracketStack.length > 0){
                let top = bracketStack[bracketStack.length - 1];
                if(closingBrackets[match[0]] === top.char){
                    // use stored colorIndex
                    tokens.push({type: bracketColors[top.colorIndex], value: match[0]});
                    bracketStack.pop();
                } else {
                    tokens.push({type:'invalid', value: match[0]});
                }
            } else {
                // extra closing bracket with no match
                tokens.push({type:'invalid', value: match[0]});
            }
            pos += match[0].length;
            continue;
    }

    // 13. Variables
    m = variablePattern; m.lastIndex=pos; match=m.exec(code);
    if(match && match.index===pos){ tokens.push({type:'variable', value:match[0]}); pos+=match[0].length; continue; }

    // Fallback
    m = /\s+|./y; m.lastIndex=pos; match=m.exec(code); tokens.push({type:'other', value:match[0]}); pos+=match[0].length;
  }

  // mark unmatched brackets as invalid
  bracketStack.forEach(b => { tokens[b.index].type='invalid'; });

  // join tokens
  return tokens.map(t=>{
        // restore <, >, & in token values
        let val = t.value.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
        return t.type==='other' ? val : `<span class="${t.type}">${val}</span>`;
  }).join('');
}

function addLineNumbers(htmlCode, startLine = 1) {
    let lines = htmlCode.split('\n');
    if (lines.length > 0 && lines[lines.length - 1] === '') lines.pop();
    return lines.map((line, idx) => {
        return `<span class="lines">${startLine + idx}</span>${line}`;
    }).join('\n');
}

function extractAndRemoveArguments(htmlCode) {
    const args = Object.create(null);

    // quick pre-check (cheap optimization) in first 10 characters
    if (!htmlCode.slice(0, 20).includes('--@@')) return { code: htmlCode, args };

    const lines = htmlCode.split('\n');

    let lastIndex = -1;

    // search only first 10 lines
    for (let i = 0; i < Math.min(10, lines.length); i++) {
        let currentLine = lines[i].trimStart()
        if (!currentLine.startsWith('--@@')) continue;
        currentLine = currentLine.slice(4); // remove "--@@"
        lastIndex = i + 1;

        const separator = currentLine.indexOf(':');
        if (separator === -1) continue;

        const key = currentLine.slice(0, separator).trim();
        let value = currentLine.slice(separator + 1).trim();

        // basic value coercion
        if (value === 'true') value = true;
        else if (value === 'false') value = false;
        else if (!isNaN(value)) value = Number(value);

        args[key] = value;
    }

    // no arguments found
    if (lastIndex === -1) return { code: htmlCode, args };

    // remove lines
    lines.splice(0, lastIndex);

    return { code: lines.join('\n'), args };
}

function styleLuaCode(innerText){
    const { code: htmlCode, args } = extractAndRemoveArguments(innerText);
    return addLineNumbers(highlightLua(htmlCode), args["startLine"]);
}

document.querySelectorAll('div.language-lua div.highlight pre code').forEach(block => {
    block.innerHTML = styleLuaCode(block.innerText);
});
