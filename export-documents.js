const fs=require('fs');
const path=require('path');

const output=path.join(__dirname,'documents');
fs.mkdirSync(output,{recursive:true});
const escape=value=>value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function inline(value){
  return escape(value)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2">$1</a>')
    .replace(/&lt;(https?:\/\/[^&]+)&gt;/g,'<a href="$1">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>')
    .replace(/  $/,'<br>');
}
function markdown(value){
  const lines=value.replace(/\r/g,'').split('\n'),out=[];let paragraph=[],list=null;
  const flushParagraph=()=>{if(paragraph.length){out.push(`<p>${paragraph.map(inline).join(' ')}</p>`);paragraph=[]}};
  const closeList=()=>{if(list){out.push(`</${list}>`);list=null}};
  for(let i=0;i<lines.length;i++){
    const line=lines[i];
    if(/^\|.+\|$/.test(line)&&/^\|[ :|-]+\|$/.test(lines[i+1]||'')){
      flushParagraph();closeList();const headers=line.split('|').slice(1,-1).map(cell=>cell.trim());i+=2;const rows=[];while(i<lines.length&&/^\|.+\|$/.test(lines[i])){rows.push(lines[i].split('|').slice(1,-1).map(cell=>cell.trim()));i++}i--;out.push(`<table><thead><tr>${headers.map(cell=>`<th>${inline(cell)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(cell=>`<td>${inline(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table>`);continue;
    }
    const heading=line.match(/^(#{1,3})\s+(.+)$/);if(heading){flushParagraph();closeList();const level=heading[1].length;out.push(`<h${level}>${inline(heading[2])}</h${level}>`);continue}
    const bullet=line.match(/^[-*]\s+(.+)$/),number=line.match(/^\d+\.\s+(.+)$/);if(bullet||number){flushParagraph();const type=number?'ol':'ul';if(list!==type){closeList();list=type;out.push(`<${type}>`)}out.push(`<li>${inline((bullet||number)[1])}</li>`);continue}
    if(!line.trim()){flushParagraph();closeList();continue}
    paragraph.push(line.trim());
  }
  flushParagraph();closeList();return out.join('\n');
}
const css=`@page{size:A4;margin:17mm 16mm 18mm}*{box-sizing:border-box}body{font:10.5pt/1.48 Arial,sans-serif;color:#17342d;margin:0}h1,h2,h3{font-family:Arial,sans-serif;color:#0b5d46;break-after:avoid}h1{font-size:24pt;line-height:1.1;border-bottom:4px solid #e6b84e;padding-bottom:8mm;margin:0 0 8mm}h2{font-size:15pt;margin:8mm 0 3mm;border-bottom:1px solid #c9d8d2;padding-bottom:2mm}h3{font-size:11.5pt;margin:5mm 0 2mm}p{margin:0 0 3mm}ul,ol{margin:0 0 4mm;padding-left:6mm}li{margin:0 0 1.5mm}table{width:100%;border-collapse:collapse;margin:3mm 0 6mm;font-size:8.7pt;break-inside:auto}thead{display:table-header-group}tr{break-inside:avoid}th{background:#0b5d46;color:white;text-align:left}th,td{border:1px solid #bdcbc6;padding:2.2mm;vertical-align:top}tbody tr:nth-child(even){background:#f1f5f2}td:last-child,th:last-child{text-align:right}a{color:#0b5d46;text-decoration:none}strong{color:#102f27}body:after{content:'Mboka · IT-Weor AB · septembre 2026';position:fixed;bottom:-11mm;left:0;font-size:8pt;color:#688078}`;
for(const [source,target,title] of [
  ['NOTE_CONCEPTUELLE.md','NOTE_CONCEPTUELLE_Mboka.html','Note conceptuelle Mboka'],
  ['BUDGET_PILOTE.md','BUDGET_PILOTE_Mboka.html','Budget pilote Mboka']
]){
  const body=markdown(fs.readFileSync(path.join(__dirname,source),'utf8'));
  fs.writeFileSync(path.join(output,target),`<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${title}</title><style>${css}</style></head><body>${body}</body></html>`);
  console.log(`Prepared ${target}`);
}
