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
  Users,
} from "lucide-react";

import heroBackground from "../assets/images/h.png";
import ctaBackground from "../assets/images/cta.png";
import j1 from "../assets/images/j1.png";
import j2 from "../assets/images/j2.png";
import j3 from "../assets/images/j3.png";


/* =========================================================
   BRAND COLORS
========================================================= */

const BRAND = {
  dark: "#073F40",
  darker: "#053536",
  gold: "#D4A257",
  light: "#F6F8F7",
};




const HERO_STATS = [
  {
    icon: BookOpen,
    value: 100,
    suffix: "+",
    label: "Journals",
  },
  {
    icon: FileText,
    value: 1500,
    suffix: "+",
    label: "Articles Published",
  },
  {
    icon: Globe2,
    value: 5,
    suffix: "+",
    label: "Countries",
  },
  {
    icon: Award,
    value: 95,
    suffix: "%",
    label: "Author Satisfaction",
  },
];
/* =========================================================
   SERVICES
========================================================= */

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

/* =========================================================
   JOURNALS
========================================================= */

const JOURNALS = [
  {
    id: 1,
    slug: "genetics-and-molecular-research",
    title: "Genetics and Molecular Research",
    issn: "1676-5680",
    index: "Scopus Q4",
    image: j1,
    fallback: "from-[#0A6670] via-[#DCEBED] to-[#0B5A61]",
  },
  {
    id: 2,
    slug: "international-journal-of-aquatic-research",
    title:
      "International Journal of Aquatic Research and Environmental Studies",
    issn: "2980-7840",
    index: "Scopus",
    image: j2,
    fallback: "from-[#1F91BA] via-[#DDF5FA] to-[#06668D]",
  },
  {
    id: 3,
    slug: "international-journal-of-special-education",
    title: "International Journal of Special Education",
    issn: "0827-3383",
    index: "Scopus",
    image: j3,
    fallback: "from-[#6F2D96] via-[#F1E8F8] to-[#A770C8]",
  },
  {
    id: 4,
    slug: "journal-of-environmental-research",
    title: "Journal of Environmental Research",
    issn: "1234-5678",
    index: "Scopus Q3",
    image: j1,
    fallback: "from-[#23594E] via-[#CFDDD3] to-[#0C433B]",
  },
  {
    id: 5,
    slug: "journal-of-advanced-pharmaceutical-sciences",
    title: "Journal of Advanced Pharmaceutical Sciences",
    issn: "2345-6789",
    index: "Scopus Q4",
    image: j2,
    fallback: "from-[#D64922] via-[#FBD5C5] to-[#9C2A17]",
  },
  {
    id: 6,
    slug: "journal-of-intelligent-decision-making",
    title: "Journal of Intelligent Decision Making and Information Science",
    issn: "3079-0875",
    index: "Scopus",
    image: j3,
    fallback: "from-[#123D67] via-[#D6E2EC] to-[#092B49]",
  },
  {
    id: 7,
    slug: "international-journal-of-computer-information-systems",
    title:
      "International Journal of Computer Information Systems and Industrial Management Applications",
    issn: "2150-7988",
    index: "Scopus",
    image: j1,
    fallback: "from-[#19386A] via-[#D7E1F0] to-[#0B244C]",
  },
  {
    id: 8,
    slug: "journal-of-health-science-and-medical-research",
    title: "Journal of Health Science and Medical Research",
    issn: "2586-9981",
    index: "Scopus",
    image: j2,
    fallback: "from-[#9B2935] via-[#F1D6D9] to-[#671822]",
  },
  {
    id: 9,
    slug: "pain-joints-spine",
    title: "Pain, Joints, Spine",
    issn: "2224-1507",
    index: "Scopus",
    image: j3,
    fallback: "from-[#3D517D] via-[#D6DDEB] to-[#243457]",
  },
  {
    id: 10,
    slug: "international-journal-of-special-education-2",
    title: "International Journal of Special Education",
    issn: "0827-3383",
    index: "Scopus",
    image: j1,
    fallback: "from-[#76409B] via-[#F2EAF7] to-[#A47CC0]",
  },
];


const easing = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 34,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easing,
    },
  },
};

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -45,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease: easing,
    },
  },
};
/* =========================================================
   ANIMATED COUNTER
========================================================= */
function AnimatedCounter({ value, suffix = "" }) {
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, {
    once: true,
    amount: 0.6,
  });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return undefined;

    let animationFrame;
    const duration = 1500;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.floor(value * easedProgress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCounter);
      }
    };

    animationFrame = requestAnimationFrame(updateCounter);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value]);

  return (
    <span ref={counterRef}>
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}
function CountUp({ end, duration = 1300 }) {
  const counterRef = useRef(null);
  const isVisible = useInView(counterRef, {
    once: true,
    amount: 0.55,
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return undefined;

    let animationFrame;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(end * easedProgress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCounter);
      }
    };

    animationFrame = requestAnimationFrame(updateCounter);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [duration, end, isVisible]);

  return <span ref={counterRef}>{count.toLocaleString()}</span>;
}

/* =========================================================
   HOME PAGE
========================================================= */

export default function Home() {
  const [journalPage, setJournalPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [failedImages, setFailedImages] = useState({});
  const [slideDirection, setSlideDirection] = useState(1);

  /* =======================================================
     RESPONSIVE JOURNAL ITEM COUNT
  ======================================================= */

useEffect(() => {
  const updateItemsPerPage = () => {
    const width = window.innerWidth;

    if (width < 480) {
      setItemsPerPage(1);
    } else if (width < 640) {
      setItemsPerPage(2);
    } else if (width < 768) {
      setItemsPerPage(3);
    } else if (width < 1100) {
      setItemsPerPage(4);
    } else {
      setItemsPerPage(5);
    }
  };

  updateItemsPerPage();

  window.addEventListener("resize", updateItemsPerPage);

  return () => {
    window.removeEventListener("resize", updateItemsPerPage);
  };
}, []);
  const totalJournalPages = Math.max(
    1,
    Math.ceil(JOURNALS.length / itemsPerPage)
  );

  useEffect(() => {
  setJournalPage((currentPage) =>
    Math.min(currentPage, totalJournalPages - 1)
  );
}, [totalJournalPages]);

  const visibleJournals = useMemo(() => {
    const startIndex = journalPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return JOURNALS.slice(startIndex, endIndex);
  }, [itemsPerPage, journalPage]);

const showPreviousJournals = () => {
  setSlideDirection(-1);

  setJournalPage((currentPage) =>
    currentPage <= 0
      ? totalJournalPages - 1
      : currentPage - 1
  );
};

const showNextJournals = () => {
  setSlideDirection(1);

  setJournalPage((currentPage) =>
    currentPage >= totalJournalPages - 1
      ? 0
      : currentPage + 1
  );
};
const showJournalPage = (pageIndex) => {
  if (pageIndex === journalPage) return;

  setSlideDirection(pageIndex > journalPage ? 1 : -1);
  setJournalPage(pageIndex);
};



  const handleImageError = (journalId) => {
    setFailedImages((current) => ({
      ...current,
      [journalId]: true,
    }));
  };

  /* =======================================================
     SEO STRUCTURED DATA
  ======================================================= */

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Pure Publications",
    url: "https://purepublications.org/",
    logo: "https://purepublications.org/logo.png",
    description:
      "Academic publication, proofreading, collaboration, paper writing and thesis writing services.",
    sameAs: [],
  };

  return (
    <>
      {/* =====================================================
          SEO
      ===================================================== */}

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

        <meta name="author" content="Pure Publications" />
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

        <meta
          property="og:image"
          content="https://purepublications.org/og-home.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />

        <meta
          name="twitter:title"
          content="Pure Publications | Where Your Research Meets Recognition"
        />

        <meta
          name="twitter:description"
          content="Academic publication and professional research support services."
        />

        <meta
          name="twitter:image"
          content="https://purepublications.org/og-home.jpg"
        />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <main className="overflow-hidden bg-white text-slate-800">
        {/* =====================================================
            HERO SECTION
        ===================================================== */}

        <section className="relative isolate overflow-visible bg-white pt-[55px]">
          <motion.div
            initial={{
              opacity: 0,
              scale: 1.025,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              absolute inset-x-0 top-[55px]
              h-[500px]
              bg-cover bg-center bg-no-repeat

              sm:h-[520px]

              lg:h-[490px]
              lg:bg-[center_48%]
            "
            style={{
              backgroundImage: `url(${heroBackground})`,
            }}
            role="img"
            aria-label="Academic books, laptop and research publishing workspace"
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute inset-x-0 top-[55px]
              h-[500px]
              bg-gradient-to-r
              from-white/25
              via-white/5
              to-transparent

              sm:h-[520px]

              lg:h-[420px]
            "
          />

          <div
            className="
              relative z-10
              mx-auto
              min-h-[500px]
              max-w-[1180px]
              px-4
              pb-[95px]
              pt-20

              sm:min-h-[480px]
              
              sm:pt-24

              lg:min-h-[445px]
              lg:px-8 xl:px-0 sm:px-6
              lg:pb-[45px]
              lg:pt-[75px]

              
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
         
    <motion.h1
                variants={fadeLeft}
                className="font-serif font-semibold leading-[1.05]
             text-[30px]
             sm:text-[38px]
             lg:text-[42px]
             text-[#063330]"
              >
               Where Your Research Meets
                <span className="mt-2 block text-[#d0a151]">
                 Recognition
                </span>
              </motion.h1> 
   <motion.p
                variants={fadeUp}
                className="mt-4 max-w-[480px] text-[14px] leading-6 text-[#4a5c5b] sm:text-[16px]"
              >
                  Your dedicated partner in academic excellence
               
                and professional writing.
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
                  mt-5
                  flex
                  flex-wrap
                  justify-center
                  gap-3

                  sm:justify-start
                "
              >
                <Link
                  to="/services"
                  className="
                    group
                    inline-flex
                    min-h-[43px]
                    items-center
                    justify-center
                    gap-3
                    rounded-[7px]
                    bg-[#073F40]
                    px-5
                    py-3
                    text-[12px]
                    font-semibold
                    text-white
                    shadow-[0_10px_25px_rgba(7,63,64,.18)]
                    transition-all
                    duration-300

                    hover:-translate-y-0.5
                    hover:bg-[#0A5152]

                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#D4A257]
                    focus-visible:ring-offset-2
                  "
                >
                  Explore Services

                  <ArrowRight
                    size={14}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </Link>

                <Link
                  to="/submit-paper"
                  className="
                    group
                    inline-flex
                    min-h-[43px]
                    items-center
                    justify-center
                    gap-3
                    rounded-[7px]
                    border
                    border-black/30
                    bg-white/95
                    px-5
                    py-3
                    text-[12px]
                    font-semibold
                    text-[#073F40]
                    shadow-[0_8px_22px_rgba(7,63,64,0.08)]
                    backdrop-blur-sm
                    transition-all
                    duration-300

                    hover:-translate-y-0.5
                    hover:border-[#073F40]
                    hover:bg-[#F5F7F6]

                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#D4A257]
                    focus-visible:ring-offset-2
                  "
                >
                  Submit Your Paper

                  <ArrowRight
                    size={14}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </Link>
              </motion.div>

            </motion.div>
             <motion.div
                variants={fadeUp}
                className="mt-11 grid max-w-[760px] grid-cols-2 overflow-hidden rounded-[12px] border border-white/20 bg-[#003f3b]/95 shadow-[0_18px_40px_rgba(0,49,45,0.26)] backdrop-blur-sm lg:grid-cols-4"
              >
                {HERO_STATS.map((stat, index) => {
                  const Icon = stat.icon;

                  return (
                    <motion.div
                      key={stat.label}
                      whileHover={{
                        y: -4,
                        backgroundColor: "rgba(255,255,255,0.07)",
                      }}
                      transition={{ duration: 0.25 }}
                      className={`group relative flex min-h-[92px] items-center gap-3 px-4 py-4 sm:px-5 ${
                        index < HERO_STATS.length - 1
                          ? "lg:after:absolute lg:after:right-0 lg:after:top-1/2 lg:after:h-12 lg:after:w-px lg:after:-translate-y-1/2 lg:after:bg-white/20"
                          : ""
                      }`}
                    >
                      <Icon
                        size={31}
                        strokeWidth={1.8}
                        className="shrink-0 text-[#d6a540] transition-transform duration-300 group-hover:scale-110"
                      />

                      <div>
                        <div className="font-serif text-[25px] font-semibold leading-none text-white">
                          <AnimatedCounter
                            value={stat.value}
                            suffix={stat.suffix}
                          />
                        </div>

                        <p className="mt-2 whitespace-nowrap text-[10px] font-medium text-white/90 sm:text-[11px]">
                          {stat.label}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
          </div>

          {/* =================================================
              FLOATING TOP STATISTICS
          ================================================= */}

          {/* <section
            aria-label="Pure Publications statistics"
            className="relative z-20"
          >
            <div
              className="
                
                -mt-10
                w-full
                max-w-[840px]
                px-4

                sm:-mt-10
                sm:px-2

                lg:-mt-[52px]
                lg:px-2

                
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
                  relative
                  grid
                  grid-cols-1
                  gap-1
                  overflow-hidden
                  rounded-[18px]
                  border
                  border-[#E1E5E3]
                  bg-white/95
                  px-3
                  py-3
                  shadow-[0_14px_38px_rgba(7,63,64,0.12)]
                  backdrop-blur-md

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
                {TOP_STATS.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.label}
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
                      }}
                      whileHover={{
                        y: -4,
                        scale: 1.015,
                      }}
                      className={`
                        group
                        relative
                        flex
                        min-h-[64px]
                        items-center
                        justify-start
                        gap-4
                        rounded-xl
                        px-3
                        py-2
                        transition-colors
                        duration-300

                        hover:bg-[#F7F9F8]

                        sm:min-h-[70px]
                        sm:px-4

                        lg:justify-center
                        lg:rounded-none
                        lg:px-5

                        ${
                          index !== TOP_STATS.length - 1
                            ? "lg:after:absolute lg:after:right-0 lg:after:top-1/2 lg:after:h-10 lg:after:w-px lg:after:-translate-y-1/2 lg:after:bg-[#DDE2E0]"
                            : ""
                        }
                      `}
                    >
                      <motion.div
                        whileHover={{
                          rotate: index === 2 ? 12 : -6,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                        className="
                          flex
                          h-[46px]
                          w-[46px]
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-[#F0F2F1]
                          text-[#0B3D3F]
                          transition-all
                          duration-300

                          group-hover:bg-[#E7ECEA]
                          group-hover:shadow-[0_8px_20px_rgba(7,63,64,0.12)]

                          sm:h-[50px]
                          sm:w-[50px]
                        "
                      >
                        <Icon size={24} strokeWidth={1.75} />
                      </motion.div>

                      <div className="min-w-0">
                        <div
                          className="
                            whitespace-nowrap
                            font-serif
                            text-[21px]
                            font-semibold
                            leading-none
                            tracking-[-0.02em]
                            text-[#102F30]

                            sm:text-[23px]
                          "
                        >
                          <CountUp end={item.value} />
                          {item.suffix}
                        </div>

                        <p
                          className="
                            mt-2
                            whitespace-nowrap
                            text-[9px]
                            font-medium
                            leading-none
                            text-[#202A2A]

                            sm:text-[10px]
                          "
                        >
                          {item.label}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </section> */}
        </section>

      

        {/* =====================================================
            SERVICES SECTION
        ===================================================== */}

   <section
  aria-labelledby="services-heading"
  className="relative overflow-hidden bg-[#ffffff] py-8"
>
  {/* Soft background decoration */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute left-0 top-0 h-[280px] w-[280px] rounded-full bg-[#d7b174]/[0.04] blur-[90px]"
  />

  <div
    aria-hidden="true"
    className="pointer-events-none absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-[#073f40]/[0.035] blur-[100px]"
  />

  <div
    className="
      relative
      z-10
      mx-auto
      w-full
      max-w-[1180px]
      px-4
     lg:px-8 xl:px-0 sm:px-6
      
    "
  >
    {/* Section heading */}
    <motion.div
      initial={{
        opacity: 0,
        y: 24,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
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
        mb-[27px]
        flex
        flex-col
        gap-6
        sm:mb-[31px]
        sm:flex-row
        sm:items-center
        sm:justify-between
        lg:mb-[32px]
      "
    >
      <div className="max-w-[570px]">
        <span
          className="
            block
            text-[11px]
            font-bold
            uppercase
            leading-none
            tracking-[0.055em]
            text-[#c6964d]
            sm:text-[12px]
          "
        >
          Our Services
        </span>

        <h2
          id="services-heading"
          className="
            mt-[12px]
            font-serif
            text-[26px]
            font-semibold
            leading-[1.12]
            tracking-[-0.025em]
            text-[#173c3d]
            sm:text-[30px]
            lg:text-[32px]
          "
        >
          Elevate Your Academic Success
        </h2>

        <p
          className="
            mt-[10px]
            max-w-[510px]
            text-[12px]
            font-normal
            leading-[1.65]
            text-[#5d676b]
            sm:text-[13px]
            lg:text-[13.5px]
          "
        >
          Comprehensive services designed to support your research journey
          <br className="hidden sm:block" />
          from idea to publication.
        </p>
      </div>

      <Link
        to="/services"
        aria-label="View all services"
        className="
          group/view-all
          relative
          inline-flex
          h-[44px]
          w-full
          shrink-0
          items-center
          justify-between
          overflow-hidden
          rounded-[7px]
          bg-[#063f40]
          px-[22px]
          text-[13px]
          font-semibold
          text-white
          shadow-[0_8px_22px_rgba(6,63,64,0.17)]
          transition-all
          duration-300
          hover:-translate-y-[3px]
          hover:bg-[#0a5051]
          hover:shadow-[0_14px_30px_rgba(6,63,64,0.25)]
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#c6964d]
          focus-visible:ring-offset-3
          sm:w-[178px]
          lg:h-[44px]
          lg:w-[188px]
        "
      >
        <span
          aria-hidden="true"
          className="
            absolute
            inset-y-0
            left-[-70%]
            w-[60%]
            -skew-x-12
            bg-white/10
            transition-all
            duration-700
            group-hover/view-all:left-[120%]
          "
        />

        <span className="relative z-10">View All Services</span>

        <ArrowRight
          size={16}
          strokeWidth={1.7}
          className="
            relative
            z-10
            transition-transform
            duration-300
            group-hover/view-all:translate-x-1
          "
        />
      </Link>
    </motion.div>

    {/* Services grid */}
    <div
      className="
        grid
        grid-cols-1
        gap-[10px]
        min-[480px]:grid-cols-2
        md:grid-cols-3
        min-[1100px]:grid-cols-5
        min-[1100px]:gap-[10px]
      "
    >
      {SERVICES.map((service, index) => {
        const Icon = service.icon;

        return (
          <motion.article
            key={service.title}
            initial={{
              opacity: 0,
              y: 32,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
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
              group/card
              relative
              flex
              min-h-[290px]
              flex-col
              overflow-hidden
              rounded-[8px]
              border
              border-[#e4e9e7]
              bg-white
              px-[22px]
              pb-[20px]
              pt-[18px]
              shadow-[0_5px_18px_rgba(17,55,56,0.055)]
              transition-[border-color,box-shadow]
              duration-300
              hover:border-[#c8d5d1]
              hover:shadow-[0_18px_40px_rgba(7,63,64,0.13)]
              sm:min-h-[300px]
              min-[1100px]:min-h-[245px]
              min-[1100px]:px-[22px]
              min-[1100px]:pb-[19px]
              min-[1100px]:pt-[17px]
            "
          >
            {/* Card hover background */}
            <span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
                bg-[linear-gradient(145deg,rgba(7,63,64,0.045),rgba(255,255,255,0)_58%)]
                opacity-0
                transition-opacity
                duration-300
                group-hover/card:opacity-100
              "
            />

            {/* Top decorative glow */}
            <span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-10
                -top-12
                h-28
                w-28
                scale-50
                rounded-full
                bg-[#c6964d]/10
                opacity-0
                blur-2xl
                transition-all
                duration-500
                group-hover/card:scale-100
                group-hover/card:opacity-100
              "
            />

            {/* Icon */}
            <div
              className="
                relative
                z-10
                flex
                h-[51px]
                w-[51px]
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#eff1f1]
                text-[#123d3e]
                transition-all
                duration-300
                group-hover/card:rotate-[-4deg]
                group-hover/card:scale-[1.06]
                group-hover/card:bg-[#073f40]
                group-hover/card:text-white
                group-hover/card:shadow-[0_9px_20px_rgba(7,63,64,0.22)]
              "
            >
              <Icon
                size={25}
                strokeWidth={1.65}
                className="transition-transform duration-300 group-hover/card:scale-[1.03]"
              />
            </div>

            {/* Title */}
            <h3
              className="
                relative
                z-10
                mt-[17px]
                min-h-[36px]
                text-[14px]
                font-semibold
                leading-[1.42]
                tracking-[-0.012em]
                text-[#153c3d]
                sm:text-[14.5px]
                min-[1100px]:text-[14px]
              "
            >
              {service.title}
            </h3>

            {/* Description */}
            <p
              className="
                relative
                z-10
                mt-[1px]
                flex-1
                text-[11.5px]
                font-normal
                leading-[1.78]
                text-[#5d656a]
                sm:text-[12px]
                min-[1100px]:text-[12.5px]
              "
            >
              {service.description}
            </p>

            {/* Learn more */}
            {/* <Link
              to={service.to}
              aria-label={`Learn more about ${service.title}`}
              className="
                group/link
                relative
                z-10
                mt-[19px]
                inline-flex
                w-fit
                items-center
                gap-[14px]
                text-[11.5px]
                font-semibold
                text-[#153c3d]
                transition-colors
                duration-300
                hover:text-[#b8843f]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#c6964d]
                focus-visible:ring-offset-3
              "
            >
              <span className="relative">
                Learn More

                <span
                  aria-hidden="true"
                  className="
                    absolute
                    -bottom-[3px]
                    left-0
                    h-px
                    w-0
                    bg-[#c6964d]
                    transition-all
                    duration-300
                    group-hover/link:w-full
                  "
                />
              </span>

              <ArrowRight
                size={15}
                strokeWidth={1.8}
                className="
                  transition-transform
                  duration-300
                  group-hover/link:translate-x-[5px]
                "
              />
            </Link> */}

            {/* Bottom hover line */}
            <span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                bottom-0
                left-1/2
                h-[3px]
                w-0
                -translate-x-1/2
                rounded-t-full
                bg-[#c6964d]
                transition-all
                duration-500
                group-hover/card:w-full
              "
            />
          </motion.article>
        );
      })}
    </div>
  </div>
</section>

        {/* =====================================================
            LATEST JOURNALS SECTION
        ===================================================== */}

      <section
  aria-labelledby="latest-journals-heading"
  className="
    relative
    overflow-hidden
    bg-white
    py-[42px]
    sm:py-[48px]
    lg:py-[52px]
  "
>
  <div
    aria-hidden="true"
    className="
      pointer-events-none
      absolute
      left-1/2
      top-0
      h-[260px]
      w-[800px]
      -translate-x-1/2
      rounded-full
      bg-[#073F40]/[0.018]
      blur-[90px]
    "
  />

  <div
    className="
      relative
      z-10
      mx-auto
      w-full
      max-w-[1180px]
      px-4
      sm:px-6
      lg:px-4
    
    "
  >
    {/* Heading */}
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
        amount: 0.3,
      }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        mb-[24px]
        flex
        items-end
        justify-between
        gap-5
        sm:mb-[27px]
      "
    >
      <div>
        <h2
          id="latest-journals-heading"
          className="
            font-serif
            text-[23px]
            font-semibold
            leading-[1.15]
            tracking-[-0.025em]
            text-[#173C3D]
            sm:text-[25px]
            lg:text-[26px]
          "
        >
          Latest Additions
        </h2>

        <p
          className="
            mt-[7px]
            text-[12px]
            leading-[1.55]
            text-[#616A6D]
            sm:text-[13px]
          "
        >
          Discover the newest entries in our Latest Additions section!
        </p>
      </div>

      <Link
        to="/journals"
        className="
          group/view-all
          hidden
          shrink-0
          items-center
          gap-[14px]
          whitespace-nowrap
          text-[12px]
          font-semibold
          text-[#153D3E]
          transition-colors
          duration-300
          hover:text-[#C18D43]
          sm:inline-flex
          sm:text-[13px]
        "
      >
        View all journals

        <ArrowRight
          size={15}
          strokeWidth={1.8}
          className="
            transition-transform
            duration-300
            group-hover/view-all:translate-x-[5px]
          "
        />
      </Link>
    </motion.div>

    {/* Carousel */}
    <div className="relative">
      {/* Desktop previous button */}
      {totalJournalPages > 1 && (
        <motion.button
          type="button"
          onClick={showPreviousJournals}
          aria-label="Show previous journals"
         
          className="
            absolute
            -left-[22px]
            top-[39%]
            z-30
            hidden
            h-[43px]
            w-[43px]
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-[#E2E7E5]
            bg-white
            text-[#476062]
            shadow-[0_7px_22px_rgba(7,63,64,0.12)]
            transition-[background-color,border-color,color,box-shadow]
            duration-300
            hover:border-[#073F40]
            hover:bg-[#073F40]
            hover:text-white
            hover:shadow-[0_12px_28px_rgba(7,63,64,0.2)]
            min-[1100px]:flex
          "
        >
          <ChevronLeft size={21} strokeWidth={1.7} />
        </motion.button>
      )}

      <div className="overflow-hidden px-[1px]">
       <AnimatePresence mode="wait" initial={false}>
         <motion.div
  key={`${journalPage}-${itemsPerPage}`}
  initial={{
    opacity: 0,
    x: slideDirection === 1 ? 45 : -45,
  }}
  animate={{
    opacity: 1,
    x: 0,
  }}
  exit={{
    opacity: 0,
    x: slideDirection === 1 ? -45 : 45,
  }}
            transition={{
              duration: 0.42,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              grid
              grid-cols-1
              gap-x-[10px]
              gap-y-9
              min-[430px]:grid-cols-2
              sm:grid-cols-3
              md:grid-cols-4
              min-[1100px]:grid-cols-5
              min-[1100px]:gap-x-[10px]
            "
          >
            {visibleJournals.map((journal, index) => (
              <motion.article
                key={journal.id}
                initial={{
                  opacity: 0,
                  y: 24,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.48,
                  delay: index * 0.065,
                  ease: [0.22, 1, 0.36, 1],
                }}
               
                className="
                  group/journal
                  mx-auto
                  w-full
                  max-w-[220px]
                  min-w-0
                  sm:max-w-none
                "
              >
                {/* <Link
                  to={`/journal-detail/${journal.slug}`}
                  aria-label={`View ${journal.title}`}
                  className="
                    block
                    rounded-[5px]
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#C6974D]
                    focus-visible:ring-offset-4
                  "
                > */}
                  {/* Journal image */}
                  <div
                    className="
                      relative
                      mx-auto
                      aspect-[0.89/1]
                      w-full
                      max-w-[170px]
                      overflow-hidden
                      rounded-[3px]
                      border
                      border-[#E4E8E6]
                      bg-[#F2F4F3]
                      shadow-[0_7px_19px_rgba(7,63,64,0.08)]
                      transition-all
                      duration-500
                      group-hover/journal:border-[#CBD6D2]
                      group-hover/journal:shadow-[0_19px_38px_rgba(7,63,64,0.17)]
                      min-[1100px]:max-w-[168px]
                      xl:max-w-[195px]
                    "
                  >
                    {!failedImages[journal.id] ? (
                      <img
                        src={journal.image}
                        alt={`${journal.title} journal cover`}
                        loading="lazy"
                        draggable={false}
                        onError={() => handleImageError(journal.id)}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-700
                          ease-out
                          group-hover/journal:scale-[1.045]
                        "
                      />
                    ) : (
                      <div
                        className={`
                          flex
                          h-full
                          flex-col
                          justify-between
                          bg-gradient-to-br
                          ${journal.fallback}
                          p-4
                          text-white
                        `}
                      >
                       

                        <h3
                          className="
                            font-serif
                            text-[16px]
                            font-semibold
                            leading-[1.2]
                          "
                        >
                          {journal.title}
                        </h3>

                        <span className="text-[8px] text-white/80">
                          ISSN: {journal.issn}
                        </span>
                      </div>
                    )}

                    {/* Hover overlay */}
                    

                    {/* Shine animation */}
                    <span
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        inset-y-0
                        left-[-85%]
                        w-[55%]
                        -skew-x-12
                        bg-white/10
                        transition-all
                        duration-700
                        group-hover/journal:left-[130%]
                      "
                    />
                  </div>

                  {/* Journal title */}
                  <h3
                    className="
                      mx-auto
                      mt-[12px]
                      min-h-[57px]
                      max-w-[175px]
                      text-[12px]
                      font-semibold
                      leading-[1.42]
                      tracking-[-0.01em]
                      text-[#173C3D]
                      transition-colors
                      duration-300
                      
                      sm:text-[13px]
                    "
                  >
                    {journal.title}
                  </h3>

                  {/* ISSN */}
                  <p
                    className="
                      mx-auto
                      mt-[7px]
                      
                      max-w-[175px]
                      text-[10px]
                      leading-[1.3]
                      text-[#343738]
                      sm:text-[11.5px]
                    "
                  >
                    ISSN: {journal.issn}
                  </p>

                  {/* Index badge */}
                  <div className="mx-auto mt-[9px] max-w-[175px]">
                    <span
                      className="
                        inline-flex
                        min-h-[21px]
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#D9DEDC]
                        bg-[#ECEFEE]
                        px-[10px]
                        py-[4px]
                        text-[10px]
                        font-medium
                        leading-none
                        text-[#3b4242]
                        transition-all
                        duration-300
                       
                      "
                    >
                      {journal.index}
                    </span>
                  </div>
                {/* </Link> */}
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Desktop next button */}
      {totalJournalPages > 1 && (
        <motion.button
          type="button"
          onClick={showNextJournals}
          aria-label="Show next journals"
          whileHover={{
            scale: 1.08,
          }}
          whileTap={{
            scale: 0.92,
          }}
          className="
            absolute
            -right-[22px]
            top-[39%]
            z-30
            hidden
            h-[43px]
            w-[43px]
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-[#E2E7E5]
            bg-white
            text-[#476062]
            shadow-[0_7px_22px_rgba(7,63,64,0.12)]
            transition-[background-color,border-color,color,box-shadow]
            duration-300
            hover:border-[#073F40]
            hover:bg-[#073F40]
            hover:text-white
            hover:shadow-[0_12px_28px_rgba(7,63,64,0.2)]
            min-[1100px]:flex
          "
        >
          <ChevronRight size={21} strokeWidth={1.7} />
        </motion.button>
      )}
    </div>

    {/* Mobile and tablet controls */}
    {totalJournalPages > 1 && (
      <div
        className="
          mt-8
          flex
          items-center
          justify-between
          min-[1100px]:hidden
        "
      >
        <motion.button
          type="button"
          onClick={showPreviousJournals}
          aria-label="Show previous journals"
          whileTap={{
            scale: 0.9,
          }}
          className="
            flex
            h-[42px]
            w-[42px]
            items-center
            justify-center
            rounded-full
            border
            border-[#DFE4E2]
            bg-white
            text-[#153D3E]
            shadow-[0_6px_18px_rgba(7,63,64,0.09)]
            transition-colors
            duration-300
            hover:border-[#073F40]
            hover:bg-[#073F40]
            hover:text-white
          "
        >
          <ChevronLeft size={20} strokeWidth={1.7} />
        </motion.button>

        <Link
          to="/journals"
          className="
            inline-flex
            items-center
            gap-2
            text-[10px]
            font-semibold
            text-[#153D3E]
            transition-colors
            hover:text-[#C18D43]
            sm:hidden
          "
        >
          View all journals
          <ArrowRight size={14} />
        </Link>

        <motion.button
          type="button"
          onClick={showNextJournals}
          aria-label="Show next journals"
          whileTap={{
            scale: 0.9,
          }}
          className="
            flex
            h-[42px]
            w-[42px]
            items-center
            justify-center
            rounded-full
            border
            border-[#DFE4E2]
            bg-white
            text-[#153D3E]
            shadow-[0_6px_18px_rgba(7,63,64,0.09)]
            transition-colors
            duration-300
            hover:border-[#073F40]
            hover:bg-[#073F40]
            hover:text-white
          "
        >
          <ChevronRight size={20} strokeWidth={1.7} />
        </motion.button>
      </div>
    )}

    {/* Pagination lines */}
    {totalJournalPages > 1 && (
      <div
        className="
          mt-[22px]
          flex
          items-center
          justify-center
          gap-[14px]
        "
      >
        {Array.from({
          length: totalJournalPages,
        }).map((_, index) => (
          <motion.button
            key={index}
            type="button"
            onClick={() => showJournalPage(index)}
            aria-label={`Show journal group ${index + 1}`}
            aria-current={
              journalPage === index ? "page" : undefined
            }
            whileHover={{
              scale: 1.08,
            }}
            whileTap={{
              scale: 0.92,
            }}
            className={`
              h-[4px]
              rounded-full
              transition-all
              duration-300

              ${
                journalPage === index
                  ? "w-[15px] bg-[#073F40]"
                  : "w-[15px] bg-[#C6CCCA] hover:bg-[#889592]"
              }
            `}
          />
        ))}
      </div>
    )}
  </div>
</section>
    

        {/* =====================================================
            FINAL CTA SECTION
        ===================================================== */}

       <section
  aria-labelledby="publish-cta-heading"
  className="
    mx-auto
    w-full
    max-w-[1180px]
    px-4
    pb-10
    pt-2
    sm:px-6
    lg:px-6
   
  "
>
  <motion.div
    initial={{
      
      y: 26,
      scale: 0.985,
    }}
    whileInView={{
      
      y: 0,
      scale: 1,
    }}
    viewport={{
      once: true,
      amount: 0.3,
    }}
    transition={{
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    }}
    whileHover={{
      y: -3,
    }}
    className="
      group/cta
      relative
      min-h-[104px]
      overflow-hidden
      rounded-[13px]
      bg-[#073F40]
     

      sm:min-h-[112px]

      lg:min-h-[144px]
    "
  >
    {/* Full background image */}
    <motion.div
      aria-hidden="true"
      initial={{
        scale: 1.03,
      }}
      whileInView={{
        scale: 1,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        absolute
        inset-0
        bg-cover
        bg-center
        bg-no-repeat
        transition-transform
        duration-700
        group-hover/cta:scale-[1.025]

        sm:bg-[center_center]

        lg:bg-[center_center]
      "
      style={{
        backgroundImage: `url(${ctaBackground})`,
      }}
    />

    {/* Mobile readability overlay */}
    <div
      aria-hidden="true"
      className="
        absolute
        inset-0
        
      "
    />

    {/* Hover shine */}
    <span
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-y-0
        left-[-35%]
        w-[22%]
        -skew-x-12
        bg-white/[0.055]
        transition-transform
        duration-1000
        group-hover/cta:translate-x-[650%]
      "
    />

<div
  className="
    relative
    z-10
    flex
    min-h-[144px]
    items-center
    justify-between
    px-6

    sm:px-8

    lg:px-[56px]
  "
>
<div className="w-[250px] shrink-0">
  <motion.h2
    id="publish-cta-heading"
    initial={{ opacity: 0, x: -25 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="
      font-serif
      text-[24px]
      font-medium
      leading-[1.29]
      tracking-[-0.02em]
      text-white

      lg:text-[27px]
    "
  >
    Ready to Publish
    <br />
    Your Research?
  </motion.h2>
</div>

      {/* Description */}
     <div
  className="
    ml-8
    flex
    h-[58px]
    w-[260px]
    items-center
    border-l
    border-white/20
    pl-7
  "
>
  <motion.p
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay: 0.15 }}
    className="
      text-[12px]
      leading-[1.7]
      text-white/85
    "
  >
    Join thousands of researchers
    <br />
    who trust Pure Publications for
    <br />
    their academic journey.
  </motion.p>
</div>

      {/* Button */}
     <div className="ml-auto pr-[280px]">
  <motion.div
    initial={{ opacity: 0, x: 25 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.25 }}
  >
    <Link
      to="/submit-paper"
      className="
        group
        inline-flex
        h-[40px]
        items-center
        gap-3
        rounded-[6px]
        bg-[#D4A257]
        px-4
        text-[12.5px]
        font-semibold
        text-white
        hover:text-[#073F40]
        transition-all
        duration-300

        hover:-translate-y-[2px]
        hover:bg-[#E2B468]
      "
    >
      Submit Your Paper

      <ArrowRight
        size={15}
        className="
          transition-transform
          duration-300
          group-hover:translate-x-1
        "
      />
    </Link>
  </motion.div>
</div>
    </div>
  </motion.div>
</section>
      </main>
    </>
  );
}