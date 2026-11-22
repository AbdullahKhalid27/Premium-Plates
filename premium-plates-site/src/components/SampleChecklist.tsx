"use client";
import { useState } from "react";
import { FileText, Download, Send } from "lucide-react";
import { ruleSources } from "@/config/plateRules";

const slots = [
  {id:"identity", title:"Name and address", copy:"A driving licence is one example. Use the fictional identity file below to practise this step."},
  {id:"entitlement", title:"Right to the registration", copy:"A V5C registration certificate or V778 retention document is an example. Use the fictional entitlement file below."}
] as const;
type Slot = typeof slots[number]["id"];
const sample = (id:Slot) => "/Premium-Plates/samples/"+id+".txt";

export default function SampleChecklist({order,onReceived}:{order:string;onReceived:(receipt:string)=>void}) {
  const [files,setFiles]=useState<Partial<Record<Slot,File>>>({});
  const [busy,setBusy]=useState(false),[error,setError]=useState("");
  async function send() {
    setBusy(true);setError("");
    try {
      const payload:Partial<Record<Slot,string>>={};
      for (const {id,title} of slots) {
        const file=files[id];
        if(!file || file.size>1024) throw new Error("Choose the downloadable sample for "+title.toLowerCase()+".");
        const response=await fetch(sample(id));
        if(!response.ok) throw new Error("The sample could not be loaded. Try again.");
        const content=await file.text();
        if(content!==await response.text()) throw new Error("Choose the original "+title.toLowerCase()+" sample. Personal files cannot be sent here.");
        payload[id]=content;
      }
      const response=await fetch("/Premium-Plates/api/sample-documents",{method:"POST",headers:{"Content-Type":"application/json","X-Preview-Order":order},body:JSON.stringify(payload)});
      if(!response.ok) throw new Error("The preview receiver is unavailable. Your selections are ready to retry.");
      const result=await response.json();
      if(typeof result.receipt!=="string" || !result.receipt) throw new Error("No receipt arrived. Please try again.");
      onReceived(result.receipt);
    } catch(e) {setError(e instanceof Error?e.message:"Transfer interrupted. Please retry.");}
    finally {setBusy(false);}
  }
  return <section className="evidence-area"><h2>Document checklist</h2>
    <p>Download each sample and attach it in the matching box. Use fictional files only.</p>
    <div className="document-pair">{slots.map(({id,title,copy},i)=><article key={id}>
      <div className="route-index"><span>DOCUMENT 0{i+1}</span><FileText aria-hidden="true"/></div>
      <h3>{title}</h3><p>{copy}</p><a download href={sample(id)}><Download size={16}/> Download sample (.txt)</a>
      <label htmlFor={"file-"+id}>Attach {title.toLowerCase()} sample</label>
      <input id={"file-"+id} type="file" accept=".txt,text/plain" disabled={busy} onChange={e=>{const file=e.target.files?.[0];setFiles(old=>({...old,[id]:file}));setError("");}}/>
    </article>)}</div>
    <p className="originals-note">For a road plate, the supplier must see accepted originals. <a href={ruleSources.evidence.url}>View the full GOV.UK list</a>.</p>
    {error&&<p role="alert">{error}</p>}
    <button disabled={busy||!files.identity||!files.entitlement} onClick={send}><Send size={16}/>{busy?"Sending samples…":"Send both documents"}</button>
  </section>;
}
