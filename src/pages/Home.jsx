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

import heroBackground from "../assets/hero-bg.png";

const BRAND = {
  dark: "#073F40",
  darker: "#053536",
  gold: "#D4A257",
  soft: "#F6F8F7",
};

const TOP_STATS = [
  { icon: BookOpen, value: 25, suffix: "+", label: "Journals" },
  { icon: FileText, value: 15000, suffix: "+", label: "Published Articles" },
  { icon: Globe2, value: 120, suffix: "+", label: "Countries" },
  { icon: Users, value: 10000, suffix: "+", label: "Active Authors" },
  { icon: Award, value: 98, suffix: "%", label: "Author Satisfaction" },
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

function StatItem({ item, dark = false, compact = false }) {
  const Icon = item.icon;

  return (
    <div
      className={[
        "group flex items-center",
        compact ? "gap-3" : "flex-col justify-center text-center",
      ].join(" ")}
    >
      <span
        className={[
          "flex shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:-translate-y-1",
          compact ? "h-11 w-11" : "mb-3 h-12 w-12",
          dark
            ? "bg-white/8 text-[#D4A257]"
            : "bg-[#EEF1F0] text-[#073F40]",
        ].join(" ")}
      >
        <Icon size={compact ? 19 : 21} strokeWidth={1.7} />
      </span>

      <span className={compact ? "" : "block"}>
        <span
          className={[
            "block font-serif font-semibold leading-none",
            compact ? "text-[21px]" : "text-[25px]",
            dark ? "text-white" : "text-[#102E2F]",
          ].join(" ")}
        >
          <CountUp end={item.value} />
          {item.suffix}
        </span>

        <span
          className={[
            "mt-1.5 block whitespace-nowrap text-[10px]",
            dark ? "text-white/72" : "text-slate-600",
          ].join(" ")}
        >
          {item.label}
        </span>
      </span>
    </div>
  );
}

function ServiceCard({ item, index }) {
  const Icon = item.icon;

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.52, delay: index * 0.07 }}
      whileHover={{ y: -8 }}
      className="group flex min-h-[238px] flex-col rounded-[10px] border border-slate-200/90 bg-white p-5 shadow-[0_8px_30px_rgba(7,63,64,.055)] transition-shadow duration-300 hover:shadow-[0_18px_45px_rgba(7,63,64,.12)]"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EEF1F0] text-[#073F40] transition-all duration-300 group-hover:rotate-3 group-hover:bg-[#073F40] group-hover:text-[#D4A257]">
        <Icon size={20} strokeWidth={1.7} />
      </span>

      <h3 className="mt-5 font-serif text-[15px] font-semibold leading-5 text-[#153D3E]">
        {item.title}
      </h3>

      <p className="mt-3 flex-1 text-[11px] leading-[1.75] text-slate-600">
        {item.description}
      </p>

      <Link
        to={item.to}
        className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold text-[#073F40]"
      >
        Learn More
        <ArrowRight
          size={13}
          className="transition-transform duration-300 group-hover:translate-x-1.5"
        />
      </Link>
    </motion.article>
  );
}

function JournalCard({ journal }) {
  const [failed, setFailed] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      className="group min-w-0"
    >
      <Link to={`/journals/${journal.id}`} className="block">
        <div className="aspect-[.72/1] overflow-hidden rounded-[3px] bg-gradient-to-br from-[#0A4A4B] to-[#D4A257] shadow-[0_10px_25px_rgba(7,63,64,.12)]">
          {!failed ? (
            <img
              src={journal.image}
              alt={`${journal.title} journal cover`}
              loading="lazy"
              onError={() => setFailed(true)}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.045]"
            />
          ) : (
            <div className="flex h-full flex-col justify-between p-5 text-white">
              <span className="text-[10px] uppercase tracking-[.25em] text-white/70">
                Pure Publications
              </span>
              <h3 className="font-serif text-xl leading-tight">{journal.title}</h3>
              <span className="text-[10px]">ISSN {journal.issn}</span>
            </div>
          )}
        </div>

        <h3 className="mt-3 min-h-[38px] line-clamp-2 text-[11px] font-semibold leading-[1.55] text-[#153D3E]">
          {journal.title}
        </h3>

        <p className="mt-1 text-[9px] text-slate-500">ISSN: {journal.issn}</p>

        <span className="mt-2 inline-flex rounded-full bg-[#F0F2F1] px-2.5 py-1 text-[8px] text-slate-600">
          {journal.index}
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
        {/* HERO */}
        <section className="relative bg-[linear-gradient(90deg,#fff_0%,#fff_48%,#F7F7F5_100%)]">
          <div className="mx-auto grid min-h-[430px] max-w-[1180px] items-center gap-7 px-5 pb-16 pt-12 sm:px-8 lg:grid-cols-[44%_56%] lg:px-10 lg:pb-20 lg:pt-10">
            <motion.div
              initial={{ opacity: 0, x: -38 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="relative z-10 max-w-[440px]"
            >
              <h1 className="font-serif text-[42px] font-medium leading-[.98] tracking-[-.035em] text-[#123839] sm:text-[54px] lg:text-[58px]">
                Where Your
                <br />
                Research Meets
                <br />
                <span className="text-[#D4A257]">Recognition</span>
              </h1>

              <p className="mt-5 max-w-[360px] text-[12px] leading-5 text-slate-600 sm:text-[13px]">
                Your dedicated partner in academic excellence
                <br className="hidden sm:block" /> and professional writing.
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <ActionButton to="/services">Explore Services</ActionButton>
                <ActionButton to="/submit-paper" light>
                  Submit Your Paper
                </ActionButton>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 38, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.85, ease: "easeOut" }}
              className="relative h-[300px] overflow-hidden rounded-tl-[62px] rounded-br-[58px] sm:h-[390px] lg:h-[430px]"
            >
              <img
                src={heroBackground}
                alt="Academic books, research laptop and scholarly publishing icons"
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-black/10" />
            </motion.div>
          </div>

          {/* FLOATING TOP STATS */}
          <div className="relative z-20 mx-auto -mt-12 max-w-[1010px] px-5 sm:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="grid grid-cols-2 gap-x-4 gap-y-6 rounded-[12px] border border-slate-200 bg-white px-5 py-5 shadow-[0_15px_40px_rgba(7,63,64,.12)] sm:grid-cols-3 lg:grid-cols-5 lg:px-8"
            >
              {TOP_STATS.map((item) => (
                <StatItem key={item.label} item={item} compact />
              ))}
            </motion.div>
          </div>
        </section>

        {/* INDEXING */}
        <section className="mx-auto max-w-[1080px] px-5 pt-5 sm:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55 }}
            className="flex flex-wrap items-center justify-center gap-x-7 gap-y-4 rounded-[11px] bg-[#073F40] px-5 py-4 text-white shadow-[0_12px_28px_rgba(7,63,64,.18)] lg:justify-between"
          >
            <span className="text-[10px] font-semibold text-[#D4A257]">
              Trusted & Indexed By
            </span>

            <span className="inline-flex items-center gap-2 text-[13px] font-semibold">
              <span className="h-0 w-0 border-b-[7px] border-l-[12px] border-t-[7px] border-b-transparent border-l-[#F2B84B] border-t-transparent" />
              Crossref
            </span>

            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[11px] font-bold text-[#073F40]">
              DOI
            </span>

            <span className="text-center leading-3">
              <b className="block text-[13px]">Google</b>
              <span className="text-[8px]">Scholar</span>
            </span>

            <span className="text-center text-[9px] font-semibold leading-3">
              OPEN
              <br />
              ACCESS
            </span>

            <span className="text-[17px] font-medium tracking-tight">ORCID</span>
            <span className="text-[16px]">Scopus</span>
            <span className="text-[15px] font-bold">ISI</span>

            <Link
              to="/indexing"
              aria-label="View indexing information"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D4A257] text-[#D4A257] transition-all hover:rotate-[-8deg] hover:bg-[#D4A257] hover:text-[#073F40]"
            >
              <ArrowRight size={15} />
            </Link>
          </motion.div>
        </section>

        {/* SERVICES */}
        <section className="mx-auto max-w-[1080px] px-5 py-11 sm:px-8 lg:py-14">
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-[9px] font-semibold uppercase tracking-wide text-[#D4A257]">
                Our Services
              </span>
              <h2 className="mt-2 font-serif text-[25px] font-semibold text-[#153D3E]">
                Elevate Your Academic Success
              </h2>
              <p className="mt-2 max-w-[420px] text-[10px] leading-[1.65] text-slate-600">
                Comprehensive services designed to support your research journey
                from idea to publication.
              </p>
            </div>

            <ActionButton
              to="/services"
              className="self-start px-6 sm:self-auto"
            >
              View All Services
            </ActionButton>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {SERVICES.map((item, index) => (
              <ServiceCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </section>

        {/* JOURNALS */}
        <section className="mx-auto max-w-[1080px] px-5 pb-10 sm:px-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-[22px] font-semibold text-[#153D3E]">
                Latest Additions
              </h2>
              <p className="mt-1.5 text-[9px] text-slate-600">
                Discover the newest entries in our Latest Additions section!
              </p>
            </div>

            <Link
              to="/journals"
              className="group hidden items-center gap-2 text-[10px] font-semibold text-[#073F40] sm:flex"
            >
              View all journals
              <ArrowRight
                size={13}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={previous}
              aria-label="Previous journals"
              className="absolute -left-4 top-[40%] z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-[#073F40] shadow-md transition hover:scale-105 hover:bg-[#073F40] hover:text-white lg:flex"
            >
              <ChevronLeft size={18} />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{ opacity: 0, x: 26 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -26 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5"
              >
                {visibleJournals.map((journal) => (
                  <JournalCard key={journal.id} journal={journal} />
                ))}
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={next}
              aria-label="Next journals"
              className="absolute -right-4 top-[40%] z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-[#073F40] shadow-md transition hover:scale-105 hover:bg-[#073F40] hover:text-white lg:flex"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="mt-5 flex justify-center gap-2">
            {Array.from({ length: maxPage + 1 }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setPage(index)}
                aria-label={`Show journal group ${index + 1}`}
                className={[
                  "h-1.5 rounded-full transition-all duration-300",
                  page === index
                    ? "w-7 bg-[#073F40]"
                    : "w-4 bg-slate-300 hover:bg-slate-400",
                ].join(" ")}
              />
            ))}
          </div>
        </section>

        {/* DARK STATS */}
        <section className="mx-auto max-w-[1100px] px-5 pb-3 sm:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="grid grid-cols-2 gap-7 rounded-[16px] bg-[#073F40] px-5 py-6 shadow-[0_16px_35px_rgba(7,63,64,.18)] sm:grid-cols-3 lg:grid-cols-6"
          >
            {BOTTOM_STATS.map((item) => (
              <StatItem key={item.label} item={item} dark />
            ))}
          </motion.div>
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