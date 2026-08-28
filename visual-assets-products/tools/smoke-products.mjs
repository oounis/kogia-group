#!/usr/bin/env node
import { createRequire } from "node:module";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
const root=resolve(dirname(fileURLToPath(import.meta.url)),"../..");
const require=createRequire(resolve(root,"community/package.json"));
const {chromium}=require("playwright");
const mime={".html":"text/html",".css":"text/css",".js":"text/javascript",".json":"application/json",".png":"image/png",".svg":"image/svg+xml"};
const server=createServer(async(req,res)=>{try{const u=decodeURIComponent(new URL(req.url,"http://x").pathname);const rel=(u.endsWith("/")?`${u}index.html`:u).replace(/^\//,"");const p=resolve(root,rel);if(!p.startsWith(`${root}/`))throw 0;const body=await readFile(p);res.writeHead(200,{"content-type":mime[extname(p)]||"application/octet-stream"});res.end(body)}catch{res.writeHead(404);res.end("not found")}});
await new Promise(ok=>server.listen(0,"127.0.0.1",ok));const port=server.address().port;
try{
 const browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];
 page.on("console",m=>{if(m.type()==="error")errors.push(m.text())});page.on("pageerror",e=>errors.push(e.message));page.on("requestfailed",r=>errors.push(`failed ${r.url()}`));
 await page.goto(`http://127.0.0.1:${port}/visual-assets/gallery/`,{waitUntil:"networkidle"});
 if(await page.evaluate(()=>document.querySelector("#faz3a-review").children.length+document.querySelector("#group-review").children.length))throw new Error("product reviews mounted eagerly");
 await page.click('[data-mode="faz3a"]');await page.locator(".fz-impact-layout").waitFor();await page.waitForFunction(()=>[...document.querySelectorAll("#faz3a-review img")].every(x=>x.complete));
 const f=await page.evaluate(()=>({sections:document.querySelectorAll("#faz3a-review>section").length,phones:document.querySelectorAll(".fz-device").length,images:[...document.querySelectorAll("#faz3a-review img")].filter(x=>!x.naturalWidth).length,svg:[...document.querySelectorAll("#faz3a-review svg")].every(x=>x.getBBox().width>0)}));
 if(JSON.stringify(f)!==JSON.stringify({sections:18,phones:5,images:0,svg:true}))throw new Error(`Faz3a ${JSON.stringify(f)}`);await page.locator(".fz-impact-layout").screenshot({path:"/tmp/faz3a-product-desktop.png"});
 await page.click('[data-mode="group"]');await page.locator(".kgp-layouts").waitFor();await page.waitForFunction(()=>[...document.querySelectorAll("#group-review img")].every(x=>x.complete));
 const g=await page.evaluate(()=>({sections:document.querySelectorAll("#group-review>section").length,layouts:document.querySelectorAll(".kgp-layouts>div").length,images:[...document.querySelectorAll("#group-review img")].filter(x=>!x.naturalWidth).length,svg:[...document.querySelectorAll("#group-review svg")].every(x=>x.getBBox().width>0)}));
 if(JSON.stringify(g)!==JSON.stringify({sections:18,layouts:4,images:0,svg:true}))throw new Error(`Group ${JSON.stringify(g)}`);await page.locator(".kgp-layouts>div").first().screenshot({path:"/tmp/kogiagroup-product-desktop.png"});
 await page.setViewportSize({width:390,height:844});await page.reload({waitUntil:"networkidle"});
 for(const mode of ["faz3a","group"]){await page.click(`[data-mode="${mode}"]`);await page.locator(mode==="faz3a"?".fz-device":".kgp-page").first().waitFor();const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth+1);if(overflow)throw new Error(`${mode} mobile overflow`);await page.locator(mode==="faz3a"?".fz-device":".kgp-page").first().screenshot({path:`/tmp/${mode}-product-mobile.png`})}
 await browser.close();if(errors.length)throw new Error(errors.join(" | "));console.log(`Product reviews green: Faz3a ${f.sections} sections / ${f.phones} phone flows; KogiaGroup ${g.sections} sections / ${g.layouts} layouts; desktop and 390px mobile clean.`)
}finally{await new Promise(ok=>server.close(ok))}
