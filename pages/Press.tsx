import { Link } from "wouter";
import { ArrowButton, OfficialLayout, SectionTitle } from "@/components/official/OfficialLayout";
import newsGadgetFlowMark from "@/assets/official/news-gadgetflow-mark.svg";
import newsGadgetFlowWord from "@/assets/official/news-gadgetflow-word.svg";
import newsGeekyGadgets from "@/assets/official/news-geeky-gadgets.png";
import newsMsn from "@/assets/official/news-msn.svg";
import newsReuters from "@/assets/official/news-reuters.svg";
import newsUsaToday from "@/assets/official/news-usa-today.svg";
import newsYahooFinance from "@/assets/official/news-yahoo-finance.svg";
import pressBrandKitIcon from "@/assets/official/press-brand-kit.svg";
import pressDownloadHoverIcon from "@/assets/official/press-download-hover.svg";
import pressDownloadIcon from "@/assets/official/press-download.svg";
import pressMailIcon from "@/assets/official/press-mail.svg";
import pressUiScreensIcon from "@/assets/official/press-ui-screens.svg";

type NewsItem = {
  outlet: "USA TODAY" | "yahoo!finance" | "Reuters" | "GadgetFlow" | "Geeky Gadgets" | "msn";
  href: string;
  date: string;
  title: string;
  excerpt: string;
};

const newsItems: NewsItem[] = [
  {
    outlet: "USA TODAY",
    href: "https://www.usatoday.com/story/special/contributor-content/2026/02/20/nori-and-the-rise-of-ai-native-family-infrastructure/88784710007/",
    date: "Feb. 20, 2026",
    title: "Nori and the Rise of AI-Native Family Infrastructure",
    excerpt:
      "There's always one person who remembers everything: the early dismissal, the half-finished permission slip, the fact that dance ...",
  },
  {
    outlet: "yahoo!finance",
    href: "https://finance.yahoo.com/news/nori-introduces-world-first-family-144100406.html",
    date: "Feb 3, 2026",
    title: "Nori Introduces the World's First Family Brain, Bringing AI Into the Center of ...",
    excerpt:
      "NEW YORK, Feb. 03, 2026 (GLOBE NEWSWIRE) -- Domus Next Inc. today announced the launch of Nori, the world's ...",
  },
  {
    outlet: "Reuters",
    href: "https://www.reuters.com/press-releases/nori-family-ai-assistant-life-management-2026-01-28/",
    date: "Jan 28, 2026",
    title: "Nori Launches as the World's First Family AI Assistant for Managing ...",
    excerpt:
      "There's always one person who remembers everything: the early dismissal, the half-finished permission slip, the fact that dance ...",
  },
  {
    outlet: "GadgetFlow",
    href: "https://thegadgetflow.com/blog/nori-review-ai-native-family-infrastructure/",
    date: "Feb. 20, 2026",
    title: "Nori review: the rise of AI-native family infrastructure",
    excerpt:
      "For decades, technology has promised to simplify modern family life. Calendars became digital. Shopping lists moved to ...",
  },
  {
    outlet: "Geeky Gadgets",
    href: "https://www.geeky-gadgets.com/i-didnt-think-my-family-needed-an-ai-until-nori-showed-up/",
    date: "Jan 28, 2026",
    title: "I Didn't Think My Family Needed an AI-Until Nori Showed Up",
    excerpt:
      "I didn't think I needed a Family AI-until Nori moved in and quietly started running my house better than I ever did.",
  },
  {
    outlet: "msn",
    href: "https://www.msn.com/en-us/news/technology/breaking-new-ground-nori-revolutionizes%02modern-family-life-with-the-family-ai-brain/ar-AA1VEG6H",
    date: "Jan 28, 2026",
    title: "Breaking new ground: Nori revolutionizes modern family life with ...",
    excerpt:
      "Artificial intelligence (AI) is finding its way into the lives of individuals and enterprises; products like Nori target the growing need...",
  },
];

function OutletLogo({ outlet }: { outlet: NewsItem["outlet"] }) {
  if (outlet === "USA TODAY") {
    return (
      <span className="relative block h-[32px] w-[89.143px] shrink-0">
        <img src={newsUsaToday} alt={outlet} className="absolute inset-0 block size-full max-w-none" />
      </span>
    );
  }

  if (outlet === "yahoo!finance") {
    return (
      <span className="relative block h-[24px] w-[170.4px] shrink-0">
        <img src={newsYahooFinance} alt={outlet} className="absolute inset-0 block size-full max-w-none" />
      </span>
    );
  }

  if (outlet === "Reuters") {
    return (
      <span className="relative block h-[32px] w-[117.6px] shrink-0">
        <img src={newsReuters} alt={outlet} className="absolute inset-0 block size-full max-w-none" />
      </span>
    );
  }

  if (outlet === "GadgetFlow") {
    return (
      <span className="relative block h-[24px] w-[172.731px] shrink-0">
        <img src={newsGadgetFlowMark} alt="" className="absolute left-0 top-0 size-[24px] max-w-none" />
        <img src={newsGadgetFlowWord} alt={outlet} className="absolute left-[28.19px] top-[2.96px] h-[20.96px] w-[144.538px] max-w-none" />
      </span>
    );
  }

  if (outlet === "Geeky Gadgets") {
    return (
      <span className="relative block h-[28px] w-[177.333px] shrink-0">
        <img src={newsGeekyGadgets} alt={outlet} className="absolute left-0 top-0 block h-[28px] w-[177.333px] max-w-none" />
      </span>
    );
  }

  return (
    <span className="relative block h-[32px] w-[84.571px] shrink-0">
      <img src={newsMsn} alt={outlet} className="absolute inset-0 block size-full max-w-none" />
    </span>
  );
}

function DownloadCard({
  iconSrc,
  title,
  description,
  meta,
}: {
  iconSrc: string;
  title: string;
  description: string;
  meta: string;
}) {
  return (
    <Link
      href="#"
      className="group reveal-scale flex min-h-[236.75px] min-w-0 flex-1 flex-col items-start justify-between rounded-[24px] border border-[#e7e5e4]/60 bg-white p-[30px] shadow-[0_1px_1px_rgba(245,245,244,0.5)] transition-colors duration-150 ease-out min-[700px]:min-h-[314px] min-[700px]:p-10 lg:min-h-[264px] lg:p-[41px]"
    >
      <div className="flex flex-col gap-6 min-[700px]:gap-8">
        <img src={iconSrc} alt="" className="size-8" />
        <div className="flex flex-col gap-2">
          <h3 className="text-[18px] font-medium leading-6 text-[#151515] min-[700px]:text-[22px] min-[700px]:leading-8">{title}</h3>
          <p className="text-[15px] leading-[24px] tracking-[-0.1px] text-[#151515]/80 min-[700px]:text-[16px] min-[700px]:tracking-normal">{description}</p>
        </div>
      </div>
      <div className="flex items-end gap-2 text-[14px] font-medium leading-5 text-[#151515]/40 transition-colors duration-150 group-hover:text-[#f5a650]">
        <span className="relative size-5">
          <img src={pressDownloadIcon} alt="" className="absolute inset-0 size-full transition-opacity duration-150 group-hover:opacity-0" />
          <img src={pressDownloadHoverIcon} alt="" className="absolute inset-0 size-full opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
        </span>
        {meta}
      </div>
    </Link>
  );
}

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      className="interactive-card flex min-h-[286px] min-w-0 flex-col rounded-[24px] border border-[#e7e5e4]/60 bg-white p-[30px] shadow-[0_1px_1px_rgba(245,245,244,0.5)] hover:shadow-[0_18px_45px_rgba(28,25,23,0.08)] min-[700px]:min-h-[180px] min-[700px]:p-[41px]"
    >
      <div className="flex min-h-[60px] flex-col items-start justify-between gap-2 xl:min-h-8 xl:flex-row xl:items-start xl:gap-6">
        <div className="flex min-w-0 items-start justify-start">
          <OutletLogo outlet={item.outlet} />
        </div>
        <time className="shrink-0 text-[14px] font-normal leading-5 text-[#151515]/40">{item.date}</time>
      </div>
      <div className="mt-6 flex flex-col gap-4 overflow-hidden">
        <h3 className="line-clamp-2 text-[18px] font-medium leading-[27px] text-[#151515]">{item.title}</h3>
        <p className="line-clamp-3 text-[16px] leading-6 text-[#151515]/80">{item.excerpt}</p>
      </div>
    </a>
  );
}

export default function Press() {
  return (
    <OfficialLayout>
      <section className="flex flex-col items-center px-5 text-center min-[700px]:px-10 md:px-20">
        <h1 className="font-ek text-[32px] font-bold leading-[38.4px] tracking-[-0.32px] text-[#1c1917] min-[700px]:text-[60px] min-[700px]:leading-[72px] min-[700px]:tracking-normal">Press</h1>
        <p className="mt-4 max-w-[314px] text-[15px] font-normal leading-[22px] tracking-[-0.1px] text-[#151515]/80 min-[700px]:mt-6 min-[700px]:max-w-[648px] min-[700px]:text-[18px] min-[700px]:font-medium min-[700px]:leading-[27px] min-[700px]:tracking-normal min-[700px]:text-[#151515]/60">
          For all media inquiries, please contact us at{" "}
          <a href="mailto:support@heynori.com" className="text-[#f5a650] underline underline-offset-4">
            support@heynori.com
          </a>
        </p>
      </section>

      <section className="mt-[62px] px-5 min-[700px]:mt-20 min-[700px]:px-10 md:px-20">
        <div className="flex flex-col gap-4">
          <div className="reveal-on-scroll flex min-h-[258.625px] flex-col justify-between gap-4 rounded-[24px] bg-white p-[30px] min-[700px]:min-h-0 min-[700px]:gap-8 min-[700px]:p-10 lg:flex-row lg:items-center lg:justify-between lg:px-[41px]">
            <div className="flex flex-col gap-6 min-[700px]:flex-row min-[700px]:items-center">
              <img src={pressMailIcon} alt="" className="h-6 w-8 shrink-0" />
              <div className="flex flex-col gap-2">
                <h2 className="text-[18px] font-medium leading-6 text-[#151515] min-[700px]:text-[22px] min-[700px]:leading-8">Media Inquiries</h2>
                <p className="text-[15px] leading-[24px] tracking-[-0.1px] text-[#151515]/80 min-[700px]:text-[16px] min-[700px]:tracking-normal">
                  Direct channels for journalists, editorial partners, and general press questions.
                </p>
              </div>
            </div>
            <ArrowButton href="mailto:support@heynori.com">support@heynori.com</ArrowButton>
          </div>

          <div className="grid gap-4 min-[700px]:grid-cols-2">
            <DownloadCard
              iconSrc={pressBrandKitIcon}
              title="Brand Kit"
              description="Official logos, color palettes, and typography guidelines."
              meta="ZIP, 12MB"
            />
            <DownloadCard
              iconSrc={pressUiScreensIcon}
              title="UI Screens"
              description="High-resolution application interfaces and product mockups."
              meta="ZIP, 45MB"
            />
          </div>
        </div>
      </section>

      <section className="mt-[100px] px-5 min-[700px]:mt-[112px] min-[700px]:px-10 md:px-20">
        <div className="mb-8 flex justify-center px-0 min-[700px]:justify-start min-[700px]:px-2">
          <SectionTitle>In the News</SectionTitle>
        </div>
        <div className="reveal-stagger grid gap-4 min-[700px]:grid-cols-2 xl:grid-cols-3">
          {newsItems.map((item) => (
            <NewsCard item={item} key={item.outlet} />
          ))}
        </div>
      </section>
    </OfficialLayout>
  );
}
