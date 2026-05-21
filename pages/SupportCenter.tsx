import { useEffect, useMemo, useRef, useState } from "react";
import type React from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import noriWordmark from "@/assets/official/nori-wordmark.svg";
import footerAppStoreMark from "@/assets/official/footer-appstore-mark.svg";
import footerAppStoreOverline from "@/assets/official/footer-appstore-overline.svg";
import footerAppStoreWord from "@/assets/official/footer-appstore-word.svg";
import footerGooglePlayMark from "@/assets/official/footer-google-play-mark.svg";
import footerGooglePlayWord from "@/assets/official/footer-google-play-word.svg";
import socialFacebook from "@/assets/official/social-facebook.svg";
import socialInstagram from "@/assets/official/social-instagram.svg";
import socialTiktok from "@/assets/official/social-tiktok.svg";
import socialX from "@/assets/official/social-x.svg";
import socialYoutube from "@/assets/official/social-youtube.svg";
import tabletMenuIcon from "@/assets/official/tablet-menu.svg";
import tabletNavCloseIcon from "@/assets/official/tablet-nav-close.svg";
import aiMembershipImage from "@/assets/support-center/ai-membership.png";
import articleSubscriptionImage from "@/assets/support-center/article-subscription.png";
import commitmentImage from "@/assets/support-center/commitment.png";
import contactHeroImage from "@/assets/support-center/contact-hero.png";
import downloadEmailIcon from "@/assets/support-center/download-email.svg";
import downloadHelpIcon from "@/assets/support-center/download-help.svg";
import downloadOrderIcon from "@/assets/support-center/download-order.svg";
import downloadPhoneImage from "@/assets/support-center/download-phone.png";
import familyHubImage from "@/assets/support-center/family-hub.png";
import orderProductImage from "@/assets/support-center/order-product.png";
import iconAccount from "@/assets/support-center/icon-account.svg";
import iconAi from "@/assets/support-center/icon-ai.svg";
import iconApp from "@/assets/support-center/icon-app.svg";
import iconChat from "@/assets/support-center/icon-chat.svg";
import iconChevronDown from "@/assets/support-center/icon-chevron-down.svg";
import iconEmail from "@/assets/support-center/icon-email.svg";
import iconFamilyHub from "@/assets/support-center/icon-family-hub.svg";
import iconFast from "@/assets/support-center/icon-fast.svg";
import iconGuidance from "@/assets/support-center/icon-guidance.svg";
import iconOrder from "@/assets/support-center/icon-order.svg";
import iconPrivacy from "@/assets/support-center/icon-privacy.svg";
import iconSecure from "@/assets/support-center/icon-secure.svg";
import iconTicket from "@/assets/support-center/icon-ticket.svg";
import iconTroubleshooting from "@/assets/support-center/icon-troubleshooting.svg";
import iconWeb from "@/assets/support-center/icon-web.svg";
import assistanceActionArrow from "@/assets/support-center/assistance-arrow-stroke.svg";
import assistanceContactIcon from "@/assets/support-center/assistance-contact.svg";
import assistanceFacebookIcon from "@/assets/support-center/assistance-facebook.svg";
import orderCheckIcon from "@/assets/support-center/order-check.svg";
import orderCheckCurrentIcon from "@/assets/support-center/order-check-current.svg";
import orderDeliveredDot from "@/assets/support-center/order-delivered-dot.svg";
import orderFrameImage from "@/assets/support-center/order-frame.png";
import orderProgressLineComplete from "@/assets/support-center/order-progress-line-complete.svg";
import orderProgressLineRest from "@/assets/support-center/order-progress-line-rest.svg";
import searchIcon from "@/assets/support-center/search.svg";

type SupportPageKey = "home" | "contact" | "request" | "order" | "download" | "category" | "article";
type OrderLookupMode = "tracking" | "order";
type CategoryIconName = "familyHub" | "ai" | "app" | "web" | "troubleshooting" | "order" | "account" | "privacy";

const supportTabs = [
  { label: "Support Center", href: "/support-center", key: "home" },
  { label: "Contact Us", href: "/support-center/contact", key: "contact" },
  { label: "Submit a request", href: "/support-center/request", key: "request" },
  { label: "Check Order Status", href: "/support-center/order", key: "order" },
] satisfies Array<{ label: string; href: string; key: SupportPageKey }>;

const categoryLinks = [
  { label: "Family Hub", icon: "familyHub", slug: "family-hub", description: "Subscription, credit, payment and other issues" },
  { label: "Nori AI Membership", icon: "ai", slug: "nori-ai-membership", description: "Manage your AI, subscription, and usage." },
  { label: "Nori App", icon: "app", slug: "nori-app", description: "Installation, app features, and updates for iOS and Android." },
  { label: "Nori Web", icon: "web", slug: "nori-web", description: "Web dashboard, cloud sync, and browser extension support." },
  { label: "Troubleshooting", icon: "troubleshooting", slug: "troubleshooting", description: "Fix common technical issues" },
  { label: "Track Order", icon: "order", slug: "track-order", description: "Check your delivery status" },
  { label: "Account & Subscription", icon: "account", slug: "account-subscription", description: "Manage your Nori plans" },
  { label: "Returns & Warranty", icon: "privacy", slug: "returns-warranty", description: "Start a return or claim" },
] satisfies Array<{ label: string; icon: CategoryIconName; slug: string; description: string }>;

const articleRows = [
  "Managing your subscription",
  "Changing your billing cycle",
  "Updating your payment method",
  "Viewing invoices and receipts",
];

const extendedArticleRows = [
  "How can I delete my account?",
  "How can I delete my space or website?",
  "Troubleshooting failed payments",
  "Understanding Nori AI credits",
  "What happens when a plan expires?",
  "How to transfer ownership",
];

function supportHref(path: string) {
  return path;
}

function useSupportCenterTitle() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Support Center";

    return () => {
      document.title = previousTitle;
    };
  }, []);
}

function useSupportScrollReveal(trigger: React.ReactNode) {
  useEffect(() => {
    const timers: number[] = [];
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal, .reveal-on-scroll, .reveal-stagger, .support-card-stagger, .reveal-left, .reveal-scale"),
    );

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.classList.add("visible");
        if (element.classList.contains("reveal-stagger") || element.classList.contains("support-card-stagger")) {
          element.classList.add("reveal-complete");
        }
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            if (entry.target.classList.contains("reveal-stagger") || entry.target.classList.contains("support-card-stagger")) {
              const completeDelay = entry.target.classList.contains("support-card-stagger") ? 1100 : 2200;
              const timer = window.setTimeout(() => {
                entry.target.classList.add("reveal-complete");
              }, completeDelay);
              timers.push(timer);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [trigger]);
}

function SupportCenterNav({ active }: { active: SupportPageKey }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    setIsHeaderVisible(true);
  }, [active]);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollYRef.current;

      if (currentScrollY < 24) {
        setIsHeaderVisible(true);
      } else if (scrollDelta > 8 && currentScrollY > 120) {
        setIsHeaderVisible(false);
      } else if (scrollDelta < -8) {
        setIsHeaderVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 top-0 z-40 w-full transition-transform duration-300 ease-out",
        isHeaderVisible || isMenuOpen ? "translate-y-0" : "-translate-y-[120%]",
      )}
    >
      <div className="relative mx-auto flex h-20 max-w-[1440px] items-start justify-between px-5 py-5 min-[700px]:px-10 min-[1120px]:h-[76px] min-[1120px]:px-20">
        <Link href="/" className="block h-6 w-[75.743px] overflow-hidden min-[700px]:h-[35.995px] min-[700px]:w-[113.597px]" aria-label="Nori home">
          <img src={noriWordmark} alt="Nori" className="h-full w-full" />
        </Link>

        <nav
          aria-label="Support Center navigation"
          className="absolute left-1/2 top-5 hidden -translate-x-1/2 items-center gap-2 overflow-visible min-[1120px]:flex"
        >
          {supportTabs.map((tab) => {
            const isActive = tab.key === active || (active === "category" && tab.key === "home") || (active === "article" && tab.key === "home");

            return (
              <Link
                href={tab.href}
                key={tab.key}
                aria-current={isActive ? "page" : undefined}
                className="flex h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-[#ede8da] px-5 pb-[10px] pt-[9px] text-[16px] font-medium leading-[22px] text-[#151515] transition-colors hover:bg-[#e5dfd0]"
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/"
          className="hidden h-10 w-[135px] shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-[#151515] px-6 pb-[10px] pt-[9px] text-[16px] font-medium leading-[22px] text-white transition-colors hover:bg-[#2b2926] min-[1120px]:flex"
        >
          Back to Nori
        </Link>

        <button
          type="button"
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#151515] transition-colors hover:bg-[#2b2926] min-[1120px]:hidden"
          aria-label="Open navigation"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(true)}
        >
          <img src={tabletMenuIcon} alt="" className="h-3 w-[17px]" />
        </button>
      </div>

      <SupportCenterMobileMenuPanel active={active} open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}

function SupportCenterMobileMenuPanel({ active, open, onClose }: { active: SupportPageKey; open: boolean; onClose: () => void }) {
  const mobileLinks = [
    ...supportTabs,
    { label: "Back to Nori", href: "/", key: "back" as const },
  ];

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col bg-[#fcfbf7] transition-opacity duration-200 min-[1120px]:hidden",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
      aria-hidden={!open}
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-start justify-between px-5 py-5 min-[700px]:px-10">
        <Link href="/" className="block h-6 w-[75.743px] overflow-hidden min-[700px]:h-[35.995px] min-[700px]:w-[113.597px]" aria-label="Nori home" onClick={onClose}>
          <img src={noriWordmark} alt="Nori" className="h-full w-full" />
        </Link>
        <button type="button" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#151515] transition-colors hover:bg-[#2b2926]" aria-label="Close navigation" onClick={onClose}>
          <img src={tabletNavCloseIcon} alt="" className="size-5" />
        </button>
      </div>

      <nav className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-4 overflow-y-auto px-5 pb-10 pt-0 min-[700px]:px-10" aria-label="Support Center mobile navigation">
        {mobileLinks.map((link) => {
          const isActive = link.key === active || (active === "category" && link.key === "home") || (active === "article" && link.key === "home");

          return (
            <Link
              href={link.href}
              key={`${link.key}-${link.label}`}
              aria-current={isActive ? "page" : undefined}
              onClick={onClose}
              className={cn(
                "flex h-10 items-center rounded-[12px] text-[16px] font-semibold leading-none text-[#151515] transition-colors hover:text-[#d68125]",
                isActive && "text-[#151515]",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

function SupportCenterFooter() {
  const moreLinks = [
    { label: "Back to Nori website", href: "/" },
    { label: "Nori on Web", href: "/support-center/category/nori-web" },
    { label: "Press", href: "/press" },
    { label: "Download Nori", href: "/support-center/download" },
    { label: "Blog", href: "/blog" },
  ];

  const legalLinks = ["Shipping", "Payment", "Return & Refund", "Privacy", "Term of service", "Product warranty"];

  return (
    <footer className="rounded-t-[24px] bg-[#151515] px-5 py-[50px] text-white min-[700px]:px-10 min-[700px]:py-10 min-[1120px]:rounded-t-[40px] min-[1120px]:bg-[#1c1917] min-[1120px]:px-0 min-[1120px]:pb-12 min-[1120px]:pt-[100px]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 min-[1120px]:gap-14 min-[1120px]:px-20">
        <div className="flex flex-col gap-10 min-[1120px]:flex-row min-[1120px]:gap-40">
          <div className="flex shrink-0 flex-col gap-6">
            <h2 className="font-ek text-[24px] font-medium leading-9 min-[1120px]:text-[32px] min-[1120px]:leading-10">
              Family-like help,
              <br />
              easier life with Nori AI
            </h2>
            <SocialLinks />
          </div>

          <div className="grid flex-1 grid-cols-2 items-start gap-x-8 gap-y-10 min-[700px]:grid-cols-3 min-[700px]:gap-4">
            <FooterColumn title="More" links={moreLinks} />
            <FooterColumn title="Legal" links={legalLinks.map((label) => ({ label, href: "/support-center/category/legal" }))} />
            <div className="col-span-2 flex flex-col items-start gap-2 min-[700px]:col-span-1">
              <h3 className="text-[18px] font-medium leading-[27px]">Email Us</h3>
              <p className="text-[16px] font-normal leading-6 text-white/60">
                We will get back to you in 24 hours.
                <br />
                <a href="mailto:support@heynori.com" className="underline underline-offset-2">
                  support@heynori.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <p className="border-t border-[#292524] pt-8 text-[13px] font-normal leading-5 tracking-[-0.1px] text-white/60 min-[700px]:pt-[41px] min-[700px]:text-[16px] min-[700px]:leading-[22px] min-[1120px]:leading-6">
          Copyright &copy; 2026 Domus Next Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: Array<{ label: string; href: string }> }) {
  return (
    <div className="flex flex-col gap-[18px]">
      <h3 className="text-[18px] font-medium leading-[27px] text-white">{title}</h3>
      <ul className="flex flex-col gap-4">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <Link href={link.href} className="text-[16px] font-normal leading-6 text-white/60 transition-colors hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="flex items-center gap-4 px-0.5 min-[1120px]:gap-5">
      <a href="https://www.instagram.com/figma/" target="_blank" rel="noreferrer" aria-label="Instagram" className="block size-[16.854px]">
        <img src={socialInstagram} alt="" className="h-full w-full" />
      </a>
      <a href="#" aria-label="YouTube" className="flex size-[22px] items-center justify-center">
        <img src={socialYoutube} alt="" className="h-[14.043px] w-5" />
      </a>
      <a href="#" aria-label="X" className="block h-4 w-[17.095px]">
        <img src={socialX} alt="" className="h-full w-full" />
      </a>
      <a href="https://www.facebook.com/figmadesign/" target="_blank" rel="noreferrer" aria-label="Facebook" className="block h-[17.618px] w-[9.856px]">
        <img src={socialFacebook} alt="" className="h-full w-full" />
      </a>
      <a href="https://www.tiktok.com/@figma" target="_blank" rel="noreferrer" aria-label="TikTok" className="block h-[16.917px] w-[14.662px]">
        <img src={socialTiktok} alt="" className="h-full w-full" />
      </a>
    </div>
  );
}

function SupportShell({
  active,
  children,
  footerTopMargin = "mt-[140px]",
  backgroundImage,
}: {
  active: SupportPageKey;
  children: React.ReactNode;
  footerTopMargin?: string;
  backgroundImage?: string;
}) {
  useSupportCenterTitle();
  useSupportScrollReveal(children);

  return (
    <div className="official-page relative min-h-screen overflow-x-hidden bg-[#f5f2e9] text-[#151515]">
      {backgroundImage ? (
        <div className="absolute left-0 top-0 h-[520px] w-full overflow-hidden min-[700px]:h-[692px]" aria-hidden="true">
          <img src={backgroundImage} alt="" className="h-full w-full object-cover" />
        </div>
      ) : null}
      <SupportCenterNav active={active} />
      <main className="relative z-10 mx-auto max-w-[1440px] pt-20">{children}</main>
      <div className={cn("relative z-10", footerTopMargin)}>
        <SupportCenterFooter />
      </div>
    </div>
  );
}

function SearchBar({ className, placeholder = "Search for articles..." }: { className?: string; placeholder?: string }) {
  return (
    <label className={cn("flex h-[54px] items-center gap-2 rounded-[16px] bg-white px-6 text-[16px] font-normal leading-[22px] text-[#151515]/40", className)}>
      <img src={searchIcon} alt="" className="size-4 shrink-0" />
      <input aria-label={placeholder} placeholder={placeholder} className="min-w-0 flex-1 bg-transparent text-[#151515] outline-none placeholder:text-[#151515]/40" />
    </label>
  );
}

function IconBox({ src, className, iconClassName }: { src: string; className?: string; iconClassName?: string }) {
  return (
    <span className={cn("flex size-8 shrink-0 items-center justify-center", className)}>
      <img src={src} alt="" className={cn("size-full object-contain", iconClassName)} />
    </span>
  );
}

function SupportLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const isNativeHref = href.startsWith("mailto:") || href.startsWith("http") || href === "#";

  if (isNativeHref) {
    return (
      <a href={href} className={className} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function ArrowText({ children }: { children: React.ReactNode }) {
  return (
    <span className="support-action-text inline-flex items-center gap-2 text-[14px] font-medium leading-5 text-[#d68125]">
      {children}
      <ActionArrowIcon />
    </span>
  );
}

function ActionArrowIcon() {
  return (
    <span className="support-action-arrow relative flex size-4 shrink-0 items-center justify-center" aria-hidden="true">
      <span className="relative block size-4 rotate-90">
        <img src={assistanceActionArrow} alt="" className="absolute left-1/2 top-[7.29%] h-[13.668px] w-[10.251px] max-w-none -translate-x-1/2" />
      </span>
    </span>
  );
}

function FigmaChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={cn("size-4 shrink-0", className)} fill="none" aria-hidden="true">
      <path
        d="M5.55806 3.19526C5.80214 2.93491 6.19875 2.93491 6.44282 3.19526L10.4428 7.46193C10.6869 7.72228 10.6869 8.14533 10.4428 8.40568L6.44282 12.67235C6.19875 12.9327 5.80214 12.9327 5.55806 12.67235C5.31398 12.412 5.31398 11.98894 5.55806 11.7286L9.11568 7.9338L5.55806 4.13901C5.31398 3.87866 5.31398 3.45561 5.55806 3.19526Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ProductCard({
  title,
  description,
  image,
  href,
}: {
  title: string;
  description: string;
  image: string;
  href: string;
}) {
  return (
    <Link href={href} className="interactive-card group/support-card flex min-h-[509px] flex-col gap-4 rounded-[24px] border border-transparent bg-white p-6 hover:shadow-[0_18px_45px_rgba(28,25,23,0.08)]">
      <div className="support-card-media h-[260px] overflow-hidden rounded-[12px] bg-[#ede8da] min-[900px]:h-[326px]">
        <img src={image} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-col gap-2 px-2 pt-2">
        <h2 className="text-[18px] font-medium leading-[27px]">{title}</h2>
        <p className="text-[16px] font-normal leading-6 text-[#151515]/80">{description}</p>
      </div>
      <div className="mt-auto px-2">
        <ArrowText>View guides</ArrowText>
      </div>
    </Link>
  );
}

function SmallGuideCard({
  icon,
  title,
  description,
  href,
}: {
  icon: string;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href} className="interactive-card flex min-h-[171px] flex-col gap-4 rounded-[24px] border border-transparent bg-white p-8 hover:shadow-[0_18px_45px_rgba(28,25,23,0.08)]">
      <IconBox src={icon} className="size-8" />
      <div className="flex flex-col gap-2">
        <h3 className="text-[18px] font-medium leading-[27px]">{title}</h3>
        <p className="text-[16px] leading-6 text-[#151515]/80">{description}</p>
      </div>
      <span className="mt-auto">
        <ArrowText>View guides</ArrowText>
      </span>
    </Link>
  );
}

function HelpCard({
  icon,
  title,
  description,
  action,
  href,
}: {
  icon: string;
  title: string;
  description: React.ReactNode;
  action: string;
  href: string;
}) {
  return (
    <SupportLink href={href} className="interactive-card flex min-h-[247px] flex-col gap-4 rounded-[24px] border border-transparent bg-white p-8 hover:shadow-[0_18px_45px_rgba(28,25,23,0.08)]">
      <IconBox src={icon} className="size-8" />
      <div className="flex flex-col gap-2">
        <h3 className="text-[18px] font-medium leading-[27px]">{title}</h3>
        <div className="text-[16px] font-normal leading-6 text-[#151515]/80">{description}</div>
      </div>
      <div className="mt-auto w-full border-t border-[#151515]/[0.05] pt-4">
        <ArrowText>{action}</ArrowText>
      </div>
    </SupportLink>
  );
}

function CategoryIcon({ icon }: { icon: CategoryIconName }) {
  const className = "size-[18px] shrink-0";

  if (icon === "familyHub") {
    return (
      <svg viewBox="0 0 18 18" className={className} fill="none" aria-hidden="true">
        <path d="M15 2.2998C16.4912 2.2998 17.7002 3.50883 17.7002 5V13C17.7002 14.4912 16.4912 15.7002 15 15.7002H3C1.50883 15.7002 0.299805 14.4912 0.299805 13V5C0.299805 3.50883 1.50883 2.2998 3 2.2998H15ZM3 5V13H15V5H3ZM13.7002 6.2998V11.7002H4.2998V6.2998H13.7002Z" fill="currentColor" />
      </svg>
    );
  }

  if (icon === "ai") {
    return (
      <svg viewBox="0 0 18 18" className={className} fill="none" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M9.17402 1H9.09082C7.74682 1 6.68282 1 5.84922 1.1136C4.99162 1.2312 4.29722 1.4784 3.75002 2.0352C3.20282 2.592 2.95962 3.2992 2.84442 4.1712C2.73242 5.0192 2.73242 6.1024 2.73242 7.4696V10.5304C2.73242 11.8984 2.73242 12.9816 2.84442 13.8288C2.95962 14.7008 3.20282 15.408 3.75002 15.9648C4.29722 16.5216 4.99162 16.7688 5.84922 16.8864C6.68202 17 7.74682 17 9.09082 17H9.17402C10.518 17 11.582 17 12.4156 16.8864C13.2732 16.7688 13.9676 16.5216 14.5148 15.9648C15.062 15.408 15.3052 14.7008 15.4204 13.8288C15.5324 12.9808 15.5324 11.8976 15.5324 10.5304V7.4696C15.5324 6.1016 15.5324 5.0184 15.4204 4.1712C15.3052 3.2992 15.062 2.592 14.5148 2.0352C13.9676 1.4784 13.2732 1.2312 12.4156 1.1136C11.5828 1 10.518 1 9.17402 1ZM6.39002 14.2096C6.38832 14.0628 6.44517 13.9213 6.54801 13.8165C6.65085 13.7118 6.7912 13.6523 6.93802 13.6512H11.3268C11.63 13.6512 11.8756 13.9008 11.8756 14.2096C11.8771 14.3564 11.8201 14.4978 11.7171 14.6024C11.6141 14.7071 11.4736 14.7664 11.3268 14.7672H6.93802C6.7912 14.7664 6.65077 14.7071 6.54778 14.6024C6.44479 14.4978 6.38773 14.3564 6.38922 14.2096H6.39002Z" fill="currentColor" />
      </svg>
    );
  }

  if (icon === "app") {
    return (
      <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M10.736 2.66699H10.5973C8.35733 2.66699 6.584 2.66699 5.19467 2.85633C3.76533 3.05233 2.608 3.46433 1.696 4.39233C0.784 5.32033 0.378667 6.49899 0.186667 7.95233C0 9.36566 0 11.171 0 13.4497V18.551C0 20.831 0 22.6363 0.186667 24.0483C0.378667 25.5017 0.784 26.6803 1.696 27.6083C2.608 28.5363 3.76533 28.9483 5.19467 29.1443C6.58267 29.3337 8.35733 29.3337 10.5973 29.3337H10.736C12.976 29.3337 14.7493 29.3337 16.1387 29.1443C17.568 28.9483 18.7253 28.5363 19.6373 27.6083C20.5493 26.6803 20.9547 25.5017 21.1467 24.0483C21.3333 22.635 21.3333 20.8297 21.3333 18.551V13.4497C21.3333 11.1697 21.3333 9.36433 21.1467 7.95233C20.9547 6.49899 20.5493 5.32033 19.6373 4.39233C18.7253 3.46433 17.568 3.05233 16.1387 2.85633C14.7507 2.66699 12.976 2.66699 10.736 2.66699ZM6.096 24.683C6.09316 24.4383 6.18791 24.2026 6.35931 24.0279C6.53071 23.8533 6.76463 23.7541 7.00933 23.7523H14.324C14.8293 23.7523 15.2387 24.1683 15.2387 24.683C15.2412 24.9277 15.1461 25.1633 14.9744 25.3377C14.8028 25.5121 14.5687 25.6109 14.324 25.6123H7.00933C6.76463 25.6109 6.53058 25.5121 6.35893 25.3377C6.18728 25.1633 6.09218 24.9277 6.09467 24.683H6.096Z" fill="currentColor" />
      </svg>
    );
  }

  if (icon === "web") {
    return (
      <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
        <path d="M2.70312 15.0003C3.22632 8.04401 9.02317 2.66688 15.9991 2.66699C14.8925 2.66699 13.9058 3.15233 13.0925 3.89499C12.2858 4.63366 11.6045 5.66566 11.0525 6.88433C10.4978 8.11099 10.0658 9.54566 9.77379 11.1017C9.53696 12.389 9.39525 13.6921 9.34979 15.0003H2.70312ZM2.70312 17.0003H9.34979C9.39779 18.3363 9.54046 19.651 9.77379 20.899C10.0671 22.455 10.4978 23.8897 11.0525 25.1163C11.6045 26.335 12.2858 27.367 13.0925 28.1057C13.9058 28.8483 14.8925 29.3337 15.9991 29.3337C8.97246 29.3337 3.21379 23.8977 2.70313 17.0003H2.70312Z" fill="currentColor" />
        <path d="M15.9997 4.52637C15.633 4.52637 15.1597 4.68237 14.609 5.18637C14.0544 5.69437 13.4984 6.49037 13.0077 7.57437C12.5197 8.6517 12.1237 9.9517 11.8517 11.405C11.6384 12.549 11.505 13.7624 11.457 14.9997H20.5424C20.4989 13.7934 20.367 12.592 20.1477 11.405C19.8757 9.9517 19.481 8.6517 18.9917 7.57437C18.501 6.49037 17.9464 5.69437 17.3917 5.1877C16.8397 4.68237 16.3664 4.52637 15.9997 4.52637ZM11.8517 20.5944C12.1237 22.0477 12.5197 23.3477 13.0077 24.425C13.4984 25.509 14.0544 26.305 14.6077 26.8117C15.1597 27.317 15.6344 27.473 15.9997 27.473C16.3664 27.473 16.8397 27.317 17.3904 26.813C17.9464 26.305 18.501 25.509 18.9917 24.425C19.4797 23.3477 19.8757 22.0477 20.1477 20.5944C20.3624 19.4504 20.4957 18.237 20.5424 16.9997H11.457C11.5037 18.237 11.637 19.4504 11.8517 20.5944Z" fill="currentColor" />
        <path d="M16 2.66699C17.108 2.66699 18.0933 3.15233 18.9067 3.89499C19.7133 4.63366 20.396 5.66566 20.9467 6.88433C21.5027 8.11099 21.9333 9.54566 22.2253 11.1017C22.4587 12.3497 22.6013 13.6643 22.6493 15.0003H29.296C28.7728 8.04401 22.976 2.66688 16 2.66699ZM22.2253 20.899C21.9333 22.455 21.5027 23.8897 20.9467 25.1163C20.396 26.335 19.7133 27.367 18.9067 28.1057C18.0933 28.8483 17.108 29.3337 16 29.3337C23.0267 29.3337 28.7853 23.8977 29.296 17.0003H22.6493C22.6039 18.3085 22.4622 19.6116 22.2253 20.899Z" fill="currentColor" />
      </svg>
    );
  }

  if (icon === "troubleshooting") {
    return (
      <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
        <path d="M21.33 1.66602C22.8481 1.66607 24.2812 2.04311 25.538 2.70898C25.8184 2.85753 26.0114 3.13058 26.0585 3.44434C26.1055 3.75797 26.0015 4.07554 25.7773 4.2998L21.4101 8.66504L23.329 10.585L27.6962 6.21875L27.7841 6.14062C27.9994 5.97079 28.2771 5.89539 28.5517 5.93652C28.8654 5.98365 29.1385 6.17769 29.287 6.45801C29.9529 7.71482 30.33 9.14788 30.33 10.666C30.33 15.6365 26.3004 19.6658 21.33 19.666C20.0774 19.666 18.8823 19.409 17.7968 18.9453L7.73235 29.0117C6.77384 29.9701 5.21919 29.97 4.26067 29.0117L2.9843 27.7354C2.0259 26.7768 2.02593 25.2222 2.9843 24.2637L13.0497 14.1973C12.5864 13.1121 12.33 11.918 12.33 10.666C12.33 5.69553 16.3596 1.66614 21.33 1.66602Z" fill="currentColor" />
      </svg>
    );
  }

  if (icon === "order") {
    return (
      <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
        <path d="M23.4386 6.19481L20.772 4.79481C18.4306 3.56681 17.26 2.95215 16.0013 2.95215C14.7426 2.95215 13.572 3.56548 11.2306 4.79481L10.8026 5.02015L22.7 11.8188L28.0546 9.13881C27.1933 8.16281 25.804 7.43348 23.4386 6.19215V6.19481ZM28.9986 10.9041L23.668 13.5708V17.6188C23.668 18.1707 23.2199 18.6188 22.668 18.6188C22.1161 18.6188 21.668 18.1707 21.668 17.6188V14.5708L17.0013 16.9041V29.4908C17.9586 29.2521 19.048 28.6815 20.772 27.7761L23.4386 26.3761C26.3066 24.8708 27.7413 24.1188 28.5386 22.7655C29.3346 21.4135 29.3346 19.7295 29.3346 16.3655V16.2095C29.3346 13.6855 29.3346 12.1081 28.9986 10.9055V10.9041ZM15.0013 29.4908V16.9041L3.00397 10.9041C2.66797 12.1068 2.66797 13.6855 2.66797 16.2068V16.3628C2.66797 19.7295 2.66797 21.4135 3.46397 22.7655C4.2613 24.1188 5.69597 24.8721 8.56397 26.3775L11.2306 27.7761C12.9546 28.6815 14.044 29.2521 15.0013 29.4908ZM3.94797 9.14015L16.0013 15.1668L20.5493 12.8935L8.7013 6.12281L8.56397 6.19481C6.19997 7.43481 4.8093 8.16415 3.94797 9.14148V9.14015Z" fill="currentColor" />
      </svg>
    );
  }

  if (icon === "account") {
    return (
      <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M13.3307 5.33398H18.6641C23.6921 5.33398 26.2067 5.33398 27.7681 6.89665C29.3294 8.45932 29.3307 10.9727 29.3307 16.0007C29.3307 21.0287 29.3307 23.5433 27.7681 25.1047C26.2054 26.666 23.6921 26.6673 18.6641 26.6673H13.3307C8.30273 26.6673 5.78806 26.6673 4.22673 25.1047C2.6654 23.542 2.66406 21.0287 2.66406 16.0007C2.66406 10.9727 2.66406 8.45798 4.22673 6.89665C5.7894 5.33532 8.30273 5.33398 13.3307 5.33398ZM17.6641 12.0007C17.6641 11.4484 18.1118 11.0007 18.6641 11.0007H25.3307C25.8826 11.0007 26.3307 11.4487 26.3307 12.0007C26.3307 12.5526 25.8826 13.0007 25.3307 13.0007H18.6641C18.1118 13.0007 17.6641 12.5529 17.6641 12.0007ZM18.9974 16.0007C18.9974 15.4484 19.4451 15.0007 19.9974 15.0007H25.3307C25.8826 15.0007 26.3307 15.4487 26.3307 16.0007C26.3307 16.5526 25.8826 17.0007 25.3307 17.0007H19.9974C19.4451 17.0007 18.9974 16.5529 18.9974 16.0007ZM20.3307 20.0007C20.3307 19.4484 20.7784 19.0007 21.3307 19.0007H25.3307C25.8826 19.0007 26.3307 19.4487 26.3307 20.0007C26.3307 20.5526 25.8826 21.0007 25.3307 21.0007H21.3307C20.7784 21.0007 20.3307 20.5529 20.3307 20.0007ZM14.6641 12.0007C14.6641 13.4724 13.4692 14.6673 11.9974 14.6673C10.5256 14.6673 9.33073 13.4724 9.33073 12.0007C9.33073 10.5289 10.5256 9.33398 11.9974 9.33398C13.4692 9.33398 14.6641 10.5289 14.6641 12.0007ZM11.9974 22.6673C17.3307 22.6673 17.3307 21.474 17.3307 20.0007C17.3307 18.5273 14.9441 17.334 11.9974 17.334C9.05073 17.334 6.66406 18.5273 6.66406 20.0007C6.66406 21.474 6.66406 22.6673 11.9974 22.6673Z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <path d="M13.5703 2.8737C15.1592 2.39878 16.8526 2.39926 18.4414 2.87468L26.0029 5.13737C27.4844 5.5807 28.4999 6.94449 28.5 8.49089V13.6178C28.4998 21.2019 23.9762 27.9821 17.1504 30.7712C16.4148 31.0717 15.5892 31.0716 14.8535 30.7712C8.02542 27.9821 3.5 21.2002 3.5 13.6139V8.49089C3.50026 6.94435 4.51535 5.58047 5.99707 5.13737L13.5703 2.8737ZM16.0117 11.3317C14.355 11.3317 13.0119 12.675 13.0117 14.3317C13.0117 15.6374 13.8473 16.7447 15.0117 17.1569V21.9967C15.0117 22.549 15.4594 22.9967 16.0117 22.9967C16.564 22.9967 17.0117 22.549 17.0117 21.9967V17.1569C18.1762 16.7447 19.0117 15.6374 19.0117 14.3317C19.0115 12.675 17.6685 11.3317 16.0117 11.3317Z" fill="currentColor" />
    </svg>
  );
}

function SectionHeading({ children, centered = false }: { children: React.ReactNode; centered?: boolean }) {
  return (
    <h2 className={cn("font-ek text-[36px] font-bold leading-[44px] text-[#18181b] min-[900px]:text-[44px] min-[900px]:leading-[54px]", centered && "text-center")}>
      {children}
    </h2>
  );
}

function StoreButtons({ large = false }: { large?: boolean }) {
  return (
    <div className={cn("reveal-stagger flex items-start", large ? "w-full flex-nowrap justify-center gap-[14.384px] min-[700px]:justify-start min-[700px]:gap-4" : "flex-wrap gap-4")}>
      <a
        href="#"
        className={cn(
          "flex shrink-0 items-center justify-center bg-white transition-colors hover:bg-[#fcfbf7]",
          large
            ? "h-[54px] w-[174px] gap-3 rounded-[12px] pl-[18px] pr-6 min-[700px]:h-[60px] min-[700px]:w-[193.333px] min-[700px]:gap-[13.333px] min-[700px]:rounded-[13.333px] min-[700px]:pl-5 min-[700px]:pr-[26.667px]"
            : "h-[54px] w-[174px] gap-3 rounded-[12px] pl-[18px] pr-6",
        )}
        aria-label="Download on the App Store"
      >
        <img src={footerAppStoreMark} alt="" className={cn("shrink-0", large ? "h-[26px] w-[21.153px] min-[700px]:h-[28.889px] min-[700px]:w-[23.504px]" : "h-[26px] w-[21.153px]")} />
        <span className={cn("flex shrink-0 flex-col items-center", large ? "w-[79.747px] gap-1 min-[700px]:w-[88.607px] min-[700px]:gap-[4.444px]" : "w-[79.747px] gap-1")}>
          <img src={footerAppStoreOverline} alt="" className={cn("opacity-50", large ? "h-[6.984px] w-[77.532px] min-[700px]:h-[7.76px] min-[700px]:w-[86.145px]" : "h-[6.984px] w-[77.532px]")} />
          <img src={footerAppStoreWord} alt="" className={cn(large ? "h-[17.413px] w-[79.747px] min-[700px]:h-[19.349px] min-[700px]:w-[88.608px]" : "h-[17.413px] w-[79.747px]")} />
        </span>
      </a>
      <a
        href="#"
        className={cn(
          "flex shrink-0 items-center bg-white transition-colors hover:bg-[#fcfbf7]",
          large
            ? "h-[54px] w-[174px] rounded-[12px] py-3 pl-5 pr-6 min-[700px]:h-[60px] min-[700px]:w-[193.333px] min-[700px]:rounded-[13.333px] min-[700px]:py-[13.333px] min-[700px]:pl-[22.222px] min-[700px]:pr-[26.667px]"
            : "h-[54px] w-[174px] rounded-[12px] py-3 pl-5 pr-6",
        )}
        aria-label="Get it on Google Play"
      >
        <span className={cn("flex items-center", large ? "gap-2 min-[700px]:gap-[8.889px]" : "gap-2")}>
          <span className={cn("relative block shrink-0", large ? "h-[29.578px] w-[26.465px] min-[700px]:h-[32.864px] min-[700px]:w-[29.406px]" : "h-[29.578px] w-[26.465px]")}>
            <img src={footerGooglePlayMark} alt="" className="absolute inset-[6.05%] h-[87.9%] w-[87.9%] max-w-none" />
          </span>
          <span className={cn("relative block shrink-0", large ? "h-[30.813px] w-[97.491px] min-[700px]:h-[34.237px] min-[700px]:w-[108.323px]" : "h-[30.813px] w-[97.491px]")}>
            <img src={footerGooglePlayWord} alt="" className="absolute inset-0 h-full w-full max-w-none" />
          </span>
        </span>
      </a>
    </div>
  );
}

export function SupportCenterHome() {
  return (
    <SupportShell active="home" footerTopMargin="mt-[100px]">
      <section className="flex min-h-[342px] items-center justify-center px-6 min-[700px]:px-10 lg:px-[336px]">
        <div className="flex w-full max-w-[768px] flex-col items-center gap-4">
          <h1 className="font-ek text-[44px] font-bold leading-[54px] text-[#151515] min-[900px]:text-[60px] min-[900px]:leading-[72px]">How can we help you?</h1>
          <SearchBar className="w-full" />
        </div>
      </section>

      <section className="mx-auto flex max-w-[1280px] flex-col gap-4 px-6 min-[700px]:px-10 lg:px-20 xl:px-0">
        <div className="support-card-stagger grid gap-4 min-[900px]:grid-cols-2">
          <ProductCard
            title="Family Hub"
            description="Setup guides, device settings, and connectivity troubleshooting."
            image={familyHubImage}
            href={supportHref("/support-center/category/family-hub")}
          />
          <ProductCard
            title="Nori AI Membership"
            description="Manage your AI, subscription, and usage."
            image={aiMembershipImage}
            href={supportHref("/support-center/category/nori-ai-membership")}
          />
        </div>

        <div className="support-card-stagger grid gap-4 min-[900px]:grid-cols-2">
          <SmallGuideCard icon={iconApp} title="Nori App" description="Installation, app features, and updates for iOS and Android." href="/support-center/category/nori-app" />
          <SmallGuideCard icon={iconWeb} title="Nori Web" description="Web dashboard, cloud sync, and browser extension support." href="/support-center/category/nori-web" />
        </div>
      </section>

      <section className="mx-auto mt-[140px] flex max-w-[1280px] flex-col gap-8 px-6 min-[700px]:px-10 lg:px-20 xl:px-0">
        <SectionHeading centered>Help &amp; Info</SectionHeading>
        <div className="support-card-stagger grid gap-4 min-[700px]:grid-cols-2 min-[1100px]:grid-cols-4">
          <SmallGuideCard icon={iconTroubleshooting} title="Troubleshooting" description="Fix common technical issues" href="/support-center/category/troubleshooting" />
          <SmallGuideCard icon={iconOrder} title="Track Order" description="Check your delivery status" href="/support-center/order" />
          <SmallGuideCard icon={iconAccount} title="Account & Subscription" description="Manage your Nori plans" href="/support-center/category/account-subscription" />
          <SmallGuideCard icon={iconPrivacy} title="Returns & Warranty" description="Start a return or claim" href="/support-center/category/returns-warranty" />
        </div>
      </section>

      <NeedHelpSection className="mt-[140px]" />

      <section className="mx-auto mt-[140px] grid max-w-[1280px] items-center gap-16 px-6 min-[700px]:px-10 lg:grid-cols-[1fr_703px] lg:gap-20 lg:px-20 xl:px-0">
        <div className="flex flex-col gap-10">
          <SectionHeading>Our Commitment to You</SectionHeading>
          <div className="reveal-stagger flex flex-col gap-8">
            <CommitmentItem icon={iconFast} title="Fast Resolution">
              90% of inquiries are resolved within the first interaction, minimizing your downtime.
            </CommitmentItem>
            <CommitmentItem icon={iconGuidance} title="Expert Guidance">
              Our support team consists of trained product specialists ready to tackle any technical challenge.
            </CommitmentItem>
            <CommitmentItem icon={iconSecure} title="Secure & Private">
              Your data and communications are handled with the highest standards of security and privacy.
            </CommitmentItem>
          </div>
        </div>
        <div className="reveal-scale relative h-[360px] overflow-hidden rounded-[32px] bg-[#fae696] min-[900px]:h-[489px]">
          <img src={commitmentImage} alt="" className="absolute left-[-18%] top-[-22%] h-[122%] w-[127%] max-w-none object-cover" />
        </div>
      </section>
    </SupportShell>
  );
}

function CommitmentItem({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-5">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-[16px] bg-[#ede8da]">
        <img src={icon} alt="" className="size-6 object-contain" />
      </span>
      <div className="flex flex-col gap-1">
        <h3 className="text-[22px] font-medium leading-8">{title}</h3>
        <p className="text-[16px] leading-[22px] text-[#151515]/80">{children}</p>
      </div>
    </div>
  );
}

function NeedHelpSection({ className, narrow = false }: { className?: string; narrow?: boolean }) {
  return (
    <section className={cn("mx-auto flex flex-col gap-8 px-6 min-[700px]:px-10 lg:px-20", narrow ? "max-w-[848px]" : "max-w-[1280px] xl:px-0", className)}>
      <SectionHeading centered={!narrow}>Still need help?</SectionHeading>
      <div className={cn("support-card-stagger grid gap-4", narrow ? "min-[760px]:grid-cols-2" : "min-[900px]:grid-cols-3")}>
        <HelpCard
          icon={iconEmail}
          title="Email Support"
          description="Send us a detailed message. We aim to respond within 24 hours."
          action="Send Email"
          href="mailto:support@heynori.com"
        />
        <HelpCard
          icon={iconChat}
          title="Online Chat"
          description={
            <>
              Talk to a human right now.
              <br />
              Available Mon-Fri, 9am - 5pm PST.
            </>
          }
          action="Start Chat"
          href="/support-center/contact"
        />
        {!narrow ? (
          <HelpCard
            icon={iconTicket}
            title="Submit a Ticket"
            description="For complex issues, submit a ticket to our technical team."
            action="Submit Ticket"
            href="/support-center/request"
          />
        ) : null}
      </div>
    </section>
  );
}

export function SupportContactPage() {
  return (
    <SupportShell active="contact" backgroundImage={contactHeroImage} footerTopMargin="mt-[140px]">
      <section className="flex min-h-[612px] items-center px-6 py-[100px] min-[700px]:px-10 lg:px-20">
        <div className="flex max-w-[503px] flex-col gap-4 pb-6 text-white">
          <h1 className="font-ek text-[44px] font-bold leading-[54px] min-[900px]:text-[60px] min-[900px]:leading-[72px]">Contact Us</h1>
          <p className="text-[18px] font-medium leading-[27px]">Find the right contact to answer your questions about products, sales, support, and more.</p>
        </div>
      </section>

      <section className="mx-auto mt-[60px] flex max-w-[1280px] flex-col gap-8 px-6 min-[700px]:px-10 lg:px-20 xl:px-0">
        <SectionHeading>Technical Support</SectionHeading>
        <div className="support-card-stagger grid gap-4 min-[900px]:grid-cols-2">
          <ContactActionCard icon={iconEmail} title="Email support" description="Contact our support team - we'll reply within 24 hours." action="support@heynori.com" href="mailto:support@heynori.com" />
          <ContactActionCard icon={iconTicket} title="Submit a ticket" description="Request help with any product issues or technical difficulties." action="Submit a ticket" href="/support-center/request" />
        </div>

        <div className="reveal-on-scroll rounded-[24px] border border-[#e7e5e4]/60 bg-white p-8">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-6">
              <IconBox src={iconFamilyHub} className="size-8" />
              <div>
                <h3 className="text-[22px] font-medium leading-8">Product manual</h3>
                <p className="text-[16px] leading-6 text-[#151515]/80">User guides and quick start videos to help you understand and use our products.</p>
              </div>
            </div>
            <div className="support-card-stagger grid gap-4 min-[900px]:grid-cols-3">
              <ManualLink icon={iconFamilyHub} title="Nori Family Hub" subtitle="Guides & Videos" />
              <ManualLink icon={iconApp} title="Nori App" subtitle="Quick start guide" />
              <ManualLink icon={iconWeb} title="Nori Web" subtitle="Quick start guide" />
            </div>
          </div>
        </div>
      </section>
    </SupportShell>
  );
}

function ContactActionCard({ icon, title, description, action, href }: { icon: string; title: string; description: string; action: string; href: string }) {
  return (
    <SupportLink href={href} className="interactive-card flex min-h-[240px] flex-col gap-6 rounded-[24px] border border-transparent bg-white p-8 hover:shadow-[0_18px_45px_rgba(28,25,23,0.08)]">
      <IconBox src={icon} className="size-8" />
      <div className="flex flex-col gap-[7px]">
        <h3 className="text-[22px] font-medium leading-8">{title}</h3>
        <p className="text-[16px] leading-6 text-[#151515]/80">{description}</p>
      </div>
      <span className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-[#ffbe73] px-4 py-2 text-[14px] font-medium leading-5">
        {action}
        <ActionArrowIcon />
      </span>
    </SupportLink>
  );
}

function ManualLink({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) {
  return (
    <Link href="/support-center/article/managing-your-subscription" className="flex h-[74px] items-center justify-between rounded-[16px] bg-[#fcfbf7] p-4 transition-colors hover:bg-[#fff6eb]">
      <span className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-[12px] bg-white">
          <img src={icon} alt="" className="size-[18px] object-contain" />
        </span>
        <span>
          <span className="block text-[16px] font-medium leading-[22px] text-[#1c1917]">{title}</span>
          <span className="block text-[14px] leading-5 text-[#151515]/80">{subtitle}</span>
        </span>
      </span>
      <FigmaChevronRightIcon />
    </Link>
  );
}

export function SupportRequestPage() {
  return (
    <SupportShell active="request" footerTopMargin="mt-[140px]">
      <section className="mx-auto flex max-w-[848px] flex-col items-center gap-6 px-6 pt-[60px] min-[700px]:px-0">
        <h1 className="font-ek text-[36px] font-bold leading-[44px] text-[#151515] min-[900px]:text-[44px] min-[900px]:leading-[54px]">Submit a request</h1>
        <SearchBar className="w-full" />
      </section>

      <form className="reveal-stagger mx-auto mt-20 flex max-w-[848px] flex-col gap-8 px-6 min-[700px]:px-0">
        <FormField label="Your email address" required>
          <input className="h-[54px] w-full rounded-[16px] bg-white px-6 text-[16px] leading-[22px] outline-none placeholder:text-[#151515]/40" placeholder="Enter Your Email" />
        </FormField>

        <FormField
          label="Description"
          required
          helper="Please enter the details of your request. A member of our support staff will respond as soon as possible."
        >
          <div className="overflow-hidden rounded-[16px] bg-white">
            <div className="flex h-[53px] items-center gap-1 border-b border-[#151515]/[0.05] px-2 text-[14px] font-medium leading-5 text-[#151515]/80">
              <button type="button" className="rounded-[6px] px-3 py-1.5">
                Paragraph
              </button>
              <span className="h-5 w-px bg-[#151515]/[0.05]" />
              {["B", "I", "U", "Link", "List", "Media"].map((item) => (
                <button type="button" key={item} className="rounded-[6px] px-2 py-1.5 hover:bg-[#f5f2e9]">
                  {item}
                </button>
              ))}
            </div>
            <textarea className="h-[200px] w-full resize-none bg-white p-4 outline-none" />
          </div>
        </FormField>

        <FormField label="Attachments(optional)">
          <button type="button" className="h-[54px] w-full rounded-[16px] bg-white px-3 text-center text-[16px] leading-[22px] text-[#151515]/60">
            <span className="text-[#529cff]">Choose a file</span> or drag and drop here
          </button>
        </FormField>

        <button type="button" className="flex h-[50px] w-[200px] items-center justify-center rounded-[31px] bg-[#ffbe73] px-[30px] text-[18px] font-medium leading-[27px] transition-colors hover:bg-[#f5a650]">
          Submit
        </button>
      </form>
    </SupportShell>
  );
}

function FormField({
  label,
  required,
  helper,
  children,
}: {
  label: string;
  required?: boolean;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-3">
      <span className="flex flex-col gap-0.5">
        <span className="text-[16px] font-medium leading-[22px] text-[#151515]">
          {label}
          {required ? <span className="text-[#f06965]">*</span> : null}
        </span>
        {helper ? <span className="text-[16px] leading-[22px] text-[#151515]/40">{helper}</span> : null}
      </span>
      {children}
    </label>
  );
}

export function SupportOrderPage() {
  const [lookupMode, setLookupMode] = useState<OrderLookupMode>("tracking");
  const [hasResult, setHasResult] = useState(false);
  const [tracking, setTracking] = useState("");
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");

  function handleTrack(event: React.FormEvent) {
    event.preventDefault();
    if (lookupMode === "tracking") {
      if (!tracking.trim()) setTracking("PLAUDUS35917");
      if (!email.trim()) setEmail("Nanaco@gamil.com");
    } else if (!orderId.trim()) {
      setOrderId("#LS-99482-X");
    }
    setHasResult(true);
  }

  return (
    <SupportShell active="order" footerTopMargin="mt-[140px]">
      <section className="mx-auto flex max-w-[848px] flex-col gap-[60px] px-6 pt-[60px] min-[700px]:px-0">
        <h1 className="text-center font-ek text-[44px] font-bold leading-[54px] text-[#151515] min-[900px]:text-[60px] min-[900px]:leading-[72px]">Track Your Order</h1>
        <form onSubmit={handleTrack} className={cn("reveal-on-scroll flex flex-col gap-4 rounded-[24px] bg-white p-8", lookupMode === "tracking" ? "min-h-[292px]" : "min-h-[230px]")}>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className={cn(
                "flex h-8 items-center rounded-[8px] px-4 text-[14px] leading-5 text-[#151515] transition-colors hover:bg-[#f5f2e9]",
                lookupMode === "tracking" ? "bg-[#f5f2e9] font-medium" : "font-normal",
              )}
              onClick={() => {
                setLookupMode("tracking");
                setHasResult(false);
              }}
            >
              Tracking Number
            </button>
            <button
              type="button"
              className={cn(
                "flex h-8 items-center rounded-[8px] px-4 text-[14px] leading-5 text-[#151515] transition-colors hover:bg-[#f5f2e9]",
                lookupMode === "order" ? "bg-[#f5f2e9] font-medium" : "font-normal",
              )}
              onClick={() => {
                setLookupMode("order");
                setHasResult(false);
              }}
            >
              Order ID
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {lookupMode === "tracking" ? (
              <>
                <input value={tracking} onChange={(event) => setTracking(event.target.value)} className="h-[54px] rounded-[8px] bg-[#fcfbf7] px-4 text-[14px] font-normal leading-5 outline-none placeholder:text-[#151515]/40" placeholder="Order Number" />
                <input value={email} onChange={(event) => setEmail(event.target.value)} className="h-[54px] rounded-[8px] bg-[#fcfbf7] px-4 text-[14px] font-normal leading-5 outline-none placeholder:text-[#151515]/40" placeholder="Email" />
              </>
            ) : (
              <input value={orderId} onChange={(event) => setOrderId(event.target.value)} className="h-[54px] rounded-[8px] bg-[#fcfbf7] px-4 text-[14px] font-normal leading-5 outline-none placeholder:text-[#151515]/40" placeholder="Order ID" />
            )}
          </div>

          <div className="flex justify-end">
            <button type="submit" className="flex h-10 min-w-[68px] items-center justify-center rounded-full bg-[#ffbe73] px-6 text-[14px] font-medium leading-5 text-[#151515] transition-colors hover:bg-[#f5a650]">
              Track
            </button>
          </div>
        </form>
      </section>

      {hasResult ? (
        <>
          <OrderResultCard />
          <NeedFurtherAssistance className="mt-[140px]" />
        </>
      ) : (
        <NeedFurtherAssistance className="mt-[140px]" />
      )}
    </SupportShell>
  );
}

function OrderResultCard() {
  const steps = [
    { label: "Order pending", date: "May 8th", state: "complete" },
    { label: "Info received", date: "May 12th", state: "complete" },
    { label: "In transit", date: "May 15th", state: "complete" },
    { label: "Out for delivery", date: "May 16th", state: "current" },
    { label: "Delivered", date: "May 16th", state: "pending" },
  ] as const;

  const history = [
    ["14:30", "May 16th, 2026", "Delivered", "Package handed to resident. Seattle, WA."],
    ["08:15", "May 16th, 2026", "Out for delivery", "Package is out for delivery. Seattle, WA."],
    ["14:30", "May 15th, 2026", "Arrived at local facility", "Seattle Sorting Center, WA."],
    ["14:30", "May 10th, 2026", "In transit", "Departed regional facility. Portland, OR."],
    ["09:00", "May 8th, 2026", "Order pending", "Shipping information received. Los Angeles, CA."],
  ];

  return (
    <section className="mx-auto mt-6 max-w-[848px] px-6 min-[700px]:px-0">
      <div className="reveal-on-scroll min-[900px]:min-h-[786px] rounded-[24px] bg-white p-8">
        <div className="flex flex-col items-start">
          <span className="flex h-[30px] items-center rounded-[4px] bg-[#eefbf7] px-2 text-[14px] font-normal leading-5 text-[#20856f]">In Transit</span>
          <h2 className="mt-2 text-[32px] font-semibold leading-[39px] text-[#151515]">Arriving by Friday</h2>
          <p className="mt-1 text-[16px] font-normal leading-6 text-[#151515]/40">Last update: May 16th, 2026 · 14:30</p>
        </div>

        <div className="mt-8 flex h-[118px] flex-col items-start py-6">
          <div className="relative flex w-full items-center justify-between pr-[0.02px]">
            <div className="absolute left-[41px] top-[-2px] h-6 w-[534px]">
              <img src={orderProgressLineComplete} alt="" className="h-full w-full" />
            </div>
            <div className="absolute left-[583px] top-[-2px] h-6 w-[160px]">
              <img src={orderProgressLineRest} alt="" className="h-full w-full" />
            </div>
            {steps.map((step) => (
              <div className="relative z-10 flex shrink-0 flex-col items-center gap-2 text-center" key={step.label}>
                <OrderStepDot state={step.state} />
                <div className={cn("flex flex-col items-center justify-center gap-[2px] text-[14px] leading-5", step.state === "current" && "text-[#d68125]")}>
                  <span
                    className={cn(
                      "font-medium",
                      step.state === "current" ? "text-[#d68125]" : step.state === "pending" ? "text-[#151515]/20" : "text-[#151515]",
                    )}
                  >
                    {step.label}
                  </span>
                  <span className={cn("font-normal", step.state === "current" ? "text-[#d68125]" : step.state === "pending" ? "text-[#151515]/20" : "text-[#151515]/40")}>
                    {step.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-10 min-[900px]:grid-cols-[454px_290px]">
          <div>
            <h3 className="text-[18px] font-medium leading-[27px] text-[#151515]">Tracking History</h3>
            <div className="mt-6 h-px bg-[#151515]/[0.05]" />
            <div className="mt-6 flex flex-col gap-6">
              {history.map(([time, date, title, desc]) => (
                <div className="grid grid-cols-[120px_1fr] gap-8" key={`${time}-${title}`}>
                  <div>
                    <p className="text-[14px] font-medium leading-5 text-[#1a1c1c]">{time}</p>
                    <p className="text-[14px] font-normal leading-5 text-[#151515]/40">{date}</p>
                  </div>
                  <div>
                    <p className="text-[14px] font-medium leading-5 text-[#1a1c1c]">{title}</p>
                    <p className="text-[14px] font-normal leading-5 text-[#151515]/40">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 inline-flex h-5 items-center gap-1 text-[14px] font-normal leading-5 text-[#151515]">
              <img src={iconChevronDown} alt="" className="size-4 opacity-80" />
              Show more
            </button>
          </div>

          <aside>
            <h3 className="text-[18px] font-medium leading-[27px] text-[#151515]">Order Information</h3>
            <div className="mt-6 h-px bg-[#151515]/[0.05]" />
            <dl className="mt-6 grid grid-cols-[1fr_auto] gap-x-6 gap-y-2 text-[14px] leading-5">
              <InfoRow label="Destination" value="Seattle, WA" />
              <InfoRow label="Transport time" value="3 Days" />
              <InfoRow label="Order number" value="#LS-99482-X" />
              <InfoRow label="Carrier" value="LogiSwift Express" />
            </dl>
            <div className="mt-6 h-px bg-[#151515]/[0.05]" />
            <div className="mt-6 flex flex-col gap-2">
              <OrderProduct image={orderProductImage} title="Nori Family Hub" meta="15.5″ Black" price="$299.00" />
              <OrderProduct image={orderFrameImage} title="Custom Frame" meta="15.5″ Blush Pink" price="$29.00" />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function OrderStepDot({ state }: { state: "complete" | "current" | "pending" }) {
  if (state === "pending") {
    return <img src={orderDeliveredDot} alt="" className="size-5 shrink-0" />;
  }

  return (
    <span
      className={cn(
        "flex size-5 shrink-0 items-center justify-center rounded-full border-[3px]",
        state === "complete" && "border-[#151515]/20 bg-[#151515]",
        state === "current" && "border-[#feead1] bg-[#ffbe73]",
      )}
    >
      <img src={state === "current" ? orderCheckCurrentIcon : orderCheckIcon} alt="" className="size-3" />
    </span>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt className="text-[#151515]/40">{label}:</dt>
      <dd className="text-right font-medium text-[#151515]">{value}</dd>
    </>
  );
}

function OrderProduct({ image, title, meta, price }: { image?: string; title: string; meta: string; price: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-[8px] bg-[#151515]/[0.05]">
        {image ? <img src={image} alt="" className={cn("object-contain", image === orderProductImage ? "h-[33px] w-[51px]" : "h-[32.371px] w-[50.999px]")} /> : null}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-medium leading-5">{title}</p>
        <p className="text-[14px] leading-5 text-[#151515]/40">{meta}</p>
      </div>
      <div className="text-right text-[14px] leading-5">
        <p className="font-medium">{price}</p>
        <p className="text-[#151515]/40">x1</p>
      </div>
    </div>
  );
}

function NeedFurtherAssistance({ className }: { className?: string }) {
  return (
    <section className={cn("mx-auto flex max-w-[848px] flex-col gap-8 px-6 min-[700px]:px-0", className)}>
      <SectionHeading centered>Need further assistance?</SectionHeading>
      <div className="support-card-stagger grid gap-4 min-[760px]:grid-cols-2">
        <AssistanceCard
          icon={assistanceContactIcon}
          iconSize="contact"
          title="Contact Us"
          description={
            <>
              We will get back to you in 24 hours.
              <br />
              <span className="underline underline-offset-2">support@heynori.com</span>
            </>
          }
          action="Send Email"
          href="/support-center/contact"
        />
        <AssistanceCard
          icon={assistanceFacebookIcon}
          iconSize="facebook"
          title="Join our community on Facebook"
          description={
            <>
              Connect with other customers, share your
              <br />
              experiences, and get exclusive updates.
            </>
          }
          action="Join Group"
          href="/support-center/category/community"
        />
      </div>
    </section>
  );
}

function AssistanceCard({
  icon,
  iconSize,
  title,
  description,
  action,
  href,
}: {
  icon: string;
  iconSize: "contact" | "facebook";
  title: string;
  description: React.ReactNode;
  action: string;
  href: string;
}) {
  return (
    <SupportLink href={href} className="interactive-card flex min-h-[247px] flex-col gap-4 rounded-[24px] border border-transparent bg-white p-8 hover:shadow-[0_18px_45px_rgba(28,25,23,0.08)]">
      <span className="flex size-8 shrink-0 items-center justify-center">
        <img src={icon} alt="" className={cn("block max-w-none", iconSize === "contact" ? "size-[26.667px]" : "size-8")} />
      </span>
      <div className="flex flex-col gap-2">
        <h3 className="text-[18px] font-medium leading-[27px] text-[#151515]">{title}</h3>
        <div className="text-[16px] font-normal leading-6 text-[#151515]/80">{description}</div>
      </div>
      <div className="mt-auto h-px w-full bg-[#151515]/[0.04]" />
      <span className="support-action-text inline-flex items-center gap-2 text-[14px] font-medium leading-5 text-[#d68125]">
        {action}
        <ActionArrowIcon />
      </span>
    </SupportLink>
  );
}

export function SupportDownloadPage() {
  return (
    <SupportShell active="download" footerTopMargin="mt-[140px]">
      <section className="flex min-h-[820px] flex-col items-center px-5 pt-[74px] min-[760px]:min-h-[581px] min-[760px]:flex-row min-[760px]:justify-between min-[760px]:overflow-hidden min-[760px]:px-10 min-[760px]:pt-0 min-[1120px]:min-h-[780px] min-[1120px]:justify-center min-[1120px]:gap-[180px] min-[1120px]:overflow-visible min-[1120px]:px-20 xl:gap-[240px]">
        <div className="flex w-full max-w-[403px] flex-col gap-10 min-[760px]:gap-12 min-[760px]:pb-4">
          <div className="flex flex-col items-center gap-4 text-center min-[760px]:items-start min-[760px]:text-left">
            <h1 className="font-ek text-[32px] font-bold leading-[38.4px] tracking-[-0.32px] min-[760px]:text-[60px] min-[760px]:leading-[72px] min-[760px]:tracking-normal">Download Nori</h1>
            <p className="text-[15px] font-normal leading-[22px] text-[#151515]/80 min-[760px]:text-[18px] min-[760px]:font-medium min-[760px]:leading-[27px]">Take Nori everywhere you go.</p>
          </div>
          <StoreButtons large />
        </div>
        <img
          src={downloadPhoneImage}
          alt=""
          className="mt-10 h-auto w-[362px] max-w-full shrink-0 object-contain min-[760px]:mt-0 min-[760px]:w-[clamp(320px,42vw,470px)] min-[1120px]:w-[498px]"
        />
      </section>

      <section className="support-card-stagger mx-auto mt-0 grid max-w-[1280px] gap-4 px-5 min-[760px]:mt-[60px] min-[760px]:grid-cols-3 min-[760px]:px-10 min-[1120px]:px-20 xl:px-0">
        <HelpCard icon={downloadHelpIcon} title="Help Center" description="Find answers to common questions, setup guides, and troubleshooting tips." action="Learn More" href="/support-center" />
        <HelpCard icon={downloadOrderIcon} title="Order Tracking" description="Track your hardware delivery in real-time and manage your shipping preferences." action="Learn More" href="/support-center/order" />
        <HelpCard icon={downloadEmailIcon} title="Contact Us" description="Send us a detailed message. We aim to respond within 24 hours." action="Send Email" href="/support-center/contact" />
      </section>
    </SupportShell>
  );
}

export function SupportCategoryPage() {
  const [location] = useLocation();
  const locationParts = location.split("/").filter(Boolean);
  const currentSlug = locationParts[locationParts.length - 1] ?? "family-hub";
  const activeCategory = categoryLinks.find((item) => item.slug === currentSlug) ?? categoryLinks[0];

  return (
    <SupportShell active="category" footerTopMargin="mt-[140px]">
      <section className="mx-auto flex max-w-[1096px] flex-col gap-[50px] px-6 pt-10 min-[700px]:px-10 lg:px-0">
        <SearchBar className="w-full" />
        <div className="flex flex-col gap-4">
          <Breadcrumb items={["Nori Support", "Billing"]} />
          <div className="flex flex-col gap-2">
            <h1 className="font-ek text-[36px] font-bold leading-[44px] min-[900px]:text-[44px] min-[900px]:leading-[54px]">{activeCategory.label}</h1>
            <p className="text-[18px] leading-[27px]">{activeCategory.description}</p>
          </div>
        </div>

        <div className="grid gap-10 min-[900px]:grid-cols-[261px_1fr]">
          <aside className="flex flex-col gap-2">
            {categoryLinks.map((item) => {
              const isActive = item.slug === activeCategory.slug;

              return (
                <Link
                  href={`/support-center/category/${item.slug}`}
                  key={item.slug}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group relative flex min-h-[59px] items-center gap-3 rounded-[12px] p-4 text-[18px] font-medium leading-[27px] transition-colors hover:text-[#151515]",
                    isActive ? "bg-white text-[#151515] hover:bg-white" : "text-[#151515]/60 hover:bg-white/50",
                  )}
                >
                  <CategoryIcon icon={item.icon} />
                  {item.label}
                </Link>
              );
            })}
          </aside>

          <div className="flex flex-col gap-4">
            <ArticleGroup title="Subscriptions" articles={articleRows} />
            <ArticleGroup title="Account and billing" articles={extendedArticleRows} />
          </div>
        </div>
      </section>

      <NeedFurtherAssistance className="mt-[140px] max-w-[1096px] px-6 min-[700px]:px-10 lg:px-0" />
    </SupportShell>
  );
}

function Breadcrumb({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 text-[16px] leading-[22px]">
      {items.map((item, index) => (
        <span className="flex gap-2" key={`${item}-${index}`}>
          <span className={index === items.length - 1 ? "text-[#151515]/40" : "text-[#151515]"}>{item}</span>
          {index < items.length - 1 ? <span className="text-[#151515]/40">&gt;</span> : null}
        </span>
      ))}
    </div>
  );
}

function ArticleGroup({ title, articles }: { title?: string; articles: string[] }) {
  return (
    <section className="reveal-on-scroll rounded-[24px] bg-white p-2">
      {title ? (
        <>
          <h2 className="px-4 py-4 text-[22px] font-medium leading-8">{title}</h2>
          <div className="h-px bg-[#151515]/[0.05]" />
        </>
      ) : null}
      <div className="reveal-stagger flex flex-col">
        {articles.map((article, index) => (
          <Link
            href="/support-center/article/managing-your-subscription"
            key={`${title}-${article}-${index}`}
            className="group flex items-center justify-between rounded-[14px] p-4 text-[16px] leading-[22px] text-[#151515] transition-colors hover:bg-[#fff6eb] hover:text-[#d68125]"
          >
            <span>{article}</span>
            <FigmaChevronRightIcon className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </section>
  );
}

export function SupportArticlePage() {
  const related = useMemo(() => articleRows, []);

  return (
    <SupportShell active="article" footerTopMargin="mt-[140px]">
      <article className="mx-auto flex max-w-[1096px] flex-col gap-20 px-6 pt-10 min-[700px]:px-10 lg:px-0">
        <SearchBar className="w-full" />
        <div className="flex flex-col gap-12">
          <header className="flex flex-col gap-6">
            <Breadcrumb items={["Nori Support", "Billing", "Managing your subscription"]} />
            <div className="flex flex-col gap-2">
              <h1 className="font-ek text-[36px] font-bold leading-[44px] min-[900px]:text-[44px] min-[900px]:leading-[54px]">Managing your subscription</h1>
              <p className="text-[18px] leading-[27px]">This article explains how to view, change, or cancel your Nori subscription on: Web, iOS, Android.</p>
            </div>
            <p className="text-[16px] leading-[22px] text-[#151515]/40">1 month ago · Updated</p>
          </header>

          <div className="flex flex-col gap-8 text-[16px] leading-[22px] text-[#151515]">
            <p>
              Your subscription is always managed on the same platform where you originally started it. If you subscribed on iOS, you manage it via Apple; if you subscribed on Android, you manage it via Google Play; if you subscribed on the web, you manage it on{" "}
              <a href="https://heynori.com/" target="_blank" rel="noreferrer" className="underline">
                heynori.com
              </a>
              .
            </p>
            <ArticleStep withImage />
            <ArticleStep />
          </div>

          <div className="h-px bg-[#151515]/[0.05]" />

          <section className="flex flex-col gap-6">
            <h2 className="text-[22px] font-medium leading-8">Related Articles</h2>
            <ArticleGroup title="" articles={related} />
          </section>
        </div>
      </article>
    </SupportShell>
  );
}

function ArticleStep({ withImage = false }: { withImage?: boolean }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-[22px] font-medium leading-8">{'1. Click "More options" on the page.'}</h2>
      <p>Your Nori subscription will be billed through one of the following:</p>
      {withImage ? (
        <div className="w-full">
          <img src={articleSubscriptionImage} alt="" className="h-auto w-full max-w-[538px] object-cover" />
        </div>
      ) : null}
      <p>
        You cannot cancel or change a subscription purchased on one platform from another platform. For example, a subscription started in the iOS app must be managed via your Apple ID, not on the Nori website or Android.
      </p>
    </section>
  );
}

export default SupportCenterHome;
