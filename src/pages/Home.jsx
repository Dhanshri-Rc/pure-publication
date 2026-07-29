import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  FileText,
  Globe2,
  GraduationCap,
  PenLine,
  Search,
  Users,
} from "lucide-react";

import heroBackground from "../assets/images/home-bg.png";
const INDEXING_PARTNERS = [
  {
    name: "Crossref",
    image: "/images/indexing/crossref.png",
    alt: "Crossref",
  },
  {
    name: "DOI",
    image: "/images/indexing/doi.png",
    alt: "DOI",
  },
  {
    name: "Google Scholar",
    image: "/images/indexing/google-scholar.png",
    alt: "Google Scholar",
  },
  {
    name: "Open Access",
    image: "/images/indexing/open-access.png",
    alt: "Open Access",
  },
  {
    name: "ORCID",
    image: "/images/indexing/orcid.png",
    alt: "ORCID",
  },
  {
    name: "Scopus",
    image: "/images/indexing/scopus.png",
    alt: "Scopus",
  },
  {
    name: "ISI",
    image: "/images/indexing/isi.png",
    alt: "International Scientific Indexing",
  },
];
const BRAND = {
  dark: "#073F40",
  darker: "#053536",
  gold: "#D4A257",
  soft: "#F6F8F7",
};

const TOP_STATS = [
  {
    icon: BookOpen,
    value: 25,
    suffix: "+",
    label: "Journals",
  },
  {
    icon: FileText,
    value: 15000,
    suffix: "+",
    label: "Published Articles",
  },
  {
    icon: Globe2,
    value: 120,
    suffix: "+",
    label: "Countries",
  },
  {
    icon: Users,
    value: 10000,
    suffix: "+",
    label: "Active Authors",
  },
  {
    icon: Award,
    value: 98,
    suffix: "%",
    label: "Author Satisfaction",
  },
];

const SERVICES = [
  {
    icon: BookOpen,
    title: "Article Publication",
    description:
      "Navigate the publication process with ease in Scopus, ESCI, and more.",
    to: "/services/article-publication",
  },
  {
    icon: FileText,
    title: "Proofreading Services",
    description:
      "Elevate the quality of your manuscripts with expert proofreading and editing.",
    to: "/services/proofreading",
  },
  {
    icon: Users,
    title: "Collaboration Services",
    description:
      "Connect with leading experts to enhance your research impact and visibility.",
    to: "/services/collaboration",
  },
  {
    icon: PenLine,
    title: "Paper Writing Assistance",
    description:
      "Get professional support for well-structured and impactful research.",
    to: "/services/paper-writing",
  },
  {
    icon: GraduationCap,
    title: "Thesis Writing Services",
    description:
      "Craft your thesis with expert guidance and academic precision.",
    to: "/services/thesis-writing",
  },
];

const JOURNALS = [
  {
    id: 1,
    title: "Genetics and Molecular Research",
    issn: "1676-5680",
    index: "Scopus Q4",
    image: "/images/journals/genetics-and-molecular-research.jpg",
  },
  {
    id: 2,
    title: "International Journal of Aquatic Research and Environmental Studies",
    issn: "2980-7840",
    index: "Scopus",
    image: "/images/journals/aquatic-research.jpg",
  },
  {
    id: 3,
    title: "International Journal of Special Education",
    issn: "0827-3383",
    index: "Scopus",
    image: "/images/journals/special-education.jpg",
  },
  {
    id: 4,
    title: "Journal of Environmental Research",
    issn: "1234-5678",
    index: "Scopus Q3",
    image: "/images/journals/environmental-research.jpg",
  },
  {
    id: 5,
    title: "Journal of Advanced Pharmaceutical Sciences",
    issn: "2345-6789",
    index: "Scopus Q4",
    image: "/images/journals/pharmaceutical-sciences.jpg",
  },
  {
    id: 6,
    title: "Journal of Intelligent Decision Making and Information Science",
    issn: "3079-0875",
    index: "Scopus",
    image: "/images/journals/intelligent-decision-making.jpg",
  },
  {
    id: 7,
    title:
      "International Journal of Computer Information Systems and Industrial Management Applications",
    issn: "2150-7988",
    index: "Scopus",
    image: "/images/journals/computer-information-systems.jpg",
  },
  {
    id: 8,
    title: "Journal of Health Science and Medical Research",
    issn: "2586-9981",
    index: "Scopus",
    image: "/images/journals/health-science.jpg",
  },
];

const BOTTOM_STATS = [
  { icon: BookOpen, value: 25, suffix: "+", label: "Journals" },
  { icon: FileText, value: 15000, suffix: "+", label: "Articles Published" },
  { icon: Users, value: 10000, suffix: "+", label: "Active Authors" },
  { icon: Users, value: 1200, suffix: "+", label: "Expert Reviewers" },
  { icon: Globe2, value: 120, suffix: "+", label: "Countries Reached" },
  { icon: Award, value: 98, suffix: "%", label: "Success Rate" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

function CountUp({ end, duration = 1300 }) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: 0.55 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!visible) return;

    let frame;
    const startedAt = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(end * eased));

      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [duration, end, visible]);

  return <span ref={ref}>{value.toLocaleString()}</span>;
}

function ActionButton({
  to,
  children,
  light = false,
  className = "",
  ariaLabel,
}) {
  return (
    <Link
      to={to}
      aria-label={ariaLabel || String(children)}
      className={[
        "group inline-flex min-h-11 items-center justify-center gap-3 rounded-lg px-5 py-3",
        "text-[12px] font-semibold transition-all duration-300",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A257] focus-visible:ring-offset-2",
        light
          ? "border border-slate-200 bg-white text-[#073F40] hover:border-[#073F40] hover:bg-[#F5F7F6]"
          : "bg-[#073F40] text-white shadow-[0_10px_25px_rgba(7,63,64,.18)] hover:-translate-y-0.5 hover:bg-[#0A5152]",
        className,
      ].join(" ")}
    >
      {children}
      <ArrowRight
        size={14}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </Link>
  );
}

function StatItem({ item, index }) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 18,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        delay: 0.35 + index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -4,
        scale: 1.015,
      }}
      className={`
        group relative flex min-h-[64px] items-center
        justify-start gap-4 px-3 py-2
        sm:min-h-[70px] sm:px-4
        lg:justify-center lg:px-5
        ${
          index !== TOP_STATS.length - 1
            ? "lg:after:absolute lg:after:right-0 lg:after:top-1/2 lg:after:h-10 lg:after:w-px lg:after:-translate-y-1/2 lg:after:bg-[#DDE2E0]"
            : ""
        }
      `}
    >
      {/* ICON */}
      <motion.div
        whileHover={{
          rotate: index === 2 ? 12 : -6,
        }}
        transition={{
          duration: 0.25,
        }}
        className="
          flex h-[46px] w-[46px] shrink-0 items-center justify-center
          rounded-full bg-[#F0F2F1] text-[#0B3D3F]
          transition-all duration-300
          group-hover:bg-[#E7ECEA]
          group-hover:shadow-[0_8px_20px_rgba(7,63,64,0.12)]
          sm:h-[50px] sm:w-[50px]
        "
      >
        <Icon
          size={24}
          strokeWidth={1.75}
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </motion.div>

      {/* TEXT */}
      <div className="min-w-0">
        <div
          className="
            whitespace-nowrap font-serif text-[21px] font-semibold
            leading-none tracking-[-0.02em] text-[#102F30]
            sm:text-[23px]
          "
        >
          <CountUp end={item.value} />
          {item.suffix}
        </div>

        <p
          className="
            mt-2 whitespace-nowrap text-[9px] font-medium
            leading-none text-[#202A2A]
            sm:text-[10px]
          "
        >
          {item.label}
        </p>
      </div>

      {/* MOBILE/TABLET HOVER BACKGROUND */}
      <span
        className="
          pointer-events-none absolute inset-0 -z-10 rounded-xl
          bg-[#F7F9F8] opacity-0
          transition-opacity duration-300
          group-hover:opacity-100
          lg:hidden
        "
      />
    </motion.div>
  );
}

function ServiceCard({ item, index }) {
  const Icon = item.icon;

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 26,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.18,
      }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -8,
      }}
      className="
        group
        relative
        flex
        min-h-[270px]
        flex-col
        overflow-hidden
        rounded-[9px]
        border
        border-[#E6E9E7]
        bg-white
        px-[18px]
        pb-[18px]
        pt-[16px]
        shadow-[0_7px_24px_rgba(7,63,64,0.055)]
        transition-all
        duration-300

        hover:border-[#C9D7D2]
        hover:shadow-[0_18px_42px_rgba(7,63,64,0.12)]

        sm:min-h-[282px]

        lg:min-h-[278px]
      "
    >
      {/* HOVER BACKGROUND */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          bg-[linear-gradient(145deg,rgba(7,63,64,0.025),transparent_60%)]
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />

      {/* ICON */}
      <motion.span
        whileHover={{
          rotate: index === 2 ? 7 : -6,
          scale: 1.06,
        }}
        transition={{
          duration: 0.25,
        }}
        className="
          relative z-10
          flex
          h-[46px]
          w-[46px]
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-[#EEF1F0]
          text-[#0C3E3F]
          transition-all
          duration-300

          group-hover:bg-[#073F40]
          group-hover:text-[#D4A257]
          group-hover:shadow-[0_8px_18px_rgba(7,63,64,0.16)]
        "
      >
        <Icon
          size={22}
          strokeWidth={1.7}
          className="transition-transform duration-300"
        />
      </motion.span>

      {/* TITLE */}
      <h3
        className="
          relative z-10
          mt-[17px]
          min-h-[42px]
          font-sans
          text-[13px]
          font-semibold
          leading-[1.35]
          text-[#153D3E]

          sm:text-[14px]
        "
      >
        {item.title}
      </h3>

      {/* DESCRIPTION */}
      <p
        className="
          relative z-10
          mt-[10px]
          flex-1
          text-[10px]
          leading-[1.85]
          text-[#526060]

          sm:text-[11px]
        "
      >
        {item.description}
      </p>

      {/* LINK */}
      <Link
        to={item.to}
        className="
          relative z-10
          mt-[16px]
          inline-flex
          w-fit
          items-center
          gap-3
          text-[10px]
          font-semibold
          text-[#123839]
          transition-colors
          duration-300

          hover:text-[#D4A257]

          sm:text-[11px]
        "
      >
        Learn More

        <ArrowRight
          size={14}
          strokeWidth={1.8}
          className="
            transition-transform
            duration-300
            group-hover:translate-x-1.5
          "
        />
      </Link>

      {/* BOTTOM ACCENT */}
      <span
        aria-hidden="true"
        className="
          absolute
          bottom-0
          left-0
          h-[3px]
          w-0
          bg-[#D4A257]
          transition-all
          duration-500
          group-hover:w-full
        "
      />
    </motion.article>
  );
}

function JournalCard({ journal, index }) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 22,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.48,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -6,
      }}
      className="
        group
        min-w-0
      "
    >
      <Link
        to={`/journals/${journal.id}`}
        aria-label={`View ${journal.title}`}
        className="block"
      >
        {/* JOURNAL COVER */}
        <div
          className="
            relative
            mx-auto
            aspect-[0.72/1]
            w-full
            max-w-[150px]
            overflow-hidden
            rounded-[3px]
            bg-[#F1F3F2]
            shadow-[0_8px_22px_rgba(7,63,64,0.09)]
            transition-all
            duration-500

            group-hover:shadow-[0_18px_36px_rgba(7,63,64,0.16)]

            sm:max-w-[160px]

            lg:max-w-[155px]

            xl:max-w-[165px]
          "
        >
          {!imageError && journal.coverImage ? (
            <img
              src={journal.coverImage}
              alt={`${journal.title} journal cover`}
              loading="lazy"
              draggable={false}
              onError={() => setImageError(true)}
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-500
                ease-out
                group-hover:scale-[1.045]
              "
            />
          ) : (
            <div
              className="
                flex
                h-full
                flex-col
                justify-between
                bg-[linear-gradient(145deg,#0B4B4C,#D4A257)]
                p-4
                text-white
              "
            >
              <span className="text-[8px] uppercase tracking-[0.16em] text-white/70">
                Pure Publications
              </span>

              <h3 className="font-serif text-[17px] leading-[1.25]">
                {journal.title}
              </h3>

              <span className="text-[8px] text-white/75">
                ISSN: {journal.issn}
              </span>
            </div>
          )}

          {/* IMAGE HOVER OVERLAY */}
          <span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute inset-0
              bg-gradient-to-t
              from-[#073F40]/12
              via-transparent
              to-transparent
              opacity-0
              transition-opacity
              duration-300
              group-hover:opacity-100
            "
          />
        </div>

        {/* JOURNAL TITLE */}
        <h3
          className="
            mx-auto
            mt-3
            min-h-[38px]
            max-w-[165px]
            text-[10px]
            font-semibold
            leading-[1.45]
            text-[#163D3E]
            transition-colors
            duration-300

            group-hover:text-[#D4A257]

            sm:text-[11px]
          "
        >
          {journal.title}
        </h3>

        {/* ISSN */}
        <p
          className="
            mx-auto
            mt-2
            max-w-[165px]
            text-[8px]
            leading-none
            text-slate-500

            sm:text-[9px]
          "
        >
          ISSN: {journal.issn}
        </p>

        {/* INDEXING BADGE */}
        <span
          className="
            mx-auto
            mt-3
            inline-flex
            rounded-full
            border border-[#DDE2E0]
            bg-[#EEF1F0]
            px-2.5
            py-1
            text-[7px]
            font-medium
            leading-none
            text-[#596565]
            transition-all
            duration-300

            group-hover:border-[#D4A257]/40
            group-hover:bg-[#D4A257]/10
            group-hover:text-[#8D682E]

            sm:text-[8px]
          "
        >
          {journal.index || "Scopus"}
        </span>
      </Link>
    </motion.article>
  );
}

export default function Home() {
  const [page, setPage] = useState(0);

  const visibleCount = 5;
  const maxPage = Math.max(0, Math.ceil(JOURNALS.length / visibleCount) - 1);

  const visibleJournals = useMemo(() => {
    const start = page * visibleCount;
    return JOURNALS.slice(start, start + visibleCount);
  }, [page]);

  const previous = () => setPage((current) => (current <= 0 ? maxPage : current - 1));
  const next = () => setPage((current) => (current >= maxPage ? 0 : current + 1));

const [itemsPerPage, setItemsPerPage] = useState(5);

useEffect(() => {
  const updateItemsPerPage = () => {
    const width = window.innerWidth;

    if (width < 520) {
      setItemsPerPage(2);
    } else if (width < 768) {
      setItemsPerPage(3);
    } else if (width < 1024) {
      setItemsPerPage(4);
    } else {
      setItemsPerPage(5);
    }
  };

  updateItemsPerPage();

  window.addEventListener("resize", updateItemsPerPage);

  return () => {
    window.removeEventListener(
      "resize",
      updateItemsPerPage
    );
  };
}, []);


  useEffect(() => {
    const id = window.setInterval(next, 6000);
    return () => window.clearInterval(id);
  }, [maxPage]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Pure Publications",
    url: "https://purepublications.org/",
    description:
      "Academic publication, proofreading, collaboration, paper writing and thesis writing services.",
    sameAs: [],
  };

  return (
    <>
      <Helmet>
        <title>Pure Publications | Academic Research & Journal Publishing</title>
        <meta
          name="description"
          content="Pure Publications supports researchers with journal publication, proofreading, collaboration, paper writing, thesis writing, and global academic visibility."
        />
        <meta
          name="keywords"
          content="Pure Publications, academic publishing, journal publication, Scopus journals, paper publication, research writing, proofreading, thesis writing"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://purepublications.org/" />

        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Pure Publications | Where Your Research Meets Recognition"
        />
        <meta
          property="og:description"
          content="Your dedicated partner in academic excellence and professional writing."
        />
        <meta property="og:url" content="https://purepublications.org/" />
        <meta property="og:image" content="https://purepublications.org/og-home.jpg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Pure Publications | Where Your Research Meets Recognition"
        />
        <meta
          name="twitter:description"
          content="Academic publication and professional research support services."
        />
        <meta name="twitter:image" content="https://purepublications.org/og-home.jpg" />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <main className="overflow-hidden bg-white text-slate-800">
       
{/* HERO + FLOATING STATS */}
<section
  className="
    relative
    isolate
    overflow-visible
    bg-white
    pt-[55px]
  "
>
  {/* FULL HERO BACKGROUND IMAGE */}
  <motion.div
    initial={{ opacity: 0, scale: 1.025 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="
      absolute inset-x-0 top-[60px]
      h-[490px]
      bg-cover
      bg-center
      bg-no-repeat

      sm:h-[535px]

      lg:h-[415px]
      lg:bg-[center_48%]
    "
    style={{
      backgroundImage: `url(${heroBackground})`,
    }}
    role="img"
    aria-label="Academic books, laptop and research publishing workspace"
  />

  {/* RESPONSIVE BACKGROUND OVERLAY FOR TEXT READABILITY */}
 

  {/* HERO CONTENT */}
  <div
    className="
      relative z-10
      mx-auto
      min-h-[495px]
      max-w-[1140px]
      px-4
      pb-[120px]
      pt-12

      sm:min-h-[435px]
      sm:px-6
      sm:pt-16

      lg:min-h-[445px]
      lg:px-8
      lg:pb-[95px]
      lg:pt-[52px]

      xl:px-0
    "
  >
    <motion.div
      initial={{
        opacity: 0,
        x: -42,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.82,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        mx-auto
        max-w-[430px]
        text-center

        sm:mx-0
        sm:text-left
      "
    >
      <h1
        className="
          
          text-[40px]
          font-medium
          leading-[1.08]
          tracking-[-0.035em]
          text-[#123839]

          sm:text-[40px]

          lg:text-[46px]
        "
      >
        Where Your
        <br />
        Research Meets
        <br />

        <motion.span
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
            duration: 0.6,
          }}
          className="inline-block text-[#D4A257]"
        >
          Recognition
        </motion.span>
      </h1>

      <motion.p
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.42,
          duration: 0.55,
        }}
        className="
          mx-auto mt-5
          max-w-[355px]
          text-[12px]
          leading-[1.7]
          text-slate-600

          sm:mx-0
          sm:text-[14.5px]
        "
      >
        Your dedicated partner in academic 
        <br className="hidden sm:block" />
        excellence and professional writing.
      </motion.p>

      <motion.div
        initial={{
          opacity: 0,
          y: 12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.52,
          duration: 0.55,
        }}
        className="
          mt-6
          flex flex-wrap
          justify-center
          gap-3

          sm:justify-start
        "
      >
        <ActionButton
          to="/services"
          className="
            min-h-[43px]
            rounded-[7px]
            px-5
            text-[11px]
          "
        >
          Explore Services
        </ActionButton>

        <ActionButton
          to="/submit-paper"
          light
          className="
            min-h-[43px]
            rounded-[7px]
            border-black/40
            bg-white/95
            px-5
            text-[11px]
            shadow-[0_8px_22px_rgba(7,63,64,0.08)]
            backdrop-blur-sm
          "
        >
          Submit Your Paper
        </ActionButton>
      </motion.div>
    </motion.div>
  </div>

  
 {/* FLOATING TOP STATISTICS */}
<section
  aria-label="Pure Publications statistics"
  className="relative z-20"
>
  <div
    className="
      mx-auto -mt-10 w-full
      max-w-[1140px]
      px-4
      sm:-mt-10 sm:px-6
      lg:-mt-[52px] lg:px-8
      xl:px-0
    "
  >
    <motion.div
      initial={{
        opacity: 0,
        y: 28,
        scale: 0.985,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        delay: 0.25,
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        relative overflow-hidden
        rounded-[18px]
        border border-[#E1E5E3]
        bg-white/95
        px-3 py-3
        shadow-[0_14px_38px_rgba(7,63,64,0.12)]
        backdrop-blur-md

        grid grid-cols-1
        gap-1

        min-[420px]:grid-cols-2

        sm:grid-cols-2
        sm:gap-x-2
        sm:px-4
        sm:py-4

        md:grid-cols-3

        lg:grid-cols-5
        lg:gap-0
        lg:px-4
        lg:py-3
      "
    >
      {/* SUBTLE TOP SHINE */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-x-6 top-0 h-px
          bg-gradient-to-r
          from-transparent
          via-white
          to-transparent
        "
      />

      {TOP_STATS.map((item, index) => (
        <StatItem
          key={item.label}
          item={item}
          index={index}
        />
      ))}
    </motion.div>
  </div>
</section>
</section>

       
      {/* TRUSTED AND INDEXED SECTION */}
<section
  aria-label="Trusted and indexed by"
  className="relative z-20 mx-auto w-full max-w-[1180px] px-4 pt-5 sm:px-6 lg:px-6"
>
  <motion.div
    initial={{
      opacity: 0,
      y: 24,
      scale: 0.985,
    }}
    whileInView={{
      opacity: 1,
      y: 0,
      scale: 1,
    }}
    viewport={{
      once: true,
      amount: 0.25,
    }}
    transition={{
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="
      relative
      overflow-hidden
      rounded-[15px]
      border border-white/10
      bg-[#063F40]
      shadow-[0_14px_34px_rgba(6,63,64,0.2)]
    "
  >
    {/* SUBTLE BACKGROUND EFFECT */}
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute inset-0
        bg-[radial-gradient(circle_at_25%_50%,rgba(20,103,101,0.34),transparent_35%),linear-gradient(90deg,#063F40_0%,#084849_50%,#063F40_100%)]
      "
    />

    {/* SCROLLABLE CONTENT */}
    <div
      className="
        indexing-scrollbar-hidden
        relative z-10
        flex
        min-h-[84px]
        items-center
        gap-8
        overflow-x-auto
        px-5
        py-3

        sm:min-h-[98px]
        sm:px-7

        lg:justify-between
        lg:gap-6
        lg:overflow-visible
        lg:px-7

        xl:px-8
      "
    >
      {/* HEADING */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          delay: 0.1,
          duration: 0.5,
        }}
        className="
          flex
          min-w-[130px]
          shrink-0
          items-center
        "
      >
        <span
          className="
            whitespace-nowrap
            text-[12px]
            font-semibold
            tracking-[-0.01em]
            text-[#D6A652]

            sm:text-[14px]
          "
        >
          Trusted &amp; Indexed By
        </span>
      </motion.div>

      {/* LOGOS */}
      {INDEXING_PARTNERS.map((partner, index) => (
        <motion.div
          key={partner.name}
          initial={{
            opacity: 0,
            y: 12,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            delay: 0.12 + index * 0.07,
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{
            y: -3,
            scale: 1.04,
          }}
          className="
            group
            flex
            min-w-[85px]
            shrink-0
            items-center
            justify-center
            px-1
          "
        >
          <img
            src={partner.image}
            alt={partner.alt}
            loading="lazy"
            draggable={false}
            className={`
              w-auto
              object-contain
              brightness-0
              invert
              opacity-95
              transition-all
              duration-300

              group-hover:opacity-100
              group-hover:drop-shadow-[0_5px_12px_rgba(255,255,255,0.16)]

              ${
                partner.name === "Crossref"
                  ? "h-[34px] max-w-[105px]"
                  : partner.name === "DOI"
                    ? "h-[38px] max-w-[54px]"
                    : partner.name === "Google Scholar"
                      ? "h-[38px] max-w-[96px]"
                      : partner.name === "Open Access"
                        ? "h-[30px] max-w-[98px]"
                        : partner.name === "ORCID"
                          ? "h-[27px] max-w-[76px]"
                          : partner.name === "Scopus"
                            ? "h-[28px] max-w-[78px]"
                            : "h-[31px] max-w-[86px]"
              }
            `}
          />
        </motion.div>
      ))}

     
    </div>

    {/* MOBILE SCROLL INDICATOR */}
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-y-0
        right-0
        z-20
        w-12
        bg-gradient-to-l
        from-[#063F40]
        to-transparent

        lg:hidden
      "
    />
  </motion.div>
</section>

     {/* SERVICES SECTION */}
<section
  aria-labelledby="services-heading"
  className="
    mx-auto
    w-full
    max-w-[1180px]
    px-4
    py-11

    sm:px-6
    sm:py-12

    lg:px-8
    lg:py-14

    xl:px-0
  "
>
  {/* SECTION HEADER */}
  <motion.div
    initial={{
      opacity: 0,
      y: 20,
    }}
    whileInView={{
      opacity: 1,
      y: 0,
    }}
    viewport={{
      once: true,
      amount: 0.35,
    }}
    transition={{
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="
      mb-7
      flex
      flex-col
      justify-between
      gap-5

      sm:flex-row
      sm:items-end

      lg:mb-8
    "
  >
    <div>
      <span
        className="
          text-[9px]
          font-semibold
          uppercase
          tracking-[0.04em]
          text-[#D4A257]

          sm:text-[10px]
        "
      >
        Our Services
      </span>

      <h2
        id="services-heading"
        className="
          mt-2
          font-serif
          text-[24px]
          font-semibold
          leading-tight
          tracking-[-0.025em]
          text-[#153D3E]

          sm:text-[27px]

          lg:text-[29px]
        "
      >
        Elevate Your Academic Success
      </h2>

      <p
        className="
          mt-2
          max-w-[435px]
          text-[10px]
          leading-[1.75]
          text-slate-600

          sm:text-[11px]
        "
      >
        Comprehensive services designed to support your research journey
        <br className="hidden sm:block" />
        from idea to publication.
      </p>
    </div>

    <ActionButton
      to="/services"
      className="
        min-h-[44px]
        self-start
        rounded-[7px]
        px-6
        text-[10px]

        sm:self-auto
      "
    >
      View All Services
    </ActionButton>
  </motion.div>

  {/* SERVICE CARDS */}
  <div
    className="
      grid
      grid-cols-1
      gap-4

      min-[480px]:grid-cols-2

      md:grid-cols-3

      lg:grid-cols-5
      lg:gap-[18px]
    "
  >
    {SERVICES.map((item, index) => (
      <ServiceCard
        key={item.title}
        item={item}
        index={index}
      />
    ))}
  </div>
</section>

      {/* LATEST JOURNALS */}
<section
  aria-labelledby="latest-journals-heading"
  className="
    mx-auto
    w-full
    max-w-[1180px]
    px-4
    pb-10
    pt-2

    sm:px-6
    sm:pb-12

    lg:px-8
    lg:pb-14

    xl:px-0
  "
>
  {/* SECTION HEADER */}
  <motion.div
    initial={{
      opacity: 0,
      y: 18,
    }}
    whileInView={{
      opacity: 1,
      y: 0,
    }}
    viewport={{
      once: true,
      amount: 0.35,
    }}
    transition={{
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="
      mb-6
      flex
      items-end
      justify-between
      gap-4

      sm:mb-7
    "
  >
    <div>
      <h2
        id="latest-journals-heading"
        className="
          font-serif
          text-[21px]
          font-semibold
          leading-tight
          tracking-[-0.02em]
          text-[#153D3E]

          sm:text-[23px]
        "
      >
        Latest Additions
      </h2>

      <p
        className="
          mt-1.5
          text-[8px]
          leading-[1.6]
          text-slate-600

          sm:text-[9px]
        "
      >
        Discover the newest entries in our Latest Additions section!
      </p>
    </div>

    <Link
      to="/journals"
      className="
        group
        hidden
        items-center
        gap-3
        whitespace-nowrap
        text-[9px]
        font-semibold
        text-[#073F40]
        transition-colors
        duration-300

        hover:text-[#D4A257]

        sm:flex
        sm:text-[10px]
      "
    >
      View all journals

      <ArrowRight
        size={14}
        strokeWidth={1.8}
        className="
          transition-transform
          duration-300
          group-hover:translate-x-1.5
        "
      />
    </Link>
  </motion.div>

  {/* JOURNAL SLIDER */}
  <div className="relative">
    {/* PREVIOUS BUTTON */}
    <motion.button
      type="button"
      onClick={previous}
      aria-label="Show previous journals"
      whileHover={{
        scale: 1.08,
      }}
      whileTap={{
        scale: 0.92,
      }}
      className="
        absolute
        -left-5
        top-[36%]
        z-20
        hidden
        h-[40px]
        w-[40px]
        -translate-y-1/2
        items-center
        justify-center
        rounded-full
        border
        border-[#E0E4E2]
        bg-white
        text-[#073F40]
        shadow-[0_8px_22px_rgba(7,63,64,0.11)]
        transition-all
        duration-300

        hover:border-[#073F40]
        hover:bg-[#073F40]
        hover:text-white
        hover:shadow-[0_12px_28px_rgba(7,63,64,0.2)]

        lg:flex
      "
    >
      <ChevronLeft size={18} strokeWidth={1.8} />
    </motion.button>

    {/* JOURNAL ITEMS */}
    <div className="overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={page}
          initial={{
            opacity: 0,
            x: 34,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            x: -34,
          }}
          transition={{
            duration: 0.38,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            grid
            grid-cols-2
            gap-x-5
            gap-y-8

            min-[520px]:grid-cols-3

            md:grid-cols-4
            md:gap-x-6

            lg:grid-cols-5
            lg:gap-x-8
          "
        >
          {visibleJournals.map((journal, index) => (
            <JournalCard
              key={journal.id}
              journal={journal}
              index={index}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>

    {/* NEXT BUTTON */}
    <motion.button
      type="button"
      onClick={next}
      aria-label="Show next journals"
      whileHover={{
        scale: 1.08,
      }}
      whileTap={{
        scale: 0.92,
      }}
      className="
        absolute
        -right-5
        top-[36%]
        z-20
        hidden
        h-[40px]
        w-[40px]
        -translate-y-1/2
        items-center
        justify-center
        rounded-full
        border
        border-[#E0E4E2]
        bg-white
        text-[#073F40]
        shadow-[0_8px_22px_rgba(7,63,64,0.11)]
        transition-all
        duration-300

        hover:border-[#073F40]
        hover:bg-[#073F40]
        hover:text-white
        hover:shadow-[0_12px_28px_rgba(7,63,64,0.2)]

        lg:flex
      "
    >
      <ChevronRight size={18} strokeWidth={1.8} />
    </motion.button>
  </div>

  {/* MOBILE NAVIGATION BUTTONS */}
  <div
    className="
      mt-7
      flex
      items-center
      justify-between

      lg:hidden
    "
  >
    <button
      type="button"
      onClick={previous}
      aria-label="Show previous journals"
      className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        border
        border-[#E0E4E2]
        bg-white
        text-[#073F40]
        shadow-sm
        transition-all

        active:scale-95
        active:bg-[#073F40]
        active:text-white
      "
    >
      <ChevronLeft size={18} />
    </button>

    <Link
      to="/journals"
      className="
        inline-flex
        items-center
        gap-2
        text-[10px]
        font-semibold
        text-[#073F40]

        sm:hidden
      "
    >
      View all journals
      <ArrowRight size={13} />
    </Link>

    <button
      type="button"
      onClick={next}
      aria-label="Show next journals"
      className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        border
        border-[#E0E4E2]
        bg-white
        text-[#073F40]
        shadow-sm
        transition-all

        active:scale-95
        active:bg-[#073F40]
        active:text-white
      "
    >
      <ChevronRight size={18} />
    </button>
  </div>

  {/* PAGINATION */}
  {maxPage > 0 && (
    <div
      className="
        mt-6
        flex
        items-center
        justify-center
        gap-3
      "
    >
      {Array.from({
        length: maxPage + 1,
      }).map((_, index) => (
        <motion.button
          key={index}
          type="button"
          onClick={() => setPage(index)}
          aria-label={`Show journal group ${index + 1}`}
          aria-current={page === index ? "true" : undefined}
          whileHover={{
            scale: 1.1,
          }}
          whileTap={{
            scale: 0.9,
          }}
          className={`
            h-[3px]
            rounded-full
            transition-all
            duration-300

            ${
              page === index
                ? "w-7 bg-[#073F40]"
                : "w-4 bg-[#BFC7C4] hover:bg-[#7B8985]"
            }
          `}
        />
      ))}
    </div>
  )}
</section>

     

        {/* CTA */}
        <section className="mx-auto max-w-[1100px] px-5 pb-14 sm:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            className="relative overflow-hidden rounded-[16px] bg-[#0B494A] px-6 py-5 shadow-[0_14px_35px_rgba(7,63,64,.18)] sm:px-9"
          >
            <div className="absolute inset-y-0 right-0 hidden w-[41%] bg-[url('/images/cta-open-book.jpg')] bg-cover bg-center opacity-75 md:block" />
            <div className="absolute inset-y-0 right-[35%] hidden w-24 bg-gradient-to-r from-[#0B494A] to-transparent md:block" />

            <div className="relative z-10 grid items-center gap-6 md:grid-cols-[1.05fr_1.2fr_.85fr]">
              <h2 className="font-serif text-[24px] font-medium leading-[1.1] text-white">
                Ready to Publish
                <br />
                Your Research?
              </h2>

              <p className="border-l border-white/25 pl-6 text-[10px] leading-[1.65] text-white/78">
                Join thousands of researchers who trust Pure Publications for
                their academic journey.
              </p>

              <ActionButton
                to="/submit-paper"
                className="justify-self-start bg-[#D4A257] text-[#073F40] shadow-none hover:bg-[#E2B56F] md:justify-self-center"
              >
                Submit Your Paper
              </ActionButton>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}