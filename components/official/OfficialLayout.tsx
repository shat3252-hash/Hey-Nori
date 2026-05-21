import { useEffect, useRef, useState } from "react";
import type React from "react";
import { toast } from "sonner";
import { Link, useLocation } from "wouter";
import navChevronHoverIcon from "@/assets/official/nav-chevron-hover.svg";
import navChevronIcon from "@/assets/official/nav-chevron.svg";
import navCartIcon from "@/assets/official/nav-cart.svg";
import navUserIcon from "@/assets/official/nav-user.svg";
import pressExternalIcon from "@/assets/official/press-external.svg";
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
import supportAppDownloadIcon from "@/assets/official/support-app-download.svg";
import supportCenterIcon from "@/assets/official/support-center.svg";
import supportCommunityIcon from "@/assets/official/support-community.svg";
import supportContactIcon from "@/assets/official/support-contact.svg";
import supportTicketIcon from "@/assets/official/support-ticket.svg";
import supportTrustIcon from "@/assets/official/support-trust.svg";
import supportWebIcon from "@/assets/official/support-web.svg";
import tabletMenuIcon from "@/assets/official/tablet-menu.svg";
import tabletNavCloseIcon from "@/assets/official/tablet-nav-close.svg";
import tabletNavCommunityIcon from "@/assets/official/tablet-nav-community.svg";
import tabletNavContactIcon from "@/assets/official/tablet-nav-contact.svg";
import tabletNavFamilyHubIcon from "@/assets/official/tablet-nav-family-hub.svg";
import tabletNavFeaturesIcon from "@/assets/official/tablet-nav-features.svg";
import tabletNavOnlineCircleIcon from "@/assets/official/tablet-nav-online-circle.svg";
import tabletNavOnlineMarkAIcon from "@/assets/official/tablet-nav-online-mark-a.svg";
import tabletNavOnlineMarkBIcon from "@/assets/official/tablet-nav-online-mark-b.svg";
import tabletNavOverviewIcon from "@/assets/official/tablet-nav-overview.svg";
import tabletNavPhoneBodyIcon from "@/assets/official/tablet-nav-phone-body.svg";
import tabletNavPhoneDotIcon from "@/assets/official/tablet-nav-phone-dot.svg";
import tabletNavPricingCircleIcon from "@/assets/official/tablet-nav-pricing-circle.svg";
import tabletNavPricingDollarIcon from "@/assets/official/tablet-nav-pricing-dollar.svg";
import tabletNavPuzzleIcon from "@/assets/official/tablet-nav-puzzle.svg";
import tabletNavSuperStarIcon from "@/assets/official/tablet-nav-super-star.svg";
import tabletNavSuperUnionIcon from "@/assets/official/tablet-nav-super-union.svg";
import tabletNavSupportBoxIcon from "@/assets/official/tablet-nav-support-box.svg";
import tabletNavSupportDotIcon from "@/assets/official/tablet-nav-support-dot.svg";
import tabletNavSupportQuestionIcon from "@/assets/official/tablet-nav-support-question.svg";
import tabletNavTicketCornerIcon from "@/assets/official/tablet-nav-ticket-corner.svg";
import tabletNavTicketDocIcon from "@/assets/official/tablet-nav-ticket-doc.svg";
import tabletNavTicketPlusHIcon from "@/assets/official/tablet-nav-ticket-plus-h.svg";
import tabletNavTicketPlusVIcon from "@/assets/official/tablet-nav-ticket-plus-v.svg";
import tabletNavTrustIcon from "@/assets/official/tablet-nav-trust.svg";
import tabletNavWebIcon from "@/assets/official/tablet-nav-web.svg";

type OfficialLayoutProps = {
  children: React.ReactNode;
};

type FooterGroup = {
  title: string;
  links: Array<{ label: string; href: string }>;
};

type SupportIconKind = "frame" | "appDownload" | "contact" | "trust";
type MobileMenuIcon =
  | "familyHub"
  | "frames"
  | "overview"
  | "online"
  | "features"
  | "pricing"
  | "phone"
  | "spark"
  | "support"
  | "contact"
  | "web"
  | "community"
  | "ticket"
  | "trust";
type MobileMenuItem = { label: string; href: string; icon: MobileMenuIcon; comingSoon?: boolean };
type DesktopMenuId = "device" | "ai" | "support";

const footerGroups: FooterGroup[] = [
  {
    title: "Products",
    links: [
      { label: "Nori App", href: "/support-center/download" },
      { label: "Nori Family Hub", href: "/" },
      { label: "Nori AI", href: "/" },
      { label: "Nori Web", href: "/" },
      { label: "Super Nori", href: "/" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "News", href: "/press" },
      { label: "Community", href: "#" },
      { label: "Family Tools", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/support-center" },
      { label: "Contact Us", href: "/support-center/contact" },
      { label: "Order Status", href: "/support-center/order" },
      { label: "Shipping Policy", href: "/support-center/category/shipping" },
      { label: "Returns & Warranty", href: "/support-center/category/returns-warranty" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Refund Policy", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
];

const supportLinks = [
  { label: "Support Center", href: "/support-center", iconSrc: supportCenterIcon, iconKind: "frame" },
  { label: "Ask Community", href: "/support-center/category/community", iconSrc: supportCommunityIcon, iconKind: "frame" },
  { label: "App Download", href: "/support-center/download", iconSrc: supportAppDownloadIcon, iconKind: "appDownload" },
  { label: "Submit a Ticket", href: "/support-center/request", iconSrc: supportTicketIcon, iconKind: "frame" },
  { label: "Contact Us", href: "/support-center/contact", iconSrc: supportContactIcon, iconKind: "contact" },
  { label: "Trust Center", href: "/support-center/category/trust-center", iconSrc: supportTrustIcon, iconKind: "trust" },
  { label: "Use on Web", href: "/support-center/category/nori-web", iconSrc: supportWebIcon, iconKind: "frame" },
] satisfies Array<{ label: string; href: string; iconSrc: string; iconKind: SupportIconKind }>;

const mobileMenuSections = [
  {
    title: "Nori Device",
    items: [
      { label: "Family Hub", href: "#", icon: "familyHub", comingSoon: true },
      { label: "Frames", href: "#", icon: "frames", comingSoon: true },
    ],
  },
  {
    title: "Nori AI",
    items: [
      { label: "Overview", href: "#", icon: "overview", comingSoon: true },
      { label: "Try Nori Online", href: "#", icon: "online", comingSoon: true },
      { label: "Nori Features", href: "/nori-ai/features", icon: "features" },
      { label: "Pricing", href: "#", icon: "pricing", comingSoon: true },
      { label: "Download App", href: "/support-center/download", icon: "phone" },
      { label: "Super Nori", href: "#", icon: "spark", comingSoon: true },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Support Center", href: "/support-center", icon: "support" },
      { label: "App Download", href: "/support-center/download", icon: "phone" },
      { label: "Contact Us", href: "/support-center/contact", icon: "contact" },
      { label: "Use on Web", href: "/support-center/category/nori-web", icon: "web" },
      { label: "Ask Community", href: "/support-center/category/community", icon: "community" },
      { label: "Submit a Ticket", href: "/support-center/request", icon: "ticket" },
      { label: "Trust Center", href: "/support-center/category/trust-center", icon: "trust" },
    ],
  },
] satisfies Array<{ title: string; items: MobileMenuItem[] }>;

const deviceMenuItems = mobileMenuSections[0].items;
const noriAiMenuItems = mobileMenuSections[1].items;

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function useDesktopNavMenu(closeDelay = 220) {
  const [openMenuId, setOpenMenuId] = useState<DesktopMenuId | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  function clearCloseTimer() {
    if (closeTimerRef.current === null) return;
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  }

  function openMenu(menuId: DesktopMenuId) {
    clearCloseTimer();
    setOpenMenuId(menuId);
  }

  function closeMenu(menuId: DesktopMenuId) {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setOpenMenuId((currentMenuId) => (currentMenuId === menuId ? null : currentMenuId));
      closeTimerRef.current = null;
    }, closeDelay);
  }

  function closeMenuNow() {
    clearCloseTimer();
    setOpenMenuId(null);
  }

  useEffect(() => () => clearCloseTimer(), []);

  return { openMenuId, openMenu, closeMenu, closeMenuNow };
}

type DesktopNavMenuController = ReturnType<typeof useDesktopNavMenu>;

function showComingSoonToast() {
  toast("还没做呢");
}

function handleMaybeComingSoon(event: React.MouseEvent<HTMLAnchorElement>, item: MobileMenuItem) {
  if (!item.comingSoon) return;

  event.preventDefault();
  showComingSoonToast();
}

function SiteLink({
  href,
  className,
  style,
  onClick,
  children,
}: {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  children: React.ReactNode;
}) {
  if (href.startsWith("http")) {
    return (
      <a href={href} className={className} style={style} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} style={style} onClick={onClick}>
      {children}
    </Link>
  );
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className={`block overflow-hidden ${
        compact ? "h-[24px] w-[75.743px]" : "h-[24px] w-[75.743px] min-[700px]:h-[35.995px] min-[700px]:w-[113.597px]"
      }`}
      aria-label="Nori home"
    >
      <svg viewBox="0 0 113.597 35.9946" fill="none" xmlns="http://www.w3.org/2000/svg" className="block h-full w-full text-[var(--official-logo-color,#151515)]" aria-hidden="true">
        <path d="M35.4681 17.733V35.0217C35.4681 35.2606 35.2746 35.4541 35.0357 35.4541H24.1654C23.9265 35.4541 23.733 35.2606 23.733 35.0217V17.9968C23.733 14.6833 21.0476 11.9979 17.7341 11.9979C14.4216 11.9979 11.7362 14.6833 11.7362 17.9957V35.0217C11.7362 35.2606 11.5427 35.4541 11.3038 35.4541H0.432432C0.193514 35.4541 0 35.2606 0 35.0217V17.733C0 7.9406 7.93946 6.14873e-05 17.7341 6.14873e-05C27.5287 6.14873e-05 35.4681 7.93952 35.4681 17.733Z" fill="currentColor" />
        <path d="M98.6136 11.9946C98.6136 12.227 98.4299 12.4162 98.1974 12.426C92.8191 12.6432 88.7791 17.0638 88.7791 22.36V35.0357C88.7791 35.2746 88.5855 35.4681 88.3466 35.4681H77.4482C77.2093 35.4681 77.0158 35.2746 77.0158 35.0357V22.3005C77.0158 10.3708 86.8072 0.776222 98.1693 0.531898C98.4126 0.526493 98.6136 0.721087 98.6136 0.96433V11.9935V11.9946Z" fill="currentColor" />
        <path d="M113.597 12.2908V35.0357C113.597 35.2746 113.404 35.4681 113.165 35.4681H102.266C102.028 35.4681 101.834 35.2746 101.834 35.0357V24.2324V0.959989C101.834 0.72107 102.028 0.527556 102.266 0.527556H113.165C113.404 0.527556 113.597 0.72107 113.597 0.959989V12.2908Z" fill="currentColor" />
        <path d="M56.4691 1.72665e-05C46.5296 1.72665e-05 38.4723 8.05732 38.4723 17.9968C38.4723 27.9362 46.5296 35.9946 56.4691 35.9946C66.4085 35.9946 74.4658 27.9373 74.4658 17.9979C74.4658 8.0584 66.4085 1.72665e-05 56.4691 1.72665e-05ZM56.4701 23.9968C53.1566 23.9968 50.4712 21.3114 50.4712 17.9979C50.4712 14.6843 53.1577 11.9989 56.4701 11.9989C59.7837 11.9989 62.4691 14.6843 62.4691 17.9979C62.4691 21.3114 59.7826 23.9968 56.4701 23.9968Z" fill="currentColor" />
      </svg>
    </Link>
  );
}

const fullLayerStyle: React.CSSProperties = { inset: 0 };

function SvgLayer({
  src,
  frame,
  bleed = fullLayerStyle,
}: {
  src: string;
  frame: React.CSSProperties;
  bleed?: React.CSSProperties;
}) {
  return (
    <span className="absolute block" style={frame}>
      <span className="absolute block" style={bleed}>
        <img src={src} alt="" className="absolute inset-0 block size-full max-w-none" />
      </span>
    </span>
  );
}

function FigmaSvgIcon({ src, className }: { src: string; className: string }) {
  return <img src={src} alt="" aria-hidden="true" className={`${className} block max-w-none`} />;
}

function LayeredSvgIcon({
  children,
  clip = true,
}: {
  children: React.ReactNode;
  clip?: boolean;
}) {
  return (
    <span aria-hidden="true" className={`relative block size-[18px] ${clip ? "overflow-hidden" : "overflow-visible"}`}>
      {children}
    </span>
  );
}

function MenuGlyph({ icon }: { icon: MobileMenuIcon }) {
  if (icon === "familyHub") {
    return <FigmaSvgIcon src={tabletNavFamilyHubIcon} className="size-[18px]" />;
  }

  if (icon === "frames") {
    return <FigmaSvgIcon src={tabletNavPuzzleIcon} className="size-[16.403px]" />;
  }

  if (icon === "overview") {
    return <FigmaSvgIcon src={tabletNavOverviewIcon} className="size-[16.499px]" />;
  }

  if (icon === "online") {
    return (
      <LayeredSvgIcon>
        <SvgLayer src={tabletNavOnlineCircleIcon} frame={{ inset: "8.33%" }} bleed={{ inset: "-4.67%" }} />
        <SvgLayer
          src={tabletNavOnlineMarkAIcon}
          frame={{ top: "9.87%", right: "32.99%", bottom: "33.8%", left: "12.5%" }}
          bleed={{ top: "-6.9%", right: "-7.13%", bottom: "-6.9%", left: "-7.14%" }}
        />
        <SvgLayer
          src={tabletNavOnlineMarkBIcon}
          frame={{ top: "58.65%", right: "12.66%", bottom: "9.69%", left: "55.88%" }}
          bleed={{ top: "-12.28%", right: "-12.36%", bottom: "-12.28%", left: "-12.39%" }}
        />
      </LayeredSvgIcon>
    );
  }

  if (icon === "features") {
    return <FigmaSvgIcon src={tabletNavFeaturesIcon} className="size-[14.9px]" />;
  }

  if (icon === "pricing") {
    return (
      <LayeredSvgIcon>
        <img src={tabletNavPricingCircleIcon} alt="" className="absolute left-1/2 top-1/2 block size-[16.4px] max-w-none -translate-x-1/2 -translate-y-1/2" />
        <img src={tabletNavPricingDollarIcon} alt="" className="absolute left-1/2 top-1/2 block h-[11.3px] w-[7.3px] max-w-none -translate-x-1/2 -translate-y-1/2" />
      </LayeredSvgIcon>
    );
  }

  if (icon === "phone") {
    return (
      <LayeredSvgIcon>
        <img src={tabletNavPhoneBodyIcon} alt="" className="absolute left-1/2 top-1/2 block h-[17.8px] w-[13.3px] max-w-none -translate-x-1/2 -translate-y-1/2" />
        <img src={tabletNavPhoneDotIcon} alt="" className="absolute left-1/2 top-[75%] block h-[2px] w-[2.0075px] max-w-none -translate-x-1/2 -translate-y-1/2" />
      </LayeredSvgIcon>
    );
  }

  if (icon === "spark") {
    return (
      <LayeredSvgIcon>
        <SvgLayer src={tabletNavSuperUnionIcon} frame={{ top: "5%", right: "4.98%", bottom: "68.1%", left: "68.75%" }} />
        <SvgLayer src={tabletNavSuperStarIcon} frame={{ top: "11.25%", right: "7.5%", bottom: "1.25%", left: "5%" }} />
      </LayeredSvgIcon>
    );
  }

  if (icon === "support") {
    return (
      <LayeredSvgIcon>
        <img src={tabletNavSupportBoxIcon} alt="" className="absolute inset-0 block size-full max-w-none" />
        <SvgLayer
          src={tabletNavSupportQuestionIcon}
          frame={{ top: "26.3%", right: "37.5%", bottom: "40.36%", left: "37.5%" }}
          bleed={{ top: "-10.83%", right: "-14.44%", bottom: "-10.83%", left: "-14.44%" }}
        />
        <SvgLayer src={tabletNavSupportDotIcon} frame={{ top: "67.97%", right: "44.79%", bottom: "21.61%", left: "44.79%" }} />
      </LayeredSvgIcon>
    );
  }

  if (icon === "contact") {
    return <FigmaSvgIcon src={tabletNavContactIcon} className="h-[14.8px] w-[17.8px]" />;
  }

  if (icon === "web") {
    return <FigmaSvgIcon src={tabletNavWebIcon} className="h-[14.8px] w-[16.3px]" />;
  }

  if (icon === "community") {
    return <FigmaSvgIcon src={tabletNavCommunityIcon} className="h-[11.9px] w-[16.4px]" />;
  }

  if (icon === "ticket") {
    return (
      <LayeredSvgIcon>
        <SvgLayer src={tabletNavTicketDocIcon} frame={{ top: "8.33%", right: "16.67%", bottom: "8.33%", left: "16.67%" }} bleed={{ top: "-4.67%", right: "-5.83%", bottom: "-4.67%", left: "-5.83%" }} />
        <SvgLayer src={tabletNavTicketPlusVIcon} frame={{ top: "60.42%", right: "31.25%", bottom: "10.42%", left: "68.75%" }} bleed={{ top: "-13.33%", right: "-0.7px", bottom: "-13.33%", left: "-0.7px" }} />
        <SvgLayer src={tabletNavTicketPlusHIcon} frame={{ top: "75%", right: "16.67%", bottom: "25%", left: "54.17%" }} bleed={{ top: "-0.7px", right: "-13.33%", bottom: "-0.7px", left: "-13.33%" }} />
        <SvgLayer src={tabletNavTicketCornerIcon} frame={{ top: "8.33%", right: "16.67%", bottom: "70.83%", left: "62.5%" }} bleed={{ inset: "-18.67%" }} />
      </LayeredSvgIcon>
    );
  }

  return <FigmaSvgIcon src={tabletNavTrustIcon} className="h-[16.3px] w-[14.8px]" />;
}

function MobileMenuPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      className={cx(
        "fixed inset-0 z-50 bg-[#fcfbf7] min-[1120px]:hidden",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      aria-label="Mobile navigation menu"
    >
      <div className="absolute inset-0 w-full overflow-y-auto bg-[#fcfbf7] shadow-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="relative mx-auto flex w-full max-w-[1440px] items-start justify-between px-5 py-5 min-[700px]:px-10">
          <Logo />
          <div className="relative z-10 flex items-center gap-4 rounded-full bg-[#fcfbf7]">
            <div className="flex items-center gap-1">
              <button className="flex size-10 shrink-0 items-center justify-center rounded-full p-0 text-[#151515] transition-colors hover:bg-[#ede8da]" aria-label="Shopping cart">
                <span className="relative size-6 overflow-hidden">
                  <img src={navCartIcon} alt="" className="absolute left-[1.06px] top-[1.06px] h-[21.875px] w-[21.809px] max-w-none" />
                </span>
              </button>
              <button className="flex size-10 shrink-0 items-center justify-center rounded-full p-0 text-[#151515] transition-colors hover:bg-[#ede8da]" aria-label="Account">
                <span className="relative size-6 overflow-hidden">
                  <img src={navUserIcon} alt="" className="absolute left-[1px] top-[1px] h-[21.976px] w-[22px] max-w-none" />
                </span>
              </button>
            </div>
            <button className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#151515] p-0 text-white transition-colors hover:bg-[#2b2926]" aria-label="Close menu" onClick={onClose}>
              <img src={tabletNavCloseIcon} alt="" className="size-5" />
            </button>
          </div>
        </div>

        <nav className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-5 pb-10 min-[700px]:px-10" aria-label="Expanded navigation">
          {mobileMenuSections.map((section, sectionIndex) => (
            <section className={cx("flex w-full flex-none flex-col", sectionIndex === 0 ? "gap-2.5" : "gap-2")} key={section.title}>
              <h2 className="flex h-10 flex-none items-center text-[16px] font-semibold leading-none text-[#151515]">
                {section.title}
              </h2>
              <div className={cx("flex w-full flex-none flex-col rounded-[16px]", sectionIndex === 0 ? "gap-1" : "gap-2")}>
                {section.items.map((item) => (
                  <SiteLink
                    href={item.href}
                    key={`${section.title}-${item.label}`}
                    className="tablet-nav-item group flex h-14 w-full flex-none items-center gap-3 rounded-[12px] py-2 text-[15px] font-medium leading-5 text-[#151515] focus-visible:outline-none"
                    onClick={(event) => {
                      handleMaybeComingSoon(event, item);
                      onClose();
                    }}
                  >
                    <span className="tablet-nav-icon-box flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-[#f5f2e9] text-[#151515]">
                      <span className="tablet-nav-icon flex size-[18px] items-center justify-center">
                        <MenuGlyph icon={item.icon} />
                      </span>
                    </span>
                    <span className="block">{item.label}</span>
                  </SiteLink>
                ))}
              </div>
            </section>
          ))}
        </nav>
      </div>
    </div>
  );
}

function NavPill({
  children,
  href,
  active,
  onPointerEnter,
}: {
  children: React.ReactNode;
  href: string;
  active?: boolean;
  onPointerEnter?: React.PointerEventHandler<HTMLAnchorElement>;
}) {
  return (
    <Link
      href={href}
      onPointerEnter={onPointerEnter}
      className={`flex h-[40px] items-center justify-center gap-1 pb-[10px] pt-[9px] text-[16px] font-medium leading-[22px] text-[#151515] transition-colors ${
        active
          ? "rounded-bl-[10px] rounded-br-[10px] rounded-tl-[10px] rounded-tr-[48px] bg-[#ffbe73] pl-5 pr-6 hover:bg-[#ffbe73]"
          : "rounded-full bg-[#ede8da] pl-6 pr-5 hover:bg-[#e0dacc]"
      }`}
    >
      {children}
    </Link>
  );
}

function ProductMenu({
  menuId,
  menu,
  label,
  items,
  columns,
  active,
}: {
  menuId: DesktopMenuId;
  menu: DesktopNavMenuController;
  label: string;
  items: MobileMenuItem[];
  columns: 1 | 2;
  active?: boolean;
}) {
  const isOpen = menu.openMenuId === menuId;
  const openMenu = () => menu.openMenu(menuId);
  const closeMenu = () => menu.closeMenu(menuId);

  return (
    <div
      className="group/product-menu relative"
      onPointerEnter={openMenu}
      onPointerLeave={closeMenu}
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
      onFocus={openMenu}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          closeMenu();
        }
      }}
    >
      <button
        type="button"
        className={cx(
          "flex h-[40px] items-center justify-center gap-1 pb-[10px] pt-[9px] text-[16px] font-medium leading-[22px] text-[#151515] transition-colors",
          active
            ? "rounded-bl-[10px] rounded-br-[10px] rounded-tl-[10px] rounded-tr-[48px] bg-[#ffbe73] pl-5 pr-6 hover:bg-[#ffbe73]"
            : "rounded-full pl-6 pr-5",
          !active && (isOpen ? "bg-[#e0dacc]" : "bg-[#ede8da] hover:bg-[#e0dacc]"),
        )}
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => {
          if (isOpen) {
            menu.closeMenuNow();
          } else {
            openMenu();
          }
        }}
      >
        {label}
        <span className="relative size-4">
          <img src={navChevronIcon} alt="" className={cx("absolute inset-0 size-full transition-opacity", isOpen && "opacity-0")} />
          <img src={navChevronHoverIcon} alt="" className={cx("absolute inset-0 size-full rotate-180 opacity-0 transition-opacity", isOpen && "opacity-100")} />
        </span>
      </button>
      <div
        aria-hidden="true"
        className={cx(
          "absolute left-1/2 top-[36px] h-10 -translate-x-1/2 bg-transparent",
          isOpen ? "pointer-events-auto" : "pointer-events-none",
          columns === 2 ? "w-[566px]" : "w-[298px]",
        )}
      />
      <div
        className={cx(
          "absolute left-1/2 top-[60px] z-50 -translate-x-1/2 rounded-[24px] bg-white p-4 shadow-[0_18px_60px_rgba(28,25,23,0.12)] transition-all duration-150 min-[1120px]:block",
          isOpen ? "visible pointer-events-auto translate-y-0 opacity-100" : "invisible pointer-events-none translate-y-2 opacity-0",
          columns === 2 ? "w-[566px]" : "w-[298px]",
        )}
      >
        <div className={cx("grid gap-y-0", columns === 2 ? "grid-cols-2" : "grid-cols-1")}>
          {items.map((item) => (
            <SiteLink
              href={item.href}
              key={`${label}-${item.label}`}
              className="flex w-[266px] items-center gap-3 rounded-[12px] p-2 text-[14px] font-medium leading-5 text-[#151515] transition-colors hover:bg-[#f8f5ed] focus:bg-[#f8f5ed] focus:outline-none"
              onClick={(event) => {
                handleMaybeComingSoon(event, item);
                menu.closeMenuNow();
              }}
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-[8px] bg-[#f5f2e9]">
                <span className="flex size-[18px] items-center justify-center">
                  <MenuGlyph icon={item.icon} />
                </span>
              </span>
              <span className="block whitespace-nowrap">{item.label}</span>
            </SiteLink>
          ))}
        </div>
      </div>
    </div>
  );
}

const iconSizeClass: Record<Exclude<SupportIconKind, "frame">, string> = {
  appDownload: "h-[17.8px] w-[14.8px]",
  contact: "h-[14.8px] w-[17.8px]",
  trust: "h-[16.3px] w-[14.8px]",
};

function SupportIcon({ src, kind }: { src: string; kind: SupportIconKind }) {
  if (kind === "frame") {
    return (
      <span className="relative block size-[18px] overflow-visible">
        <img src={src} alt="" className="absolute inset-0 size-full max-w-none" />
      </span>
    );
  }

  return (
    <span className="flex size-[18px] items-center justify-center overflow-visible">
      <img src={src} alt="" className={`${iconSizeClass[kind]} max-w-none`} />
    </span>
  );
}

function SupportMenu({ menu }: { menu: DesktopNavMenuController }) {
  const menuId: DesktopMenuId = "support";
  const isOpen = menu.openMenuId === menuId;
  const openMenu = () => menu.openMenu(menuId);
  const closeMenu = () => menu.closeMenu(menuId);

  return (
    <div
      className="group/support relative"
      onPointerEnter={openMenu}
      onPointerLeave={closeMenu}
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
      onFocus={openMenu}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          closeMenu();
        }
      }}
    >
      <button
        type="button"
        className={cx(
          "flex h-[40px] items-center justify-center gap-1 rounded-full pb-[10px] pl-6 pr-5 pt-[9px] text-[16px] font-medium leading-[22px] text-[#151515] transition-colors",
          isOpen ? "bg-[#e0dacc]" : "bg-[#ede8da] hover:bg-[#e0dacc]",
        )}
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => {
          if (isOpen) {
            menu.closeMenuNow();
          } else {
            openMenu();
          }
        }}
      >
        Support
        <span className="relative size-4">
          <img src={navChevronIcon} alt="" className={cx("absolute inset-0 size-full transition-opacity", isOpen && "opacity-0")} />
          <img src={navChevronHoverIcon} alt="" className={cx("absolute inset-0 size-full rotate-180 opacity-0 transition-opacity", isOpen && "opacity-100")} />
        </span>
      </button>
      <div aria-hidden="true" className={cx("absolute left-1/2 top-[36px] h-10 w-[566px] -translate-x-1/2 bg-transparent", isOpen ? "pointer-events-auto" : "pointer-events-none")} />
      <div
        className={cx(
          "absolute left-1/2 top-[60px] z-50 w-[566px] -translate-x-1/2 rounded-[24px] bg-white p-4 shadow-[0_18px_60px_rgba(28,25,23,0.12)] transition-all duration-150 min-[1120px]:block",
          isOpen ? "visible pointer-events-auto translate-y-0 opacity-100" : "invisible pointer-events-none translate-y-2 opacity-0",
        )}
      >
        <div className="grid grid-cols-2 gap-y-0">
          {supportLinks.map((item, index) => (
            <SiteLink
              href={item.href}
              key={item.label}
              className={`flex w-[266px] items-center gap-3 rounded-[12px] p-2 text-[14px] font-medium leading-5 text-[#151515] transition-colors hover:bg-[#f8f5ed] focus:bg-[#f8f5ed] focus:outline-none ${
                index === supportLinks.length - 1 ? "col-span-2" : ""
              }`}
              onClick={menu.closeMenuNow}
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-[8px] bg-[#f5f2e9]">
                <SupportIcon src={item.iconSrc} kind={item.iconKind} />
              </span>
              {item.label}
            </SiteLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMenuMounted, setIsMobileMenuMounted] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [location] = useLocation();
  const desktopMenu = useDesktopNavMenu();
  const lastScrollYRef = useRef(0);
  const isHome = location === "/";
  const isNoriAi = location.startsWith("/nori-ai");
  const logoColor = location === "/nori-ai/features" ? "#151515" : "#151515";

  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuMounted(true);
      return;
    }

    setIsMobileMenuMounted(false);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    setIsHeaderVisible(true);
    desktopMenu.closeMenuNow();
  }, [location]);

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
    <>
      <header
        style={{ "--official-logo-color": logoColor } as React.CSSProperties}
        className={cx(
          "fixed left-0 top-0 z-40 w-full transition-transform duration-300 ease-out",
          isHeaderVisible || isMobileMenuOpen ? "translate-y-0" : "-translate-y-[120%]",
        )}
      >
        <div className="relative mx-auto flex max-w-[1440px] items-start justify-between px-5 py-5 min-[700px]:px-10 min-[1120px]:px-20">
          <div className="relative z-10">
            <Logo />
          </div>

          <nav
            aria-label="Primary navigation"
            className="absolute left-1/2 top-5 hidden -translate-x-1/2 items-center gap-2 min-[1120px]:flex"
          >
            <NavPill href="/" active={isHome} onPointerEnter={desktopMenu.closeMenuNow}>
              Home
            </NavPill>
            <ProductMenu menuId="device" menu={desktopMenu} label="Nori Device" items={deviceMenuItems} columns={1} />
            <ProductMenu menuId="ai" menu={desktopMenu} label="Nori AI" items={noriAiMenuItems} columns={2} active={isNoriAi} />
            <SupportMenu menu={desktopMenu} />
          </nav>

          <div className="relative z-10 flex items-center gap-4 min-[1120px]:gap-2">
            <div className="flex items-center gap-1">
              <button className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full p-0 text-[#151515] transition-colors hover:bg-[#ede8da]" aria-label="Shopping cart">
                <span className="relative size-6 overflow-hidden">
                  <img src={navCartIcon} alt="" className="absolute left-[1.06px] top-[1.06px] h-[21.875px] w-[21.809px] max-w-none" />
                </span>
              </button>
              <button className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full p-0 text-[#151515] transition-colors hover:bg-[#ede8da]" aria-label="Account">
                <span className="relative size-6 overflow-hidden">
                  <img src={navUserIcon} alt="" className="absolute left-[1px] top-[1px] h-[21.976px] w-[22px] max-w-none" />
                </span>
              </button>
            </div>
            <a
              href="https://heynori.com/app"
              className="hidden h-[40px] w-[135px] items-center justify-center rounded-full bg-[#151515] px-6 pb-[10px] pt-[9px] text-[16px] font-normal leading-[22px] text-white transition-colors hover:bg-[#2b2926] min-[1120px]:flex"
            >
              Get Started
            </a>
            <button
              className="flex size-10 items-center justify-center rounded-full bg-[#151515] transition-colors hover:bg-[#2b2926] min-[1120px]:hidden"
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => {
                setIsMobileMenuMounted(true);
                setIsMobileMenuOpen(true);
              }}
            >
              <img src={tabletMenuIcon} alt="" className="h-3 w-[17px]" />
            </button>
          </div>
        </div>
      </header>
      {isMobileMenuMounted ? <MobileMenuPanel open={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} /> : null}
    </>
  );
}

function SocialLinks() {
  return (
    <div className="flex items-center gap-5 px-0.5">
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

function StoreButtons() {
  return (
    <div className="flex w-full flex-nowrap items-start gap-1.5 min-[700px]:w-auto min-[700px]:gap-2">
      <a
        href="#"
        className="flex h-[54px] w-[174px] shrink-0 items-center justify-center gap-3 rounded-[12px] bg-white py-3 pl-[18px] pr-6 transition-colors hover:bg-[#f5f2e9]"
        aria-label="Download on the App Store"
      >
        <img src={footerAppStoreMark} alt="" className="h-[26px] w-[21.153px] shrink-0" />
        <span className="flex w-[79.747px] shrink-0 flex-col items-center gap-1">
          <img src={footerAppStoreOverline} alt="" className="h-[6.984px] w-[77.532px] opacity-50" />
          <img src={footerAppStoreWord} alt="" className="h-[17.413px] w-[79.747px]" />
        </span>
      </a>
      <a
        href="#"
        className="flex h-[54px] w-[174px] shrink-0 items-center rounded-[12px] bg-white py-3 pl-5 pr-6 transition-colors hover:bg-[#f5f2e9]"
        aria-label="Get it on Google Play"
      >
        <span className="flex items-center gap-2">
          <span className="relative block h-[29.578px] w-[26.465px] shrink-0">
            <img src={footerGooglePlayMark} alt="" className="absolute inset-[6.05%] h-[87.9%] w-[87.9%] max-w-none" />
          </span>
          <span className="relative block h-[30.813px] w-[97.491px] shrink-0">
            <img src={footerGooglePlayWord} alt="" className="absolute left-[-0.117px] top-[-0.114px] h-[30.928px] w-[97.606px] max-w-none" />
          </span>
        </span>
      </a>
    </div>
  );
}

function ContactBlock() {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-[18px] font-medium leading-[27px] text-white">Contact Us</h3>
      <div className="text-[16px] font-[400] leading-6 text-white/[0.56]">
        <p>We will get back to you in 24 hours.</p>
        <a href="mailto:support@heynori.com" className="underline decoration-solid underline-offset-2">
          support@heynori.com
        </a>
      </div>
      <div className="py-1">
        <SocialLinks />
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 rounded-t-[24px] bg-[#151515] px-5 py-[50px] font-normal text-white antialiased min-[700px]:px-10 min-[700px]:py-10 min-[1120px]:rounded-t-[40px] min-[1120px]:bg-[#1c1917] min-[1120px]:px-0 min-[1120px]:pb-12 min-[1120px]:pt-[100px]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-[60px] min-[1120px]:gap-14 min-[1120px]:px-20">
        <div className="flex items-start justify-between min-[1120px]:items-end">
          <h2 className="font-ek text-[22px] font-bold leading-8 tracking-normal min-[1120px]:text-[32px] min-[1120px]:leading-[48px]">
            Family-like help,
            <br />
            easier life with Nori AI
          </h2>
          <div className="hidden h-[30px] w-[164.468px] min-[1120px]:block" aria-hidden="true" />
        </div>

        <div className="flex flex-col gap-[60px] min-[1120px]:flex-row min-[1120px]:gap-40">
          <div className="order-2 flex flex-col gap-8 min-[700px]:flex-row min-[700px]:items-end min-[700px]:justify-between min-[1120px]:order-1 min-[1120px]:w-[356px] min-[1120px]:flex-col min-[1120px]:items-start min-[1120px]:justify-between">
            <ContactBlock />
            <StoreButtons />
          </div>

          <div className="order-1 grid w-full grid-cols-2 gap-x-8 gap-y-8 min-[700px]:grid-cols-4 min-[700px]:gap-x-0 min-[1120px]:order-2 min-[1120px]:flex min-[1120px]:flex-1 min-[1120px]:justify-center min-[1120px]:gap-4">
            {footerGroups.map((group) => (
              <div className="flex min-w-0 flex-1 flex-col gap-2 min-[1120px]:gap-[18px]" key={group.title}>
                <h3 className="text-[16px] font-medium leading-[22px] text-white min-[700px]:text-[18px] min-[700px]:leading-[27px]">{group.title}</h3>
                <ul className="flex flex-col gap-2 min-[1120px]:gap-4">
                  {group.links.map((link) => (
                    <li key={`${group.title}-${link.label}`}>
                      <SiteLink href={link.href} className="text-[13px] font-[400] leading-5 tracking-[-0.1px] text-white/[0.56] transition-colors hover:text-white min-[700px]:text-[16px] min-[700px]:leading-6 min-[700px]:tracking-normal">
                        {link.label}
                      </SiteLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-[#292524] pt-8 min-[700px]:pt-[41px]">
          <p className="max-w-[260px] text-[13px] font-[400] leading-5 tracking-[-0.1px] text-white/[0.56] min-[700px]:max-w-none min-[700px]:text-[16px] min-[700px]:leading-[22px] min-[700px]:tracking-normal min-[1120px]:leading-6">
            Copyright &copy; 2026 Domus Next Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export function OfficialLayout({ children }: OfficialLayoutProps) {
  useOfficialScrollReveal(children);

  return (
    <div className="official-page min-h-screen overflow-x-hidden bg-[#f5f2e9] text-[#151515]">
      <Header />
      <main className="mx-auto max-w-[1440px] pt-[118px] min-[700px]:pt-[140px] min-[1120px]:pt-[118px]">{children}</main>
      <Footer />
    </div>
  );
}

function useOfficialScrollReveal(trigger: React.ReactNode) {
  useEffect(() => {
    const timers: number[] = [];
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal, .reveal-on-scroll, .reveal-stagger, .reveal-left, .reveal-scale"),
    );

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            if (entry.target.classList.contains("reveal-stagger")) {
              const timer = window.setTimeout(() => {
                entry.target.classList.add("reveal-complete");
              }, 2200);
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

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="font-ek text-[32px] font-bold leading-[38.4px] tracking-[-0.32px] text-[#18181b] min-[700px]:text-[44px] min-[700px]:leading-[54px] min-[700px]:tracking-normal">{children}</h2>;
}

export function ArrowButton({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex h-[54px] w-full items-center justify-center gap-2 self-stretch rounded-[24px] bg-[#ffbe73] px-6 py-4 text-[14px] font-medium leading-5 text-[#151515] transition-colors hover:bg-[#f5a650] min-[700px]:h-[50px] min-[700px]:w-fit min-[700px]:self-start min-[700px]:py-3.5 min-[700px]:text-[16px] min-[700px]:leading-[22px]"
    >
      {children}
      <img src={pressExternalIcon} alt="" className="size-4" />
    </Link>
  );
}
