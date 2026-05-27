import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import {
  Zap, Menu, X, ArrowRight, ArrowLeft, Search, Target, Share2, Palette,
  PenTool, Mail, Check, X as XIcon, Star, TrendingUp, Users, Award, Calendar,
  AlertTriangle, MapPin, Phone, Clock, Instagram, Linkedin, Twitter, Youtube, Facebook,
  BarChart3, Megaphone, ShieldCheck, Sparkles, ChevronRight, Rocket, BadgeCheck,
  ArrowUp, Globe, Flame, Layers, Hexagon, Triangle, Circle as CircleIcon,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "AprisityDigital — Data-Driven Digital Marketing Agency" },
      { name: "description", content: "Grow your business with SEO, Paid Ads, Social Media & Performance Marketing. 500+ clients, ₹50Cr+ revenue generated, 98% retention." },
      { property: "og:title", content: "AprisityDigital — Data-Driven Digital Marketing Agency" },
      { property: "og:description", content: "Results-driven. ROI-focused. Book a free strategy call today." },
    ],
  }),
});

/* ---------- Reusable bits ---------- */
function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative py-20 md:py-24 px-5 sm:px-6 md:px-10 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-brand-blue">
      <Sparkles size={14} /> {children}
    </div>
  );
}

function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString("en-IN"));
  useEffect(() => {
    if (inView) {
      mv.set(0);
      const controls = animate(mv, to, { duration: 2, ease: [0.22, 1, 0.36, 1] });
      return controls.stop;
    }
  }, [inView, to, mv]);
  return (
    <span ref={ref} className="tabular-nums inline-flex items-baseline">
      {prefix}<motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
}

function FadeIn({ children, delay = 0, y = 24 }: { children: React.ReactNode; delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Navbar ---------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { href: "#home", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#pricing", label: "Pricing" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-5"}`}>
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 md:px-8 transition-all duration-300 ${scrolled ? "glass-strong rounded-2xl mx-3 md:mx-auto backdrop-blur-xl" : ""}`}>
        <div className="flex items-center justify-between h-14">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="relative h-9 w-9 rounded-xl bg-gradient-cta grid place-items-center shadow-glow-orange">
              <Zap size={18} className="text-brand-orange-foreground" fill="currentColor" />
            </div>
            <span className="text-lg font-bold tracking-tight">Aprisity<span className="text-brand-blue">Digital</span></span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group">
                {l.label}
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-brand-orange transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>
          <a href="#contact" className="hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-cta px-5 py-2.5 text-sm font-semibold text-brand-orange-foreground shadow-glow-orange hover:scale-105 transition-transform animate-cta-pulse">
            Get Free Consultation <ArrowRight size={16} />
          </a>
          <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="md:hidden glass-strong rounded-2xl mt-3 p-5 space-y-3">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-sm py-2 text-muted-foreground hover:text-foreground">
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="block text-center rounded-full bg-gradient-cta py-2.5 text-sm font-semibold text-brand-orange-foreground">
              Get Free Consultation
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

/* ---------- Hero with HTML/CSS analytics mockup ---------- */
function DashboardMockup() {
  const bars = [42, 65, 38, 78, 55, 88, 72, 95, 60, 82, 70, 100];
  return (
    <div className="relative animate-float-y">
      {/* glowing gradient behind */}
      <div className="absolute -inset-10 bg-gradient-to-br from-brand-blue/30 via-primary/30 to-brand-orange/30 blur-3xl rounded-full opacity-70" />

      <div className="relative glass-strong rounded-3xl p-5 md:p-6 shadow-glow-blue">
        {/* Window chrome */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-brand-orange/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-success/80" />
          </div>
          <div className="text-[10px] text-muted-foreground font-mono">aprisity.dashboard / analytics</div>
          <div className="text-[10px] text-success font-semibold">● LIVE</div>
        </div>

        {/* Metric cards */}
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {[
            { l: "Organic Traffic", v: "+340%", c: "text-brand-blue" },
            { l: "Conversions",   v: "+180%", c: "text-success" },
            { l: "ROI",            v: "300%",  c: "text-brand-orange" },
          ].map((m) => (
            <div key={m.l} className="glass rounded-xl p-3">
              <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{m.l}</div>
              <div className={`mt-1 text-base md:text-lg font-bold ${m.c}`}>{m.v}</div>
              <div className="mt-1 h-1 rounded-full bg-white/10 overflow-hidden">
                <div className={`h-full ${m.c.replace("text-", "bg-")}`} style={{ width: "78%" }} />
              </div>
            </div>
          ))}
        </div>

        {/* Chart + donut */}
        <div className="mt-4 grid grid-cols-5 gap-3">
          {/* Bar chart */}
          <div className="col-span-3 glass rounded-xl p-3">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-semibold">Revenue Growth</div>
              <div className="text-[10px] text-success">▲ 24.8%</div>
            </div>
            <div className="mt-3 h-28 flex items-end gap-1.5">
              {bars.map((h, i) => (
                <div key={i} className="flex-1 rounded-t-sm bg-gradient-to-t from-brand-blue to-primary animate-bar"
                     style={{ height: `${h}%`, animationDelay: `${i * 80}ms` }} />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[8px] text-muted-foreground">
              <span>Jan</span><span>Mar</span><span>Jun</span><span>Sep</span><span>Dec</span>
            </div>
          </div>

          {/* Donut */}
          <div className="col-span-2 glass rounded-xl p-3 flex flex-col items-center">
            <div className="text-[10px] font-semibold self-start">Traffic Sources</div>
            <div className="relative mt-2 h-24 w-24">
              <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="oklch(1 0 0 / 0.08)" strokeWidth="3.5" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--brand-blue)" strokeWidth="3.5" strokeDasharray="48 100" strokeLinecap="round" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--brand-orange)" strokeWidth="3.5" strokeDasharray="28 100" strokeDashoffset="-48" strokeLinecap="round" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--success)" strokeWidth="3.5" strokeDasharray="24 100" strokeDashoffset="-76" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <div className="text-sm font-bold">48%</div>
                  <div className="text-[8px] text-muted-foreground">Organic</div>
                </div>
              </div>
            </div>
            <div className="mt-2 space-y-1 w-full text-[9px]">
              <div className="flex items-center justify-between"><span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />Organic</span><span>48%</span></div>
              <div className="flex items-center justify-between"><span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />Paid Ads</span><span>28%</span></div>
              <div className="flex items-center justify-between"><span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-success" />Social</span><span>24%</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating notification card */}
      <div className="absolute -bottom-6 -left-4 md:-left-8 glass-strong rounded-2xl px-4 py-3 shadow-glow-orange max-w-[200px] animate-float-y" style={{ animationDelay: "1.5s" }}>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-cta grid place-items-center">
            <TrendingUp size={14} className="text-brand-orange-foreground" />
          </div>
          <div>
            <div className="text-[10px] text-muted-foreground">New conversion</div>
            <div className="text-xs font-bold text-success">+ ₹12,400</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative pt-32 md:pt-36 pb-20 px-5 sm:px-6 md:px-10 overflow-hidden">
      {/* gradient orbs */}
      <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-brand-blue/20 blur-3xl animate-float" />
      <div className="absolute top-40 right-0 w-[28rem] h-[28rem] rounded-full bg-brand-orange/15 blur-3xl animate-float-slow" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-primary/15 blur-3xl animate-pulse-glow" />
      <div className="noise-overlay" />

      <div className="relative mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <FadeIn>
          <Eyebrow>Performance Marketing Agency</Eyebrow>
          <h1 className="mt-5 text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight">
            Grow Your Business With <span className="gradient-text">Data-Driven</span> Digital Marketing
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            We help brands scale revenue through SEO, Paid Ads, Social Media & Performance Marketing.
            Results-driven. ROI-focused.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-cta px-7 py-3.5 text-base font-semibold text-brand-orange-foreground shadow-glow-orange hover:scale-105 transition-transform animate-cta-pulse">
              Get Free Strategy Call
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#services" className="inline-flex items-center justify-center gap-2 rounded-full border border-border glass px-7 py-3.5 text-base font-semibold hover:border-brand-blue/60 transition-colors">
              View Our Work
            </a>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-xl">
            {[
              { v: "500+", l: "Clients" },
              { v: "₹50Cr+", l: "Revenue Generated" },
              { v: "98%", l: "Client Retention" },
            ].map((t) => (
              <div key={t.l} className="glass rounded-2xl p-4 text-center">
                <div className="text-xl md:text-2xl font-bold text-brand-orange">{t.v}</div>
                <div className="text-xs text-muted-foreground mt-1">{t.l}</div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.2} y={40}>
          <DashboardMockup />
        </FadeIn>
      </div>
    </section>
  );
}

/* ---------- Pain Points ---------- */
function PainPoints() {
  const items = [
    { t: "Low Website Traffic & Zero Visibility", d: "Your site exists but no one finds it on Google search results." },
    { t: "Wasting Budget on Ads That Don't Convert", d: "Spending money on clicks that never turn into customers." },
    { t: "Inconsistent Social Media Presence", d: "Posting randomly without strategy or engagement growth." },
    { t: "Poor Lead Quality & Low Sales", d: "Leads come in but none of them are ready to buy." },
    { t: "No Clear Digital Marketing Strategy", d: "Trying random tactics with no roadmap to revenue." },
    { t: "Competitors Outranking You on Google", d: "Watching your rivals capture customers that should be yours." },
  ];
  return (
    <Section id="problems">
      <FadeIn>
        <div className="text-center max-w-3xl mx-auto">
          <Eyebrow>The Challenges</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">Are You Struggling With...</h2>
          <p className="mt-4 text-muted-foreground">If any of these sound familiar, you're not alone. We fix them every day.</p>
        </div>
      </FadeIn>
      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <FadeIn key={it.t} delay={i * 0.07}>
            <div className="group relative glass rounded-2xl p-6 h-full border-l-4 border-l-destructive/60 hover:bg-destructive/5 hover:shadow-glow-red transition-all hover:-translate-y-1 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-destructive/10 blur-2xl group-hover:bg-destructive/20 transition-colors" />
              <div className="relative">
                <div className="h-12 w-12 rounded-xl bg-destructive/15 grid place-items-center text-destructive ring-1 ring-destructive/30">
                  <AlertTriangle size={22} />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{it.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.d}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Solutions ---------- */
function TrafficMockup() {
  const bars = [
    { m: "Jan", h: 28 }, { m: "Feb", h: 44 }, { m: "Mar", h: 58 }, { m: "Apr", h: 76 }, { m: "May", h: 96 },
  ];
  return (
    <div className="glass-strong rounded-3xl p-6 md:p-8 aspect-[4/3] relative overflow-hidden">
      <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-brand-blue/20 blur-3xl" />
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-muted-foreground">Organic Traffic</div>
          <div className="text-2xl font-bold mt-1">+340% <span className="text-sm text-success">▲</span></div>
        </div>
        <div className="rounded-full bg-success/15 text-success text-xs font-semibold px-3 py-1.5">+340% Traffic</div>
      </div>
      <div className="mt-6 flex items-end gap-3 h-32">
        {bars.map((b) => (
          <div key={b.m} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full rounded-t-lg animate-bar" style={{ height: `${b.h}%`, background: "linear-gradient(180deg, var(--brand-blue), oklch(0.72 0.18 150))" }} />
            <div className="text-[10px] text-muted-foreground">{b.m}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdsMockup() {
  return (
    <div className="glass-strong rounded-3xl p-6 md:p-8 aspect-[4/3] relative overflow-hidden">
      <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-brand-orange/15 blur-3xl" />
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Campaign ROI</div>
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-white/90 grid place-items-center text-[10px] font-bold text-blue-600">G</span>
          <span className="h-6 w-6 rounded-full bg-white/90 grid place-items-center text-[10px] font-bold text-blue-700">f</span>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <div className="glass rounded-xl p-3">
          <div className="text-[10px] text-muted-foreground">Ad Spend</div>
          <div className="text-base font-bold mt-1">₹50,000</div>
        </div>
        <ArrowRight size={18} className="text-brand-orange" />
        <div className="glass rounded-xl p-3">
          <div className="text-[10px] text-muted-foreground">Revenue</div>
          <div className="text-base font-bold mt-1">₹1,85,000</div>
        </div>
      </div>
      <div className="mt-5 rounded-2xl bg-gradient-to-r from-success/15 to-brand-blue/10 border border-success/20 px-4 py-3 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Return on Investment</span>
        <span className="text-2xl font-bold text-success">270%</span>
      </div>
    </div>
  );
}

function BrandMockup() {
  return (
    <div className="glass-strong rounded-3xl p-6 md:p-8 aspect-[4/3] relative overflow-hidden">
      <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-brand-orange/15 blur-3xl" />
      <div className="glass rounded-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5">
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-fuchsia-500 via-rose-500 to-amber-400" />
          <div className="text-xs font-semibold">aprisitydigital</div>
          <span className="ml-auto text-[10px] text-muted-foreground">2h</span>
        </div>
        <div className="h-20 bg-gradient-to-br from-brand-blue/30 to-brand-orange/30 grid place-items-center">
          <Sparkles size={28} className="text-white/80" />
        </div>
        <div className="grid grid-cols-3 text-center text-xs py-2">
          <div><div className="font-bold">12.4K</div><div className="text-[10px] text-muted-foreground">Likes</div></div>
          <div className="border-x border-white/5"><div className="font-bold">847</div><div className="text-[10px] text-muted-foreground">Comments</div></div>
          <div><div className="font-bold">2.1K</div><div className="text-[10px] text-muted-foreground">Shares</div></div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl glass px-3 py-2">
        <span className="text-xs text-muted-foreground">Follower growth</span>
        <span className="text-sm font-bold text-success">+5,200 this month</span>
      </div>
    </div>
  );
}

function Solutions() {
  const blocks = [
    { icon: TrendingUp, t: "Traffic That Converts", d: "SEO + content strategy engineered to attract qualified buyers — not just visitors. We rank you for the keywords that actually drive revenue.", Mock: TrafficMockup },
    { icon: Target, t: "Ads That Actually Work", d: "Performance marketing built around measurable ROI. Every rupee spent is tracked, tested, and optimized — not just for clicks, but for closed deals.", Mock: AdsMockup },
    { icon: ShieldCheck, t: "Brand That People Trust", d: "Social media + branding that builds long-term authority. We turn your audience into a community, and your community into customers.", Mock: BrandMockup },
  ];
  return (
    <Section id="solutions">
      <FadeIn>
        <div className="text-center max-w-3xl mx-auto">
          <Eyebrow>The Solution</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">How We <span className="gradient-text">Transform</span> Your Business</h2>
        </div>
      </FadeIn>

      <div className="mt-20 space-y-20 md:space-y-24">
        {blocks.map((b, i) => {
          const reverse = i % 2 === 1;
          const Mock = b.Mock;
          return (
            <FadeIn key={b.t}>
              <div className={`grid lg:grid-cols-2 gap-10 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div>
                  <div className="inline-flex h-14 w-14 rounded-2xl bg-gradient-blue items-center justify-center shadow-glow-blue">
                    <b.icon className="text-primary-foreground" size={26} />
                  </div>
                  <h3 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight">{b.t}</h3>
                  <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{b.d}</p>
                  <a href="#services" className="mt-6 inline-flex items-center gap-2 text-brand-orange font-semibold group">
                    Learn More <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
                <div className="relative">
                  <Mock />
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>

      <FadeIn>
        <div className="mt-24 grid sm:grid-cols-3 gap-6">
          {[
            { v: 300, suffix: "%", l: "Average ROI" },
            { v: 2, suffix: "X", l: "Lead Growth" },
            { v: 3, prefix: "Top ", suffix: "", l: "Google Rankings" },
          ].map((s) => (
            <div key={s.l} className="glass rounded-2xl p-8 text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text">
                <Counter to={s.v} prefix={s.prefix ?? ""} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}

/* ---------- Services Slider ---------- */
function Services() {
  const services = [
    { icon: Search, t: "SEO & Search Visibility", d: "Rank #1 on Google and drive organic traffic that converts into real customers.", cta: "Explore SEO" },
    { icon: Target, t: "Paid Advertising (PPC & Meta)", d: "Maximize your ad spend with laser-targeted campaigns across Google, Meta & more.", cta: "Explore Paid Ads" },
    { icon: Share2, t: "Social Media Marketing", d: "Build a loyal community and drive engagement across Instagram, LinkedIn & Facebook.", cta: "Explore Social" },
    { icon: Palette, t: "Branding & Identity", d: "Create a powerful brand identity that builds trust and stands out in the market.", cta: "Explore Branding" },
    { icon: PenTool, t: "Content Creation & Strategy", d: "Compelling content that educates your audience and drives them to take action.", cta: "Explore Content" },
    { icon: Mail, t: "Email Marketing & Automation", d: "Nurture leads and retain customers with personalized email sequences that convert.", cta: "Explore Email" },
  ];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    setSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
    const interval = setInterval(() => emblaApi.scrollNext(), 3000);
    return () => { clearInterval(interval); emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <Section id="services">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <Eyebrow>What We Do</Eyebrow>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">Our Core Services</h2>
            <p className="mt-4 text-muted-foreground">A full-stack growth team for brands that mean business.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => emblaApi?.scrollPrev()} className="h-12 w-12 rounded-full glass hover:bg-brand-blue/20 grid place-items-center transition-colors" aria-label="Previous">
              <ArrowLeft size={18} />
            </button>
            <button onClick={() => emblaApi?.scrollNext()} className="h-12 w-12 rounded-full bg-gradient-cta shadow-glow-orange grid place-items-center text-brand-orange-foreground hover:scale-105 transition-transform" aria-label="Next">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </FadeIn>

      <div className="mt-12 overflow-hidden -mx-4" ref={emblaRef}>
        <div className="flex transition-transform duration-700 ease-out">
          {services.map((s) => (
            <div key={s.t} className="flex-[0_0_85%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4">
              <div className="group glass rounded-3xl p-7 h-full hover:-translate-y-2 transition-all duration-300 hover:shadow-glow-blue hover:border-brand-blue/50 relative overflow-hidden">
                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-brand-blue/10 blur-2xl group-hover:bg-brand-blue/25 transition-colors" />
                <div className="relative">
                  <div className="h-14 w-14 rounded-full bg-gradient-blue grid place-items-center shadow-glow-blue group-hover:shadow-glow-orange transition-all">
                    <s.icon size={26} className="text-primary-foreground" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold">{s.t}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed min-h-[4.5rem]">{s.d}</p>
                  <a href="#contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-cta px-5 py-2.5 text-sm font-semibold text-brand-orange-foreground shadow-glow-orange hover:scale-105 transition-transform">
                    {s.cta} <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {snaps.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-2 rounded-full transition-all ${selected === i ? "w-8 bg-brand-orange" : "w-2 bg-muted"}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </Section>
  );
}

/* ---------- Pricing ---------- */
function Pricing() {
  const plans = [
    {
      name: "Brand Kickstart", price: "₹15,000", tag: "Perfect for Startups",
      features: ["Basic SEO Setup", "Social Media Management (2 platforms)", "8 Social Media Posts/month", "Google My Business Setup", "Monthly Performance Report", "Email Support"],
      cta: "Get Started", featured: false,
    },
    {
      name: "Growth Engine", price: "₹35,000", tag: "For Growing Businesses",
      features: ["Advanced SEO + Content (4 blogs/month)", "Social Media (3 platforms + reels)", "Google + Meta Ads Management", "Landing Page Design", "Lead Generation Campaign", "Bi-weekly Reports + Strategy Call", "WhatsApp Support"],
      cta: "Scale Now", featured: false,
    },
    {
      name: "Revenue Accelerator", price: "₹65,000", tag: "For Serious Growth",
      features: ["Full SEO + 8 Blogs/month", "Social Media (all platforms)", "Advanced Google + Meta + LinkedIn Ads", "Email Marketing Automation", "CRO (Conversion Rate Optimization)", "Dedicated Account Manager", "Weekly Reports + Strategy Calls", "Priority Support 24/7"],
      cta: "Accelerate Now", featured: true,
    },
    {
      name: "Infinity Enterprise", price: "Custom", tag: "For Large Enterprises",
      features: ["Everything in Revenue Accelerator", "Custom Multi-Channel Strategy", "Dedicated Team (5+ specialists)", "Full Funnel Marketing Automation", "PR & Influencer Marketing", "Custom Integrations & API", "SLA-backed Performance Guarantee", "Executive Strategy Sessions"],
      cta: "Contact Us", featured: false,
    },
  ];

  const compareRows: Array<[string, string | boolean, string | boolean, string | boolean, string | boolean]> = [
    ["SEO", "Basic", "Advanced", "Full Suite", "Enterprise"],
    ["Social Platforms", "2", "3 + Reels", "All", "All + PR"],
    ["Paid Ads", false, "Google + Meta", "Google + Meta + LinkedIn", "Custom"],
    ["Dedicated Manager", false, false, true, "Team of 5+"],
    ["Reporting", "Monthly", "Bi-weekly", "Weekly", "Real-time"],
    ["Support", "Email", "WhatsApp", "24/7 Priority", "SLA-backed"],
    ["Conversion Optimization", false, false, true, true],
  ];

  const renderCell = (v: string | boolean) => {
    if (v === true) return <Check size={18} className="text-success mx-auto" />;
    if (v === false) return <XIcon size={18} className="text-muted-foreground/50 mx-auto" />;
    return <span>{v}</span>;
  };

  return (
    <Section id="pricing">
      <FadeIn>
        <div className="text-center max-w-3xl mx-auto">
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">Choose Your <span className="gradient-text">Growth Plan</span></h2>
          <p className="mt-4 text-muted-foreground">Transparent pricing. No hidden charges. Pure results.</p>
        </div>
      </FadeIn>

      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {plans.map((p, i) => (
          <FadeIn key={p.name} delay={i * 0.08}>
            <div className={`relative h-full rounded-3xl p-7 flex flex-col transition-all hover:-translate-y-2 ${
              p.featured
                ? "bg-gradient-to-b from-brand-blue/15 via-card/50 to-brand-orange/10 animate-border-glow lg:scale-[1.06] lg:-my-2"
                : "glass bg-gradient-to-b from-white/[0.04] to-transparent hover:shadow-glow-blue hover:border-brand-blue/40"
            }`}>
              {p.featured && (
                <>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-gradient-cta px-3 py-1 text-xs font-bold text-brand-orange-foreground shadow-glow-orange whitespace-nowrap">
                    <Star size={12} fill="currentColor" /> MOST POPULAR
                  </div>
                  {/* BEST VALUE ribbon */}
                  <div className="absolute -right-2 top-5 z-10">
                    <div className="relative bg-gradient-cta text-brand-orange-foreground text-[10px] font-extrabold px-3 py-1 shadow-glow-orange">
                      BEST VALUE
                      <span className="absolute -bottom-1 right-0 border-t-4 border-r-4 border-t-transparent border-r-transparent" style={{ borderTopColor: "oklch(0.55 0.18 30)", borderRightColor: "oklch(0.55 0.18 30)" }} />
                    </div>
                  </div>
                </>
              )}
              <div className="text-xs uppercase tracking-wider text-brand-blue font-semibold">{p.tag}</div>
              <h3 className="mt-2 text-xl font-bold">{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">{p.price}</span>
                {p.price !== "Custom" && <span className="text-sm text-muted-foreground">+ 18% GST</span>}
              </div>
              <ul className="mt-6 space-y-3 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm">
                    <span className="mt-0.5 h-5 w-5 rounded-full bg-success/15 grid place-items-center shrink-0">
                      <Check size={12} className="text-success" strokeWidth={3} />
                    </span>
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact" className={`mt-7 inline-flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-all ${
                p.featured
                  ? "bg-gradient-cta text-brand-orange-foreground shadow-glow-orange hover:scale-105 animate-cta-pulse"
                  : "border border-border glass hover:border-brand-orange/60"
              }`}>
                {p.cta} <ArrowRight size={16} />
              </a>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Comparison table */}
      <FadeIn>
        <div className="mt-20 glass rounded-3xl p-2 overflow-x-auto">
          <table className="w-full text-sm min-w-[720px] border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-gradient-to-r from-brand-blue/20 to-primary/20 backdrop-blur-md p-4 text-left rounded-tl-2xl font-semibold">Feature</th>
                {plans.map((p, idx) => (
                  <th key={p.name} className={`p-4 font-bold text-center ${idx === plans.length - 1 ? "rounded-tr-2xl" : ""} ${p.featured ? "text-brand-orange bg-brand-blue/15" : "bg-gradient-to-r from-brand-blue/20 to-primary/20"}`}>
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row, ri) => (
                <tr key={row[0] as string} className={ri % 2 === 0 ? "bg-white/[0.02]" : ""}>
                  <td className="sticky left-0 z-10 bg-card/95 backdrop-blur-md p-4 font-medium text-foreground border-t border-border">{row[0]}</td>
                  {row.slice(1).map((cell, i) => {
                    const isFeatured = i === 2;
                    return (
                      <td key={i} className={`p-4 text-center border-t border-border ${isFeatured ? "bg-brand-blue/10" : ""}`}>
                        {renderCell(cell as string | boolean)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FadeIn>
    </Section>
  );
}

/* ---------- Social Proof ---------- */
function SocialProof() {
  const logos = [
    { n: "TechNova", Icon: Hexagon, color: "text-brand-blue", weight: "font-black" },
    { n: "BuildRight", Icon: Triangle, color: "text-brand-orange", weight: "font-bold italic" },
    { n: "FashionCo", Icon: Sparkles, color: "text-foreground", weight: "font-extralight tracking-[0.25em]" },
    { n: "EduSpark", Icon: Flame, color: "text-warn", weight: "font-bold" },
    { n: "HealthPlus", Icon: ShieldCheck, color: "text-success", weight: "font-semibold" },
    { n: "RetailMax", Icon: Layers, color: "text-primary", weight: "font-extrabold uppercase tracking-tight" },
    { n: "GlobalPay", Icon: Globe, color: "text-brand-blue", weight: "font-bold" },
    { n: "FinEdge", Icon: CircleIcon, color: "text-brand-orange", weight: "font-black tracking-tighter" },
  ];
  const cases = [
    { t: "TechNova SaaS", d: "340% increase in organic traffic in 6 months", metric: "+340%", tag: "SEO" },
    { t: "FashionCo", d: "₹80L revenue generated through Meta Ads in Q1", metric: "₹80L", tag: "Paid Ads" },
    { t: "EduSpark", d: "5X lead growth with Google Ads + Landing Page optimization", metric: "5X", tag: "Lead Gen" },
  ];
  const testimonials = [
    { n: "Rahul Sharma", r: "CEO, TechNova", q: "Aprisity transformed our online presence. We went from 500 to 22,000 monthly visitors!" },
    { n: "Priya Mehta", r: "Founder, FashionCo", q: "Their Meta Ads team is phenomenal. ROI was beyond our expectations." },
    { n: "Amit Verma", r: "Director, EduSpark", q: "Best digital marketing agency we have worked with. Results speak for themselves." },
    { n: "Neha Singh", r: "CMO, HealthPlus", q: "Professional team, transparent reporting, and outstanding results every single month." },
  ];
  const avatarColors = ["4F8EF7", "FF6B35", "8B5CF6", "10B981"];

  const LogoItem = ({ l }: { l: typeof logos[number] }) => (
    <div className="flex items-center gap-2.5 px-5 whitespace-nowrap">
      <l.Icon size={22} className={l.color} strokeWidth={2.2} />
      <span className={`text-xl ${l.weight} ${l.color}`}>{l.n}</span>
    </div>
  );

  return (
    <Section id="about">
      <FadeIn>
        <div className="text-center max-w-3xl mx-auto">
          <Eyebrow>Trusted Worldwide</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">Trusted by <span className="gradient-text">500+ Businesses</span> Across India</h2>
        </div>
      </FadeIn>

      {/* Logos marquee */}
      <FadeIn>
        <div className="mt-12 glass-strong rounded-3xl py-6">
          <div className="px-6 mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground text-center">Our Clients</div>
          <div className="marquee">
            <div className="marquee-track">
              {logos.map((l) => <LogoItem key={l.n} l={l} />)}
            </div>
            <div className="marquee-track" aria-hidden="true">
              {logos.map((l) => <LogoItem key={l.n + "-2"} l={l} />)}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Case studies */}
      <div className="mt-16 grid md:grid-cols-3 gap-6">
        {cases.map((c, i) => (
          <FadeIn key={c.t} delay={i * 0.1}>
            <div className="glass rounded-3xl p-7 h-full hover:shadow-glow-blue transition-all hover:-translate-y-1 group">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider rounded-full bg-brand-blue/15 text-brand-blue px-3 py-1 font-semibold">{c.tag}</span>
                <BarChart3 size={20} className="text-muted-foreground" />
              </div>
              <div className="mt-6 text-5xl font-extrabold gradient-text">{c.metric}</div>
              <h3 className="mt-3 text-lg font-bold">{c.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
              <a href="#contact" className="mt-5 inline-flex items-center gap-2 text-brand-orange text-sm font-semibold">
                Read Case Study <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Testimonials with avatars */}
      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((t, i) => (
          <FadeIn key={t.n} delay={i * 0.08}>
            <div className="relative glass rounded-2xl p-6 h-full hover:-translate-y-1 transition-all overflow-hidden">
              {/* gradient left border */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-blue to-brand-orange" />
              <div className="flex gap-1 text-brand-orange">
                {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">"{t.q}"</p>
              <div className="mt-5 pt-5 border-t border-border flex items-center gap-3">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(t.n)}&background=${avatarColors[i % avatarColors.length]}&color=fff&size=96&bold=true`}
                  alt={t.n}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full ring-2 ring-white/10"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1 font-semibold text-sm">
                    <span className="truncate">{t.n}</span>
                    <BadgeCheck size={14} className="text-brand-blue shrink-0" />
                  </div>
                  <div className="text-xs text-muted-foreground truncate">{t.r}</div>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Stats bar */}
      <FadeIn>
        <div className="mt-16 glass-strong rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, v: 500, suffix: "+", l: "Clients" },
            { icon: TrendingUp, v: 50, prefix: "₹", suffix: "Cr+", l: "Revenue" },
            { icon: Award, v: 98, suffix: "%", l: "Retention" },
            { icon: Calendar, v: 6, suffix: " Yrs", l: "Experience" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <s.icon size={24} className="mx-auto text-brand-blue mb-2" />
              <div className="text-3xl md:text-4xl font-extrabold gradient-text">
                <Counter to={s.v} prefix={s.prefix ?? ""} suffix={s.suffix} />
              </div>
              <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}

/* ---------- Final CTA ---------- */
function FinalCTA() {
  // Pre-computed particle positions
  const particles = Array.from({ length: 18 }, (_, i) => ({
    left: `${(i * 53) % 100}%`,
    delay: `${(i * 0.4) % 7}s`,
    size: 4 + (i % 3) * 2,
  }));
  return (
    <Section>
      <FadeIn>
        <div className="relative rounded-[2rem] overflow-hidden p-10 md:p-20 text-center animated-gradient">
          <div className="absolute inset-0 backdrop-blur-2xl bg-background/30" />
          {/* particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p, i) => (
              <span key={i} className="particle" style={{ left: p.left, bottom: 0, width: p.size, height: p.size, animationDelay: p.delay }} />
            ))}
          </div>
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-brand-blue/40 blur-3xl animate-pulse-glow" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-brand-orange/30 blur-3xl animate-float" />

          <div className="relative">
            <Rocket size={48} className="mx-auto text-brand-orange mb-4" />
            <h2 className="text-3xl md:text-6xl font-extrabold tracking-tight">
              Ready to <span className="gradient-text">10X</span> Your Business Growth?
            </h2>
            <p className="mt-5 max-w-2xl mx-auto text-lg text-muted-foreground">
              Book a FREE 30-minute strategy call with our experts and get a custom growth plan for your business.
            </p>
            <a href="#contact" className="group mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-cta px-10 py-5 text-base md:text-lg font-bold text-brand-orange-foreground shadow-glow-orange hover:scale-105 transition-transform animate-cta-pulse">
              Book My Free Strategy Call
              <ArrowRight size={22} className="transition-transform group-hover:translate-x-1.5" />
            </a>
            <p className="mt-5 text-sm font-medium text-brand-orange">⚡ Limited slots available this month</p>
            <p className="mt-2 text-xs text-muted-foreground">No credit card required. No obligations. Just results.</p>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <Section id="contact">
      <FadeIn>
        <div className="text-center max-w-3xl mx-auto">
          <Eyebrow>Get In Touch</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">Let's Build Something <span className="gradient-text">Great</span></h2>
        </div>
      </FadeIn>

      <div className="mt-14 grid lg:grid-cols-5 gap-8">
        <FadeIn>
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 4000); }}
            className="lg:col-span-3 glass-strong rounded-3xl p-7 md:p-10 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Full Name" type="text" placeholder="John Doe" />
              <Field label="Business Email" type="email" placeholder="you@company.com" />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Phone Number" type="tel" placeholder="+91 98765 43210" />
              <SelectField label="Business Type" options={["E-commerce", "SaaS / Tech", "Services / Agency", "Education", "Healthcare", "Real Estate", "Other"]} />
            </div>
            <SelectField label="Monthly Marketing Budget" options={["Under ₹25,000", "₹25,000 – ₹50,000", "₹50,000 – ₹1,00,000", "₹1,00,000 – ₹3,00,000", "₹3,00,000+"]} />
            <div>
              <label className="text-sm font-medium text-muted-foreground">Message</label>
              <textarea rows={4} required placeholder="Tell us about your goals..."
                className="mt-2 w-full rounded-xl bg-input/50 border border-border px-4 py-3 text-sm focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30 focus:outline-none transition-all" />
            </div>
            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-cta py-4 text-base font-bold text-brand-orange-foreground shadow-glow-orange hover:scale-[1.02] transition-transform animate-cta-pulse">
              {sent ? "Sent! We'll be in touch ✓" : <>Send My Inquiry <ArrowRight size={18} /></>}
            </button>
          </form>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: Mail, t: "Email", v: "hello@aprisitydigital.com" },
              { icon: Phone, t: "Phone", v: "+91 98765 43210" },
              { icon: MapPin, t: "Location", v: "Bangalore, India" },
              { icon: Clock, t: "Working Hours", v: "Mon – Sat · 10AM – 7PM IST" },
            ].map((c) => (
              <div key={c.t} className="glass rounded-2xl p-5 flex items-center gap-4 hover:border-brand-blue/40 transition-colors">
                <div className="h-12 w-12 rounded-xl bg-gradient-blue grid place-items-center shrink-0 shadow-glow-blue">
                  <c.icon size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.t}</div>
                  <div className="text-sm font-semibold mt-0.5">{c.v}</div>
                </div>
              </div>
            ))}
            <div className="glass-strong rounded-2xl p-6 mt-6">
              <Megaphone size={24} className="text-brand-orange" />
              <p className="mt-3 text-sm text-muted-foreground">
                We respond to every inquiry within 2 business hours. Your growth journey starts the moment you hit send.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}

function Field({ label, type, placeholder }: { label: string; type: string; placeholder: string }) {
  return (
    <div>
      <label className="text-sm font-medium text-muted-foreground">{label}</label>
      <input type={type} required placeholder={placeholder}
        className="mt-2 w-full rounded-xl bg-input/50 border border-border px-4 py-3 text-sm focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30 focus:outline-none transition-all" />
    </div>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="text-sm font-medium text-muted-foreground">{label}</label>
      <select required defaultValue=""
        className="mt-2 w-full rounded-xl bg-input/50 border border-border px-4 py-3 text-sm focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30 focus:outline-none transition-all">
        <option value="" disabled>Select an option...</option>
        {options.map((o) => <option key={o} className="bg-background">{o}</option>)}
      </select>
    </div>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  const cols = [
    { t: "Services", l: ["SEO", "Paid Ads", "Social Media", "Branding", "Content", "Email Marketing"] },
    { t: "Company", l: ["About Us", "Case Studies", "Careers", "Blog", "Contact"] },
    { t: "Resources", l: ["Free SEO Audit", "Marketing Guides", "ROI Calculator", "Webinars", "Help Center"] },
    { t: "Legal", l: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR", "Disclaimer"] },
  ];
  const socials = [
    { Icon: Instagram, color: "hover:text-[#E1306C]" },
    { Icon: Linkedin,  color: "hover:text-[#0A66C2]" },
    { Icon: Twitter,   color: "hover:text-[#1DA1F2]" },
    { Icon: Youtube,   color: "hover:text-[#FF0000]" },
    { Icon: Facebook,  color: "hover:text-[#1877F2]" },
  ];
  return (
    <footer className="relative mt-10">
      {/* gradient top line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-brand-blue via-primary to-brand-orange" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-blue/5 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-16">
        <div className="grid lg:grid-cols-6 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-gradient-cta grid place-items-center shadow-glow-orange">
                <Zap size={18} className="text-brand-orange-foreground" fill="currentColor" />
              </div>
              <span className="text-lg font-bold">Aprisity<span className="text-brand-blue">Digital</span></span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Data-driven digital marketing that scales revenue. Built for brands that mean business.
            </p>
            <div className="mt-6">
              <div className="text-sm font-semibold mb-2">Subscribe to our newsletter</div>
              <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
                <input type="email" placeholder="your@email.com" required
                  className="flex-1 rounded-full bg-input/50 border border-border px-4 py-2.5 text-sm focus:border-brand-orange focus:outline-none" />
                <button className="rounded-full bg-gradient-cta px-4 py-2.5 text-sm font-semibold text-brand-orange-foreground shadow-glow-orange">
                  Join
                </button>
              </form>
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.t}>
              <div className="text-sm font-semibold mb-4">{c.t}</div>
              <ul className="space-y-2.5">
                {c.l.map((i) => (
                  <li key={i}><a href="#" className="text-sm text-muted-foreground hover:text-brand-orange transition-colors">{i}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm text-muted-foreground">© 2025 AprisityDigital. All rights reserved.</div>
          <div className="flex gap-3">
            {socials.map(({ Icon, color }, i) => (
              <a key={i} href="#" className={`h-10 w-10 rounded-full glass grid place-items-center text-muted-foreground transition-colors ${color}`} aria-label="Social link">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Back to top ---------- */
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-gradient-cta text-brand-orange-foreground shadow-glow-orange grid place-items-center hover:scale-110 transition-transform animate-cta-pulse"
    >
      <ArrowUp size={20} />
    </button>
  );
}

/* ---------- Page ---------- */
function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <PainPoints />
        <Solutions />
        <Services />
        <Pricing />
        <SocialProof />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
