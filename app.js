const data = window.SHIFTCORE_DATA;
const state = { view:'roles', roleSearch:'', sector:'all', requirement:'all', certificateSearch:'', category:'all' };
const $ = (id) => document.getElementById(id);
const requirementLabels = {required:'Verplicht',recommended:'Aanbevolen',project:'Projectafhankelijk'};
const certificateMap = Object.fromEntries(data.certificates.map(c => [c.id,c]));
const sectorMap = Object.fromEntries(data.sectors.map(s => [s.id,s.name]));

function escapeHtml(value=''){return value.replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[ch]));}
function populateFilters(){
  $('sectorFilter').innerHTML='<option value="all">Alle sectoren</option>'+data.sectors.map(s=>`<option value="${s.id}">${s.name}</option>`).join('');
  const categories=[...new Set(data.certificates.map(c=>c.category))].sort();
  $('categoryFilter').innerHTML='<option value="all">Alle categorieën</option>'+categories.map(c=>`<option>${c}</option>`).join('');
}
function renderRoles(){
  const q=state.roleSearch.trim().toLowerCase();
  const roles=data.roles.filter(role=>{
    const certs=role.certs.map(([id])=>certificateMap[id]);
    const text=[role.name,role.description,...role.sectors.map(s=>sectorMap[s]),...certs.map(c=>`${c.name} ${c.fullName}`)].join(' ').toLowerCase();
    return (!q||text.includes(q)) && (state.sector==='all'||role.sectors.includes(state.sector)) && (state.requirement==='all'||role.certs.some(([,level])=>level===state.requirement));
  });
  $('resultsSummary').textContent=`${roles.length} van ${data.roles.length} functies`;
  $('emptyRoles').hidden=roles.length>0;
  $('roleGrid').innerHTML=roles.map(role=>{
    const certRows=role.certs.filter(([,level])=>state.requirement==='all'||level===state.requirement).map(([id,level])=>{
      const cert=certificateMap[id];
      return `<div class="requirement-row"><button data-cert="${cert.id}" aria-label="Meer informatie over ${escapeHtml(cert.name)}">${escapeHtml(cert.name)} <span aria-hidden="true">?</span></button><span class="badge ${level}">${requirementLabels[level]}</span></div>`;
    }).join('');
    return `<article class="role-card"><div class="card-top"><h3>${escapeHtml(role.name)}</h3></div><p>${escapeHtml(role.description)}</p><div class="sector-tags">${role.sectors.map(s=>`<span class="tag">${sectorMap[s]}</span>`).join('')}</div><div class="requirement-list">${certRows}</div></article>`;
  }).join('');
  document.querySelectorAll('[data-cert]').forEach(btn=>btn.addEventListener('click',()=>openCertificate(btn.dataset.cert)));
}
function renderCertificates(){
  const q=state.certificateSearch.trim().toLowerCase();
  const certs=data.certificates.filter(c=>{
    const text=[c.name,c.fullName,c.category,c.summary,c.details].join(' ').toLowerCase();
    return (!q||text.includes(q))&&(state.category==='all'||c.category===state.category);
  });
  $('emptyCertificates').hidden=certs.length>0;
  $('certificateGrid').innerHTML=certs.map(c=>`<article class="certificate-card" tabindex="0" role="button" data-cert-card="${c.id}"><span class="category">${escapeHtml(c.category)}</span><h3>${escapeHtml(c.name)}</h3><p>${escapeHtml(c.summary)}</p><div class="certificate-meta"><span>${c.sectors.length} sector${c.sectors.length===1?'':'en'}</span><span class="learn-more">Bekijk uitleg →</span></div></article>`).join('');
  document.querySelectorAll('[data-cert-card]').forEach(card=>{card.addEventListener('click',()=>openCertificate(card.dataset.certCard));card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openCertificate(card.dataset.certCard);}})});
}
function openCertificate(id){
  const c=certificateMap[id]; if(!c)return;
  $('dialogCategory').textContent=c.category;
  $('dialogTitle').textContent=c.name;
  $('dialogBody').innerHTML=`<p><strong>${escapeHtml(c.fullName)}</strong></p><p>${escapeHtml(c.details)}</p><div class="detail-list"><div class="detail-item"><strong>Geldigheid</strong>${escapeHtml(c.validity)}</div><div class="detail-item"><strong>Sectoren</strong>${c.sectors.map(s=>sectorMap[s]).join(', ')}</div></div><h3>Let op</h3><p>De precieze eis kan verschillen per opdrachtgever, project, aanwijzing en werkzaamheden. Controleer altijd de actuele bron en projectspecificatie.</p>`;
  $('detailDialog').showModal();
}
function switchView(view){
  state.view=view;
  ['roles','certificates','about'].forEach(v=>$(v+'View').hidden=v!==view);
  document.querySelectorAll('[data-view]').forEach(btn=>btn.classList.toggle('active',btn.dataset.view===view));
  $('mobileNav').hidden=true;$('mobileMenuButton').setAttribute('aria-expanded','false');
  if(view!=='roles')document.getElementById('tool').scrollIntoView({behavior:'smooth',block:'start'});
}
function init(){
  populateFilters();
  $('roleCount').textContent=data.roles.length;$('certificateCount').textContent=data.certificates.length;$('sectorCount').textContent=data.sectors.length;$('currentYear').textContent=new Date().getFullYear();
  renderRoles();renderCertificates();
  $('roleSearch').addEventListener('input',e=>{state.roleSearch=e.target.value;renderRoles()});
  $('sectorFilter').addEventListener('change',e=>{state.sector=e.target.value;renderRoles()});
  $('requirementFilter').addEventListener('change',e=>{state.requirement=e.target.value;renderRoles()});
  $('certificateSearch').addEventListener('input',e=>{state.certificateSearch=e.target.value;renderCertificates()});
  $('categoryFilter').addEventListener('change',e=>{state.category=e.target.value;renderCertificates()});
  $('resetFilters').addEventListener('click',()=>{state.roleSearch='';state.sector='all';state.requirement='all';$('roleSearch').value='';$('sectorFilter').value='all';$('requirementFilter').value='all';renderRoles()});
  $('resetCertificateFilters').addEventListener('click',()=>{state.certificateSearch='';state.category='all';$('certificateSearch').value='';$('categoryFilter').value='all';renderCertificates()});
  document.querySelectorAll('[data-view]').forEach(btn=>btn.addEventListener('click',()=>switchView(btn.dataset.view)));
  document.querySelectorAll('[data-scroll-to]').forEach(btn=>btn.addEventListener('click',()=>document.getElementById(btn.dataset.scrollTo).scrollIntoView({behavior:'smooth'})));
  $('closeDialog').addEventListener('click',()=>$('detailDialog').close());
  $('detailDialog').addEventListener('click',e=>{const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.currentTarget.close()});
  $('mobileMenuButton').addEventListener('click',()=>{const open=$('mobileNav').hidden;$('mobileNav').hidden=!open;$('mobileMenuButton').setAttribute('aria-expanded',String(open))});
}
init();
