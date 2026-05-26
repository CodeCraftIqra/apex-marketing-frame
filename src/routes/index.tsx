import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import {
  Zap, Menu, X, ArrowRight, ArrowLeft, Search, Target, Share2, Palette,
  PenTool, Mail, Check, Star, TrendingUp, Users, Award, Calendar,
  AlertTriangle, MapPin, Phone, Clock, Instagram, Linkedin, Twitter, Youtube, Facebook,
  BarChart3, Megaphone, ShieldCheck, Sparkles, ChevronRight, Rocket,
} from "lucide-react";
import heroDashboard from "@/assets/hero-dashboard.png";

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
    <section id={id} className={`relative py-24 px-6 md:px-10 ${className}`}>
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
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString("en-IN"));
  useEffect(() => {
    if (inView) {
      const controls = animate(mv, to, { duration: 1.8, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, to, mv]);
  return (
    <span ref={ref} className="tabular-nums">
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
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}>
      <div className={`mx-auto max-w-7xl px-5 md:px-8 transition-all duration-300 ${scrolled ? "glass-strong rounded-2xl mx-4 md:mx-auto" : ""}`}>
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
          <a href="#contact" className="hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-cta px-5 py-2.5 text-sm font-semibold text-brand-orange-foreground shadow-glow-orange hover:scale-105 transition-transform">
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

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section id="home" className="relative pt-36 pb-20 px-6 md:px-10 overflow-hidden">
      {/* gradient orbs */}
      <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-brand-blue/20 blur-3xl animate-float" />
      <div className="absolute top-40 right-0 w-[28rem] h-[28rem] rounded-full bg-brand-orange/15 blur-3xl animate-float-slow" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-primary/15 blur-3xl animate-pulse-glow" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,oklch(0.30_0.12_270/0.4),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
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
            <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-cta px-7 py-3.5 text-base font-semibold text-brand-orange-foreground shadow-glow-orange hover:scale-105 transition-transform">
              Get Free Strategy Call <ArrowRight size={18} />
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
          <div className="relative">
            <div className="absolute -inset-8 bg-brand-blue/20 blur-3xl rounded-full" />
            <motion.img
              src={heroDashboard}
              alt="Analytics dashboard"
              width={1280}
              height={1024}
              className="relative w-full drop-shadow-2xl"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
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
            <div className="group glass rounded-2xl p-6 h-full hover:shadow-glow-red transition-all hover:-translate-y-1 hover:border-destructive/40 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-destructive/10 blur-2xl group-hover:bg-destructive/20 transition-colors" />
              <div className="relative">
                <div className="h-12 w-12 rounded-xl bg-destructive/15 grid place-items-center text-destructive">
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

/* ---------- Solution ---------- */
function Solutions() {
  const blocks = [
    { icon: TrendingUp, t: "Traffic That Converts", d: "SEO + content strategy engineered to attract qualified buyers — not just visitors. We rank you for the keywords that actually drive revenue." },
    { icon: Target, t: "Ads That Actually Work", d: "Performance marketing built around measurable ROI. Every rupee spent is tracked, tested, and optimized — not just for clicks, but for closed deals." },
    { icon: ShieldCheck, t: "Brand That People Trust", d: "Social media + branding that builds long-term authority. We turn your audience into a community, and your community into customers." },
  ];
  return (
    <Section id="solutions">
      <FadeIn>
        <div className="text-center max-w-3xl mx-auto">
          <Eyebrow>The Solution</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">How We <span className="gradient-text">Transform</span> Your Business</h2>
        </div>
      </FadeIn>

      <div className="mt-20 space-y-24">
        {blocks.map((b, i) => {
          const reverse = i % 2 === 1;
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
                  <div className="glass-strong rounded-3xl p-8 aspect-[4/3] flex items-center justify-center overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-blue opacity-10" />
                    <b.icon size={140} className="text-brand-blue opacity-80" strokeWidth={1.2} />
                    <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-brand-orange/20 blur-3xl" />
                  </div>
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
    { icon: Target, t: "Paid Advertising (PPC & Meta Ads)", d: "Maximize your ad spend with laser-targeted campaigns across Google, Meta & more.", cta: "Explore Paid Ads" },
    { icon: Share2, t: "Social Media Marketing", d: "Build a loyal community and drive engagement across Instagram, LinkedIn & Facebook.", cta: "Explore Social Media" },
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
    const interval = setInterval(() => emblaApi.scrollNext(), 4500);
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
            <button onClick={() => emblaApi?.scrollPrev()} className="h-12 w-12 rounded-full glass hover:bg-brand-blue/20 grid place-items-center" aria-label="Previous">
              <ArrowLeft size={18} />
            </button>
            <button onClick={() => emblaApi?.scrollNext()} className="h-12 w-12 rounded-full bg-gradient-cta shadow-glow-orange grid place-items-center text-brand-orange-foreground" aria-label="Next">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </FadeIn>

      <div className="mt-12 overflow-hidden -mx-4" ref={emblaRef}>
        <div className="flex">
          {services.map((s) => (
            <div key={s.t} className="flex-[0_0_85%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4">
              <div className="group glass rounded-3xl p-7 h-full hover:-translate-y-2 transition-all duration-300 hover:shadow-glow-blue relative overflow-hidden">
                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-brand-blue/10 blur-2xl group-hover:bg-brand-orange/20 transition-colors" />
                <div className="relative">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-blue grid place-items-center shadow-glow-blue group-hover:bg-gradient-cta group-hover:shadow-glow-orange transition-all">
                    <s.icon size={26} className="text-primary-foreground" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold">{s.t}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed min-h-[4.5rem]">{s.d}</p>
                  <a href="#contact" className="mt-6 inline-flex items-center gap-2 text-brand-orange font-semibold text-sm group/cta">
                    {s.cta} <ArrowRight size={16} className="group-hover/cta:translate-x-1 transition-transform" />
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

  const compareRows = [
    ["SEO", "Basic", "Advanced", "Full Suite", "Enterprise"],
    ["Social Platforms", "2", "3 + Reels", "All", "All + PR"],
    ["Paid Ads", "—", "Google + Meta", "Google + Meta + LinkedIn", "Custom"],
    ["Dedicated Manager", "—", "—", "✓", "Team of 5+"],
    ["Reporting", "Monthly", "Bi-weekly", "Weekly", "Real-time"],
    ["Support", "Email", "WhatsApp", "24/7 Priority", "SLA-backed"],
  ];

  return (
    <Section id="pricing">
      <FadeIn>
        <div className="text-center max-w-3xl mx-auto">
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">Choose Your <span className="gradient-text">Growth Plan</span></h2>
          <p className="mt-4 text-muted-foreground">Transparent pricing. No hidden charges. Pure results.</p>
        </div>
      </FadeIn>

      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((p, i) => (
          <FadeIn key={p.name} delay={i * 0.08}>
            <div className={`relative h-full rounded-3xl p-7 flex flex-col ${
              p.featured
                ? "bg-gradient-to-b from-brand-blue/20 to-brand-orange/10 border-2 border-brand-orange/50 shadow-glow-orange scale-[1.02]"
                : "glass hover:border-brand-blue/40 transition-colors"
            }`}>
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-gradient-cta px-3 py-1 text-xs font-bold text-brand-orange-foreground shadow-glow-orange">
                  <Star size={12} fill="currentColor" /> MOST POPULAR
                </div>
              )}
              <div className="text-xs uppercase tracking-wider text-brand-blue font-semibold">{p.tag}</div>
              <h3 className="mt-2 text-xl font-bold">{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">{p.price}</span>
                {p.price !== "Custom" && <span className="text-sm text-muted-foreground">+ 18% GST</span>}
              </div>
              <ul className="mt-6 space-y-3 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm">
                    <Check size={18} className={p.featured ? "text-brand-orange shrink-0" : "text-brand-blue shrink-0"} />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact" className={`mt-7 inline-flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-all ${
                p.featured
                  ? "bg-gradient-cta text-brand-orange-foreground shadow-glow-orange hover:scale-105 animate-pulse-glow"
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
        <div className="mt-16 glass rounded-3xl p-2 overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="text-left">
                <th className="p-4 font-semibold text-muted-foreground">Feature</th>
                {plans.map((p) => (
                  <th key={p.name} className={`p-4 font-bold ${p.featured ? "text-brand-orange" : ""}`}>{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row) => (
                <tr key={row[0]} className="border-t border-border">
                  <td className="p-4 font-medium text-muted-foreground">{row[0]}</td>
                  {row.slice(1).map((cell, i) => (
                    <td key={i} className="p-4">{cell}</td>
                  ))}
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
  const logos = ["TechNova", "BuildRight", "FashionCo", "EduSpark", "HealthPlus", "RetailMax"];
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
  return (
    <Section id="about">
      <FadeIn>
        <div className="text-center max-w-3xl mx-auto">
          <Eyebrow>Trusted Worldwide</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">Trusted by <span className="gradient-text">500+ Businesses</span> Across India</h2>
        </div>
      </FadeIn>

      <FadeIn>
        <div className="mt-12 glass rounded-3xl p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {logos.map((l) => (
            <div key={l} className="text-center">
              <div className="text-lg md:text-xl font-bold tracking-tight text-muted-foreground hover:text-foreground transition-colors">
                {l}
              </div>
            </div>
          ))}
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

      {/* Testimonials */}
      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((t, i) => (
          <FadeIn key={t.n} delay={i * 0.08}>
            <div className="glass rounded-2xl p-6 h-full hover:border-brand-orange/40 transition-colors">
              <div className="flex gap-1 text-brand-orange">
                {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">"{t.q}"</p>
              <div className="mt-5 pt-5 border-t border-border">
                <div className="font-semibold text-sm">{t.n}</div>
                <div className="text-xs text-muted-foreground">{t.r}</div>
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
  return (
    <Section>
      <FadeIn>
        <div className="relative rounded-[2rem] overflow-hidden p-10 md:p-20 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/30 via-primary/20 to-brand-orange/30" />
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-brand-blue/40 blur-3xl animate-pulse-glow" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-brand-orange/30 blur-3xl animate-float" />
          <div className="absolute inset-0 backdrop-blur-3xl glass-strong" />

          <div className="relative">
            <Rocket size={48} className="mx-auto text-brand-orange mb-4" />
            <h2 className="text-3xl md:text-6xl font-extrabold tracking-tight">
              Ready to <span className="gradient-text">10X</span> Your Business Growth?
            </h2>
            <p className="mt-5 max-w-2xl mx-auto text-lg text-muted-foreground">
              Book a FREE 30-minute strategy call with our experts and get a custom growth plan for your business.
            </p>
            <a href="#contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-cta px-8 py-4 text-base md:text-lg font-bold text-brand-orange-foreground shadow-glow-orange hover:scale-105 transition-transform">
              Book My Free Strategy Call <ArrowRight size={20} />
            </a>
            <p className="mt-4 text-xs text-muted-foreground">No credit card required. No obligations. Just results.</p>
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
            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-cta py-4 text-base font-bold text-brand-orange-foreground shadow-glow-orange hover:scale-[1.02] transition-transform">
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
  const socials = [Instagram, Linkedin, Twitter, Youtube, Facebook];
  return (
    <footer className="relative border-t border-border mt-10">
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
            {socials.map((Icon, i) => (
              <a key={i} href="#" className="h-10 w-10 rounded-full glass grid place-items-center hover:bg-gradient-cta hover:shadow-glow-orange transition-all" aria-label="Social link">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
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
    </div>
  );
}
