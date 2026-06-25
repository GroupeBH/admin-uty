import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone } from 'lucide-react';

export type LegalSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

type LegalDocumentPageProps = {
  eyebrow: string;
  title: string;
  summary: string;
  updatedAt: string;
  sections: LegalSection[];
};

const SUPPORT_EMAIL = 'contact.gbh.sarl@gmail.com';
const SUPPORT_PHONE_DISPLAY = '+243 831 919 710';
const SUPPORT_PHONE_HREF = '+243831919710';

export default function LegalDocumentPage({
  eyebrow,
  title,
  summary,
  updatedAt,
  sections,
}: LegalDocumentPageProps) {
  return (
    <main className="min-h-screen bg-[#F6F8FB] text-slate-900">
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
          <Link href="/" className="inline-flex items-center gap-3" aria-label="Accueil Uty">
            <span className="relative h-10 w-10 overflow-hidden rounded-full bg-[#1F4F8C]">
              <Image src="/uty-logo.png" alt="" fill sizes="40px" className="object-cover" />
            </span>
            <span className="text-xl font-black text-[#173A68]">Uty</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[#1F4F8C]/15 px-4 py-2 text-sm font-bold text-[#1F4F8C] transition hover:border-[#1F4F8C]/35 hover:bg-[#1F4F8C]/5"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à l’accueil
          </Link>
        </div>
      </header>

      <section className="overflow-hidden bg-[#173A68] text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <p className="legal-enter text-sm font-black uppercase tracking-[0.2em] text-[#FFD700]">
            {eyebrow}
          </p>
          <h1 className="legal-enter mt-5 max-w-4xl text-4xl font-black leading-[1.02] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="legal-enter mt-6 max-w-3xl text-lg leading-8 text-white/75">{summary}</p>
          <p className="legal-enter mt-8 text-sm font-semibold text-white/55">
            Dernière mise à jour : {updatedAt}
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-10 lg:py-16">
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1F4F8C]">
            Sommaire
          </p>
          <nav className="mt-4 border-l border-slate-300">
            {sections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="block border-l-2 border-transparent py-2 pl-4 text-sm font-semibold leading-5 text-slate-500 transition hover:border-[#FFD700] hover:text-[#173A68]"
              >
                {index + 1}. {section.title}
              </a>
            ))}
          </nav>
        </aside>

        <article className="min-w-0 rounded-[30px] bg-white px-6 py-8 shadow-[0_24px_80px_rgba(23,58,104,0.08)] sm:px-10 sm:py-10 lg:px-14">
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-8 border-b border-slate-200 py-8 first:pt-0 last:border-b-0 last:pb-0"
            >
              <div className="flex items-start gap-4">
                <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFD700] text-sm font-black text-[#173A68]">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-2xl font-black leading-tight text-[#173A68]">
                    {section.title}
                  </h2>

                  {section.paragraphs?.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="mt-4 whitespace-pre-line text-[15px] leading-7 text-slate-600 sm:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {section.bullets?.length ? (
                    <ul className="mt-4 space-y-3">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-3 text-[15px] leading-7 text-slate-600 sm:text-base"
                        >
                          <span className="mt-[0.72rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1F4F8C]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </section>
          ))}
        </article>
      </div>

      <footer className="bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <div>
            <p className="font-black text-[#173A68]">Une question sur ce document ?</p>
            <p className="mt-1 text-sm text-slate-500">Le support Uty peut recevoir votre demande.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1F4F8C] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#173A68]"
            >
              <Mail className="h-4 w-4" />
              {SUPPORT_EMAIL}
            </a>
            <a
              href={`tel:${SUPPORT_PHONE_HREF}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-bold text-[#173A68] transition hover:border-[#1F4F8C]/30"
            >
              <Phone className="h-4 w-4" />
              {SUPPORT_PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
