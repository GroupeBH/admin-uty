import Image from 'next/image';
import type { ReactNode } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Headphones,
  LifeBuoy,
  Mail,
  MapPin,
  MessageCircle,
  Search,
  ShoppingBag,
  Smartphone,
  Store,
  Truck,
  Zap,
} from 'lucide-react';

const ANDROID_DOWNLOAD_URL =
  'https://play.google.com/store/apps/details?id=com.uty&pcampaignid=web_share';
const SUPPORT_PHONE_DISPLAY = '+243 831 919 710';
const SUPPORT_PHONE_HREF = '+243831919710';
const SUPPORT_EMAIL = 'contact.gbh.sarl@gmail.com';

const platformHighlights = [
  {
    icon: <Search className="h-5 w-5" />,
    title: 'Trouver vite',
    text: 'Recherche, categories et annonces pour acheter sans se perdre.',
  },
  {
    icon: <Store className="h-5 w-5" />,
    title: 'Vendre clairement',
    text: 'Boutiques, annonces, attributs dynamiques et suivi vendeur.',
  },
  {
    icon: <Truck className="h-5 w-5" />,
    title: 'Livrer avec repere',
    text: 'Communes, quartiers, points connus et tracking pour Kinshasa.',
  },
];

const appJourneys = [
  {
    icon: <ShoppingBag className="h-5 w-5" />,
    label: 'Acheteurs',
    title: 'Commander un produit, discuter, payer a la livraison.',
  },
  {
    icon: <Store className="h-5 w-5" />,
    label: 'Vendeurs',
    title: 'Publier des annonces, gerer une boutique et suivre les commandes.',
  },
  {
    icon: <Truck className="h-5 w-5" />,
    label: 'Livreurs',
    title: 'Recevoir des courses, scanner les QR et mettre a jour le trajet.',
  },
  {
    icon: <Headphones className="h-5 w-5" />,
    label: 'Support',
    title: 'Guider les utilisateurs sur adresse, paiement et messagerie.',
  },
];

const supportTips = [
  'Ajouter commune, quartier et repere connu.',
  'Garder le telephone joignable pendant la livraison.',
  'Utiliser la messagerie integree avant tout deplacement.',
  'Commencer par le paiement a la livraison pour les nouveaux achats.',
];

const metrics = [
  { value: '243', label: 'indicatif RDC' },
  { value: 'CDF', label: 'devise locale' },
  { value: '8h-18h', label: 'support cible' },
];

function UtyLogo({ label = 'Uty', inverse = false }: { label?: string; inverse?: boolean }) {
  return (
    <div className="inline-flex items-center gap-3">
      <span className="relative inline-flex h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[#1F4F8C] shadow-[0_12px_30px_rgba(31,79,140,0.22)]">
        <Image src="/uty-logo.png" alt="" fill sizes="44px" className="object-cover" />
      </span>
      {label ? (
        <span className={`text-xl font-black ${inverse ? 'text-white' : 'text-[#173A68]'}`}>
          {label}
        </span>
      ) : null}
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#1F4F8C]">
      <span className="h-px w-8 bg-[#FFD700]" />
      {children}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="relative isolate min-h-[92svh] overflow-hidden bg-white">
        <Image
          src="/uty-platform-hero.png"
          alt="Scene visuelle Uty avec marketplace mobile, livraison et achats"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-[63%_center]"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.9)_35%,rgba(255,255,255,0.28)_70%,rgba(255,255,255,0.08)_100%)]" />

        <header className="absolute left-0 right-0 top-0 z-20 px-4 py-5 sm:px-6 lg:px-10">
          <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-white/70 bg-white/80 px-4 py-3 shadow-[0_18px_50px_rgba(31,79,140,0.1)] backdrop-blur-md">
            <a href="#accueil" aria-label="Accueil Uty">
              <UtyLogo />
            </a>
            <div className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
              <a className="transition hover:text-[#1F4F8C]" href="#plateforme">
                Plateforme
              </a>
              <a className="transition hover:text-[#1F4F8C]" href="#support">
                Support
              </a>
              <a className="transition hover:text-[#1F4F8C]" href="#telecharger">
                Telecharger
              </a>
            </div>
            <a
              href={ANDROID_DOWNLOAD_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#1F4F8C] px-5 text-sm font-bold text-white shadow-[0_16px_34px_rgba(31,79,140,0.22)] transition hover:-translate-y-0.5 hover:bg-[#173A68]"
            >
              <Smartphone className="h-4 w-4" />
              Android
            </a>
          </nav>
        </header>

        <div
          id="accueil"
          className="mx-auto flex min-h-[92svh] max-w-7xl items-center px-6 pb-16 pt-32 sm:px-8 lg:px-10"
        >
          <div className="max-w-2xl">
            <div className="uty-hero-enter inline-flex items-center gap-2 rounded-full border border-[#1F4F8C]/10 bg-white/80 px-4 py-2 text-sm font-bold text-[#1F4F8C] shadow-sm backdrop-blur">
              <Zap className="h-4 w-4 text-[#FFD700]" />
              Marketplace, livraison et support
            </div>

            <h1 className="uty-hero-enter mt-7 max-w-xl text-[clamp(4rem,12vw,8.75rem)] font-black leading-[0.82] text-[#173A68]">
              Uty
            </h1>
            <p className="uty-hero-enter mt-6 max-w-xl text-[clamp(1.65rem,4vw,3.2rem)] font-black leading-[1.02] text-slate-950">
              La plateforme commerce qui parle Kinshasa.
            </p>
            <p className="uty-hero-enter mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Une presence web pour presenter Uty, orienter les acheteurs, aider les vendeurs et
              donner un acces direct a l'application Android.
            </p>

            <div className="uty-hero-enter mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={ANDROID_DOWNLOAD_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#FFD700] px-7 py-4 text-base font-black text-[#173A68] shadow-[0_18px_36px_rgba(255,215,0,0.25)] transition hover:-translate-y-0.5 hover:bg-[#FFE44D]"
              >
                Telecharger sur Android
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#support"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-[#1F4F8C]/20 bg-white/80 px-7 py-4 text-base font-black text-[#1F4F8C] shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-[#1F4F8C]/30"
              >
                Aide et support
                <LifeBuoy className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="plateforme" className="bg-white px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Plateforme</SectionLabel>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <h2 className="max-w-xl text-4xl font-black leading-tight text-slate-950 md:text-5xl">
                Presentation publique, parcours mobile et service support au meme endroit.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              Cette interface devient le point d'entree web pour comprendre le service, guider les
              utilisateurs et les orienter vers l'application mobile officielle.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {platformHighlights.map((item) => (
              <div
                key={item.title}
                className="uty-lift rounded-[28px] border border-slate-200 bg-slate-50 px-6 py-7"
              >
                <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1F4F8C] text-white">
                  {item.icon}
                </div>
                <h3 className="text-xl font-black text-slate-950">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#F7FAFD] px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionLabel>Application mobile</SectionLabel>
            <h2 className="max-w-xl text-4xl font-black leading-tight text-slate-950 md:text-5xl">
              Les parcours de l'app deviennent lisibles depuis le web.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              L'app Expo couvre l'achat, la vente, la livraison, la messagerie, le panier, les
              paiements et le support. La page publique explique ces chemins sans obliger
              l'utilisateur a chercher l'application ailleurs.
            </p>
            <a
              href={ANDROID_DOWNLOAD_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1F4F8C] px-6 py-4 font-black text-white transition hover:-translate-y-0.5 hover:bg-[#173A68]"
            >
              <Smartphone className="h-5 w-5" />
              Installer Uty sur Android
            </a>

            <div className="mt-10 grid gap-3">
              {appJourneys.map((item) => (
                <div
                  key={item.label}
                  className="uty-lift flex items-center gap-4 rounded-[26px] bg-white px-5 py-4 shadow-[0_18px_50px_rgba(31,79,140,0.08)]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FFD700] text-[#173A68]">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.12em] text-[#1F4F8C]">
                      {item.label}
                    </p>
                    <p className="mt-1 font-semibold leading-6 text-slate-700">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[620px]">
            <div className="absolute left-1/2 top-6 h-[560px] w-[300px] -translate-x-1/2 rounded-[48px] bg-slate-950 p-3 shadow-[0_40px_100px_rgba(23,58,104,0.26)]">
              <div className="h-full overflow-hidden rounded-[38px] bg-white">
                <div className="bg-[#1F4F8C] px-6 pb-10 pt-8 text-white">
                  <div className="flex items-center justify-between">
                    <UtyLogo label="" />
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold">
                      Kinshasa
                    </span>
                  </div>
                  <p className="mt-8 text-2xl font-black leading-tight">Bonjour, que cherchez-vous ?</p>
                  <div className="mt-5 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-400">
                    <Search className="h-4 w-4" />
                    telephone, meuble, chaussure...
                  </div>
                </div>
                <div className="px-5 py-5">
                  <div className="grid grid-cols-3 gap-2">
                    {['Produits', 'Boutiques', 'Livraison'].map((item) => (
                      <div key={item} className="rounded-2xl bg-slate-100 px-2 py-3 text-center">
                        <p className="text-[11px] font-black text-[#1F4F8C]">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {['Casque', 'Sac', 'Camera', 'Sneaker'].map((item, index) => (
                      <div key={item} className="rounded-3xl bg-slate-50 p-3">
                        <div
                          className={`h-24 rounded-2xl ${
                            index % 2 ? 'bg-[#FFD700]/70' : 'bg-[#1F4F8C]/10'
                          }`}
                        />
                        <p className="mt-3 text-sm font-black text-slate-900">{item}</p>
                        <p className="text-xs font-bold text-slate-400">Disponible</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="uty-phone-float absolute bottom-16 left-0 hidden w-60 rounded-[30px] bg-white p-5 shadow-[0_30px_80px_rgba(31,79,140,0.14)] sm:block">
              <MapPin className="h-6 w-6 text-[#FFD700]" />
              <p className="mt-4 text-lg font-black text-slate-950">Adresse avec repere</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Commune, quartier et point connu pour aider le livreur.
              </p>
            </div>
            <div className="uty-phone-float absolute right-0 top-16 hidden w-64 rounded-[30px] bg-[#173A68] p-5 text-white shadow-[0_30px_80px_rgba(31,79,140,0.24)] sm:block">
              <MessageCircle className="h-6 w-6 text-[#FFD700]" />
              <p className="mt-4 text-lg font-black">Messagerie integree</p>
              <p className="mt-2 text-sm leading-6 text-white/70">
                Acheteur, vendeur et support gardent une trace claire.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="support" className="bg-white px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <SectionLabel>Support</SectionLabel>
              <h2 className="text-4xl font-black leading-tight text-slate-950 md:text-5xl">
                Une aide simple pour acheter, vendre et livrer sans friction.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Les consignes support de l'app mobile sont reprises pour le web : adresse claire,
                telephone joignable, messagerie avant deplacement et paiement prudent.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`tel:${SUPPORT_PHONE_HREF}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1F4F8C] px-6 py-4 font-black text-white transition hover:-translate-y-0.5 hover:bg-[#173A68]"
                >
                  <LifeBuoy className="h-5 w-5" />
                  {SUPPORT_PHONE_DISPLAY}
                </a>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1F4F8C]/20 bg-white px-6 py-4 font-black text-[#1F4F8C] transition hover:-translate-y-0.5 hover:border-[#1F4F8C]/40"
                >
                  <Mail className="h-5 w-5" />
                  Email support
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {supportTips.map((tip) => (
                <div
                  key={tip}
                  className="uty-lift min-h-[160px] rounded-[28px] border border-slate-200 bg-slate-50 p-6"
                >
                  <CheckCircle2 className="h-7 w-7 text-[#1F4F8C]" />
                  <p className="mt-8 text-lg font-black leading-7 text-slate-950">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 grid overflow-hidden rounded-[34px] border border-slate-200 bg-[#173A68] text-white md:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric.label} className="border-white/10 px-7 py-8 md:border-r last:md:border-r-0">
                <p className="text-4xl font-black text-[#FFD700]">{metric.value}</p>
                <p className="mt-2 font-semibold text-white/75">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="telecharger" className="bg-white px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[40px] bg-[#1F4F8C] px-7 py-10 text-white shadow-[0_35px_100px_rgba(31,79,140,0.2)] md:px-12 md:py-14">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <UtyLogo label="Uty" inverse />
              <h2 className="mt-8 max-w-2xl text-4xl font-black leading-tight md:text-5xl">
                Une seule presence web pour presenter, aider et lancer Uty.
              </h2>
            </div>
            <div>
              <p className="text-lg leading-8 text-white/75">
                La plateforme peut maintenant accueillir les visiteurs, guider les utilisateurs et
                les conduire vers l'application mobile officielle sur Android.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={ANDROID_DOWNLOAD_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FFD700] px-6 py-4 font-black text-[#173A68] transition hover:-translate-y-0.5 hover:bg-[#FFE44D]"
                >
                  Telecharger Android
                  <Smartphone className="h-5 w-5" />
                </a>
                <a
                  href="#support"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-4 font-black text-white transition hover:-translate-y-0.5 hover:bg-white/10"
                >
                  Aller au support
                  <Headphones className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
