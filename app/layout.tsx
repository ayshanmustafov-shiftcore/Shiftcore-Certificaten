import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = { title: 'Shiftcore Certificaten', description: 'Vind certificaten per functie en sector in de Nederlandse infra.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="nl"><body>
    <header className="site-header"><Link className="brand" href="/"><span className="brand-mark">S</span><span>SHIFTCORE<small>Certificatenwijzer</small></span></Link><nav><Link href="/functies">Functies</Link><Link href="/certificaten">Certificaten</Link><Link href="/#sectoren">Sectoren</Link></nav></header>
    <main>{children}</main>
    <footer><div><strong>SHIFTCORE</strong><p>Helder over certificaten in de infra.</p></div><p>De informatie is indicatief. Controleer altijd de actuele eisen van opdrachtgever, netbeheerder en project.</p></footer>
  </body></html>;
}

