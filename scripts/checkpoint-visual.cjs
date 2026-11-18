const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const playwright = process.env.PLAYWRIGHT_PATH || "playwright";
const { chromium } = require(playwright);
const base = process.env.PREVIEW_URL || "http://127.0.0.1:4185/Premium-Plates/";
const output = path.resolve(__dirname, "../docs/evidence/f5");
async function run() {
  const browser = await chromium.launch({ executablePath: process.env.BROWSER_PATH, headless: true });
  const findings = [];
  fs.mkdirSync(output, { recursive:true });
  try {
    for (const width of [390,1440]) {
      const page = await browser.newPage({ viewport:{width,height:900}, reducedMotion:"reduce" });
      page.on("pageerror", e => findings.push(e.message));
      page.on("response", r => { if(r.status() >= 400 && r.url().startsWith(base)) findings.push(r.status()+" "+r.url()); });
      for(const route of ["","collection/","collection/motorcycle/","collection/show/"]) {
        const response = await page.goto(base+route);
        assert.equal(response.status(),200);
        await page.evaluate(()=>document.fonts.ready);
        const parts = route ? page.locator("main") : page.locator("main > section, main > div > section");
        let sequence = 0; for(const part of await parts.all()) {
          if(!await part.isVisible()) continue;
          const name = (await part.getAttribute("id")) || route.replaceAll("/","-") || "home";
          await part.scrollIntoViewIfNeeded();
          await part.screenshot({path:path.join(output,width+"-"+(++sequence)+"-"+name+".jpg"), type:"jpeg",quality:78,timeout:25000});
        }
        if(await page.evaluate(()=>document.documentElement.scrollWidth > innerWidth+1)) findings.push(width+" overflow "+route);
      }
      await page.close();
    }
  } finally {await browser.close();}
  assert.deepEqual(findings,[]);
}
run().catch(e=>{ console.error(e); process.exitCode=1; });
