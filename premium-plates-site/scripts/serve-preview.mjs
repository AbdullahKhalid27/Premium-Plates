// Local-only receiver. Only the two public training fixtures can be persisted.
import http from "node:http";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {readFile, stat, mkdir, writeFile} from "node:fs/promises";
import {createReadStream} from "node:fs";
import {tmpdir} from "node:os";
import {createHash} from "node:crypto";

const root=fileURLToPath(new URL("../out/",import.meta.url));
const port=Number(process.env.PLATE_PREVIEW_PORT || 4192);
const base="/Premium-Plates/";
const types={".html":"text/html; charset=utf-8",".js":"text/javascript",".css":"text/css",".svg":"image/svg+xml",".webp":"image/webp",".jpg":"image/jpeg",".png":"image/png",".woff2":"font/woff2",".txt":"text/plain; charset=utf-8",".ico":"image/x-icon"};
const slots=["identity","entitlement"];
const server=http.createServer(async(req,res)=>{
  const fail=code=>{res.writeHead(code);res.end();};
  try {
    if(req.method==="GET" && req.url===base+"api/sample-documents") {
      res.writeHead(200,{"Content-Type":"application/json","Cache-Control":"no-store"});
      return res.end(JSON.stringify({acceptsSamples:true}));
    }
    if(req.method==="POST" && req.url===base+"api/sample-documents") {
      if(req.headers.origin && req.headers.origin!=="http://127.0.0.1:"+port) return fail(403);
      if(req.headers["content-type"]!=="application/json") return fail(415);
      const order=req.headers["x-preview-order"];
      if(typeof order!=="string" || !/^[\da-f-]{36}$/i.test(order)) return fail(400);
      const chunks=[];let size=0;
      for await(const chunk of req){size+=chunk.length;if(size>4096)return fail(413);chunks.push(chunk);}
      let files;
      try{files=JSON.parse(Buffer.concat(chunks).toString());}catch{return fail(400);}
      for(const id of slots){
        if(files?.[id]!==await readFile(path.join(root,"samples",id+".txt"),"utf8")) return fail(422);
      }
      const receipt=createHash("sha256").update(order).digest("hex").slice(0,16);
      const dir=path.join(tmpdir(),"nightmark-sample-receipts");
      await mkdir(dir,{recursive:true});
      try {await writeFile(path.join(dir,receipt+".json"),JSON.stringify({identity:files.identity,entitlement:files.entitlement}),{flag:"wx"});}
      catch(error){if(error.code!=="EEXIST")throw error;}
      res.writeHead(200,{"Content-Type":"application/json","Cache-Control":"no-store"});return res.end(JSON.stringify({receipt}));
    }
    if(!["GET","HEAD"].includes(req.method)) return fail(405);
    const pathname=decodeURIComponent(new URL(req.url,"http://localhost").pathname);
    if(!pathname.startsWith(base))return fail(404);
    const relative=pathname.slice(base.length);
    if(relative.includes("\\")||relative.split("/").includes("..")||relative.includes(":"))return fail(400);
    let file=path.join(root,relative);
    if((await stat(file)).isDirectory())file=path.join(file,"index.html");
    const info=await stat(file);
    res.writeHead(200,{"Content-Type":types[path.extname(file)]||"application/octet-stream","Content-Length":info.size});
    if(req.method==="HEAD")return res.end();
    createReadStream(file).on("error",()=>res.destroy()).pipe(res);
  }catch{if(!res.headersSent)fail(404);else res.destroy();}
});
server.listen(port,"127.0.0.1",()=>console.log("Preview ready on port "+port));
