const http=require('http');
const fs=require('fs');
const path=require('path');
const root=__dirname;
const port=Number(process.env.PORT||8080);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.webmanifest':'application/manifest+json; charset=utf-8','.svg':'image/svg+xml'};
http.createServer((request,response)=>{
  const pathname=decodeURIComponent(new URL(request.url,'http://localhost').pathname);const relative=pathname==='/'?'index.html':pathname.replace(/^\/+/,''),file=path.resolve(root,relative);
  if(!file.startsWith(root+path.sep)){response.writeHead(403);return response.end('Forbidden')}
  fs.stat(file,(error,stat)=>{if(error||!stat.isFile()){response.writeHead(404);return response.end('Not found')}response.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});fs.createReadStream(file).pipe(response)});
}).listen(port,'127.0.0.1',()=>console.log(`Mboka is running at http://localhost:${port}`));
