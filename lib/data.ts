export type Level = 'Verplicht' | 'Aanbevolen' | 'Projectafhankelijk';
export type Certificate = { slug:string; name:string; fullName:string; category:string; validity:string; summary:string; sectors:string[] };
export type Role = { slug:string; name:string; sector:string; level:string; intro:string; certificates:{slug:string; level:Level; note:string}[] };

export const sectors = [
  {slug:'elektra',name:'Elektra',icon:'�s�',description:'Aanleg, beheer en onderhoud van elektriciteitsnetten.'},
  {slug:'gas',name:'Gas',icon:'�-?',description:'Veilig werken aan gasdistributienetten en installaties.'},
  {slug:'water',name:'Water',icon:'�-?',description:'Drinkwaterleidingen, aansluitingen en distributie.'},
  {slug:'algemene-infra',name:'Algemene infra',icon:'�-�',description:'Grondwerk, civiele techniek en projectveiligheid.'}
];

export const certificates: Certificate[] = [
  {slug:'vca-basis',name:'VCA Basis',fullName:'Basisveiligheid VCA',category:'Veiligheid',validity:'10 jaar',summary:'Basiskennis over veilig en gezond werken in een risicovolle omgeving.',sectors:['Elektra','Gas','Water','Algemene infra']},
  {slug:'vca-vol',name:'VCA VOL',fullName:'Veiligheid voor Operationeel Leidinggevenden',category:'Veiligheid',validity:'10 jaar',summary:'Veiligheidskennis voor operationeel leidinggevenden en zelfstandigen.',sectors:['Elektra','Gas','Water','Algemene infra']},
  {slug:'gpi',name:'GPI',fullName:'Generieke Poortinstructie',category:'Bouwplaats',validity:'1 jaar',summary:'Toegangsinstructie voor veilig gedrag op deelnemende bouwplaatsen.',sectors:['Elektra','Gas','Water','Algemene infra']},
  {slug:'bei-ls-vp',name:'BEI LS VP',fullName:'Bedrijfsvoering Elektrische Installaties �?" Laagspanning Vakbekwaam Persoon',category:'Elektra',validity:'Volgens aanwijzing',summary:'Persoonscertificering en aanwijzing voor werkzaamheden aan laagspanningsnetten.',sectors:['Elektra']},
  {slug:'nen-3140',name:'NEN 3140',fullName:'Bedrijfsvoering van elektrische laagspanningsinstallaties',category:'Elektra',validity:'Werkgever bepaalt',summary:'Afspraken voor veilige bedrijfsvoering en werkzaamheden aan elektrische installaties.',sectors:['Elektra']},
  {slug:'viag-vp',name:'VIAG VP',fullName:'Veiligheidsinstructie Aardgas �?" Vakbekwaam Persoon',category:'Gas',validity:'Volgens aanwijzing',summary:'Veilig werken aan gasvoorzieningssystemen binnen het VIAG-domein.',sectors:['Gas']},
  {slug:'hygiënisch-werken-water',name:'Hygiënisch werken',fullName:'Hygiënisch werken met drinkwater',category:'Water',validity:'Volgens opleider/opdrachtgever',summary:'Voorkomt verontreiniging bij werkzaamheden aan drinkwaterleidingen.',sectors:['Water']},
  {slug:'bhv',name:'BHV',fullName:'Bedrijfshulpverlening',category:'Veiligheid',validity:'Periodiek herhalen',summary:'Eerste hulp, brandbestrijding en ontruiming bij incidenten.',sectors:['Elektra','Gas','Water','Algemene infra']},
  {slug:'veilig-werken-langs-de-weg',name:'Veilig werken langs de weg',fullName:'Veilig werken langs de weg',category:'Verkeer',validity:'Volgens opleider/opdrachtgever',summary:'Veiligheidsmaatregelen bij werkzaamheden langs of op de openbare weg.',sectors:['Elektra','Gas','Water','Algemene infra']}
];

export const roles: Role[] = [
  {slug:'grondwerker',name:'Grondwerker',sector:'Algemene infra',level:'Vakprofessional',intro:'Voert graaf-, grond- en ondersteunende werkzaamheden uit op infraprojecten.',certificates:[{slug:'vca-basis',level:'Verplicht',note:'Veelal basiseis op infraprojecten.'},{slug:'gpi',level:'Projectafhankelijk',note:'Vereist op deelnemende bouwplaatsen.'},{slug:'veilig-werken-langs-de-weg',level:'Projectafhankelijk',note:'Bij werkzaamheden in of langs verkeersgebied.'}]},
  {slug:'monteur-laagspanning',name:'Monteur laagspanning',sector:'Elektra',level:'Monteur',intro:'Legt laagspanningsnetten en aansluitingen aan en onderhoudt deze.',certificates:[{slug:'vca-basis',level:'Verplicht',note:'Gebruikelijke veiligheidseis.'},{slug:'bei-ls-vp',level:'Verplicht',note:'Passende aanwijzing en taakbevoegdheid blijven vereist.'},{slug:'gpi',level:'Projectafhankelijk',note:'Afhankelijk van bouwplaats.'},{slug:'nen-3140',level:'Aanbevolen',note:'Afhankelijk van installatie en werkgeversaanwijzing.'}]},
  {slug:'eerste-monteur-laagspanning',name:'Eerste monteur laagspanning',sector:'Elektra',level:'Eerste monteur',intro:'Werkt zelfstandig aan laagspanningsnetten en begeleidt collega�?Ts.',certificates:[{slug:'vca-vol',level:'Verplicht',note:'Vaak vereist bij aansturende taken.'},{slug:'bei-ls-vp',level:'Verplicht',note:'Niveau en aanwijzing moeten bij de taken passen.'},{slug:'gpi',level:'Projectafhankelijk',note:'Afhankelijk van bouwplaats.'},{slug:'bhv',level:'Aanbevolen',note:'Vaak gewenst in een team.'}]},
  {slug:'gasmonteur',name:'Gasmonteur',sector:'Gas',level:'Monteur',intro:'Monteert, onderhoudt en controleert leidingen en aansluitingen in gasnetten.',certificates:[{slug:'vca-basis',level:'Verplicht',note:'Gebruikelijke veiligheidseis.'},{slug:'viag-vp',level:'Verplicht',note:'Passende aanwijzing door de werkgever vereist.'},{slug:'gpi',level:'Projectafhankelijk',note:'Afhankelijk van projectlocatie.'}]},
  {slug:'watermonteur',name:'Watermonteur',sector:'Water',level:'Monteur',intro:'Werkt aan drinkwaterleidingen, aansluitingen en distributienetten.',certificates:[{slug:'vca-basis',level:'Verplicht',note:'Gebruikelijke veiligheidseis.'},{slug:'hygiënisch-werken-water',level:'Verplicht',note:'Eis is afhankelijk van drinkwaterbedrijf en werkzaamheden.'},{slug:'gpi',level:'Projectafhankelijk',note:'Afhankelijk van projectlocatie.'}]},
  {slug:'uitvoerder-infra',name:'Uitvoerder infra',sector:'Algemene infra',level:'Leidinggevend',intro:'Coördineert mensen, planning en veiligheid op de projectlocatie.',certificates:[{slug:'vca-vol',level:'Verplicht',note:'Gebruikelijke eis voor operationeel leidinggevenden.'},{slug:'bhv',level:'Aanbevolen',note:'Vaak onderdeel van de noodorganisatie.'},{slug:'gpi',level:'Projectafhankelijk',note:'Afhankelijk van bouwplaats.'}]}
];

export const certBySlug = (slug:string) => certificates.find(c => c.slug === slug);
export const roleBySlug = (slug:string) => roles.find(r => r.slug === slug);

