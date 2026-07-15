(() => {
  "use strict";
  const data = window.APP_DATA;
  const sectors = data.sectors, roles = data.roles, certs = data.certificates;
  let activeSector = "all", query = "", activeRole = null;

  const $ = id => document.getElementById(id);
  const sectorGrid = $("sectorGrid"), roleGrid = $("roleGrid"), searchInput = $("searchInput");
  const resultCount = $("resultCount"), emptyState = $("emptyState"), modal = $("roleModal");
  const labels = {required:"Verplicht",project:"Projectafhankelijk",recommended:"Aanbevolen"};

  const icons = {
    grid:'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
    bolt:'<svg viewBox="0 0 24 24"><path d="m13 2-8 12h7l-1 8 8-12h-7z"/></svg>',
    flame:'<svg viewBox="0 0 24 24"><path d="M12 22c4 0 7-3 7-7 0-5-4-7-5-11-3 2-2 5-4 7-1-2-2-3-3-4-1 3-2 5-2 8 0 4 3 7 7 7z"/></svg>',
    drop:'<svg viewBox="0 0 24 24"><path d="M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13z"/></svg>',
    heat:'<svg viewBox="0 0 24 24"><path d="M7 20c-2-2-2-4 0-6s2-4 0-6"/><path d="M12 20c-2-2-2-4 0-6s2-4 0-6"/><path d="M17 20c-2-2-2-4 0-6s2-4 0-6"/></svg>',
    signal:'<svg viewBox="0 0 24 24"><path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8 16a6 6 0 0 1 8 0"/><path d="M11 19.5a2 2 0 0 1 2 0"/></svg>',
    helmet:'<svg viewBox="0 0 24 24"><path d="M4 15a8 8 0 0 1 16 0"/><path d="M2 15h20v3H2z"/><path d="M9 7v8M15 7v8"/></svg>'
  };

  const sectorName = id => sectors.find(s => s.id === id)?.name || id;

  function roleText(role){
    return [role.name,role.description,sectorName(role.sector),...role.certs.flatMap(([id])=>[certs[id].name,certs[id].full])].join(" ").toLowerCase();
  }
  function filtered(){
    const q=query.trim().toLowerCase();
    return roles.filter(r=>(activeSector==="all"||r.sector===activeSector)&&(!q||roleText(r).includes(q)));
  }
  function renderSectors(){
    sectorGrid.innerHTML=sectors.map(s=>{
      const count=s.id==="all"?roles.length:roles.filter(r=>r.sector===s.id).length;
      return `<button type="button" class="sector-card ${s.id===activeSector?"active":""}" data-sector="${s.id}">
        <span class="sector-icon">${icons[s.icon]}</span>
        <span><strong>${s.name}</strong><small>${count} ${count===1?"functie":"functies"}</small></span>
      </button>`;
    }).join("");
    sectorGrid.querySelectorAll("[data-sector]").forEach(b=>b.onclick=()=>{activeSector=b.dataset.sector;render();});
  }
  function renderRoles(){
    const list=filtered();
    resultCount.textContent=`${list.length} ${list.length===1?"functie":"functies"} getoond`;
    emptyState.hidden=!!list.length;
    roleGrid.innerHTML=list.map(r=>{
      const required=r.certs.filter(x=>x[1]==="required").length;
      return `<button type="button" class="role-card" data-role="${r.id}">
        <span class="role-top"><span class="role-sector">${sectorName(r.sector)}</span><span class="role-arrow">→</span></span>
        <h3>${r.name}</h3><p>${r.description}</p>
        <span class="role-meta"><span class="meta-chip">${r.certs.length} items</span><span class="meta-chip required">${required} verplicht</span></span>
      </button>`;
    }).join("");
    roleGrid.querySelectorAll("[data-role]").forEach(b=>b.onclick=()=>openRole(b.dataset.role));
  }
  function certRows(role){
    return role.certs.map(([id,level])=>{
      const c=certs[id];
      const source=c.source?`<a class="source-link" href="${c.source}" target="_blank" rel="noopener">Open officiële/inhoudelijke bron ↗</a>`:"";
      return `<article class="certificate-row">
        <button class="cert-button" type="button" aria-expanded="false">
          <span class="cert-bar ${level}"></span><span class="cert-name"><strong>${c.name}</strong><small>${c.full}</small></span>
          <span class="level ${level}">${labels[level]}</span><span class="cert-chevron">›</span>
        </button>
        <div class="cert-details"><p>${c.description}</p>
          <div class="detail-grid"><div class="detail-box"><span>Geldigheid</span><strong>${c.validity}</strong></div><div class="detail-box"><span>Bron/beheerder</span><strong>${c.sourceName||"Opdrachtgever / opleider"}</strong></div></div>${source}
        </div>
      </article>`;
    }).join("");
  }
  function checkerRows(role){
    return role.certs.map(([id,level],i)=>{
      const c=certs[id];
      return `<div class="check-item"><input id="check-${i}" type="checkbox" data-cert="${id}" data-level="${level}">
        <label class="check-label" for="check-${i}"><span class="checkmark">✓</span><span class="check-copy"><strong>${c.name}</strong><small>${labels[level]}</small></span></label></div>`;
    }).join("");
  }
  function openRole(id){
    activeRole=roles.find(r=>r.id===id); if(!activeRole)return;
    $("modalSector").textContent=sectorName(activeRole.sector);
    $("modalTitle").textContent=activeRole.name;
    $("modalDescription").textContent=activeRole.description;
    $("modalCertCount").textContent=`${activeRole.certs.length} items`;
    $("certificateList").innerHTML=certRows(activeRole);
    $("checkerList").innerHTML=checkerRows(activeRole);
    $("certificateList").querySelectorAll(".cert-button").forEach(b=>b.onclick=()=>{
      const row=b.closest(".certificate-row"),open=row.classList.toggle("open");b.setAttribute("aria-expanded",String(open));
    });
    $("checkerList").querySelectorAll("input").forEach(i=>i.onchange=evaluate);
    resetResult();
    modal.showModal();
  }
  function resetResult(){
    $("checkerList").querySelectorAll("input").forEach(i=>i.checked=false);
    const out=$("checkerResult");out.className="checker-result neutral";
    out.innerHTML='<div class="result-symbol">—</div><div><strong>Selecteer de aanwezige certificaten</strong><p>De beoordeling verschijnt automatisch.</p></div>';
  }
  function evaluate(){
    const inputs=[...$("checkerList").querySelectorAll("input")];
    const checked=new Set(inputs.filter(i=>i.checked).map(i=>i.dataset.cert));
    const missingRequired=activeRole.certs.filter(([id,l])=>l==="required"&&!checked.has(id)).map(([id])=>certs[id].name);
    const missingProject=activeRole.certs.filter(([id,l])=>l==="project"&&!checked.has(id)).map(([id])=>certs[id].name);
    const anyChecked=checked.size>0, out=$("checkerResult");
    if(!anyChecked){resetResult();return;}
    if(missingRequired.length){
      out.className="checker-result blocked";
      out.innerHTML=`<div class="result-symbol">×</div><div><strong>Nog niet inzetklaar</strong><p>Verplicht ontbreekt: ${missingRequired.join(", ")}.${missingProject.length?` Projectafhankelijk controleren: ${missingProject.join(", ")}.`:""}</p></div>`;
    }else if(missingProject.length){
      out.className="checker-result warning";
      out.innerHTML=`<div class="result-symbol">!</div><div><strong>Verplichte basis aanwezig</strong><p>Nog projectafhankelijk controleren: ${missingProject.join(", ")}. Controleer ook de juiste aanwijzing en werkzaamheden.</p></div>`;
    }else{
      out.className="checker-result ready";
      out.innerHTML='<div class="result-symbol">✓</div><div><strong>Alle opgenomen eisen aangevinkt</strong><p>Voorlopig passend voor deze functie. Controleer altijd geldigheid, juiste verbijzondering en opdrachtgeverseisen.</p></div>';
    }
  }
  function render(){renderSectors();renderRoles();}
  searchInput.oninput=e=>{query=e.target.value;renderRoles();};
  $("resetButton").onclick=()=>{activeSector="all";query="";searchInput.value="";render();searchInput.focus();};
  $("closeModal").onclick=()=>modal.close();
  $("clearCheck").onclick=resetResult;
  modal.onclick=e=>{const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)modal.close();};
  document.addEventListener("keydown",e=>{if(e.key==="/"&&document.activeElement!==searchInput&&!modal.open){e.preventDefault();searchInput.focus();}});
  $("totalRoles").textContent=roles.length;
  render();
})();