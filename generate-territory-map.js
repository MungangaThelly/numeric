const fs=require('fs');
const catalog=require('./territory-catalog');
const source=JSON.parse(fs.readFileSync('drc-adm2.geojson','utf8'));

const aliases={
  'kabeyakamwanga':'Kabeya Kamuanga','kanyama':'Kaniama','makanza':'Mankanza',
  'mambasa':'Mambassa','moanda':'Muanda','ngandajika':'Gandajika','nyiragongo':'Nyrirangongo'
};
const clean=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/gi,'').toLowerCase();
const wanted=Object.entries(catalog).flatMap(([province,names])=>names.map(name=>({name,province})));
if(wanted.length!==145)throw new Error(`Le catalogue doit contenir 145 territoires, pas ${wanted.length}.`);
const features=new Map(source.features.map(feature=>[clean(feature.properties.shapeName),feature]));
const resolve=name=>features.get(clean(name))||features.get(clean(aliases[clean(name)]||''));

const points=[];
function visit(value){if(typeof value[0]==='number')points.push(value);else value.forEach(visit)}
source.features.forEach(feature=>visit(feature.geometry.coordinates));
const minLon=Math.min(...points.map(point=>point[0])),maxLon=Math.max(...points.map(point=>point[0]));
const minLat=Math.min(...points.map(point=>point[1])),maxLat=Math.max(...points.map(point=>point[1]));
const width=800,height=560,padding=24,scale=Math.min((width-padding*2)/(maxLon-minLon),(height-padding*2)/(maxLat-minLat));
const mapPoint=point=>[padding+(point[0]-minLon)*scale,padding+(maxLat-point[1])*scale];
function distance(point,start,end){const dx=end[0]-start[0],dy=end[1]-start[1];if(!dx&&!dy)return Math.hypot(point[0]-start[0],point[1]-start[1]);const t=Math.max(0,Math.min(1,((point[0]-start[0])*dx+(point[1]-start[1])*dy)/(dx*dx+dy*dy)));return Math.hypot(point[0]-(start[0]+t*dx),point[1]-(start[1]+t*dy))}
function simplify(items,tolerance=1.05){if(items.length<4)return items;let max=0,index=0;for(let i=1;i<items.length-1;i++){const value=distance(items[i],items[0],items.at(-1));if(value>max){max=value;index=i}}if(max<=tolerance)return[items[0],items.at(-1)];const left=simplify(items.slice(0,index+1),tolerance),right=simplify(items.slice(index),tolerance);return left.slice(0,-1).concat(right)}
const rings=geometry=>geometry.type==='Polygon'?geometry.coordinates:geometry.coordinates.flat();
const pathFor=feature=>rings(feature.geometry).map(ring=>{const projected=simplify(ring.map(mapPoint));return`M${projected.map(point=>`${point[0].toFixed(1)},${point[1].toFixed(1)}`).join('L')}Z`}).join('');

const missing=wanted.filter(item=>!resolve(item.name));
if(missing.length)throw new Error(`Géométries introuvables : ${missing.map(item=>item.name).join(', ')}`);
const territories=wanted.map(item=>({...item,d:pathFor(resolve(item.name))}));
const output=`// Generated from geoBoundaries COD ADM2; territory catalogue cross-checked against CAID/PDL-145T.\nwindow.drcTerritoryBoundaries=${JSON.stringify(territories)};\n`;
fs.writeFileSync('territory-boundaries.js',output);
console.log(`Generated ${territories.length} territory boundaries (${Buffer.byteLength(output)} bytes).`);
