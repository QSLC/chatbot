"use client";

import { useMemo, useState } from "react";

const providers = [
  ["GitHub", "VERIFIED", "QSLC/Sovereign source continuity"],
  ["Azure", "BLOCKED", "Restore subscription, then verify OIDC"],
  ["Base44", "DEGRADED", "Free-tier builder only; sandbox bridge premium-gated"],
  ["Stripe", "TEST MODE", "Authenticated QSLC test account; no live products verified"],
  ["Outlook", "CONNECTED", "Direct-provider evidence source"],
  ["SharePoint", "CONNECTED", "All Company document library verified"],
];

const matrix = [
  { q: "Q1", title: "Do now", tone: "danger", items: ["Restore Azure subscription through Microsoft billing", "Preserve QSLC/Sovereign canonical source", "Finish public site + Stripe test checkout architecture"] },
  { q: "Q2", title: "Build next", tone: "warn", items: ["Verify Entra OIDC subject after Azure restoration", "Connect customer/contact sources with authenticated consent", "Organize customer/site/evidence folders in SharePoint"] },
  { q: "Q3", title: "Watch", tone: "cyan", items: ["Paychex Royce Rowley meeting material", "GitHub billing/restriction notices", "Base44 plan/credit availability"] },
  { q: "Q4", title: "Maintain", tone: "good", items: ["Local EVE source continuity", "Evidence timestamps and source badges", "No secrets in client UI"] },
];

function statusClass(s: string) {
  if (s.includes("BLOCK") || s.includes("DEGRADED")) return "bad";
  if (s.includes("TEST") || s.includes("PENDING")) return "warn";
  return "good";
}

export default function SovereignPage() {
  const [tab, setTab] = useState("overview");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{ role: "eve", text: "EVE-HEI online. Ask about money, blockers, deploy, Stripe, Paychex, or local runtime." }]);
  const [formula, setFormula] = useState("75*40");

  const calc = useMemo(() => {
    try {
      if (!/^[0-9+\-*/().\s]+$/.test(formula)) return 0;
      // arithmetic-only expression after strict character allowlist
      // eslint-disable-next-line no-new-func
      return Number(Function(`"use strict"; return (${formula})`)()) || 0;
    } catch { return 0; }
  }, [formula]);

  const points = useMemo(() => {
    const seed = Math.max(1, Math.abs(calc));
    return Array.from({ length: 24 }, (_, i) => {
      const x = 8 + i * 4;
      const y = 52 - Math.min(42, (Math.sin(i / 2.5) * 8 + Math.log10(seed + 1) * 9 + i * .6));
      return `${x},${y}`;
    }).join(" ");
  }, [calc]);

  function askEve() {
    const text = input.trim();
    if (!text) return;
    const l = text.toLowerCase();
    let answer = "I can surface verified state, but I will not invent a provider connection or expose a credential.";
    if (l.includes("money")) answer = "Connected account snapshot currently shows $1.01 total across the verified Bluevine business checking and Chime savings accounts represented in the finance feed. Reconcile Stripe separately because the connected Stripe session is test mode.";
    else if (l.includes("azure") || l.includes("deploy")) answer = "Azure production remains a separate blocker: restore the subscription first, then verify the existing AADSTS700213 OIDC incident before rerunning production.";
    else if (l.includes("stripe")) answer = "Stripe integration is staged in test mode. No live Stripe account or live product is authenticated yet, so customer charges must not be presented as live.";
    else if (l.includes("base44")) answer = "Base44 is degraded by plan access. The dashboard should continue on this Vercel route while Base44 remains premium-gated.";
    else if (l.includes("paychex")) answer = "Paychex stays on evidence watch for the August 21 Royce Rowley meeting recap, recording, screenshots, and attachments.";
    else if (l.includes("local") || l.includes("runtime")) answer = "Local EVE source continuity is tracked independently from Azure production health.";
    setMessages((m) => [...m, { role: "you", text }, { role: "eve", text: answer }]);
    setInput("");
  }

  return (
    <main className="qslc-root">
      <div className="stars" />
      <header className="hero">
        <div>
          <div className="eyebrow">QUANTUM SOVEREIGN LOGISTICS CORP</div>
          <h1>EVE-HEI <span>Sovereign Command</span></h1>
          <p>iPhone-first live control surface · provider evidence · Priority Matrix · calculator metrics · EVE chat</p>
        </div>
        <div className="brain" aria-label="EVE neural core"><div className="brain-core">EVE</div></div>
      </header>

      <nav className="tabs">
        {["overview","matrix","brain","finance","customers","evidence"].map((t) => <button key={t} onClick={() => setTab(t)} className={tab===t?"active":""}>{t}</button>)}
      </nav>

      {tab === "overview" && <section className="grid cards">
        {providers.map(([name,status,note]) => <article className="card" key={name}><div className="row"><h3>{name}</h3><span className={`pill ${statusClass(status)}`}>{status}</span></div><p>{note}</p></article>)}
        <article className="card span2"><h3>Quick links</h3><div className="links"><a href="https://github.com/QSLC/Sovereign" target="_blank">Canonical GitHub</a><a href="https://github.com/QSLC/Sovereign/issues/31" target="_blank">Azure incident #31</a><a href="https://app.base44.com/apps/6a82c1b24b38de95a1104b23/editor/preview" target="_blank">Base44 editor</a></div></article>
      </section>}

      {tab === "matrix" && <section className="matrix">{matrix.map((m) => <article className={`quad ${m.tone}`} key={m.q}><div className="eyebrow">{m.q}</div><h2>{m.title}</h2>{m.items.map((x)=><div className="task" key={x}>{x}</div>)}</article>)}</section>}

      {tab === "brain" && <section className="grid brain-grid">
        <article className="card"><h2>Neural metric calculator</h2><input className="calc" value={formula} onChange={(e)=>setFormula(e.target.value)} inputMode="decimal"/><div className="calc-value">{calc.toLocaleString()}</div><svg className="graph" viewBox="0 0 105 60"><defs><linearGradient id="g" x1="0" x2="1"><stop stopColor="#31e7ff"/><stop offset="1" stopColor="#c05cff"/></linearGradient></defs><polyline points={points} fill="none" stroke="url(#g)" strokeWidth="2"/><line x1="5" y1="54" x2="100" y2="54" stroke="#1c6280"/></svg><p className="muted">Fast local arithmetic visualization. Provider metrics should be injected server-side only after authentication.</p></article>
        <article className="card eve-chat"><h2>EVE chat</h2><div className="chatlog">{messages.slice(-8).map((m,i)=><div key={i} className={`msg ${m.role}`}>{m.text}</div>)}</div><div className="chatbox"><input value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=>e.key==="Enter"&&askEve()} placeholder="Ask EVE…"/><button onClick={askEve}>Send</button></div></article>
      </section>}

      {tab === "finance" && <section className="grid cards"><article className="card"><div className="eyebrow">VERIFIED CONNECTED SNAPSHOT</div><div className="money">$1.01</div><p>Bluevine business checking $0.97 + Chime savings $0.04. Stripe test-mode balances are not business cash.</p></article><article className="card"><h3>Stripe build state</h3><span className="pill warn">TEST MODE</span><p>Checkout architecture can be built and tested now. Live charging waits for an authenticated live Stripe account and verified products/prices.</p></article></section>}

      {tab === "customers" && <section className="grid cards"><article className="card span2"><h2>Customer intelligence lanes</h2><div className="customer-grid"><div><b>Contacts</b><span>Google / Outlook</span></div><div><b>CRM leads</b><span>LinkedIn only after OAuth consent</span></div><div><b>Stripe customers</b><span>Test mode currently</span></div><div><b>SharePoint dossiers</b><span>Controlled folders + evidence</span></div></div><p className="muted">No contact is promoted to “customer” merely because it exists in an address book.</p></article></section>}

      {tab === "evidence" && <section className="grid cards"><article className="card"><h3>Local EVE</h3><p>Keep source continuity and Windows runtime evidence separate from Azure production state.</p></article><article className="card"><h3>Paychex</h3><p>Watch direct Outlook/SharePoint material for Royce Rowley August 21 recap, Webex, screenshots, attachments, payroll/recovery/401(k)/banking changes.</p></article><article className="card"><h3>Visual standard</h3><p>Neon cyan/violet dimensional HUD, rich cards, evidence thumbnails, motion, and clear provider-state badges.</p></article></section>}

      <footer>QSLC · EVE-HEI · no passwords, API keys, OAuth tokens, or recovery secrets rendered client-side</footer>
      <style jsx global>{`
        :root{color-scheme:dark} body{margin:0;background:#02050b}.qslc-root{min-height:100dvh;overflow:hidden;color:#eaf8ff;background:radial-gradient(circle at 70% 0%,#33105d77,transparent 30%),radial-gradient(circle at 10% 25%,#043d5c66,transparent 35%),#02050b;font-family:Inter,ui-sans-serif,system-ui;position:relative}.stars{position:fixed;inset:0;pointer-events:none;opacity:.38;background-image:radial-gradient(#58e8ff 1px,transparent 1px),radial-gradient(#b65cff 1px,transparent 1px);background-size:46px 46px,71px 71px;background-position:0 0,19px 21px;animation:drift 24s linear infinite}.hero{position:relative;z-index:2;display:flex;align-items:center;justify-content:space-between;gap:24px;padding:28px clamp(16px,4vw,56px) 18px;border-bottom:1px solid #23cfff33;background:#030711cc;backdrop-filter:blur(16px)}.hero h1{font-size:clamp(34px,7vw,76px);line-height:.93;margin:6px 0 10px;letter-spacing:-.045em;text-shadow:0 0 24px #22cfff66}.hero h1 span{display:block;color:#b965ff}.hero p,.muted{color:#8ba9b8}.eyebrow{font-size:11px;letter-spacing:.18em;color:#45dcff;font-weight:800}.brain{width:150px;height:150px;min-width:150px;border-radius:50%;display:grid;place-items:center;background:conic-gradient(from 0deg,#18e4ff,#8f4dff,#ff4fcf,#18e4ff);box-shadow:0 0 50px #644cff99;animation:pulse 3s ease-in-out infinite}.brain:before{content:"";position:absolute;width:124px;height:124px;border-radius:50%;background:radial-gradient(circle,#1c2347,#030610 62%);border:1px solid #75efff}.brain-core{z-index:2;font-weight:900;font-size:28px;letter-spacing:.15em}.tabs{position:sticky;top:0;z-index:5;display:flex;gap:8px;overflow:auto;padding:10px clamp(12px,4vw,56px);background:#030711e8;border-bottom:1px solid #23cfff26;backdrop-filter:blur(16px)}.tabs button{border:1px solid #1f4d64;background:#07111b;color:#8aa6b5;padding:10px 14px;border-radius:12px;text-transform:capitalize;white-space:nowrap}.tabs button.active{color:#fff;border-color:#28dfff;box-shadow:0 0 16px #28dfff33}.grid,.matrix{position:relative;z-index:2;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;padding:18px clamp(12px,4vw,56px)}.cards{grid-template-columns:repeat(3,minmax(0,1fr))}.card,.quad{background:linear-gradient(180deg,#091322e8,#050b15e8);border:1px solid #20bce933;border-radius:18px;padding:18px;box-shadow:inset 0 0 30px #0a5d7a16,0 12px 40px #0008}.card h2,.card h3,.quad h2{margin:0 0 10px}.row{display:flex;align-items:center;justify-content:space-between;gap:10px}.pill{font-size:10px;letter-spacing:.08em;font-weight:900;border-radius:999px;padding:6px 8px;border:1px solid}.pill.good{color:#59ffad;border-color:#59ffad66}.pill.warn{color:#ffd265;border-color:#ffd26566}.pill.bad{color:#ff6388;border-color:#ff638866}.span2{grid-column:span 2}.links{display:flex;gap:9px;flex-wrap:wrap}.links a,.chatbox button{color:#fff;text-decoration:none;border:1px solid #27d8ff55;background:#0a1a29;padding:10px 12px;border-radius:10px}.matrix{grid-template-columns:repeat(2,minmax(0,1fr))}.quad.danger{border-color:#ff537455}.quad.warn{border-color:#ffd15d55}.quad.cyan{border-color:#34dcff55}.quad.good{border-color:#4dffa055}.task{margin-top:9px;padding:10px;border-radius:10px;background:#ffffff08;border-left:3px solid #33dcff}.brain-grid{grid-template-columns:1fr 1fr}.calc{width:100%;background:#020711;border:1px solid #255f78;border-radius:12px;padding:14px;color:#fff;font-size:20px}.calc-value{font-size:44px;font-weight:900;color:#71efff;margin:12px 0}.graph{width:100%;height:180px;background:linear-gradient(180deg,#051322,#02050b);border-radius:14px;border:1px solid #1f7fa355}.eve-chat{min-height:430px}.chatlog{display:flex;flex-direction:column;gap:8px;min-height:300px;max-height:360px;overflow:auto}.msg{padding:10px 12px;border-radius:12px;max-width:88%;font-size:13px;line-height:1.5}.msg.eve{background:#112349;border:1px solid #7c5cff55}.msg.you{align-self:flex-end;background:#093749;border:1px solid #39dfff55}.chatbox{display:flex;gap:8px;margin-top:10px}.chatbox input{flex:1;min-width:0;background:#030813;border:1px solid #27516a;color:#fff;border-radius:11px;padding:12px}.money{font-size:62px;font-weight:950;color:#55ffad;text-shadow:0 0 25px #55ffad55}.customer-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.customer-grid>div{display:flex;flex-direction:column;gap:4px;background:#ffffff07;padding:14px;border-radius:12px}.customer-grid span{color:#8aa7b5;font-size:12px}footer{position:relative;z-index:2;padding:28px;text-align:center;color:#617d8c;font-size:11px}@keyframes drift{to{transform:translate3d(-46px,-46px,0)}}@keyframes pulse{50%{transform:scale(1.035);filter:brightness(1.15)}}@media(max-width:900px){.cards,.grid,.matrix,.brain-grid{grid-template-columns:1fr}.span2{grid-column:span 1}.hero{align-items:flex-start}.brain{width:96px;height:96px;min-width:96px}.brain:before{width:78px;height:78px}.brain-core{font-size:18px}.customer-grid{grid-template-columns:1fr}}@media(max-width:520px){.hero{padding-top:20px}.hero p{font-size:12px}.brain{position:absolute;right:14px;top:20px;opacity:.75}.hero>div:first-child{padding-right:70px}.card,.quad{border-radius:15px;padding:14px}.tabs{padding-inline:10px}.money{font-size:48px}}
      `}</style>
    </main>
  );
}
