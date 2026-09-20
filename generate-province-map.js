const fs=require('fs');

const source=JSON.parse(fs.readFileSync('drc-provinces.geojson','utf8'));
const names={
  'Upper Uele':'Haut-Uele','Lower Uele':'Bas-Uele','Kasai':'Kasaï','Central Kasai':'Kasaï-Central','Kasai-Oriental':'Kasaï-Oriental',
  'North Kivu':'Nord-Kivu','South Kivu':'Sud-Kivu','Kongo-Central':'Kongo-Central'
};
const canonical=name=>names[name]||name;
const all=[];
function visit(value){if(typeof value[0]==='number')all.push(value);else value.forEach(visit)}
source.features.forEach(feature=>visit(feature.geometry.coordinates));
const minLon=Math.min(...all.map(point=>point[0])),maxLon=Math.max(...all.map(point=>point[0]));
const minLat=Math.min(...all.map(point=>point[1])),maxLat=Math.max(...all.map(point=>point[1]));
const width=800,height=560,padding=24,scale=Math.min((width-padding*2)/(maxLon-minLon),(height-padding*2)/(maxLat-minLat));
const mapPoint=point=>[padding+(point[0]-minLon)*scale,padding+(maxLat-point[1])*scale];
function distance(point,start,end){const dx=end[0]-start[0],dy=end[1]-start[1];if(!dx&&!dy)return Math.hypot(point[0]-start[0],point[1]-start[1]);const t=Math.max(0,Math.min(1,((point[0]-start[0])*dx+(point[1]-start[1])*dy)/(dx*dx+dy*dy)));return Math.hypot(point[0]-(start[0]+t*dx),point[1]-(start[1]+t*dy))}
function simplify(points,tolerance=.9){if(points.length<4)return points;let max=0,index=0;for(let i=1;i<points.length-1;i++){const value=distance(points[i],points[0],points.at(-1));if(value>max){max=value;index=i}}if(max<=tolerance)return[points[0],points.at(-1)];const left=simplify(points.slice(0,index+1),tolerance),right=simplify(points.slice(index),tolerance);return left.slice(0,-1).concat(right)}
function rings(geometry){return geometry.type==='Polygon'?geometry.coordinates:geometry.coordinates.flat()}
function pathFor(feature){return rings(feature.geometry).map(ring=>{const points=simplify(ring.map(mapPoint));return`M${points.map(point=>`${point[0].toFixed(1)},${point[1].toFixed(1)}`).join('L')}Z`}).join('')}
function centroid(feature){const polygons=feature.geometry.type==='Polygon'?[feature.geometry.coordinates]:feature.geometry.coordinates;let best=polygons[0][0];for(const polygon of polygons)if(polygon[0].length>best.length)best=polygon[0];let area=0,x=0,y=0;for(let i=0;i<best.length-1;i++){const a=mapPoint(best[i]),b=mapPoint(best[i+1]),cross=a[0]*b[1]-b[0]*a[1];area+=cross;x+=(a[0]+b[0])*cross;y+=(a[1]+b[1])*cross}area*=.5;if(Math.abs(area)<1)return mapPoint(best[0]);return[x/(6*area),y/(6*area)]}
const provinces=source.features.map(feature=>{const center=centroid(feature);return{name:canonical(feature.properties.shapeName),d:pathFor(feature),x:Number(center[0].toFixed(1)),y:Number(center[1].toFixed(1))}}).sort((a,b)=>a.name.localeCompare(b.name,'fr'));
const output=`// Generated from geoBoundaries COD ADM1 (ODbL 1.0).\nwindow.drcProvinceBoundaries=${JSON.stringify(provinces)};\n`;
fs.writeFileSync('province-boundaries.js',output);
console.log(`Generated ${provinces.length} province boundaries (${Buffer.byteLength(output)} bytes).`);
