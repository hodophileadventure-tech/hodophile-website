const fs = require('fs');
const s = fs.readFileSync('src/components/make-my-trip-form.tsx','utf8');
const tagRegex = /<\/?([a-zA-Z0-9:-]+)([^>]*)>/g;
const selfClosing = new Set(['input','img','br','hr','meta','link','source']);
let match; const stack = [];
while((match = tagRegex.exec(s)) !== null){
  const full = match[0]; const name = match[1];
  const isClose = full.startsWith('</');
  const isSelf = /\/\s*>$/.test(full) || selfClosing.has(name.toLowerCase());
  if(isSelf) continue;
  if(!isClose){ stack.push({name, index: match.index}); }
  else{
    // pop until matching name found
    let popped = null;
    while(stack.length>0){ popped = stack.pop(); if(popped.name===name) break; }
    if(!popped || popped.name!==name){ console.log('Unmatched closing tag', name, 'at', match.index); }
  }
}
if(stack.length>0){ console.log('Unclosed tags (from first to last):'); stack.forEach(s=>console.log(s.name, 'at', s.index)); } else { console.log('All tags matched (approx).'); }
