const {chromium}=require(process.env.PLAYWRIGHT_PATH || 'playwright');
const assert=require('node:assert/strict'),path=require('node:path');
(async()=>{const b=await chromium.launch({executablePath:process.env.BROWSER_PATH,headless:true});try{for(const width of [390,1440]){
const p=await b.newPage({viewport:{width,height:900},reducedMotion:'reduce'});p.setDefaultTimeout(8000);
const click=name=>p.getByRole('button',{name,exact:true}).first().click();
const shot=name=>p.screenshot({path:path.resolve('docs/evidence/f5/'+width+'-'+name+'.jpg'),type:'jpeg',quality:80});
await p.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4192/Premium-Plates/');await p.locator('#hero-reg').fill('AB12 CDE');
await p.getByRole('button',{name:/Add to bag/}).first().click();await click('Edit design');await p.locator('#hero-reg').fill('AB13 CDE');await p.getByRole('button',{name:/Add to bag/}).first().click();await p.keyboard.press('Escape');await p.locator('#hero-reg').fill('XY14 ZZZ');await p.getByRole('button',{name:/Add to bag/}).first().click();assert.equal(await p.locator('.order-bag article').count(),2);await click('Increase quantity for XY14 ZZZ');await shot('bag');
await p.getByRole('link',{name:'Continue to checkout'}).click();await p.getByRole('heading',{name:'Document checklist'}).waitFor();
assert(await p.getByRole('button',{name:'Send both documents'}).isDisabled());
await shot('verification');
for(const slot of ['identity','entitlement']){
  await p.locator('#file-'+slot+':enabled').waitFor();
  await p.locator('#file-'+slot).setInputFiles(path.join(__dirname,'../premium-plates-site/public/samples',slot+'.txt'));
}
await p.route('**/api/sample-documents', async route => {
  await route.fulfill({status:503});
}, {times:1});
await click('Send both documents');
await p.getByRole('alert').filter({hasText:'ready to retry'}).waitFor();
await click('Send both documents');
await p.getByRole('heading',{name:'Submission receipt'}).waitFor();
await p.reload();
await p.getByRole('heading',{name:'Submission receipt'}).waitFor();
assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
await p.route('**/api/sample-documents', route => route.fulfill({status:404}));
await p.goto(new URL('checkout/?sample=1',process.env.PREVIEW_URL || 'http://127.0.0.1:4192/Premium-Plates/').href);
await p.evaluate(()=>sessionStorage.clear());
await p.reload();
await p.getByRole('status').filter({hasText:'Samples are available to download'}).waitFor();
assert(await p.locator('#file-identity').isDisabled());
assert(await p.getByRole('button',{name:'Send both documents'}).isDisabled());
await p.close();console.log('PASS customer workflow '+width);}
}finally{await b.close()}})().catch(e=>{console.error(e);process.exitCode=1;});
