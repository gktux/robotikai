// src/app/page.tsx
import { readCmsWithLocale } from "@/lib/cms";
import { AnnouncementSlider } from "@/components/AnnouncementSlider";

export default async function Home() {
  const cms = await readCmsWithLocale();

  return (
    <main className="min-h-screen bg-transparent text-neutral-900 dark:text-slate-100 transition-colors duration-300">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-white to-fuchsia-50 dark:from-indigo-950/30 dark:via-transparent dark:to-fuchsia-950/20" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-20 md:flex-row md:items-center md:py-28">
          {/* Sol taraf: metin */}
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-white/80 px-3 py-1 text-xs font-medium text-indigo-700 shadow-sm shadow-indigo-100 animate-fade-up dark:border-indigo-500/30 dark:bg-indigo-950/50 dark:text-indigo-300 dark:shadow-none">
              <span className="h-2 w-2 rounded-full bg-fuchsia-400/90 animate-pulse dark:bg-fuchsia-400" />
              {cms.home.badge}
            </div>

            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl animate-fade-up delay-100">
              {cms.home.titleLine1}
              <span className="block bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-violet-400 dark:to-fuchsia-400">
                {cms.home.titleHighlight}
              </span>
            </h1>

            <p className="max-w-xl text-sm md:text-base text-neutral-600 animate-fade-up delay-200 dark:text-slate-400">
              {cms.home.subtitle}
            </p>

            <div className="flex flex-wrap gap-3 animate-fade-up delay-300">
              <a
                href="/courses"
                className="rounded-full bg-indigo-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:bg-indigo-600 hover:shadow-indigo-500/40 dark:bg-indigo-600 dark:hover:bg-indigo-500 dark:shadow-none"
              >
                Eğitimlere Başla
              </a>
              <a
                href="/shop"
                className="rounded-full border border-neutral-200 px-6 py-2.5 text-sm font-semibold text-neutral-700 transition hover:border-indigo-400 hover:text-indigo-600 bg-white/70 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:border-indigo-500 dark:hover:text-indigo-300"
              >
                Kit ve Ürünlere Göz At
              </a>
            </div>

            <div className="flex flex-wrap gap-6 pt-2 text-xs text-neutral-500 animate-fade-up delay-400 dark:text-slate-400">
              <div>
                <span className="font-semibold text-neutral-900 dark:text-slate-200">
                  {cms.home.pill1Title}
                </span>
                <p>{cms.home.pill1Text}</p>
              </div>
              <div>
                <span className="font-semibold text-neutral-900 dark:text-slate-200">
                  {cms.home.pill2Title}
                </span>
                <p>{cms.home.pill2Text}</p>
              </div>
            </div>
          </div>

          {/* Sağ taraf: temsili logo ve görsel alanı */}
          <div className="flex-1 relative">
            <div className="relative mx-auto max-w-md animate-fade-up delay-500">
              
              {/* Neon kart animasyonu */}
              <div className="relative overflow-hidden rounded-3xl border border-indigo-100/80 bg-gradient-to-br from-white via-indigo-50/30 to-fuchsia-50/20 p-6 shadow-2xl shadow-indigo-100 mt-8 animate-float dark:border-indigo-500/20 dark:from-slate-900/80 dark:via-indigo-950/30 dark:to-fuchsia-950/20 dark:shadow-none">
                <div className="absolute -left-20 -top-24 h-40 w-40 rounded-full bg-indigo-200/50 blur-3xl animate-pulse-slow dark:bg-indigo-600/20" />
                <div className="absolute -bottom-28 -right-24 h-40 w-40 rounded-full bg-fuchsia-200/50 blur-3xl animate-pulse-slow delay-200 dark:bg-fuchsia-600/20" />

                <div className="relative space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                    {cms.home.cardTitle}
                  </p>

                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="rounded-xl border border-neutral-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800/50">
                      <p className="text-[10px] text-neutral-500 dark:text-slate-400">Mod</p>
                      <p className="text-xs font-semibold text-neutral-900 dark:text-slate-200">
                        {cms.home.cardModTitle}
                      </p>
                      <p className="mt-1 text-[11px] text-neutral-500 dark:text-slate-400">
                        {cms.home.cardModText}
                      </p>
                    </div>
                    <div className="rounded-xl border border-neutral-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800/50">
                      <p className="text-[10px] text-neutral-500 dark:text-slate-400">Süre</p>
                      <p className="text-xs font-semibold text-neutral-900 dark:text-slate-200">
                        {cms.home.cardDuration}
                      </p>
                      <p className="mt-1 text-[11px] text-violet-600 dark:text-violet-400">
                        {cms.home.cardDurationText}
                      </p>
                    </div>
                    <div className="rounded-xl border border-neutral-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800/50">
                      <p className="text-[10px] text-neutral-500 dark:text-slate-400">Seviye</p>
                      <p className="text-xs font-semibold text-neutral-900 dark:text-slate-200">
                        {cms.home.cardLevel}
                      </p>
                      <p className="mt-1 text-[11px] text-neutral-500 dark:text-slate-400">
                        {cms.home.cardLevelText}
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between rounded-2xl border border-neutral-200 bg-white/80 p-3 text-[11px] text-neutral-600 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300">
                    <span>{cms.home.cardBottomText}</span>
                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-[10px] font-semibold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                      {cms.home.cardBottomBadge}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-center text-[11px] text-neutral-500 dark:text-slate-500">
                {cms.home.cardNote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Son Blog Yazıları */}
      {cms.blog?.items?.length > 0 && (
        <section className="py-20 bg-slate-50 dark:bg-slate-900/50 transition-colors relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
          <div className="mx-auto max-w-6xl px-4">
            <header className="mb-12 text-center space-y-2">
              <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Akademiden Son Paylaşımlar</h2>
              <p className="text-sm text-slate-500">Robotik ve kodlama dünyasından en yeni içerikler.</p>
              
              {/* Haberler (News Ticker) - Moved here under heading */}
              {cms.news?.items?.length > 0 && (
                <div className="mt-8 bg-slate-950 py-3 overflow-hidden border-y border-white/5 relative z-20 rounded-2xl shadow-xl">
                  <div className="flex whitespace-nowrap animate-marquee">
                    {[...cms.news.items, ...cms.news.items, ...cms.news.items].map((news: any, idx) => {
                      const Item = (
                        <div className="flex items-center gap-4 px-12 group cursor-pointer">
                          <span className="text-[10px] font-black uppercase tracking-widest text-sky-500 bg-sky-500/10 px-2 py-0.5 rounded">HABER</span>
                          <span className="text-xs font-bold text-slate-400">{news.date}</span>
                          <span className="text-sm font-semibold text-slate-200 group-hover:text-sky-400 transition-colors">
                            {news.title}
                          </span>
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-800 mx-4" />
                        </div>
                      );
                      return news.link ? (
                        <a key={idx} href={news.link} target="_blank" rel="noopener noreferrer">
                          {Item}
                        </a>
                      ) : (
                        <div key={idx}>{Item}</div>
                      );
                    })}
                  </div>
                </div>
              )}
            </header>

            <div className="grid gap-8 md:grid-cols-3">
              {cms.blog.items.slice(0, 3).map((post: any, idx: number) => (
                <a 
                  key={idx}
                  href={`/blog/${post.id}`}
                  className="group block space-y-4 animate-fade-up"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <div className="aspect-[16/10] overflow-hidden rounded-[2.5rem] bg-slate-200 dark:bg-slate-800 relative shadow-lg group-hover:shadow-indigo-500/20 transition-all border border-transparent group-hover:border-indigo-500/30">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                    <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity z-20">
                      Yazıyı Oku →
                    </div>
                    {post.image ? (
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : null}
                    <div className={`h-full w-full bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-500 ${post.image ? 'absolute inset-0 -z-10' : ''}`}>
                       <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400/50"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                    </div>
                  </div>
                  <div className="px-2 space-y-2">
                    <span className="text-[10px] font-black uppercase text-indigo-500 tracking-widest">{post.category}</span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </a>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <a href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Tüm Blog Yazılarını Gör
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        </section>
      )}



      {/* Duyurular Sections */}
      {cms.announcements?.items?.length > 0 && (
        <section className="py-24 bg-white dark:bg-slate-950 transition-colors">
          <div className="mx-auto max-w-6xl px-4">
            <header className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600 dark:text-amber-500">BILGILENDIRME</p>
                <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Duyurular & Bildirimler</h2>
              </div>
              <p className="text-sm text-slate-500 max-w-sm leading-relaxed border-l-2 border-amber-500/30 pl-6 py-1">
                Platformumuzla ilgili en güncel teknik ve genel bilgilendirmeler. Akıştan geri kalmayın.
              </p>
            </header>
            
            <AnnouncementSlider items={cms.announcements.items} />
          </div>
        </section>
      )}


      {/* Sponsorlar & Çözüm Ortakları - Innovative Section */}
      {cms.partners?.items?.length > 0 && (
        <section className="relative py-24 overflow-hidden -mt-10">
          {/* Animated Background Mesh */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-fuchsia-500/10 blur-[120px] rounded-full animate-mesh" />
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full animate-mesh [animation-delay:-5s]" />
          </div>

          <div className="mx-auto max-w-6xl px-4 relative">
            <header className="mb-16 text-center space-y-4">
              <div className="inline-flex rounded-full bg-slate-950/5 px-4 py-1.5 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10">
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Çözüm Ortaklarımız</p>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tighter">
                Gücümüzü <span className="shimmer-text">Partnerlerimizden</span> Alıyoruz
              </h2>
            </header>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cms.partners.items.map((partner: any, idx: number) => {
                const randomDelay = (idx * 1.5) % 10; // Simple pseudo-random delay
                const Item = (
                  <div 
                    className="group relative h-40 flex items-center justify-center rounded-[2.5rem] bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200/50 dark:border-white/5 transition-all duration-500 hover:bg-white dark:hover:bg-slate-900 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2"
                  >
                    <div className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-indigo-500/5 via-transparent to-fuchsia-500/5" />
                    
                    {/* Glass Reflection effect on hover */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-[2.5rem]">
                      <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent skew-x-[45deg] transition-all duration-700 group-hover:left-[150%]" />
                    </div>

                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="max-h-16 max-w-[70%] object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-105 animate-autonomous-glow"
                      style={{ animationDelay: `${randomDelay}s`, animationDuration: `${8 + (idx % 5)}s` }}
                    />
                    
                    {/* Tooltip-like name label */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                      <div className="bg-slate-900 text-white text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-lg">
                        {partner.name}
                      </div>
                    </div>
                  </div>
                );

                return partner.link ? (
                  <a key={idx} href={partner.link} target="_blank" rel="noopener noreferrer" className="animate-fade-up" style={{ animationDelay: `${idx * 100}ms` }}>
                    {Item}
                  </a>
                ) : (
                  <div key={idx} className="animate-fade-up" style={{ animationDelay: `${idx * 100}ms` }}>
                    {Item}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Features / Bento Grid */}
      <section className="relative overflow-hidden py-24 transition-colors duration-300">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-16 text-center animate-fade-up">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl dark:text-slate-100">Platform Ayrıcalıkları</h2>
            <p className="mt-4 text-neutral-600 dark:text-slate-400">Neden ROBOTIKAI'yi tercih etmelisiniz?</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {cms.home.features.map((feature: any, idx: number) => {
              // Canlı Destek has a special WhatsApp CTA
              const isSupport = feature.title.includes("Canlı Destek");
              return (
                <div 
                  key={idx} 
                  className={`group relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-xl ${isSupport ? 'hover:border-emerald-300 hover:shadow-emerald-100/50 dark:hover:border-emerald-700 dark:hover:shadow-emerald-900/20' : 'hover:border-indigo-300 hover:shadow-indigo-100/50 dark:hover:border-indigo-700 dark:hover:shadow-indigo-900/20'} animate-fade-up dark:border-slate-800 dark:bg-slate-900/50`}
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${isSupport ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400' : 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400'} transition-transform group-hover:scale-110`}>
                    {idx === 0 && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>}
                    {idx === 1 && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>}
                    {idx === 2 && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>}
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-neutral-900 dark:text-slate-100">{feature.title}</h3>
                  <p className="text-[15px] leading-relaxed text-neutral-600 mb-6 dark:text-slate-400">{feature.description}</p>
                  
                  {isSupport && (
                    <a 
                      href="https://wa.me/905315800753" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-[13px] font-bold text-emerald-700 transition-colors hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-900/50"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      WhatsApp'tan Ulaşın
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning Journey / Steps */}
      <section className="py-24 transition-colors duration-300">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-16 text-center animate-fade-up">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl dark:text-slate-100">Öğrenme Yolculuğu</h2>
            <p className="mt-4 text-neutral-600 dark:text-slate-400">Sıfırdan uzmanlığa 3 basit adım.</p>
          </div>
          <div className="space-y-12">
            {cms.home.steps.map((step: any, idx: number) => (
              <div key={idx} className="relative flex gap-8 md:gap-12 animate-fade-up" style={{ animationDelay: `${idx * 200}ms` }}>
                {/* Connecting Line */}
                {idx !== cms.home.steps.length - 1 && (
                  <div className="absolute left-[27px] top-[60px] h-[calc(100%-20px)] w-0.5 bg-indigo-100 hidden md:block dark:bg-indigo-900/50" />
                )}
                <div className="shrink-0">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-indigo-100 shadow-sm text-lg font-black text-indigo-600 dark:bg-indigo-950/30 dark:border-indigo-800/50 dark:text-indigo-400">
                    {step.number}
                  </div>
                </div>
                <div className="pt-3">
                  <h3 className="mb-2 text-xl font-bold text-neutral-900 dark:text-slate-100">{step.title}</h3>
                  <p className="text-neutral-600 leading-relaxed max-w-xl dark:text-slate-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Area */}
      <section className="py-24 px-4 transition-colors duration-300">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-900 via-violet-900 to-fuchsia-900 relative shadow-2xl animate-fade-in text-center p-12 md:p-20 dark:from-indigo-950 dark:via-violet-950 dark:to-fuchsia-950 dark:shadow-none">
          <div className="absolute -top-[50%] -left-[10%] h-[500px] w-[500px] rounded-full bg-indigo-400/30 blur-[100px] animate-pulse-slow mix-blend-overlay" />
          <div className="absolute -bottom-[50%] -right-[10%] h-[500px] w-[500px] rounded-full bg-fuchsia-400/30 blur-[100px] animate-pulse-slow delay-300 mix-blend-overlay" />
          
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="mb-6 text-4xl font-black tracking-tight text-white md:text-5xl">{cms.home.cta.title}</h2>
            <p className="mb-10 text-lg text-indigo-100/80">{cms.home.cta.subtitle}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/courses" className="rounded-full bg-white px-8 py-3.5 text-sm font-bold text-indigo-900 shadow-xl transition-transform hover:scale-105">
                {cms.home.cta.buttonPri}
              </a>
              <a href="/shop" className="rounded-full border border-white/20 bg-white/10 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-colors hover:bg-white/20">
                {cms.home.cta.buttonSec}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}