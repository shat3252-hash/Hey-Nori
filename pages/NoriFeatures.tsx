import { useEffect } from "react";
import type React from "react";
import { Footer, Header } from "@/components/official/OfficialLayout";
import featureCardCalendar from "@/assets/nori-features/feature-card-calendar@2x.png";
import featureCardMealPlan from "@/assets/nori-features/feature-card-meal-plan@2x.png";
import featureCardNoriAi from "@/assets/nori-features/feature-card-nori-ai@2x.png";
import featureCardRecipes from "@/assets/nori-features/feature-card-recipes@2x.png";
import featureCardShopping from "@/assets/nori-features/feature-card-shopping@2x.png";
import featureCardTasks from "@/assets/nori-features/feature-card-tasks@2x.png";
import extraAvatar from "@/assets/nori-features/extra-avatar@2x.png";
import extraPhoto from "@/assets/nori-features/extra-photo@2x.jpg";
import iconBellRing from "@/assets/nori-features/icon-bell-ring.svg";
import iconBeef from "@/assets/nori-features/icon-beef.svg";
import iconCalendar from "@/assets/nori-features/icon-calendar.svg";
import iconCheckNeutral from "@/assets/nori-features/icon-check-neutral.svg";
import iconCheckOrange from "@/assets/nori-features/icon-check-orange.svg";
import iconCheckSquare from "@/assets/nori-features/icon-check-square.svg";
import iconChefHat from "@/assets/nori-features/icon-chef-hat.svg";
import iconDog from "@/assets/nori-features/icon-dog.svg";
import iconExtraAddPhoto from "@/assets/nori-features/icon-extra-add-photo.svg";
import iconExtraEmail from "@/assets/nori-features/icon-extra-email.svg";
import iconExtraFolderHome from "@/assets/nori-features/icon-extra-folder-home.svg";
import iconExtraFolderRecipe from "@/assets/nori-features/icon-extra-folder-recipe.svg";
import iconExtraPhone from "@/assets/nori-features/icon-extra-phone.svg";
import iconExtraSms from "@/assets/nori-features/icon-extra-sms.svg";
import iconExtraStar from "@/assets/nori-features/icon-extra-star.svg";
import iconGroceryList from "@/assets/nori-features/icon-grocery-list.svg";
import iconHeart from "@/assets/nori-features/icon-heart.svg";
import iconLaugh from "@/assets/nori-features/icon-laugh.svg";
import iconLayers from "@/assets/nori-features/icon-layers.svg";
import iconMic from "@/assets/nori-features/icon-mic.svg";
import iconPaperclip from "@/assets/nori-features/icon-paperclip.svg";
import iconRecipe from "@/assets/nori-features/icon-recipe.svg";
import iconShirt from "@/assets/nori-features/icon-shirt.svg";
import iconUtensils from "@/assets/nori-features/icon-utensils.svg";
import iconXClose from "@/assets/nori-features/icon-x-close.svg";
import moduleCalendar from "@/assets/nori-features/module-calendar@2x.png";
import moduleMeals from "@/assets/nori-features/module-meals@2x.png";
import moduleRecipes from "@/assets/nori-features/module-recipes@2x.png";
import moduleShopping from "@/assets/nori-features/module-shopping@2x.png";
import moduleTasks from "@/assets/nori-features/module-tasks@2x.png";
import noriFeaturesHero from "@/assets/nori-features/nori-features-hero@2x.png";

const appUrl = "https://heynori.com/app";

const featureCards = [
  {
    title: "Family Calendar",
    body: "See everyone’s schedule in one shared place.",
    icon: featureCardCalendar,
    iconSize: "h-[50px] w-[55px]",
  },
  {
    title: "Tasks & Chores",
    body: "Assign tasks, track routines, and keep kids involved.",
    icon: featureCardTasks,
    iconSize: "size-[60px]",
  },
  {
    title: "Meal Plan",
    body: "Plan dinners around your week, tastes, and schedule.",
    icon: featureCardMealPlan,
    iconSize: "h-[60px] w-[56px]",
  },
  {
    title: "Recipes",
    body: "Save recipes, import ideas, and turn meals into grocery lists.",
    icon: featureCardRecipes,
    iconSize: "size-[60px]",
  },
  {
    title: "Shopping List",
    body: "Share lists with the family and update them in real time.",
    icon: featureCardShopping,
    iconSize: "h-[61px] w-[60px]",
  },
  {
    title: "Nori AI",
    body: "Add, organize, and update things faster with voice, photos, and chat.",
    icon: featureCardNoriAi,
    iconSize: "h-[48px] w-[48.744px]",
  },
] as const;

type PlatformFeatureRow = {
  title: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
  imageHeight?: 368 | 374;
  contentGap?: 24 | 32;
  bullets: Array<{
    icon: string;
    text: string;
  }>;
};

const platformRows: PlatformFeatureRow[] = [
  {
    title: "A shared calendar built for real family life.",
    image: moduleCalendar,
    imageAlt: "Nori shared family calendar module",
    bullets: [
      { icon: iconCalendar, text: "AI event creation: Add events from voice, text, photo, or email" },
      { icon: iconLaugh, text: "Shared family view: See everyone’s plans at a glance" },
      { icon: iconBellRing, text: "Smart reminders: Personalized alerts so nothing gets missed" },
    ],
  },
  {
    title: "Tasks that do not live only in one parent's head.",
    image: moduleTasks,
    imageAlt: "Nori tasks and chores module",
    reverse: true,
    contentGap: 24,
    bullets: [
      { icon: iconCheckSquare, text: "AI event creation: Assign tasks so nothing is missed." },
      { icon: iconShirt, text: "Chores and family assignments: Give each task a clear owner." },
      { icon: iconDog, text: "Routines with display-ready view: Daily habits at a glance" },
    ],
  },
  {
    title: "A shared calendar built for real family life.",
    image: moduleMeals,
    imageAlt: "Nori meal planning module",
    imageHeight: 374,
    bullets: [
      { icon: iconUtensils, text: "Smart meal ideas: Get AI suggestions or add simple meals." },
      { icon: iconBeef, text: "Weekly meal planning: Plan your week’s meals." },
      { icon: iconChefHat, text: "Grocery Sync: Turn meals into family-shared shopping lists." },
    ],
  },
  {
    title: "Tasks that do not live only in one parent's head.",
    image: moduleRecipes,
    imageAlt: "Nori recipes module",
    reverse: true,
    bullets: [
      { icon: iconRecipe, text: "AI Recipe Help: Clean up messy recipe text." },
      { icon: iconPaperclip, text: "Web Import: Bring in recipes from any link." },
      { icon: iconHeart, text: "Family Favorites: Track what everyone loves." },
    ],
  },
  {
    title: "A shopping list the whole family can update.",
    image: moduleShopping,
    imageAlt: "Nori family shopping list module",
    bullets: [
      { icon: iconGroceryList, text: "Grocery Sync: Turn meals into family-shared shopping lists." },
      { icon: iconLayers, text: "Multiple lists: Keep grocery, household, and school lists separate." },
      { icon: iconMic, text: "Voice add: Say what you need before you forget." },
    ],
  },
];

const comparisonRows: Array<[string, boolean, boolean, boolean, boolean]> = [
  ["Family Calendar", true, true, false, false],
  ["Tasks & Chores", true, false, true, false],
  ["Meal Planning", true, false, false, false],
  ["Recipes", true, false, false, true],
  ["Shopping Lists", true, false, false, false],
  ["Reminders", true, false, false, false],
  ["AI Assistant", true, false, false, false],
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function useNoriFeaturesReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal, .reveal-stagger, .reveal-scale"));
    if (elements.length === 0) return;

    const timers = new Map<HTMLElement, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;
          element.classList.add("visible");
          if (element.classList.contains("reveal-stagger")) {
            timers.set(
              element,
              window.setTimeout(() => {
                element.classList.add("reveal-complete");
                timers.delete(element);
              }, 1500),
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

function CtaButton({
  children,
  variant = "dark",
  className,
  href = appUrl,
}: {
  children: React.ReactNode;
  variant?: "dark" | "light";
  className?: string;
  href?: string;
}) {
  return (
    <a
      href={href}
      className={cx(
        "inline-flex h-[50px] items-center justify-center rounded-full px-10 text-center text-[16px] font-medium leading-[22px] transition-colors",
        variant === "dark" ? "bg-[#151515] text-white hover:bg-[#2b2926]" : "bg-white text-[#151515] hover:bg-[#fcfbf7]",
        className,
      )}
    >
      {children}
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex min-h-8 items-center rounded-full bg-[#feead1] px-4 py-1.5 text-center text-[16px] font-semibold uppercase leading-5 text-[#d68125]">
      {children}
    </span>
  );
}

function NoriFeaturesHero() {
  return (
    <section className="relative min-h-[760px] overflow-hidden bg-[#f7d9b6] min-[900px]:h-[860px]" aria-labelledby="nori-features-hero-title">
      <img src={noriFeaturesHero} alt="Nori app running on a laptop in a warm home corner" className="absolute inset-0 size-full object-cover object-left min-[1120px]:object-center" />
      <div className="relative mx-auto flex max-w-[1440px] px-5 pt-[190px] min-[700px]:px-10 min-[1120px]:px-20 min-[900px]:pt-[265px]">
        <div className="max-w-[577px]">
          <h1 id="nori-features-hero-title" className="font-ek text-[44px] font-bold leading-[48px] text-white min-[700px]:text-[60px] min-[700px]:leading-[60px]">
            All your family’s needs in one place.
          </h1>
          <p
            className="mt-6 max-w-[577px] text-[20px] font-medium leading-[26px] text-white min-[700px]:text-[22px] min-[700px]:leading-[26.4px]"
            style={{ textShadow: "0px 4px 24px rgba(134,65,29,0.3)" }}
          >
            Nori combines calendars, tasks, meals, shopping, and AI to help your family plan less and live more.
          </p>
          <a
            href={appUrl}
            className="mt-6 inline-flex h-[50px] items-center justify-center rounded-full bg-[#ffbe73] px-10 text-center text-[16px] font-medium leading-[22px] text-[#151515] transition-colors hover:bg-[#f5b465]"
          >
            Get Nori Free
          </a>
        </div>
      </div>
    </section>
  );
}

function FeatureOverview() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-[140px] min-[700px]:px-10 min-[1120px]:px-20 min-[900px]:pt-[180px]">
      <div className="mx-auto flex max-w-[848px] flex-col items-center gap-4 text-center">
        <SectionLabel>Everything in one place</SectionLabel>
        <h2 className="font-ek text-[36px] font-bold leading-[42px] text-[#151515] min-[700px]:text-[44px] min-[700px]:leading-[54px]">
          Smart Inside. Stylish Outside.
        </h2>
        <p className="max-w-[516px] text-[18px] font-normal leading-[27px] text-[#151515]/60">
          A smart hub for your home, with frames that match your mood.
        </p>
      </div>
      <div className="reveal-stagger mt-20 grid gap-4 min-[760px]:grid-cols-2 min-[1120px]:grid-cols-3">
        {featureCards.map((item) => (
          <article key={item.title} className="interactive-card flex min-h-[240px] flex-col items-start rounded-[24px] bg-white p-10">
            <span className="flex size-[60px] items-center justify-start">
              <img src={item.icon} alt="" className={cx("max-w-none object-contain", item.iconSize)} />
            </span>
            <div className="mt-4 flex flex-col gap-2">
              <h3 className="text-[22px] font-medium leading-8 text-[#151515]">{item.title}</h3>
              <p className="text-[16px] font-normal leading-[22px] text-[#151515]/80">{item.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function PlatformRow({ item }: { item: (typeof platformRows)[number] }) {
  const imageHeightClass = item.imageHeight === 374 ? "min-[1000px]:h-[374px]" : "min-[1000px]:h-[368px]";
  const textGapClass = item.contentGap === 24 ? "gap-6" : "gap-8";

  return (
    <article
      className={cx(
        "flex flex-col gap-10 min-[1000px]:flex-row min-[1000px]:items-center min-[1000px]:gap-20",
        item.reverse ? "min-[1000px]:justify-end min-[1000px]:pl-[60px]" : "min-[1000px]:pr-20",
      )}
    >
      <div className={cx("overflow-hidden rounded-[24px] bg-[#e0dacc] min-[1000px]:w-[612px]", imageHeightClass, item.reverse && "min-[1000px]:order-2")}>
        <img src={item.image} alt={item.imageAlt} className="size-full object-cover" />
      </div>
      <div className={cx("flex flex-col justify-center pb-4", textGapClass, item.reverse ? "min-[1000px]:w-[528px]" : "min-[1000px]:w-[508px]")}>
        <h3 className="text-[28px] font-semibold leading-[34px] text-[#151515] min-[700px]:text-[32px] min-[700px]:leading-[38.4px]">{item.title}</h3>
        <ul className="flex flex-col gap-4">
          {item.bullets.map((bullet) => (
            <li key={bullet.text} className="flex items-center gap-4 text-[16px] font-normal leading-6 text-[#151515]">
              <img src={bullet.icon} alt="" className="size-5 shrink-0" />
              <span>{bullet.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function UnifiedPlatform() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-[140px] min-[700px]:px-10 min-[900px]:px-20 min-[900px]:pt-[180px]">
      <div className="mx-auto flex max-w-[663px] flex-col items-center gap-4 text-center">
        <SectionLabel>Your unified family platform</SectionLabel>
        <h2 className="font-ek text-[32px] font-bold leading-[38px] text-[#151515] min-[700px]:text-[44px] min-[700px]:leading-[54px]">Everything Your Family Needs to Stay Organized</h2>
        <p className="text-[18px] font-normal leading-[27px] text-[#151515]/60">
          Plan schedules, manage tasks, organize meals and recipes, and create shopping lists—all in one place.
        </p>
      </div>
      <div className="mt-20 flex flex-col gap-20">
        {platformRows.map((item) => (
          <PlatformRow item={item} key={`${item.title}-${item.image}`} />
        ))}
      </div>
    </section>
  );
}

function RewardsPanel() {
  return (
    <div className="absolute left-1/2 top-[88px] flex h-[190px] w-[248px] -translate-x-1/2 flex-col gap-4 rounded-[16px] bg-white p-[16.69px]">
      <div className="flex items-center gap-2">
        <img src={extraAvatar} alt="" className="size-8 rounded-full object-cover" />
        <div className="flex flex-col">
          <span className="text-[11px] leading-4 text-[#6b7280]">Current Balance</span>
          <span className="flex items-center gap-1 text-[18px] font-medium leading-[27px] text-[#151515]">
            650 <img src={iconExtraStar} alt="" className="h-[13.4px] w-3.5" />
          </span>
        </div>
      </div>
      <div className="h-[6.9px] overflow-hidden rounded-full bg-[#f3f4f6]">
        <div className="h-full w-[65%] rounded-full bg-[#ffbe73]" />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        {[
          ["Finished Homework", "+50"],
          ["Cleaned Room", "+100"],
        ].map(([label, points]) => (
          <div key={label} className="flex flex-1 items-center justify-between rounded-[8px] bg-[#fcfbf7] px-3 py-2 text-[12px] leading-4">
            <span>{label}</span>
            <span className="text-[#d68125]">{points}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExtraFamilyFeatures() {
  const reminderItems = [
    { label: "Phone Calls", icon: iconExtraPhone },
    { label: "SMS Texts", icon: iconExtraSms },
    { label: "Emails", icon: iconExtraEmail },
  ] as const;

  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-[140px] min-[700px]:px-10 min-[900px]:px-20 min-[900px]:pt-[180px]">
      <h2 className="text-center font-ek text-[32px] font-bold leading-[38px] text-[#151515] min-[700px]:text-[44px] min-[700px]:leading-[54px]">Extra Family Features</h2>
      <div className="reveal-stagger mt-8 grid gap-4 min-[760px]:grid-cols-2 min-[1180px]:grid-cols-4">
        <article className="relative h-[308px] overflow-hidden rounded-[24px] bg-[#ffd7a8] px-10 py-8">
          <h3 className="text-center text-[18px] font-medium leading-[27px] text-[#151515]">Rewards</h3>
          <RewardsPanel />
        </article>
        <article className="relative h-[308px] overflow-hidden rounded-[24px] bg-[#ffd7a8] px-10 py-8">
          <h3 className="text-center text-[18px] font-medium leading-[27px] text-[#151515]">Photos</h3>
          <img src={extraPhoto} alt="Family photo inside Nori" className="absolute left-[29px] top-[100px] h-[144px] w-[229px] -rotate-2 rounded-[16px] object-cover" />
          <span className="absolute left-[205px] top-[202px] flex size-[68px] rotate-7 items-center justify-center rounded-[16px] bg-white">
            <img src={iconExtraAddPhoto} alt="" className="size-6" />
          </span>
        </article>
        <article className="relative h-[308px] overflow-hidden rounded-[24px] bg-[#ffd7a8] px-10 py-8">
          <h3 className="text-center text-[18px] font-medium leading-[27px] text-[#151515]">Reminders</h3>
          <div className="absolute left-1/2 top-[88px] flex h-[190px] w-[248px] -translate-x-1/2 flex-col gap-1.5 rounded-[16px] bg-white p-4">
            {reminderItems.map((item) => (
              <div key={item.label} className="flex flex-1 items-center justify-between rounded-[12px] bg-[#fcfbf7] px-3 py-2.5">
                <span className="flex items-center gap-2 text-[14px] leading-5 text-[#151515]">
                  <img src={item.icon} alt="" className="size-5" />
                  {item.label}
                </span>
                <span className="relative h-5 w-9 rounded-full bg-[#ffbe73]">
                  <span className="absolute right-0.5 top-0.5 size-4 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]" />
                </span>
              </div>
            ))}
          </div>
        </article>
        <article className="relative h-[308px] overflow-hidden rounded-[24px] bg-[#ffd7a8] px-10 py-8">
          <h3 className="text-center text-[18px] font-medium leading-[27px] text-[#151515]">Family Brain</h3>
          <div className="absolute left-[30px] top-[89px] flex w-[240px] flex-col gap-4 rounded-[16px] bg-white p-[16.69px]">
            <h4 className="text-[16px] font-medium leading-[22px]">Collections</h4>
            <div className="flex flex-col gap-3 text-[14px] leading-5">
              <span className="flex items-center gap-3"><img src={iconExtraFolderHome} alt="" className="size-5" />Home Maintenance</span>
              <span className="flex items-center gap-3"><img src={iconExtraFolderRecipe} alt="" className="size-5" />Recipes</span>
            </div>
          </div>
          <span className="absolute left-[184px] top-[198px] rounded-[12px] bg-[#fcfbf7] px-4 py-1.5 text-[16px] leading-6">#lowcarb</span>
          <span className="absolute left-[135px] top-[242px] rounded-[12px] bg-[#fcfbf7] px-4 py-1.5 text-[16px] leading-6">#Dairy allergy</span>
        </article>
      </div>
    </section>
  );
}

function ComparisonMark({ checked, tone }: { checked: boolean; tone: "nori" | "neutral" }) {
  if (!checked) {
    return (
      <span className="flex size-8 items-center justify-center">
        <span className="relative size-4 overflow-hidden">
          <img src={iconXClose} alt="" className="absolute left-[2.875px] top-[2.875px] size-[10.251px] max-w-none" />
        </span>
      </span>
    );
  }

  return (
    <span className={cx("flex size-8 items-center justify-center rounded-full", tone === "nori" ? "bg-[#feead1]" : "bg-[#151515]/5")}>
      <span className="relative size-4 overflow-hidden">
        <img src={tone === "nori" ? iconCheckOrange : iconCheckNeutral} alt="" className="absolute left-[2.042px] top-[3.374px] h-[8.584px] w-[11.917px] max-w-none" />
      </span>
    </span>
  );
}

function CalendarComparison() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-[140px] min-[700px]:px-10 min-[900px]:px-20 min-[900px]:pt-[180px]">
      <h2 className="px-0 font-ek text-[32px] font-bold leading-[38px] text-[#151515] min-[700px]:text-[44px] min-[700px]:leading-[54px] min-[900px]:px-2">
        More than a digital calendar
      </h2>
      <div className="mt-8 overflow-x-auto rounded-[24px] bg-white p-6 min-[900px]:p-10">
        <div className="min-w-[1200px]">
          <div className="grid grid-cols-[208px_208px_208px_208px_208px] gap-x-10 border-y border-[#151515]/5 py-4 text-center text-[18px] font-medium leading-[27px] text-[#151515]">
            <span className="text-transparent">Voice-to-Or</span>
            <span className="text-[#d68125]">Nori</span>
            <span>Calendar App</span>
            <span>Task App</span>
            <span>Recipe App</span>
          </div>
          {comparisonRows.map(([feature, nori, calendar, task, recipe]) => (
            <div key={feature} className="grid min-h-16 grid-cols-[208px_208px_208px_208px_208px] items-center gap-x-10 border-b border-[#151515]/5 py-4 text-[16px] font-medium leading-[22px] text-[#151515]">
              <span>{feature}</span>
              <span className="flex justify-center"><ComparisonMark checked={nori} tone="nori" /></span>
              <span className="flex justify-center"><ComparisonMark checked={calendar} tone="neutral" /></span>
              <span className="flex justify-center"><ComparisonMark checked={task} tone="neutral" /></span>
              <span className="flex justify-center"><ComparisonMark checked={recipe} tone="neutral" /></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalNoriFeaturesCta() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-[180px] pt-[140px] min-[700px]:px-10 min-[900px]:px-20 min-[900px]:pt-[180px]">
      <div className="mx-auto flex max-w-[960px] flex-col items-center gap-8 text-center">
        <div className="flex w-full flex-col items-center gap-4">
          <h2 className="font-ek text-[36px] font-bold leading-[44px] text-[#151515] min-[700px]:text-[60px] min-[700px]:leading-[72px]">Built for real family life, every day.</h2>
          <p className="text-[18px] font-normal leading-[27px] text-[#151515]/80">Everything your family needs to stay organized, in one place.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <CtaButton href="/support-center/download" className="h-[54px] min-w-[174px] px-8">Download Nori</CtaButton>
          <CtaButton variant="light" className="h-[54px] min-w-[187px] px-8">
            Try the App Free
          </CtaButton>
        </div>
      </div>
    </section>
  );
}

export default function NoriFeatures() {
  useNoriFeaturesReveal();

  return (
    <div className="official-page min-h-screen overflow-x-hidden bg-[#f5f2e9] text-[#151515]">
      <Header />
      <main>
        <NoriFeaturesHero />
        <FeatureOverview />
        <UnifiedPlatform />
        <ExtraFamilyFeatures />
        <CalendarComparison />
        <FinalNoriFeaturesCta />
      </main>
      <div className="-mt-24">
        <Footer />
      </div>
    </div>
  );
}
