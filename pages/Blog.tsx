import { useState } from "react";
import { OfficialLayout } from "@/components/official/OfficialLayout";
import blogArrowIcon from "@/assets/official/blog-arrow-narrow-up.svg";
import blogClockIcon from "@/assets/official/blog-clock.svg";
import blogFamily from "@/assets/official/blog-family.png";
import blogHero from "@/assets/official/blog-hero.png";
import blogMoreArticle1 from "@/assets/official/blog-more-1.png";
import blogMoreArticle2 from "@/assets/official/blog-more-2.png";
import blogMoreArticle3 from "@/assets/official/blog-more-3.png";
import blogMoreArticle4 from "@/assets/official/blog-more-4.png";
import blogMoreArticle5 from "@/assets/official/blog-more-5.png";
import blogMoreArticle6 from "@/assets/official/blog-more-6.png";
import blogSchool from "@/assets/official/blog-school.png";
import { Link } from "wouter";

type Article = {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  imageFrame: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  readTime: string;
  tag?: string;
};

type FeaturedArticle = {
  eyebrow: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
};

type ArticleCategory = "AI Assistant" | "Family Tasks" | "Recipes" | "Meal Plan" | "Shopping List";
type FeaturedDirection = "next" | "previous";

const featuredArticles: FeaturedArticle[] = [
  {
    eyebrow: "New Release",
    title: "Designing AI for the Invisible Work of Families — Featured on Google Play within 2 Months",
    excerpt: "From household friction to family connection — we’re giving families back the time they deserve.",
    date: "Oct 24 2026",
    readTime: "5 min read",
    image: blogHero,
  },
  {
    eyebrow: "Family Planning",
    title: "A Smarter Morning Routine for Families Who Share Every Detail",
    excerpt: "How Nori helps parents turn school notes, reminders, and changing plans into one calm daily rhythm.",
    date: "Oct 18 2026",
    readTime: "6 min read",
    image: blogFamily,
  },
  {
    eyebrow: "School Guide",
    title: "What Happens When School Emails Become a Living Family Schedule",
    excerpt: "A practical look at how AI can catch permission slips, event changes, and after-school logistics before they slip through.",
    date: "Oct 11 2026",
    readTime: "7 min read",
    image: blogSchool,
  },
];

const articleCategories: ArticleCategory[] = ["AI Assistant", "Family Tasks", "Recipes", "Meal Plan", "Shopping List"];

const articles: Article[] = [
  {
    title: "How to automate your daily tasks with Nori Workflows",
    excerpt: "A step-by-step guide to setting up custom triggers and actions to save hours every week.",
    date: "Oct 13, 2026",
    image: blogMoreArticle1,
    imageFrame: { x: -34, y: -63.326, width: 863, height: 471 },
    readTime: "4 min read",
  },
  {
    title: "Claude Managed Agents Explained (2026): What Anthropic's Hosted Agent ...",
    excerpt: "If you follow AI product launches, you have probably seen Claude Managed Agents ...",
    date: "Oct 13, 2026",
    image: blogMoreArticle2,
    imageFrame: { x: -503, y: -147.326, width: 874, height: 477 },
    readTime: "4 min read",
  },
  {
    title: "Back-to-School: How to Organize Your Family Schedule (2026 Guide)",
    excerpt: "Back-to-school means new routines, school events, sports, and a flood of flyers and emails.",
    date: "Oct 13, 2026",
    image: blogMoreArticle3,
    imageFrame: { x: -174, y: -12.326, width: 607, height: 331 },
    readTime: "12 min read",
    tag: "AI Family Assistant",
  },
  {
    title: "How to Forward Email to Calendar Automatically (2026 Guide)",
    excerpt: "If you follow AI product launches, you have probably seen Claude Managed Agents ...",
    date: "Oct 13, 2026",
    image: blogMoreArticle4,
    imageFrame: { x: -83, y: -23.326, width: 563, height: 307 },
    readTime: "4 min read",
  },
  {
    title: "How to Forward Email to Calendar Automatically (2026 Guide)",
    excerpt: "If you follow AI product launches, you have probably seen Claude Managed Agents ...",
    date: "Oct 13, 2026",
    image: blogMoreArticle5,
    imageFrame: { x: -71.667, y: -0.039, width: 746, height: 421 },
    readTime: "8 min read",
  },
  {
    title: "Best Family Chore App 2026: Chore Tracker for Kids & Household Tasks",
    excerpt: "Back-to-school means new routines, school events, sports, and a flood of flyers and emails.",
    date: "Oct 13, 2026",
    image: blogMoreArticle6,
    imageFrame: { x: -82, y: -0.326, width: 670, height: 377 },
    readTime: "10 min read",
    tag: "AI Family Assistant",
  },
];

const articleImageFrameBase = {
  width: 362.6666564941406,
  height: 197,
};

function ArticleCard({ article }: { article: Article }) {
  const imageStyle = {
    left: `${(article.imageFrame.x / articleImageFrameBase.width) * 100}%`,
    top: `${(article.imageFrame.y / articleImageFrameBase.height) * 100}%`,
    width: `${(article.imageFrame.width / articleImageFrameBase.width) * 100}%`,
    height: `${(article.imageFrame.height / articleImageFrameBase.height) * 100}%`,
  };

  return (
    <article className="interactive-card flex h-full min-h-[421px] min-w-0 flex-col gap-4 rounded-[24px] bg-white p-6 hover:shadow-[0_18px_45px_rgba(28,25,23,0.08)] min-[700px]:min-h-[430px] xl:min-h-[464px]">
      <div className="relative aspect-[362.667/197] w-full overflow-hidden rounded-[16px] bg-[#ede8da] xl:h-[197px] xl:aspect-auto">
        <img
          src={article.image}
          alt=""
          className="pointer-events-none absolute max-w-none object-cover"
          style={imageStyle}
        />
      </div>
      <div className="flex flex-col gap-4 px-2">
        <div className="flex h-6 items-center">
          <time className="text-[14px] font-medium leading-5 text-[#151515]/40">{article.date}</time>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="line-clamp-2 text-[18px] font-medium leading-[27px] text-[#151515]">{article.title}</h3>
          <p className="line-clamp-2 text-[16px] leading-6 text-[#151515]/80">{article.excerpt}</p>
        </div>
      </div>
      <div className="mx-2 mt-auto flex items-center gap-1 border-t border-black/[0.03] pt-[17px] text-[14px] font-medium leading-5 text-[#151515]/40">
        <img src={blogClockIcon} alt="" className="size-4" />
        {article.readTime}
      </div>
    </article>
  );
}

function CategoryNav({
  activeCategory,
  onSelect,
}: {
  activeCategory: ArticleCategory;
  onSelect: (category: ArticleCategory) => void;
}) {
  const activeIndex = articleCategories.indexOf(activeCategory);
  const isLastActive = activeIndex === articleCategories.length - 1;

  return (
    <div className="no-scrollbar -mx-5 max-w-full overflow-x-auto px-5 min-[700px]:mx-0 min-[700px]:px-0" role="tablist" aria-label="Article categories">
      <div className={`inline-flex min-w-max items-center gap-4 min-[700px]:gap-4 min-[700px]:bg-[#ede8da] ${
        isLastActive
          ? "min-[700px]:rounded-bl-[16px] min-[700px]:rounded-br-[8px] min-[700px]:rounded-tl-[16px] min-[700px]:rounded-tr-[64px]"
          : "min-[700px]:rounded-[16px]"
      }`}>
        {articleCategories.map((category, index) => {
          const isActive = category === activeCategory;

          return (
            <div className="flex items-center gap-4 min-[700px]:gap-1" key={category}>
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`py-3 pl-3 pr-6 text-[15px] font-medium leading-5 outline-none transition-colors duration-150 focus:outline-none focus-visible:outline-none focus-visible:ring-0 min-[700px]:py-4 min-[700px]:pl-6 min-[700px]:pr-9 min-[700px]:text-[16px] min-[700px]:leading-[22px] ${
                  isActive
                    ? "text-[#151515] min-[700px]:rounded-bl-[16px] min-[700px]:rounded-br-[8px] min-[700px]:rounded-tl-[16px] min-[700px]:rounded-tr-[64px] min-[700px]:bg-white"
                    : "text-[#151515]/60 hover:text-[#151515] min-[700px]:rounded-bl-[8px] min-[700px]:rounded-br-[8px] min-[700px]:rounded-tl-[8px] min-[700px]:rounded-tr-[48px]"
                }`}
                onClick={() => onSelect(category)}
              >
                {category}
              </button>
              {index < articleCategories.length - 1 ? <span aria-hidden="true" className="size-1 rounded-full bg-[#151515]/30 min-[700px]:size-1" /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Blog() {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [featuredDirection, setFeaturedDirection] = useState<FeaturedDirection>("next");
  const [activeCategory, setActiveCategory] = useState<ArticleCategory>("AI Assistant");
  const featuredArticle = featuredArticles[featuredIndex];

  function showPreviousFeatured() {
    setFeaturedDirection("previous");
    setFeaturedIndex((index) => (index - 1 + featuredArticles.length) % featuredArticles.length);
  }

  function showNextFeatured() {
    setFeaturedDirection("next");
    setFeaturedIndex((index) => (index + 1) % featuredArticles.length);
  }

  function showFeaturedArticle(index: number) {
    setFeaturedDirection(index >= featuredIndex ? "next" : "previous");
    setFeaturedIndex(index);
  }

  return (
    <OfficialLayout>
      <section className="flex flex-col items-center px-5 text-center min-[700px]:px-10 lg:px-20 lg:pt-[22px]">
        <h1 className="font-ek text-[32px] font-bold leading-[38.4px] tracking-[-0.32px] text-[#151515] min-[700px]:text-[60px] min-[700px]:leading-[72px] min-[700px]:tracking-normal">Blog</h1>
        <p className="mt-4 max-w-[314px] text-[15px] font-normal leading-[22px] tracking-[-0.1px] text-[#151515]/80 min-[700px]:mt-6 min-[700px]:max-w-[648px] min-[700px]:text-[18px] min-[700px]:font-medium min-[700px]:leading-[27px] min-[700px]:tracking-normal">
          Explore practical guides and product stories to help your family plan better,
          <br className="hidden sm:block" />
          save time, and stay in sync.
        </p>
      </section>

      <section className="mt-10 px-5 min-[700px]:mt-[60px] min-[700px]:px-10 lg:px-20">
        <article className="reveal-on-scroll flex min-h-[490px] flex-col overflow-hidden rounded-[24px] bg-white p-4 min-[700px]:h-[800px] min-[700px]:rounded-[32px] min-[700px]:p-6 lg:flex-row lg:h-[445.326px] lg:min-h-0 lg:items-center lg:gap-8">
          <div className="relative aspect-video overflow-hidden rounded-[16px] bg-[#ede8da] min-[700px]:rounded-[24px] lg:h-[397.326px] lg:w-[706.95px] lg:shrink-0">
            <img
              key={featuredArticle.image}
              src={featuredArticle.image}
              alt=""
              className={`blog-feature-media blog-feature-${featuredDirection} h-full w-full object-cover object-top lg:absolute lg:left-[-16px] lg:top-0 lg:h-[441px] lg:w-[739px] lg:max-w-none`}
            />
          </div>
          <div key={featuredArticle.title} className={`blog-feature-copy blog-feature-${featuredDirection} flex flex-1 flex-col justify-between gap-4 pt-4 min-[700px]:gap-8 min-[700px]:px-2 min-[700px]:pt-4 lg:min-h-0 lg:w-[475.05px] lg:self-stretch lg:px-0 lg:py-2 lg:pr-8`}>
            <div className="flex flex-col gap-4 min-[700px]:gap-6">
              <span className="w-fit rounded-full bg-[#fff6eb] px-4 py-1 text-[14px] font-medium leading-5 text-[#d68125] min-[700px]:py-1.5">
                {featuredArticle.eyebrow}
              </span>
              <div className="flex flex-col gap-2 px-2 min-[700px]:gap-4 min-[700px]:px-1">
                <h2 className="line-clamp-3 text-[20px] font-semibold leading-6 text-[#151515] min-[700px]:line-clamp-4 min-[700px]:text-[32px] min-[700px]:leading-[38.4px]">
                  {featuredArticle.title}
                </h2>
                <p className="line-clamp-3 text-[16px] leading-6 text-[#151515]/80 min-[700px]:text-[18px] min-[700px]:leading-[27px]">
                  {featuredArticle.excerpt}
                </p>
              </div>
            </div>
            <div className="flex items-center border-t border-[#151515]/[0.08] px-2 pt-4 min-[700px]:justify-between min-[700px]:px-1">
              <Link href="#" className="hidden items-center gap-[6px] text-[18px] font-medium leading-[27px] text-[#151515] min-[700px]:inline-flex">
                Read Article
                <img src={blogArrowIcon} alt="" className="size-4 rotate-90" />
              </Link>
              <span className="inline-flex items-center gap-[6px] text-[14px] font-normal leading-5 text-[#151515]/40">
                <img src={blogClockIcon} alt="" className="size-4" />
                {featuredArticle.date} · {featuredArticle.readTime}
              </span>
            </div>
          </div>
        </article>

        <div className="mt-4 flex items-center justify-center gap-6 text-[#151515]/30 min-[700px]:mt-8">
          <button
            type="button"
            aria-label="Previous featured article"
            className="hidden size-10 items-center justify-center rounded-full text-[24px] leading-none text-[#151515]/35 transition-colors hover:text-[#151515] min-[700px]:flex"
            onClick={showPreviousFeatured}
          >
            ‹
          </button>
          <div className="flex items-center gap-2">
            {featuredArticles.map((article, index) => (
              <button
                type="button"
                aria-label={`Show featured article ${index + 1}: ${article.title}`}
                key={article.title}
                className={`h-1.5 rounded-full transition-all duration-150 ${
                  index === featuredIndex ? "w-8 bg-[#151515]" : "w-1.5 bg-[#151515]/20 hover:bg-[#151515]/40"
                }`}
                onClick={() => showFeaturedArticle(index)}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next featured article"
            className="hidden size-10 items-center justify-center rounded-full text-[24px] leading-none text-[#151515]/35 transition-colors hover:text-[#151515] min-[700px]:flex"
            onClick={showNextFeatured}
          >
            ›
          </button>
        </div>
      </section>

      <section className="mt-[100px] px-5 min-[700px]:mt-[140px] min-[700px]:px-10 lg:px-20">
        <div className="flex flex-col items-center gap-8">
          <h2 className="font-ek text-[32px] font-bold leading-[38.4px] tracking-[-0.32px] text-[#18181b] min-[700px]:text-[44px] min-[700px]:leading-[54px] min-[700px]:tracking-normal">More articles</h2>
          <CategoryNav activeCategory={activeCategory} onSelect={setActiveCategory} />
          <div key={activeCategory} className="reveal-stagger grid w-full items-stretch gap-6 min-[700px]:grid-cols-2 xl:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard article={article} key={article.title + article.image} />
            ))}
          </div>
        </div>
      </section>
    </OfficialLayout>
  );
}
