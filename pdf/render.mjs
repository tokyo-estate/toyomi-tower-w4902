import { chromium } from '/Users/leetenki/AI_share/_tools/node_modules/playwright/index.mjs';
import fs from 'fs';
const html=process.argv[2], outdir=process.argv[3];
const tr=JSON.parse(fs.readFileSync('/Users/leetenki/AI_share/在庫_販売物件/003_販売サイト/_豊海タワー_i18n/translations.json','utf8'));
const dic={en:{},zh:{}};
for(const [k,v] of Object.entries(tr)){ if(k.startsWith('t')){dic.en[k]=v[0];dic.zh[k]=v[1];} }
let i=1; for(const [ja,v] of Object.entries(tr._extra)){ const id='x'+String(i++).padStart(3,'0'); dic.en[id]=v[0]; dic.zh[id]=v[1]; }
const repl=process.argv[4]?JSON.parse(fs.readFileSync(process.argv[4],'utf8')):[];
for(const l of ['en','zh']) for(const k of Object.keys(dic[l])) for(const [o,n] of repl){ dic[l][k]=dic[l][k].split(o).join(n); }
const b=await chromium.launch({channel:'chrome'});
for(const lang of ['ja','en','zh']){
  const p=await b.newPage({viewport:{width:794,height:1123}});
  await p.goto('file://'+html,{waitUntil:'networkidle'});
  await p.evaluate(([d,l])=>window.applyLang(d,l),[dic,lang]);
  await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(800);
  const over=await p.evaluate(()=>[...document.querySelectorAll('.page')].map((pg,i)=>{const r=pg.getBoundingClientRect();const f=pg.querySelector('.foot');const limit=f?f.getBoundingClientRect().top-4:r.bottom;let max=0;pg.querySelectorAll('*').forEach(e=>{if(e.closest('.foot')||e.closest('.bg'))return;const er=e.getBoundingClientRect();if(er.bottom>max)max=er.bottom;});return {page:i+1,over:Math.round(max-limit)};}).filter(x=>x.over>0));
  console.log(lang,'overflow pages:',JSON.stringify(over));
  await p.pdf({path:`${outdir}/W4416_${lang}.pdf`,format:'A4',printBackground:true,preferCSSPageSize:true,margin:{top:0,right:0,bottom:0,left:0}});
  await p.close();
}
await b.close();
