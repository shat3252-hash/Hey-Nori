import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Footer, Header } from "@/components/official/OfficialLayout";
import confidenceFast from "@/assets/home/confidence-fast.svg";
import confidencePrivacy from "@/assets/home/confidence-privacy.svg";
import confidenceSupport from "@/assets/home/confidence-support.svg";
import confidenceWarranty from "@/assets/home/confidence-warranty.svg";
import dailyAfternoonImage from "@/assets/home/daily-afternoon@2x.png";
import dailyEveningImage from "@/assets/home/daily-evening@2x.png";
import dailyIconBell from "@/assets/home/daily-icon-bell.svg";
import dailyIconCheckSquare from "@/assets/home/daily-icon-check-square.svg";
import dailyIconGrocery from "@/assets/home/daily-icon-grocery.svg";
import dailyIconMoon from "@/assets/home/daily-icon-moon.svg";
import dailyIconSun from "@/assets/home/daily-icon-sun.svg";
import dailyIconSunset from "@/assets/home/daily-icon-sunset.svg";
import dailyMorningImage from "@/assets/home/daily-morning@2x.png";
import everywhere1 from "@/assets/home/everywhere-figma-1@2x.png";
import everywhere2 from "@/assets/home/everywhere-figma-2@2x.png";
import everywhere3 from "@/assets/home/everywhere-figma-3@2x.png";
import heroImage from "@/assets/home/hero-family-ai-brain.png";
import life1 from "@/assets/home/life-1.png";
import life2 from "@/assets/home/life-2.png";
import life3 from "@/assets/home/life-3.png";
import life4 from "@/assets/home/life-4.png";
import memoryKeyIcon from "@/assets/home/memory-key@2x.png";
import memoryPeanutIcon from "@/assets/home/memory-peanut@2x.png";
import moduleCalendarIcon from "@/assets/home/module-calendar-fill.svg";
import moduleMealplanIcon from "@/assets/home/module-mealplan-fill.svg";
import moduleTaskIcon from "@/assets/home/module-task-fill.svg";
import pressStripBreaking from "@/assets/home/press-strip-breaking.svg";
import pressStripGadgetMark from "@/assets/home/press-strip-gadget-mark.svg";
import pressStripGadgetWord from "@/assets/home/press-strip-gadget-word.svg";
import pressStripGeeky from "@/assets/home/press-strip-geeky.svg";
import pressStripIntroduces from "@/assets/home/press-strip-introduces.svg";
import pressStripLaunches from "@/assets/home/press-strip-launches.svg";
import pressStripNoriAi from "@/assets/home/press-strip-nori-ai.svg";
import productFramePhoto from "@/assets/home/product-frame-photo.png";
import productFrameSwatches from "@/assets/home/product-frame-swatches.svg";
import productHubDevice from "@/assets/home/product-hub-device.png";
import storeAppleMark from "@/assets/home/store-apple-mark.svg";
import storeAppleWord from "@/assets/home/store-apple-word.svg";
import storeGoogleMark from "@/assets/home/store-google-mark.svg";
import storeGoogleWord from "@/assets/home/store-google-word.svg";
import storeWebMark from "@/assets/home/store-web-mark.svg";
import testimonialArrowLeft from "@/assets/home/testimonial-arrow-left.svg";
import testimonialArrowRight from "@/assets/home/testimonial-arrow-right.svg";
import testimonialAvatarDiana from "@/assets/home/testimonial-avatar-diana.png";
import testimonialAvatarEmily from "@/assets/home/testimonial-avatar-emily.png";
import testimonialAvatarMark from "@/assets/home/testimonial-avatar-mark.png";
import testimonialAvatarSarah from "@/assets/home/testimonial-avatar-sarah.png";
import testimonialStar from "@/assets/home/testimonial-star.svg";
import whyNoriShowcase from "@/assets/home/why-nori-showcase-figma@2x.png";

type ActionVariant = "dark" | "light" | "orange";
type CheckState = "yes" | "no";

const products = [
  {
    title: "Nori Family Hub",
    description:
      "A 15.5-inch smart touchscreen designed to be the central brain of your home, offering always-on support, intelligence, and convenience.",
    price: "From $299",
    cta: "Shop Family Hub",
    variant: "hub",
  },
  {
    title: "Custom Frame",
    description:
      "Choose your frame style - walnut wood, white oak, or matte black. Make Nori feel like it belongs in your home, not just on your counter.",
    price: "From $29",
    cta: "Browse Frames",
    variant: "frame",
  },
] as const;

const whyNoriStats = [
  {
    value: "17 hrs",
    label: "saved per family, per week",
    body: "Nori handles the logistics so your time at home is actually spent together.",
  },
  {
    value: "1 screen",
    label: "replaces a dozen apps",
    body: "All family members see the same updates.",
  },
  {
    value: "Always on",
    label: "no phone needed",
    body: 'Hands full? Just say "Hey Nori." Always listening, always ready.',
  },
] as const;

const dailyMoments = [
  {
    label: "Morning",
    image: dailyMorningImage,
    icon: dailyIconSun,
    alt: "Morning sunlight over a family table",
    kind: "morning",
  },
  {
    label: "Afternoon",
    image: dailyAfternoonImage,
    icon: dailyIconSunset,
    alt: "Warm afternoon light through a window",
    kind: "afternoon",
  },
  {
    label: "Evening",
    image: dailyEveningImage,
    icon: dailyIconMoon,
    alt: "A calm evening home corner with warm light",
    kind: "evening",
  },
] as const;

const noriEverywhereRows = [
  {
    eyebrow: "Everything Built In",
    eyebrowColor: "text-[#a56482]",
    title: "10+ modules, ready out of the box",
    body: "No extra apps. No setup. Everything your family needs — calendars, meals, tasks, kids mode, and more — all in one screen.",
    image: everywhere1,
    imageClassName: "bg-[#f2c2d7]",
    reverse: false,
    hasStores: false,
    overlay: "modules",
  },
  {
    eyebrow: "Powered by AI",
    eyebrowColor: "text-[#bf9a13]",
    title: "Smart Memory, Every Input, Effortlessly Done",
    body: "What makes Nori different isn't just what it does — it's how it works. Voice-first, context-aware, always learning your family.",
    image: everywhere2,
    imageClassName: "bg-[#fae696]",
    reverse: true,
    hasStores: false,
    overlay: "memory",
  },
  {
    eyebrow: "Nori App",
    eyebrowColor: "text-[#d68125]",
    title: "Nori goes wherever you do",
    body: "Not at home? No problem. Access your family's schedule, chat with Nori, and stay in sync from any device — the full experience, in your pocket.",
    image: everywhere3,
    imageClassName: "bg-[#ffc99f]",
    reverse: false,
    hasStores: true,
    overlay: null,
  },
] as const;

const comparisonRows: Array<[string, CheckState, CheckState, CheckState]> = [
  ["Voice-to-Organize — just speak, Nori handles it", "yes", "yes", "no"],
  ["Remembers your family's context & routines", "yes", "no", "no"],
  ["Chat becomes calendar, task list, or meal plan", "yes", "yes", "yes"],
  ["Syncs across all devices in real time", "yes", "no", "yes"],
  ["Proactively suggests — you don't have to ask", "yes", "no", "no"],
];

const testimonials = [
  {
    quote:
      "I'd forget socks or the kid's sports clothes. Nori lists tasks, suggests soups from leftovers, and my wife picks up groceries — no extra trips.",
    name: "Mark Thompson",
    role: "Dad of 2",
    avatar: testimonialAvatarMark,
  },
  {
    quote:
      "Nori syncs shopping lists and even suggests pasta by ingredients, which saves me a lot of time.",
    name: "Ms. Emily",
    role: "Mom of 2",
    avatar: testimonialAvatarEmily,
  },
  {
    quote:
      "Nori stores recipes, suggests soups from leftovers, plans weekend ribs, and keeps our grocery lists in check — family favorite.",
    name: "Diana",
    role: "Grandma of 3",
    avatar: testimonialAvatarDiana,
  },
  {
    quote:
      "Nori syncs the kid's schedule to both my phone and my husband's phone. No more scrambling for notes.",
    name: "Sarah Jenkins",
    role: "Mom of 3",
    avatar: testimonialAvatarSarah,
  },
  {
    quote:
      "Our week used to live in three chats and a paper calendar. Now Nori keeps practice, groceries, and homework in one place.",
    name: "Alex Rivera",
    role: "Parent of 2",
    avatar: testimonialAvatarMark,
  },
  {
    quote:
      "The reminders feel like another helpful grown-up in the house. Dinner plans, school forms, and pickups finally stay synced.",
    name: "Priya Shah",
    role: "Mom of 1",
    avatar: testimonialAvatarEmily,
  },
] as const;

const confidenceItems = [
  {
    title: "Fast Resolution",
    body: "Not satisfied? Return your Nori Family Hub within 30 days for a full refund, no questions asked.",
    icon: confidenceFast,
    iconClassName: "size-6",
  },
  {
    title: "1 - Year Warranty",
    body: "Each Nori Family Hub includes a 1-year manufacturer warranty covering any hardware defects.",
    icon: confidenceWarranty,
    iconClassName: "size-6",
  },
  {
    title: "24/7 Support",
    body: "Our family support team is available 24/7 via chat, email, or phone.",
    icon: confidenceSupport,
    iconClassName: "size-5",
  },
  {
    title: "Data Privacy",
    body: "Your family's data is encrypted and never sold to third parties. You own your data, always.",
    icon: confidencePrivacy,
    iconClassName: "size-6",
  },
] as const;

const lifeImages = [
  { src: life1, alt: "Nori Family Hub showing a calendar setup form" },
  { src: life2, alt: "Family member relaxing while Nori organizes the day" },
  { src: life3, alt: "Parent and children using Nori on a wall display" },
  { src: life4, alt: "Child interacting with Nori during cleanup" },
] as const;

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function useHomeScrollReveal() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal, .reveal-on-scroll, .reveal-stagger, .reveal-left, .reveal-scale, .ui-overlay-stagger"),
    );
    if (elements.length === 0) return;

    const timers = new Map<HTMLElement, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;
          element.classList.add("visible");
          if (element.classList.contains("reveal-stagger") || element.classList.contains("ui-overlay-stagger")) {
            timers.set(
              element,
              window.setTimeout(
                () => {
                  element.classList.add("reveal-complete");
                  timers.delete(element);
                },
                element.classList.contains("ui-overlay-stagger") ? 1400 : 1500,
              ),
            );
          }
          observer.unobserve(element);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px 8% 0px" },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);
}

function CheckIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true" className={className}>
      <path d="m4.2 9.2 3.1 3.1 6.5-6.8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
    </svg>
  );
}

function XIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true" className={className}>
      <path d="m5 5 8 8M13 5l-8 8" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
    </svg>
  );
}

function ActionLink({
  href,
  children,
  variant = "dark",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: ActionVariant;
  className?: string;
}) {
  const styles: Record<ActionVariant, string> = {
    dark: "bg-[#151515] text-white hover:bg-[#2b2926]",
    light: "bg-white/90 text-[#151515] hover:bg-white",
    orange: "bg-[#ffbe73] text-[#151515] hover:bg-[#f5a650]",
  };
  const linkClass = cx(
    "inline-flex h-[50px] items-center justify-center gap-2 rounded-full px-10 pb-[14px] pt-[13px] text-[16px] font-medium leading-[22px] transition-colors",
    styles[variant],
    className,
  );

  if (href.startsWith("#")) {
    return (
      <a href={href} className={linkClass}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClass}>
      {children}
    </Link>
  );
}

function SectionLabel({
  children,
  tone = "pink",
}: {
  children: React.ReactNode;
  tone?: "pink" | "orange";
}) {
  return (
    <div
      className={cx(
        "inline-flex h-8 items-center justify-center rounded-full px-4 text-center text-[16px] font-medium uppercase leading-5",
        tone === "pink" ? "bg-[#f7d9ff] text-[#651636]" : "bg-[#feead1] text-[#d68125]",
      )}
    >
      {children}
    </div>
  );
}

function SectionHeader({
  label,
  labelTone = "pink",
  title,
  description,
}: {
  label?: string;
  labelTone?: "pink" | "orange";
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto flex w-full max-w-[848px] flex-col items-center gap-4 text-center">
      {label ? <SectionLabel tone={labelTone}>{label}</SectionLabel> : null}
      <h2 className="font-ek text-[32px] font-bold leading-[38px] text-[#151515] min-[700px]:text-[44px] min-[700px]:leading-[54px]">{title}</h2>
      {description ? <p className="max-w-[663px] text-[18px] font-normal leading-[27px] text-[#151515]/80">{description}</p> : null}
    </div>
  );
}

function ProductCard({ product }: { product: (typeof products)[number] }) {
  const isHub = product.variant === "hub";

  return (
    <article className="flex min-h-[598px] flex-col gap-4 rounded-[24px] bg-white p-6 shadow-[0_1px_0_rgba(28,25,23,0.04)]">
      <div className="relative h-[326px] overflow-hidden rounded-[16px] bg-[#f5f2e9]">
        {isHub ? (
          <img src={productHubDevice} alt="Nori Family Hub display" className="absolute inset-0 size-full object-cover" />
        ) : (
          <img src={productFramePhoto} alt="Custom Nori frame styles" className="absolute inset-0 size-full object-cover" />
        )}
      </div>
      <div className="flex flex-col gap-2 px-2 pb-2">
        <h3 className="text-[22px] font-medium leading-8 text-[#151515]">{product.title}</h3>
        <p className="text-[16px] font-normal leading-6 text-[#151515]/80">{product.description}</p>
        <p className="text-[16px] font-medium leading-[22px] text-[#151515]">{product.price}</p>
      </div>
      <div className="mt-auto h-px w-full bg-[#151515]/8" />
      <div className="flex items-end justify-between">
        <ActionLink href="#products" variant="orange" className="h-[50px] px-6">
          {product.cta}
        </ActionLink>
        {!isHub ? <img src={productFrameSwatches} alt="" className="h-8 w-[140px] object-contain" /> : null}
      </div>
    </article>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[760px] overflow-hidden bg-[#f5f2e9] min-[900px]:h-[860px]" aria-labelledby="home-hero-title">
      <img src={heroImage} alt="Nori Family Hub in a warm family home" className="absolute inset-0 size-full object-cover" />
      <div className="relative mx-auto flex max-w-[1440px] px-5 pt-[180px] min-[700px]:px-10 min-[900px]:pt-[265px] min-[1120px]:px-20">
        <div className="max-w-[577px]">
          <h1 id="home-hero-title" className="font-ek text-[46px] font-bold leading-[48px] text-[#151515] min-[700px]:text-[60px] min-[700px]:leading-[60px]">
            Your Family AI Brain
          </h1>
          <p className="mt-6 text-[20px] font-medium leading-[26px] text-[#151515] min-[700px]:text-[22px] min-[700px]:leading-[26.4px]">
            Keep Everything your family needs on a screen, interacted with AI
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <ActionLink href="#products">Shop Now</ActionLink>
            <ActionLink href="#daily" variant="light">
              Why Nori
            </ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductSection() {
  return (
    <section id="products" className="mx-auto flex max-w-[1440px] flex-col px-5 py-[112px] min-[700px]:px-10 min-[900px]:py-[140px] min-[1120px]:px-20">
      <SectionHeader
        label="Smart. Stylish. Yours."
        title="Smart Inside. Stylish Outside."
        description="A smart hub for your home, with frames that match your mood."
      />
      <div className="reveal-stagger mt-12 grid gap-4 min-[900px]:grid-cols-2">
        {products.map((product) => (
          <ProductCard product={product} key={product.title} />
        ))}
      </div>
    </section>
  );
}

function WhyNoriStatCard({ stat }: { stat: (typeof whyNoriStats)[number] }) {
  return (
    <article className="flex min-h-[191px] flex-1 flex-col rounded-[16px] bg-white p-7 text-[#151515]">
      <div className="flex flex-col">
        <p className="font-ek text-[32px] font-bold leading-[38.4px]">{stat.value}</p>
        <p className="text-[22px] font-medium leading-8">{stat.label}</p>
      </div>
      <p className="mt-4 text-[16px] font-normal leading-6 text-[#151515]/80">{stat.body}</p>
    </article>
  );
}

function MetricsSection() {
  return (
    <section id="daily" className="mx-auto max-w-[1440px] px-5 pb-[132px] min-[700px]:px-10 min-[1120px]:px-20">
      <div className="relative min-h-[760px] overflow-hidden rounded-[32px] bg-[#7d6d52] p-6 min-[700px]:p-10 min-[900px]:h-[675px] min-[900px]:min-h-0 min-[900px]:p-20">
        <img
          src={whyNoriShowcase}
          alt="Nori Family Hub on a quiet home table with candles and soft sunlight"
          className="absolute inset-0 size-full object-cover object-center min-[900px]:top-[-40px] min-[900px]:h-[832px]"
        />
        <div className="relative z-10 max-w-[520px] px-0 min-[900px]:px-2">
          <p className="text-[16px] font-semibold uppercase leading-5 text-[#ffbe73]">Why Nori</p>
          <h2 className="mt-6 text-[38px] font-bold leading-[44px] text-white min-[700px]:text-[50px] min-[700px]:leading-[58px]">
            Use Nori daily, run a calmer home.
          </h2>
          <p className="mt-6 max-w-[482px] text-[18px] font-normal leading-[30px] text-white/70">
            Families with Nori save 17 hours a week, experience less friction, and have more independent kids.
          </p>
        </div>
        <div className="reveal-stagger relative z-10 mt-12 grid gap-4 min-[900px]:absolute min-[900px]:bottom-20 min-[900px]:left-20 min-[900px]:right-20 min-[900px]:mt-0 min-[900px]:grid-cols-3">
          {whyNoriStats.map((stat) => (
            <WhyNoriStatCard stat={stat} key={stat.value} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DailyMomentBadge({ label, icon }: { label: string; icon: string }) {
  return (
    <span className="absolute left-3 top-3 z-10 inline-flex h-[43px] items-center justify-center gap-2 rounded-full bg-[#151515]/20 py-2 pl-5 pr-6 text-[18px] font-normal leading-[27px] text-white backdrop-blur-[20px]">
      <img src={icon} alt="" className="size-5" />
      {label}
    </span>
  );
}

function MorningMomentContent() {
  const events = [
    { time: "8:00 AM", label: "Morning drop-off" },
    { time: "10:00 AM", label: "Work Sync" },
  ] as const;

  return (
    <div className="daily-hover-content absolute left-[7.93%] top-[38.66%] z-10 flex w-[370.667px] max-w-[89%] flex-col drop-shadow-[0_8px_20px_rgba(57,27,5,0.16)]">
      {events.map((event, index) => (
        <div key={event.time} className={cx("relative flex gap-5", index === 0 && "pb-8")}>
          <span className="relative block size-[19px] shrink-0">
            <span className="absolute left-[4.5px] top-[4.5px] box-border size-2.5 rounded-full border-4 border-white bg-transparent" />
            {index === 0 ? <span className="absolute left-[9px] top-[15.5px] h-[66px] w-px bg-white" /> : null}
          </span>
          <span className="flex flex-col text-white">
            <span className="text-[14px] font-medium leading-5">{event.time}</span>
            <span className="text-[18px] font-medium leading-[27px]">{event.label}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

function AfternoonMomentContent() {
  const items = [
    { text: "Leo finished reading", icon: dailyIconCheckSquare },
    { text: "Dad is shopping", icon: dailyIconGrocery },
    { text: "Mom knows", icon: dailyIconBell },
  ] as const;

  return (
    <div className="daily-hover-content absolute left-[calc(50%-0.5px)] top-[calc(50%+0.5px)] z-10 flex w-[237px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
      {items.map((item, index) => (
        <div
          key={item.text}
          className={cx(
            "flex h-12 items-center rounded-lg py-1 pl-3 pr-4 text-white drop-shadow-[0_4px_24px_rgba(57,27,5,0.34)]",
            index === 0 && "w-full",
            index === 1 && "w-[200px]",
            index === 2 && "w-[168px]",
          )}
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full">
            <img src={item.icon} alt="" className="size-5" />
          </span>
          <span className="whitespace-nowrap text-[18px] font-normal leading-7">{item.text}</span>
        </div>
      ))}
    </div>
  );
}

function EveningMomentContent() {
  return (
    <div className="daily-hover-content absolute left-1/2 top-1/2 z-10 w-[178px] -translate-x-1/2 -translate-y-1/2 text-center text-[18px] font-normal leading-7 text-white drop-shadow-[0_4px_40px_rgba(85,38,0,0.2)]">
      <p>“</p>
      <p>Hey, Nori</p>
      <p>I have a dentist</p>
      <p>appointment on</p>
      <p>Thursday.</p>
      <p>”</p>
    </div>
  );
}

function DailyMomentCard({ moment }: { moment: (typeof dailyMoments)[number] }) {
  return (
    <article className="daily-moment-card relative aspect-[416/551] overflow-hidden rounded-[16px] bg-[#7d6d52]">
      <img src={moment.image} alt={moment.alt} className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out" />
      <DailyMomentBadge label={moment.label} icon={moment.icon} />
      {moment.kind === "morning" ? <MorningMomentContent /> : null}
      {moment.kind === "afternoon" ? <AfternoonMomentContent /> : null}
      {moment.kind === "evening" ? <EveningMomentContent /> : null}
    </article>
  );
}

function DailyScene() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-[140px] min-[700px]:px-10 min-[1120px]:px-20">
      <div className="flex flex-col gap-8 min-[900px]:flex-row min-[900px]:items-start min-[900px]:justify-between">
        <div className="flex w-full max-w-[731px] flex-col items-start gap-8">
          <SectionLabel tone="orange">A Day with Nori</SectionLabel>
          <h2 className="font-ek text-[32px] font-bold leading-[38px] text-[#151515] min-[700px]:text-[44px] min-[700px]:leading-[54px]">
            Built for real family life,<br className="hidden min-[900px]:block" /> every day.
          </h2>
        </div>
        <p className="max-w-[508px] pt-0 text-[18px] font-normal leading-[28px] text-[#151515]/80 min-[900px]:pt-[112px]">
          Families with Nori save 17 hours a week, experience less friction, and have more independent kids.
        </p>
      </div>
      <div className="reveal-stagger mt-16 grid gap-4 min-[700px]:grid-cols-3">
        {dailyMoments.map((moment) => (
          <DailyMomentCard moment={moment} key={moment.label} />
        ))}
      </div>
    </section>
  );
}

function StoreBadge({ kind }: { kind: "apple" | "google" | "web" }) {
  if (kind === "apple") {
    return (
      <Link href="#products" className="inline-flex h-[53px] w-[162px] items-center justify-center gap-[11px] rounded-[12px] bg-white text-[#151515] transition-colors hover:bg-[#fcfbf7]">
        <img src={storeAppleMark} alt="" className="h-[26px] w-[19px]" />
        <span className="flex flex-col">
          <span className="text-[9px] font-medium leading-[9px]">Download on the</span>
          <img src={storeAppleWord} alt="App Store" className="mt-[3px] h-[16px] w-[74px]" />
        </span>
      </Link>
    );
  }

  if (kind === "google") {
    return (
      <Link href="#products" className="inline-flex h-[53px] w-[162px] items-center justify-center gap-[10px] rounded-[12px] bg-white text-[#151515] transition-colors hover:bg-[#fcfbf7]">
        <img src={storeGoogleMark} alt="" className="h-[27px] w-[25px]" />
        <span className="flex flex-col">
          <span className="text-[9px] font-medium leading-[9px]">Get it on</span>
          <img src={storeGoogleWord} alt="Google Play" className="mt-[3px] h-[18px] w-[90px]" />
        </span>
      </Link>
    );
  }

  return (
    <Link href="#daily" className="inline-flex h-[53px] w-[162px] items-center justify-center gap-[10px] rounded-[12px] bg-white text-[#151515] transition-colors hover:bg-[#fcfbf7]">
      <img src={storeWebMark} alt="" className="h-[27px] w-[25px]" />
      <span className="flex flex-col text-left">
        <span className="text-[9px] font-medium leading-[9px]">Open in the</span>
        <span className="mt-[3px] text-[16px] font-semibold leading-4">Web Version</span>
      </span>
    </Link>
  );
}

function ModuleChip({
  icon,
  label,
  iconClassName,
  className,
}: {
  icon: string;
  label: string;
  iconClassName: string;
  className?: string;
}) {
  return (
    <span className={cx("inline-flex h-[39px] items-center gap-[7.424px] rounded-[16px] bg-white/80 py-2 pl-4 pr-5 text-[#151515] backdrop-blur-[8px]", className)}>
      <img src={icon} alt="" className={cx("shrink-0 object-contain", iconClassName)} />
      <span className="whitespace-nowrap text-[16px] font-medium leading-[22px]">{label}</span>
    </span>
  );
}

function ModuleStackOverlay() {
  return (
    <div className="reveal-stagger ui-overlay-stagger absolute right-6 top-6 z-10 flex w-[129.424px] flex-col items-end gap-4">
      <ModuleChip icon={moduleCalendarIcon} label="Calendar" iconClassName="size-[18px]" className="w-full" />
      <ModuleChip icon={moduleMealplanIcon} label="Mealplan" iconClassName="size-4" className="w-full" />
      <ModuleChip icon={moduleTaskIcon} label="Task" iconClassName="size-[18px]" className="w-[95.424px]" />
    </div>
  );
}

function MemoryInfoCard({
  icon,
  iconClassName,
  label,
  value,
  className,
}: {
  icon: string;
  iconClassName: string;
  label: string;
  value: string;
  className: string;
}) {
  return (
    <div className={cx("inline-flex h-16 items-center gap-2 rounded-[16px] bg-white/80 py-2 pl-2 pr-6 text-[#151515] backdrop-blur-[8px]", className)}>
      <span className="flex size-12 shrink-0 items-center justify-center rounded-lg">
        <img src={icon} alt="" className={cx("object-contain", iconClassName)} />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-[12px] font-normal leading-4 text-[#151515]/40">{label}</span>
        <span className="whitespace-nowrap text-[16px] font-medium leading-[22px]">{value}</span>
      </span>
    </div>
  );
}

function MemoryOverlay() {
  return (
    <div className="reveal-stagger ui-overlay-stagger absolute bottom-6 left-6 z-10 flex w-[306px] flex-col items-start gap-2">
      <MemoryInfoCard icon={memoryKeyIcon} iconClassName="size-8" label="Home info" value="WiFi: SunnyHome2025" className="w-[260px]" />
      <MemoryInfoCard icon={memoryPeanutIcon} iconClassName="size-7" label="Allergens" value="Emma is allergic to peanuts" className="w-[292px]" />
    </div>
  );
}

function NoriEverywhereRow({ item }: { item: (typeof noriEverywhereRows)[number] }) {
  return (
    <article
      className={cx(
        "flex flex-col gap-10 min-[1000px]:items-center min-[1000px]:gap-20",
        item.reverse ? "min-[1000px]:flex-row-reverse min-[1000px]:justify-end min-[1000px]:pl-[60px]" : "min-[1000px]:flex-row min-[1000px]:pr-20",
      )}
    >
      <div className={cx("relative aspect-[612/450] w-full overflow-hidden rounded-[24px] min-[1000px]:h-[450px] min-[1000px]:w-[612px]", item.imageClassName)}>
        <img src={item.image} alt="" className="size-full object-cover" />
        {item.overlay === "modules" ? <ModuleStackOverlay /> : null}
        {item.overlay === "memory" ? <MemoryOverlay /> : null}
      </div>
      <div className={cx("flex w-full flex-col gap-6 pb-4", item.reverse ? "max-w-[528px]" : "max-w-[508px]")}>
        <div className="flex flex-col gap-2">
          <p className={cx("text-[16px] font-medium uppercase leading-5", item.eyebrowColor)}>{item.eyebrow}</p>
          <h3 className="text-[32px] font-semibold leading-[38.4px] text-[#151515]">{item.title}</h3>
        </div>
        <p className="text-[18px] font-normal leading-[27px] text-[#151515]/80">{item.body}</p>
        {item.hasStores ? (
          <div className="flex flex-wrap gap-2">
            <StoreBadge kind="apple" />
            <StoreBadge kind="google" />
            <StoreBadge kind="web" />
          </div>
        ) : null}
      </div>
    </article>
  );
}

function NoriEverywhereSection() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-[132px] min-[700px]:px-10 min-[1120px]:px-20">
      <SectionHeader
        label="Nori Everywhere"
        title="Your Family, Smarter."
        description="Smart features, AI assistance, and access anywhere — everything your family needs in one place."
      />
      <div className="mt-20 flex flex-col gap-20">
        {noriEverywhereRows.map((item) => (
          <NoriEverywhereRow item={item} key={item.title} />
        ))}
      </div>
    </section>
  );
}

function ComparisonTable() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-[132px] min-[700px]:px-10 min-[1120px]:px-20">
      <h2 className="px-0 font-ek text-[32px] font-bold leading-[38px] text-[#151515] min-[700px]:text-[44px] min-[700px]:leading-[54px] min-[1120px]:px-2">
        More than a digital calendar
      </h2>
      <div className="mt-8 overflow-hidden rounded-[24px] bg-white p-6 min-[900px]:p-10">
        <div className="w-full">
          <div className="grid grid-cols-[minmax(132px,1.24fr)_repeat(3,minmax(0,1fr))] gap-x-3 border-y border-[#151515]/5 py-4 text-[14px] font-medium leading-5 text-[#151515] min-[700px]:grid-cols-[minmax(220px,1.2fr)_repeat(3,minmax(120px,1fr))] min-[700px]:gap-x-6 min-[700px]:text-[18px] min-[700px]:leading-[27px] min-[1100px]:grid-cols-[minmax(270px,1.18fr)_repeat(3,minmax(0,1fr))] min-[1100px]:gap-x-10">
            <div className="text-transparent" aria-hidden="true">
              Comparison
            </div>
            <div className="text-center text-[#d68125]">Nori</div>
            <div className="text-center">Basic Voice Assistant</div>
            <div className="text-center">Standard Digital Calendar</div>
          </div>
          {comparisonRows.map(([feature, nori, assistant, calendar], index) => (
            <div
              key={feature}
              className={cx(
                "grid grid-cols-[minmax(132px,1.24fr)_repeat(3,minmax(0,1fr))] items-center gap-x-3 border-b border-[#151515]/5 py-4 text-[14px] font-normal leading-5 text-[#151515] min-[700px]:grid-cols-[minmax(220px,1.2fr)_repeat(3,minmax(120px,1fr))] min-[700px]:gap-x-6 min-[700px]:text-[16px] min-[700px]:leading-[22px] min-[1100px]:grid-cols-[minmax(270px,1.18fr)_repeat(3,minmax(0,1fr))] min-[1100px]:gap-x-10",
                index === 3 ? "min-h-16" : "min-h-[76px]",
              )}
            >
              <div>{feature}</div>
              <FeatureMark state={nori} tone="nori" />
              <FeatureMark state={assistant} tone="neutral" />
              <FeatureMark state={calendar} tone="neutral" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureMark({ state, tone }: { state: CheckState; tone: "nori" | "neutral" }) {
  return (
    <div className="flex justify-center">
      {state === "yes" ? (
        <span className={cx("flex size-8 items-center justify-center rounded-full", tone === "nori" ? "bg-[#feead1] text-[#d68125]" : "bg-[#151515]/5 text-[#151515]")}>
          <CheckIcon className="size-4" />
        </span>
      ) : (
        <span className="flex size-8 items-center justify-center text-[#151515]/35">
          <XIcon className="size-4" />
        </span>
      )}
    </div>
  );
}

function LifeGallery() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-[132px] min-[700px]:px-10 min-[1120px]:px-20">
      <SectionHeader label="Families in Action" title="This is what life looks like with Nori." description="Real families. Real moments. No scripts." />
      <div className="reveal-stagger mt-12 grid gap-4 min-[700px]:grid-cols-2 min-[1100px]:grid-cols-4">
        {lifeImages.map((image) => (
          <div key={image.src} className="h-[547px] overflow-hidden rounded-[24px] bg-[#ede8da]">
            <img src={image.src} alt={image.alt} className="size-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}

function PressLogoSet() {
  return (
    <>
      <img src={pressStripGeeky} alt="Geeky Gadgets" className="h-[37px] w-[285px] shrink-0 object-contain" />
      <img src={pressStripNoriAi} alt="Nori AI" className="h-[46px] w-[128px] shrink-0 object-contain" />
      <span className="relative inline-grid h-[38px] w-[271px] shrink-0 grid-cols-[max-content] grid-rows-[max-content] leading-none" aria-label="GadgetFlow">
        <img src={pressStripGadgetWord} alt="" className="col-start-1 row-start-1 ml-[44px] mt-[5px] h-[33px] w-[226px]" />
        <img src={pressStripGadgetMark} alt="" className="col-start-1 row-start-1 size-[38px]" />
      </span>
      <img src={pressStripIntroduces} alt="Introduces" className="h-[35px] w-[245px] shrink-0 object-contain" />
      <img src={pressStripBreaking} alt="Breaking" className="h-[46px] w-[122px] shrink-0 object-contain" />
      <img src={pressStripLaunches} alt="Launches" className="h-[46px] w-[169px] shrink-0 object-contain" />
    </>
  );
}

function ResourceBridge() {
  return (
    <section className="relative mx-auto h-[206px] max-w-[1440px] overflow-hidden" aria-label="Nori press coverage">
      <div className="press-logo-marquee absolute left-1/2 top-2 h-[58px] w-[calc(100%-40px)] max-w-[1280px] -translate-x-1/2 overflow-hidden [mask-image:linear-gradient(90deg,transparent_0%,black_10%,black_90%,transparent_100%)] [-webkit-mask-image:linear-gradient(90deg,transparent_0%,black_10%,black_90%,transparent_100%)] min-[700px]:w-[calc(100%-80px)] min-[1120px]:w-[calc(100%-160px)]">
        <Link
          href="/press"
          className="absolute left-[-209px] top-1/2 -translate-y-1/2 py-1 opacity-70 grayscale transition-opacity hover:opacity-100"
          aria-label="Open Nori press page"
        >
          <span className="press-logo-marquee__track">
            <span className="press-logo-marquee__set">
              <PressLogoSet />
            </span>
            <span className="press-logo-marquee__set" aria-hidden="true">
              <PressLogoSet />
            </span>
          </span>
        </Link>
      </div>
      <Link href="/blog" className="sr-only">
        Blog
      </Link>
    </section>
  );
}

function TestimonialArrowButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "previous" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  const isPrevious = direction === "previous";

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cx(
        "flex size-14 items-center justify-center rounded-full transition-colors disabled:pointer-events-none",
        disabled ? "border-[1.125px] border-[#e0dacc] bg-transparent" : "bg-[#151515] hover:bg-[#2b2926]",
      )}
      aria-label={isPrevious ? "Previous testimonial" : "Next testimonial"}
    >
      <img src={disabled ? testimonialArrowLeft : testimonialArrowRight} alt="" className={cx("size-[26px]", isPrevious && "rotate-180")} />
    </button>
  );
}

function Testimonials() {
  const visibleTestimonials = 4;
  const maxIndex = Math.max(testimonials.length - visibleTestimonials, 0);
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleItems = useMemo(() => testimonials.slice(activeIndex, activeIndex + visibleTestimonials), [activeIndex]);
  const canGoPrevious = activeIndex > 0;
  const canGoNext = activeIndex < maxIndex;

  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-[180px] min-[700px]:px-10 min-[1120px]:px-20">
      <div className="mb-12 flex items-center justify-between gap-6">
        <h2 className="font-ek text-[32px] font-bold leading-[38px] text-[#151515] min-[700px]:text-[44px] min-[700px]:leading-[54px]">
          Families who love Nori
        </h2>
        <div className="flex shrink-0 items-center gap-[18px]">
          <TestimonialArrowButton direction="previous" disabled={!canGoPrevious} onClick={() => setActiveIndex((index) => Math.max(index - 1, 0))} />
          <TestimonialArrowButton direction="next" disabled={!canGoNext} onClick={() => setActiveIndex((index) => Math.min(index + 1, maxIndex))} />
        </div>
      </div>
      <div className="reveal-stagger grid gap-4 min-[700px]:grid-cols-2 min-[1100px]:grid-cols-4">
        {visibleItems.map((item) => (
          <article key={item.name} className="flex h-[410px] flex-col justify-between rounded-[24px] bg-white p-10">
            <div className="flex flex-col gap-[24.209px]">
              <div className="flex gap-[4.035px]" aria-label="5 star rating">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <img key={starIndex} src={testimonialStar} alt="" className="size-[20.174px]" />
                ))}
              </div>
              <p className="text-[18px] font-normal leading-[27px] text-[#151515]">{item.quote}</p>
            </div>
            <div className="flex items-center gap-4">
              <img src={item.avatar} alt="" className="size-[48.418px] shrink-0 rounded-full object-cover" />
              <span>
                <span className="block font-ek text-[18px] font-medium leading-[18px] text-[#1c1917]">{item.name}</span>
                <span className="mt-2 block text-[14px] leading-5 text-[#151515]/40">{item.role}</span>
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
function Confidence() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 min-[700px]:px-10 min-[1120px]:px-20">
      <SectionHeader title="Shop with confidence" />
      <div className="reveal-stagger mt-12 grid gap-4 min-[700px]:grid-cols-2 min-[1100px]:grid-cols-4">
        {confidenceItems.map((item) => (
          <article key={item.title} className="flex min-h-[219px] flex-col items-start gap-4 rounded-[24px] bg-white p-8 text-left">
            <img src={item.icon} alt="" className="size-8" />
            <div className="flex flex-col gap-2">
              <h3 className="text-[18px] font-medium leading-[27px] text-[#151515]">{item.title}</h3>
              <p className="text-[16px] font-normal leading-6 text-[#151515]/80">{item.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-[44px] pt-[140px] min-[700px]:px-10 min-[1120px]:px-20">
      <div className="flex flex-col items-center gap-[41px] overflow-hidden rounded-[32px] px-6 text-center text-[#151515] min-[900px]:px-[160px]">
        <div className="mx-auto flex w-full max-w-[960px] flex-col items-center gap-4">
          <p className="w-full text-[16px] font-medium uppercase leading-[27px] text-[#151515]/40">Bring Nori home today</p>
          <h2 className="max-w-[900px] font-ek text-[42px] font-bold leading-[50px] min-[700px]:text-[60px] min-[700px]:leading-[72px]">
            Family life, gently organized — starting today.
          </h2>
          <p className="mx-auto max-w-[480px] text-[18px] font-medium leading-[27px] text-[#151515]">
            Free shipping. 30-day returns. Join 100,000+ families running calmer households with Nori.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <a href="#products" className="inline-flex h-[52px] min-w-[204px] items-center justify-center rounded-full bg-[#151515] px-8 text-center text-[14px] font-medium leading-5 text-white transition-colors hover:bg-[#2b2926]">
            Shop Nori Family Hub
          </a>
          <a href="https://heynori.com/app" className="inline-flex h-[52px] w-[204px] items-center justify-center rounded-full bg-white px-8 text-center text-[14px] font-medium leading-5 text-[#151515] transition-colors hover:bg-[#fcfbf7]">
            Try the App Free
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useHomeScrollReveal();

  return (
    <div className="official-page min-h-screen overflow-x-hidden bg-[#f5f2e9] text-[#151515]">
      <Header />
      <main>
        <Hero />
        <ProductSection />
        <MetricsSection />
        <DailyScene />
        <NoriEverywhereSection />
        <ComparisonTable />
        <LifeGallery />
        <ResourceBridge />
        <Testimonials />
        <Confidence />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
