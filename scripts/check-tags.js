const fs = require('fs');
const path = 'src/components/make-my-trip-form.tsx';
const s = fs.readFileSync(path, 'utf8');
const tags = ['div','form','section','label','select','button','span','input','article','header','main','footer'];
for(const t of tags){
  const open = (s.match(new RegExp('<'+t+'(\\s|>|\\b)','g'))||[]).length;
  const close = (s.match(new RegExp('</'+t+'>','g'))||[]).length;
  console.log(t, 'open', open, 'close', close);
}
const otherOpen = (s.match(/<[^\/!][a-zA-Z0-9:-]+/g)||[]).length;
const otherClose = (s.match(/<\\\/[^>]+>/g)||[]).length;
console.log('otherOpen',otherOpen,'otherClose',otherClose);
