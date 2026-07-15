'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { certBySlug, roles } from '../lib/data';

export default function Explorer(){
 const [query,setQuery]=useState(''); const [sector,setSector]=useState('Alle sectoren');
 const filtered=useMemo(()=>roles.filter(r=>(sector==='Alle sectoren'||r.sector===sector)&&(r.name+' '+r.sector+' '+r.certificates.map(c=>certBySlug(c.slug)?.name).join(' ')).toLowerCase().includes(query.toLowerCase())),[query,sector]);
 return <section className="explorer"><div className="search-row"><label className="search"><span>�O.</span><input aria-label="Zoek functie of certificaat" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Zoek op functie of certificaat..."/></label><select aria-label="Filter sector" value={sector} onChange={e=>setSector(e.target.value)}><option>Alle sectoren</option><option>Elektra</option><option>Gas</option><option>Water</option><option>Algemene infra</option></select></div><div className="result-head"><h2>Functies en vereisten</h2><span>{filtered.length} resultaten</span></div><div className="role-grid">{filtered.map(r=><Link className="role-card" href={`/functies/${r.slug}`} key={r.slug}><div><span className="eyebrow">{r.sector}</span><h3>{r.name}</h3><p>{r.intro}</p></div><div className="chips">{r.certificates.slice(0,3).map(c=><span key={c.slug}>{certBySlug(c.slug)?.name}</span>)}</div><strong>Bekijk vereisten <span>�?'</span></strong></Link>)}</div>{!filtered.length&&<p className="empty">Geen resultaten. Probeer een andere zoekterm of sector.</p>}</section>
}

