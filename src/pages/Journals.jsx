import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BookOpen,
  Bookmark,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  Filter,
  Globe2,
  Grid2X2,
  List,
  Loader2,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Users,
  X,
} from "lucide-react";

import Seo from "../components/Seo";
import { getJournals } from "../services/journalService";

import journalsHero from "../assets/images/journal_bg.png";
import recommendationIcon from "../assets/images/journalcta.png";

/* =========================================================
   FALLBACK JOURNAL DATA
========================================================= */

const FALLBACK_JOURNALS = [
  {
    id: "genetics-molecular-research",
    title: "Genetics and Molecular Research",
    shortTitle: "Genetics & Molecular Research",
    coverTitle: "Genetics\nMolecular\nResearch",
    coverTheme: "from-[#063f45] via-[#0a5e62] to-[#031f25]",
    accent: "#8ad8c7",
    description:
      "Publishes high-quality research on all aspects of genetics and molecular biology, including genomics, proteomics, and bioinformatics.",
    category: "Medical & Health Sciences",
    frequency: "Quarterly",
    issn: "1676-5680",
    indexing: ["Scopus", "DOAJ"],
    access: "Open Access",
    impactFactor: "1.672",
  },
  {
    id: "aquatic-research",
    title:
      "International Journal of Aquatic Research and Environmental Studies",
    shortTitle:
      "International Journal of Aquatic Research and Environmental Studies",
    coverTitle: "Aquatic\nResearch",
    coverTheme: "from-[#d8f6fb] via-[#67bfd4] to-[#17678c]",
    accent: "#ffffff",
    description:
      "Focuses on aquatic ecosystems, water quality, marine biology, and environmental protection strategies.",
    category: "Agriculture & Environmental",
    frequency: "Quarterly",
    issn: "2980-7840",
    indexing: ["Scopus", "Google Scholar"],
    access: "Open Access",
    impactFactor: "1.842",
  },
  {
    id: "special-education",
    title: "International Journal of Special Education",
    shortTitle: "International Journal of Special Education",
    coverTitle: "Special\nEducation",
    coverTheme: "from-[#ffffff] via-[#f3e9ff] to-[#b47ae5]",
    accent: "#5e2584",
    description:
      "Covers innovative practices, inclusive education, learning disabilities, and special needs education.",
    category: "Social Sciences",
    frequency: "Quarterly",
    issn: "0827-3383",
    indexing: ["Scopus", "DOAJ"],
    access: "Open Access",
    impactFactor: "1.256",
  },
  {
    id: "environmental-research",
    title: "Journal of Environmental Research",
    shortTitle: "Journal of Environmental Research",
    coverTitle: "Environmental\nResearch",
    coverTheme: "from-[#174c43] via-[#326f56] to-[#b5aa63]",
    accent: "#ffffff",
    description:
      "Publishes cutting-edge research on environmental science, sustainability, climate change, and ecological studies.",
    category: "Agriculture & Environmental",
    frequency: "Semi-Annual",
    issn: "1234-5678",
    indexing: ["Scopus", "Google Scholar"],
    access: "Open Access",
    impactFactor: "1.934",
  },
  {
    id: "advanced-pharmaceutical-sciences",
    title: "Journal of Advanced Pharmaceutical Sciences",
    shortTitle: "Journal of Advanced Pharmaceutical Sciences",
    coverTitle: "Advanced\nPharmaceutical\nSciences",
    coverTheme: "from-[#ffd7aa] via-[#f47c35] to-[#a9361f]",
    accent: "#ffffff",
    description:
      "Focuses on pharmaceutical research, drug discovery, pharmacology, and biotechnology.",
    category: "Medical & Health Sciences",
    frequency: "Quarterly",
    issn: "2145-6789",
    indexing: ["Scopus", "DOAJ"],
    access: "Open Access",
    impactFactor: "1.487",
  },
  {
    id: "engineering-innovations",
    title: "Journal of Engineering Innovations",
    shortTitle: "Journal of Engineering Innovations",
    coverTitle: "Engineering\nInnovations",
    coverTheme: "from-[#0b2159] via-[#064c7c] to-[#12a6b5]",
    accent: "#ffffff",
    description:
      "Publishes innovative research in all fields of engineering and applied sciences.",
    category: "Engineering & Technology",
    frequency: "Monthly",
    issn: "2455-2185",
    indexing: ["Scopus", "DOAJ"],
    access: "Open Access",
    impactFactor: "1.215",
  },
  {
    id: "computer-science-applications",
    title: "International Journal of Computer Science Applications",
    shortTitle: "International Journal of Computer Science Applications",
    coverTitle: "Computer\nScience\nApplications",
    coverTheme: "from-[#0c1f42] via-[#244a87] to-[#57a4d8]",
    accent: "#ffffff",
    description:
      "Research covering artificial intelligence, software engineering, cybersecurity, and information systems.",
    category: "Computer Science",
    frequency: "Monthly",
    issn: "2250-3765",
    indexing: ["Scopus", "Web of Science"],
    access: "Subscription",
    impactFactor: "1.624",
  },
  {
    id: "business-management",
    title: "Journal of Business and Management Studies",
    shortTitle: "Journal of Business and Management Studies",
    coverTitle: "Business &\nManagement",
    coverTheme: "from-[#4a180c] via-[#9c3d22] to-[#d18f50]",
    accent: "#ffffff",
    description:
      "Publishes scholarly research in management, finance, marketing, economics, and business strategy.",
    category: "Management & Economics",
    frequency: "Bi-Monthly",
    issn: "2788-1210",
    indexing: ["Google Scholar", "Crossref"],
    access: "Open Access",
    impactFactor: "1.398",
  },
  {
    id: "law-humanities",
    title: "International Journal of Law and Humanities",
    shortTitle: "International Journal of Law and Humanities",
    coverTitle: "Law &\nHumanities",
    coverTheme: "from-[#131313] via-[#313131] to-[#8f753c]",
    accent: "#e8cd89",
    description:
      "A multidisciplinary journal covering legal studies, public policy, literature, history, and humanities.",
    category: "Law & Humanities",
    frequency: "Quarterly",
    issn: "2395-7788",
    indexing: ["Google Scholar", "Crossref"],
    access: "Open Access",
    impactFactor: "1.174",
  },
  {
    id: "social-science-research",
    title: "Journal of Social Science Research",
    shortTitle: "Journal of Social Science Research",
    coverTitle: "Social Science\nResearch",
    coverTheme: "from-[#321a5c] via-[#64439b] to-[#c899d9]",
    accent: "#ffffff",
    description:
      "Research addressing contemporary society, psychology, education, culture, and public administration.",
    category: "Social Sciences",
    frequency: "Quarterly",
    issn: "2312-4456",
    indexing: ["Scopus", "Google Scholar"],
    access: "Open Access",
    impactFactor: "1.309",
  },
  {
    id: "applied-sciences",
    title: "International Journal of Applied Sciences",
    shortTitle: "International Journal of Applied Sciences",
    coverTitle: "Applied\nSciences",
    coverTheme: "from-[#184352] via-[#417889] to-[#b5d2d6]",
    accent: "#ffffff",
    description:
      "Multidisciplinary research in physics, chemistry, material science, mathematics, and technology.",
    category: "Applied Sciences",
    frequency: "Monthly",
    issn: "2456-1010",
    indexing: ["Scopus", "DOAJ"],
    access: "Open Access",
    impactFactor: "1.563",
  },
  {
    id: "medical-research",
    title: "Journal of Clinical and Medical Research",
    shortTitle: "Journal of Clinical and Medical Research",
    coverTitle: "Clinical &\nMedical\nResearch",
    coverTheme: "from-[#761a20] via-[#b83c43] to-[#f7c0b8]",
    accent: "#ffffff",
    description:
      "Peer-reviewed clinical studies, medical innovations, public health research, and case reports.",
    category: "Medical & Health Sciences",
    frequency: "Monthly",
    issn: "2456-2020",
    indexing: ["Scopus", "DOAJ"],
    access: "Subscription",
    impactFactor: "1.719",
  },
];

/* =========================================================
   FILTER OPTIONS
========================================================= */

const SUBJECT_AREAS = [
  "All Subjects",
  "Engineering & Technology",
  "Computer Science",
  "Medical & Health Sciences",
  "Pharmacy",
  "Agriculture & Environmental",
  "Management & Economics",
  "Social Sciences",
  "Education",
  "Applied Sciences",
  "Law & Humanities",
];

const INDEXING_OPTIONS = [
  "Scopus",
  "Web of Science",
  "DOAJ",
  "Google Scholar",
  "Crossref",
];

const FREQUENCY_OPTIONS = [
  "All Frequency",
  "Monthly",
  "Quarterly",
  "Semi-Annual",
  "Annual",
];

const ACCESS_OPTIONS = ["All", "Open Access", "Subscription"];

const ITEMS_PER_PAGE = 6;

/* =========================================================
   PAGE COMPONENT
========================================================= */

export default function Journals() {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [subjectAreas, setSubjectAreas] = useState(["All Subjects"]);
  const [indexing, setIndexing] = useState([]);
  const [frequencies, setFrequencies] = useState(["All Frequency"]);
  const [accessTypes, setAccessTypes] = useState(["All"]);

  const [sortBy, setSortBy] = useState("latest");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState([]);

  /* =========================================================
     LOAD JOURNALS
  ========================================================= */

  useEffect(() => {
    let active = true;

    const loadJournals = async () => {
      setLoading(true);

      try {
        const response = await getJournals("All");

        const apiJournals = Array.isArray(response)
          ? response
          : response?.journals || response?.data || [];

        if (active) {
          setJournals(apiJournals.length ? apiJournals : FALLBACK_JOURNALS);
        }
      } catch (error) {
        if (active) {
          setJournals(FALLBACK_JOURNALS);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadJournals();

    return () => {
      active = false;
    };
  }, []);

  /* =========================================================
     FILTER HANDLERS
  ========================================================= */

  const handleMultiFilter = (value, selectedValues, setter, allValue) => {
    setCurrentPage(1);

    if (value === allValue) {
      setter([allValue]);
      return;
    }

    const withoutAll = selectedValues.filter((item) => item !== allValue);

    if (withoutAll.includes(value)) {
      const updated = withoutAll.filter((item) => item !== value);
      setter(updated.length ? updated : [allValue]);
    } else {
      setter([...withoutAll, value]);
    }
  };

  const resetFilters = () => {
    setSearch("");
    setSubjectAreas(["All Subjects"]);
    setIndexing([]);
    setFrequencies(["All Frequency"]);
    setAccessTypes(["All"]);
    setSortBy("latest");
    setCurrentPage(1);
  };

  const toggleBookmark = (journalId) => {
    setBookmarked((previous) =>
      previous.includes(journalId)
        ? previous.filter((id) => id !== journalId)
        : [...previous, journalId],
    );
  };

  /* =========================================================
     FILTERED AND SORTED JOURNALS
  ========================================================= */

  const filteredJournals = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    let result = journals.filter((journal) => {
      const title = journal.title || "";
      const description = journal.description || "";
      const issn = journal.issn || "";
      const category = journal.category || "";
      const frequency = journal.frequency || "";
      const access = journal.access || "Open Access";
      const journalIndexing = journal.indexing || [];

      const matchesSearch =
        !normalizedSearch ||
        title.toLowerCase().includes(normalizedSearch) ||
        description.toLowerCase().includes(normalizedSearch) ||
        issn.toLowerCase().includes(normalizedSearch) ||
        category.toLowerCase().includes(normalizedSearch);

      const matchesSubject =
        subjectAreas.includes("All Subjects") ||
        subjectAreas.includes(category);

      const matchesIndexing =
        indexing.length === 0 ||
        indexing.some((item) => journalIndexing.includes(item));

      const matchesFrequency =
        frequencies.includes("All Frequency") ||
        frequencies.includes(frequency);

      const matchesAccess =
        accessTypes.includes("All") || accessTypes.includes(access);

      return (
        matchesSearch &&
        matchesSubject &&
        matchesIndexing &&
        matchesFrequency &&
        matchesAccess
      );
    });

    if (sortBy === "title-asc") {
      result = [...result].sort((a, b) =>
        (a.title || "").localeCompare(b.title || ""),
      );
    }

    if (sortBy === "title-desc") {
      result = [...result].sort((a, b) =>
        (b.title || "").localeCompare(a.title || ""),
      );
    }

    if (sortBy === "impact-high") {
      result = [...result].sort(
        (a, b) =>
          Number.parseFloat(b.impactFactor || 0) -
          Number.parseFloat(a.impactFactor || 0),
      );
    }

    return result;
  }, [
    journals,
    search,
    subjectAreas,
    indexing,
    frequencies,
    accessTypes,
    sortBy,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredJournals.length / ITEMS_PER_PAGE),
  );

  const paginatedJournals = filteredJournals.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const showingStart =
    filteredJournals.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;

  const showingEnd = Math.min(
    currentPage * ITEMS_PER_PAGE,
    filteredJournals.length,
  );

  const hasActiveFilters =
    search.trim() ||
    !subjectAreas.includes("All Subjects") ||
    indexing.length > 0 ||
    !frequencies.includes("All Frequency") ||
    !accessTypes.includes("All");

  /* =========================================================
     ANIMATION SETTINGS
  ========================================================= */

  const containerAnimation = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.07,
      },
    },
  };

  const cardAnimation = {
    hidden: {
      opacity: 0,
      y: 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <Seo
        title="Academic Journals | Pure Publications"
        description="Explore peer-reviewed academic journals across engineering, medicine, computer science, social sciences, environmental studies, education, and more."
        path="/journals"
      />

      <main className="min-h-screen overflow-hidden bg-[#fbfcfc] text-[#173536]">
        {/* =====================================================
            HERO SECTION
        ===================================================== */}

        <section className="relative overflow-hidden border-t border-[#dce7e5] bg-white">
          <div className="mx-auto grid min-h-[390px] sm:min-h-[420px] lg:min-h-[470px] max-w-[1440px] lg:grid-cols-[47%_53%]">
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative z-10 flex items-center px-5 py-14 sm:pxFilter Journals-8 lg:px-14 xl:px-20"
            >
              <div className="max-w-[640px]">
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px w-8 bg-[#c4934d]" />
                  <span className="text-[11px] font-[600] uppercase tracking-[0.18em] text-[#bd8a43]">
                    Our Journals
                  </span>
                </div>

                <h1 className="font-serif font-semibold leading-[1.03] tracking-[-0.035em] text-[#073b3a]  text-[30px] sm:text-[38px] lg:text-[44px]">
                  Explore Our
                  <span className="mt-1 block text-[#bd8a43]">
                    Academic Journals
                  </span>
                </h1>

                <p className="mt-5 max-w-[570px] text-[14px] leading-6 text-[#526665] sm:text-[15px]">
                  Discover high-quality, peer-reviewed journals across multiple
                  disciplines and advance your research with global visibility.
                </p>

                <div className="mt-7 flex max-w-[470px] overflow-hidden rounded-md border border-[#b8cac7] bg-white shadow-[0_7px_22px_rgba(12,61,59,0.07)] transition focus-within:border-[#0a5451] focus-within:ring-4 focus-within:ring-[#0a5451]/10">
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search journals, ISSN, keywords..."
                    aria-label="Search academic journals"
                    className="min-w-0 flex-1 bg-transparent px-4 py-3 text-[13px] text-[#173536] outline-none placeholder:text-[#8b9998]"
                  />

                  <button
                    type="button"
                    aria-label="Search journals"
                    className="flex w-12 items-center justify-center bg-[#063e3c] text-white transition duration-300 hover:bg-[#bd8a43]"
                  >
                    <Search size={18} strokeWidth={2} />
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9 }}
              className="relative hidden min-h-[350px] overflow-hidden lg:block"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${journalsHero})`,
                }}
              />

              <div
                className="absolute inset-y-0 -left-1 w-[125px] bg-white"
                style={{
                  clipPath:
                    "polygon(0 0, 100% 0, 68% 18%, 49% 40%, 45% 61%, 58% 81%, 100% 100%, 0 100%)",
                }}
              />
            </motion.div>

            <div
              className="relative h-[270px] bg-cover bg-center lg:hidden"
              style={{
                backgroundImage: `url(${journalsHero})`,
              }}
            ></div>
          </div>
        </section>

        {/* =====================================================
            STATISTICS SECTION
        ===================================================== */}

        <section className="relative z-20 -mt-3 lg:-mt-8">
          <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-14 xl:px-20">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="grid overflow-hidden rounded-2xl border border-[#e2e9e7] bg-white shadow-[0_15px_45px_rgba(20,58,57,0.13)] sm:grid-cols-2 lg:grid-cols-5"
            >
              {[
                {
                  icon: BookOpen,
                  number: "25+",
                  label: "Journals",
                },
                {
                  icon: FileText,
                  number: "15,000+",
                  label: "Articles Published",
                },
                {
                  icon: Globe2,
                  number: "120+",
                  label: "Countries",
                },
                {
                  icon: Users,
                  number: "10,000+",
                  label: "Active Authors",
                },
                {
                  icon: Award,
                  number: "98%",
                  label: "Author Satisfaction",
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.label}
                    whileHover={{ y: -4, backgroundColor: "#fbf7f0" }}
                    className={`flex min-h-[105px] items-center gap-4 px-6 py-5 transition ${
                      index !== 4 ? "lg:border-r lg:border-[#e4ebe9]" : ""
                    }`}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eef4f2] text-[#0a4a47]">
                      <Icon size={22} strokeWidth={1.7} />
                    </div>

                    <div>
                      <p className="font-serif text-[24px] font-[550] leading-none text-[#123f3e]">
                        {item.number}
                      </p>
                      <p className="mt-2 text-[11px] font-medium text-[#71807f]">
                        {item.label}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* =====================================================
            JOURNAL DIRECTORY SECTION
        ===================================================== */}

        <section className="py-8 sm:py-11">
          <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-14 xl:px-20">
            {/* Directory toolbar */}

            <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <button
                type="button"
                onClick={() => setFiltersOpen(true)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#073f3d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#bd8a43] lg:hidden"
              >
                <SlidersHorizontal size={17} />
                Filter Journals
              </button>

              <p className="text-[14px] text-[#6f7d7c]">
                Showing{" "}
                <span className="font-semibold text-[#173f3d]">
                  {showingStart}–{showingEnd}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-[#173f3d]">
                  {filteredJournals.length}
                </span>{" "}
                journals
              </p>

              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="journal-sort"
                    className="text-[14px] text-[#657776]"
                  >
                    Sort by:
                  </label>

                  <div className="relative">
                    <select
                      id="journal-sort"
                      value={sortBy}
                      onChange={(event) => {
                        setSortBy(event.target.value);
                        setCurrentPage(1);
                      }}
                      className="appearance-none rounded-md border border-[#d4dfdd] bg-white py-2.5 pl-3 pr-9 text-[13px] font-medium text-[#294b49] outline-none transition focus:border-[#0a514e]"
                    >
                      <option value="latest">Latest</option>
                      <option value="title-asc">Title A–Z</option>
                      <option value="title-desc">Title Z–A</option>
                      <option value="impact-high">Highest Impact</option>
                    </select>

                    <ChevronDown
                      size={14}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#617472]"
                    />
                  </div>
                </div>

                <div className="flex rounded-md border border-[#d4dfdd] bg-white p-1">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    aria-label="Grid view"
                    className={`flex h-8 w-8 items-center justify-center rounded transition ${
                      viewMode === "grid"
                        ? "bg-[#073f3d] text-white"
                        : "text-[#70807f] hover:bg-[#eef4f2]"
                    }`}
                  >
                    <Grid2X2 size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    aria-label="List view"
                    className={`flex h-8 w-8 items-center justify-center rounded transition ${
                      viewMode === "list"
                        ? "bg-[#073f3d] text-white"
                        : "text-[#70807f] hover:bg-[#eef4f2]"
                    }`}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)]">
              {/* =================================================
                  DESKTOP FILTER SIDEBAR
              ================================================= */}

              <aside className="hidden lg:block">
                <div className="sticky top-5 rounded-lg border border-[#e0e8e6] bg-white p-4 shadow-[0_7px_25px_rgba(21,58,57,0.05)]">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Filter size={15} className="text-[#0b4a47]" />
                      <h2 className="text-[14px] font-[550] text-[#163f3d]">
                        Filter Journals
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={resetFilters}
                      className="text-[11px] font-semibold text-[#667b79] transition hover:text-[#b7833e]"
                    >
                      Clear All
                    </button>
                  </div>

                  {/* Subject Area */}

                  <div className="border-b border-[#e5ecea] pb-5">
                    <h3 className="mb-3 flex items-center justify-between text-[14px] font-[550] text-[#1d4543]">
                      Subject Area
                      <ChevronDown size={13} />
                    </h3>

                    <div className="space-y-2">
                      {SUBJECT_AREAS.map((item) => {
                        const checked = subjectAreas.includes(item);

                        return (
                          <label
                            key={item}
                            className="flex cursor-pointer items-start gap-2 text-[12px] leading-4 text-[#596d6b]"
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() =>
                                handleMultiFilter(
                                  item,
                                  subjectAreas,
                                  setSubjectAreas,
                                  "All Subjects",
                                )
                              }
                              className="peer sr-only"
                            />

                            <span
                              className={`mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[2px] border transition ${
                                checked
                                  ? "border-[#0b514e] bg-[#0b514e] text-white"
                                  : "border-[#b7c5c3] bg-white"
                              }`}
                            >
                              {checked && <Check size={10} strokeWidth={3} />}
                            </span>

                            <span
                              className={
                                checked
                                  ? "font-semibold text-[#174b48]"
                                  : undefined
                              }
                            >
                              {item}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Indexing */}

                  <div className="border-b border-[#e5ecea] py-5">
                    <h3 className="mb-3 flex items-center justify-between text-[14px] font-[550] text-[#1d4543]">
                      Indexing
                      <ChevronDown size={13} />
                    </h3>

                    <div className="space-y-2">
                      {INDEXING_OPTIONS.map((item) => {
                        const checked = indexing.includes(item);

                        return (
                          <label
                            key={item}
                            className="flex cursor-pointer items-center gap-2 text-[12px] text-[#596d6b]"
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() =>
                                handleMultiFilter(
                                  item,
                                  indexing,
                                  setIndexing,
                                  "__none__",
                                )
                              }
                              className="peer sr-only"
                            />

                            <span
                              className={`flex h-3.5 w-3.5 items-center justify-center rounded-[2px] border transition ${
                                checked
                                  ? "border-[#0b514e] bg-[#0b514e] text-white"
                                  : "border-[#b7c5c3] bg-white"
                              }`}
                            >
                              {checked && <Check size={10} strokeWidth={3} />}
                            </span>

                            <span
                              className={
                                checked
                                  ? "font-semibold text-[#174b48]"
                                  : undefined
                              }
                            >
                              {item}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Publication Frequency */}

                  <div className="border-b border-[#e5ecea] py-5">
                    <h3 className="mb-3 flex items-center justify-between text-[14px] font-[550] text-[#1d4543]">
                      Publication Frequency
                      <ChevronDown size={13} />
                    </h3>

                    <div className="space-y-2">
                      {FREQUENCY_OPTIONS.map((item) => {
                        const checked = frequencies.includes(item);

                        return (
                          <label
                            key={item}
                            className="flex cursor-pointer items-center gap-2 text-[12px] text-[#596d6b]"
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() =>
                                handleMultiFilter(
                                  item,
                                  frequencies,
                                  setFrequencies,
                                  "All Frequency",
                                )
                              }
                              className="peer sr-only"
                            />

                            <span
                              className={`flex h-3.5 w-3.5 items-center justify-center rounded-[2px] border transition ${
                                checked
                                  ? "border-[#0b514e] bg-[#0b514e] text-white"
                                  : "border-[#b7c5c3] bg-white"
                              }`}
                            >
                              {checked && <Check size={10} strokeWidth={3} />}
                            </span>

                            <span
                              className={
                                checked
                                  ? "font-semibold text-[#174b48]"
                                  : undefined
                              }
                            >
                              {item}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Access Type */}

                  <div className="py-5">
                    <h3 className="mb-3 flex items-center justify-between text-[14px] font-[550] text-[#1d4543]">
                      Access Type
                      <ChevronDown size={13} />
                    </h3>

                    <div className="space-y-2">
                      {ACCESS_OPTIONS.map((item) => {
                        const checked = accessTypes.includes(item);

                        return (
                          <label
                            key={item}
                            className="flex cursor-pointer items-center gap-2 text-[12px] text-[#596d6b]"
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() =>
                                handleMultiFilter(
                                  item,
                                  accessTypes,
                                  setAccessTypes,
                                  "All",
                                )
                              }
                              className="peer sr-only"
                            />

                            <span
                              className={`flex h-3.5 w-3.5 items-center justify-center rounded-[2px] border transition ${
                                checked
                                  ? "border-[#0b514e] bg-[#0b514e] text-white"
                                  : "border-[#b7c5c3] bg-white"
                              }`}
                            >
                              {checked && <Check size={10} strokeWidth={3} />}
                            </span>

                            <span
                              className={
                                checked
                                  ? "font-semibold text-[#174b48]"
                                  : undefined
                              }
                            >
                              {item}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-[#073f3d] px-4 py-3 text-[12px] font-semibold text-white shadow-[0_7px_15px_rgba(7,63,61,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#bd8a43]"
                  >
                    Apply Filters
                    <Filter size={13} />
                  </button>

                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-md border border-[#9bb0ad] bg-white px-4 py-2.5 text-[12px] font-semibold text-[#244c49] transition hover:border-[#bd8a43] hover:text-[#bd8a43]"
                  >
                    Reset Filters
                    <RotateCcw size={12} />
                  </button>
                </div>
              </aside>

              {/* =================================================
                  JOURNAL RESULTS
              ================================================= */}

              <div className="min-w-0">
                {loading ? (
                  <div className="flex min-h-[520px] flex-col items-center justify-center rounded-lg border border-[#e0e8e6] bg-white">
                    <Loader2
                      size={38}
                      className="animate-spin text-[#0a4b48]"
                    />
                    <p className="mt-4 text-[12px] font-medium text-[#637775]">
                      Loading journals...
                    </p>
                  </div>
                ) : paginatedJournals.length > 0 ? (
                  <motion.div
                    variants={containerAnimation}
                    initial="hidden"
                    animate="visible"
                    className={
                      viewMode === "grid"
                        ? "grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
                        : "grid gap-4"
                    }
                  >
                    <AnimatePresence mode="popLayout">
                      {paginatedJournals.map((journal, index) => {
                        const journalId =
                          journal.id || journal.slug || `journal-${index}`;

                        const isSaved = bookmarked.includes(journalId);

                        const coverTheme =
                          journal.coverTheme ||
                          [
                            "from-[#063f45] via-[#0a5e62] to-[#031f25]",
                            "from-[#0b2159] via-[#064c7c] to-[#12a6b5]",
                            "from-[#761a20] via-[#b83c43] to-[#f7c0b8]",
                            "from-[#321a5c] via-[#64439b] to-[#c899d9]",
                          ][index % 4];

                        const coverTitle =
                          journal.coverTitle ||
                          journal.shortTitle ||
                          journal.title ||
                          "Academic Journal";

                        const access = journal.access || "Open Access";
                        const frequency = journal.frequency || "Quarterly";
                        const impactFactor = journal.impactFactor || "1.256";
                        const journalIndexing = journal.indexing?.length
                          ? journal.indexing
                          : ["Scopus", "DOAJ"];

                        return (
                          <motion.article
                            layout
                            variants={cardAnimation}
                            exit={{ opacity: 0, scale: 0.96 }}
                            whileHover={{
                              y: -7,
                              transition: { duration: 0.25 },
                            }}
                            key={journalId}
                            className={`group relative overflow-hidden rounded-lg border border-[#dfe7e5] bg-white shadow-[0_4px_15px_rgba(20,56,55,0.045)] transition-shadow duration-300 hover:border-[#b7ccc8] hover:shadow-[0_16px_35px_rgba(18,61,59,0.13)] ${
                              viewMode === "list"
                                ? "grid md:grid-cols-[170px_minmax(0,1fr)]"
                                : ""
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => toggleBookmark(journalId)}
                              aria-label={
                                isSaved
                                  ? "Remove journal bookmark"
                                  : "Bookmark journal"
                              }
                              className={`absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-md transition ${
                                isSaved
                                  ? "border-[#c08d44] bg-[#c08d44] text-white"
                                  : "border-white/80 bg-white/85 text-[#496361] hover:border-[#c08d44] hover:text-[#c08d44]"
                              }`}
                            >
                              <Bookmark
                                size={14}
                                fill={isSaved ? "currentColor" : "none"}
                              />
                            </button>

                            {/* Journal cover area */}

                            <div
                              className={`relative overflow-hidden bg-[#eff4f3] ${
                                viewMode === "grid"
                                  ? "flex min-h-[150px] items-end px-4 pt-4"
                                  : "flex min-h-[220px] items-center justify-center p-5"
                              }`}
                            >
                              <motion.div
                                whileHover={{
                                  rotate: -1.5,
                                  scale: 1.025,
                                }}
                                className={`relative z-10 overflow-hidden rounded-t-sm bg-gradient-to-br ${coverTheme} shadow-[8px_8px_18px_rgba(22,51,50,0.24)] ${
                                  viewMode === "grid"
                                    ? "h-[137px] w-[92px]"
                                    : "h-[170px] w-[112px] rounded-sm"
                                }`}
                              >
                                <div className="absolute inset-x-0 top-0 h-2 bg-white/20" />

                                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/15" />

                                <div className="relative flex h-full flex-col p-3 text-white">
                                  <p className="text-[6px] uppercase tracking-[0.15em] text-white/75">
                                    International Journal
                                  </p>

                                  <div className="my-2 h-px bg-white/35" />

                                  <p className="whitespace-pre-line font-serif text-[11px] font-[520] leading-[1.25]">
                                    {coverTitle}
                                  </p>

                                  <div className="mt-auto">
                                    <div className="mb-1.5 h-px bg-white/30" />
                                    <p className="text-[6px] uppercase tracking-wider text-white/75">
                                      Pure Publications
                                    </p>
                                  </div>
                                </div>
                              </motion.div>

                              <span className="absolute left-[118px] top-4 z-10 rounded-full border border-[#a9cc9e] bg-[#eff9ea] px-2 py-1 text-[8px] font-[520] text-[#44743c]">
                                {access}
                              </span>
                            </div>

                            {/* Journal information */}

                            <div className="flex min-w-0 flex-col p-4">
                              <div className="min-h-[72px]">
                                <h2 className="pr-8 font-serif text-[14px] font-[550] leading-[1.35] text-[#163e3c] transition group-hover:text-[#b5813e]">
                                  {journal.title}
                                </h2>

                                <p className="mt-2 text-[11px] font-medium text-[#758582]">
                                  ISSN: {journal.issn || "2456-1010"}
                                </p>
                              </div>

                              <p
                                className={`mt-3 text-[12px] leading-[1.65] text-[#647674] ${
                                  viewMode === "grid" ? "line-clamp-3" : ""
                                }`}
                              >
                                {journal.description ||
                                  "A peer-reviewed academic journal publishing original research and scholarly studies."}
                              </p>

                              <div className="mt-3 flex flex-wrap gap-1.5">
                                {journalIndexing.slice(0, 3).map((item) => (
                                  <span
                                    key={item}
                                    className="rounded-full bg-[#eef3f2] px-2 py-1 text-[10px] font-semibold text-[#5e716f]"
                                  >
                                    {item}
                                  </span>
                                ))}
                              </div>

                              <div className="mt-4 flex items-center justify-between border-t border-[#edf1f0] pt-3 text-[12px] font-semibold text-[#667a78]">
                                <span>{frequency}</span>
                                <span>IF {impactFactor}</span>
                              </div>

                              <Link
                                to={`/journal-detail/${
                                  journal.slug || journalId
                                }`}
                                className="mt-4 flex items-center justify-center gap-2 rounded-md bg-[#073f3d] px-4 py-2.5 text-[12px] font-semibold text-white shadow-[0_6px_13px_rgba(7,63,61,0.16)] transition duration-300 hover:bg-[#bd8a43]"
                              >
                                View Journal
                                <ArrowRight
                                  size={11}
                                  className="transition-transform duration-300 group-hover:translate-x-1"
                                />
                              </Link>
                            </div>
                          </motion.article>
                        );
                      })}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex min-h-[520px] flex-col items-center justify-center rounded-lg border border-dashed border-[#cbd9d7] bg-white px-6 text-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#edf4f2] text-[#0a4b48]">
                      <BookOpen size={28} />
                    </div>

                    <h2 className="mt-5 font-serif text-[18px] font-[550] text-[#153f3d]">
                      No journals found
                    </h2>

                    <p className="mt-2 max-w-md text-[12px] leading-6 text-[#6d7e7c]">
                      We could not find journals matching your selected search
                      and filter options.
                    </p>

                    <button
                      type="button"
                      onClick={resetFilters}
                      className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#073f3d] px-5 py-3 text-[12px] font-semibold text-white transition hover:bg-[#bd8a43]"
                    >
                      <RotateCcw size={14} />
                      Reset Filters
                    </button>
                  </motion.div>
                )}

                {/* =================================================
                    PAGINATION
                ================================================= */}

                {!loading && filteredJournals.length > 0 && (
                  <nav
                    aria-label="Journal pagination"
                    className="mt-7 flex flex-wrap items-center justify-center gap-2"
                  >
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() =>
                        setCurrentPage((page) => Math.max(1, page - 1))
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-md border border-[#d7e1df] bg-white text-[#47615f] transition hover:border-[#0a4b48] hover:text-[#0a4b48] disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      <ChevronLeft size={15} />
                    </button>

                    {Array.from(
                      {
                        length: totalPages,
                      },
                      (_, pageIndex) => pageIndex + 1,
                    )
                      .slice(0, 5)
                      .map((page) => (
                        <button
                          type="button"
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`h-9 min-w-9 rounded-md px-3 text-[11px] font-semibold transition ${
                            currentPage === page
                              ? "bg-[#073f3d] text-white shadow-[0_6px_13px_rgba(7,63,61,0.18)]"
                              : "border border-[#d7e1df] bg-white text-[#536a68] hover:border-[#0a4b48]"
                          }`}
                        >
                          {page}
                        </button>
                      ))}

                    {totalPages > 5 && (
                      <>
                        <span className="px-1 text-[#72817f]">...</span>

                        <button
                          type="button"
                          onClick={() => setCurrentPage(totalPages)}
                          className={`h-9 min-w-9 rounded-md px-3 text-[11px] font-semibold transition ${
                            currentPage === totalPages
                              ? "bg-[#073f3d] text-white"
                              : "border border-[#d7e1df] bg-white text-[#536a68] hover:border-[#0a4b48]"
                          }`}
                        >
                          {totalPages}
                        </button>
                      </>
                    )}

                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() =>
                        setCurrentPage((page) => Math.min(totalPages, page + 1))
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-md border border-[#d7e1df] bg-white text-[#47615f] transition hover:border-[#0a4b48] hover:text-[#0a4b48] disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      <ChevronRight size={15} />
                    </button>
                  </nav>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            RECOMMENDATION CTA
        ===================================================== */}

        <section className="pb-12">
          <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-14 xl:px-20">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              whileHover={{ y: -4 }}
              className="relative overflow-hidden rounded-xl border border-[#eee5d8] bg-gradient-to-r from-[#f8f1e7] via-[#fffdf9] to-[#f4ede3] px-5 py-5 shadow-[0_8px_25px_rgba(65,54,38,0.05)] sm:px-8"
            >
              <div className="absolute -right-12 -top-16 h-40 w-40 rounded-full border border-[#e7d8c0]" />
              <div className="absolute -right-2 -top-6 h-24 w-24 rounded-full border border-[#e7d8c0]" />

              <div className="relative flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
                <motion.div
                  whileHover={{ rotate: -5, scale: 1.05 }}
                  className="flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#b6c5c1] bg-white shadow-sm"
                >
                  <img
                    src={recommendationIcon}
                    alt="Open academic book"
                    className="h-full w-full object-cover"
                  />
                </motion.div>

                <div className="flex-1">
                  <h2 className="font-serif text-[20px] font-[550] text-[#173f3d] sm:text-[22px]">
                    Can’t find the right journal?
                  </h2>

                  <p className="mt-1 text-[11px] text-[#667775] sm:text-[12px]">
                    We can help you find the perfect journal for your research.
                  </p>
                </div>

                <Link
                  to="/contact"
                  className="group inline-flex min-w-[210px] items-center justify-center gap-3 rounded-md bg-[#073f3d] px-6 py-3.5 text-[12px] font-semibold text-white shadow-[0_8px_18px_rgba(7,63,61,0.19)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#bd8a43]"
                >
                  Get Recommendation
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =====================================================
            MOBILE FILTER DRAWER
        ===================================================== */}

        <AnimatePresence>
          {filtersOpen && (
            <>
              <motion.button
                type="button"
                aria-label="Close filter menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setFiltersOpen(false)}
                className="fixed inset-0 z-40 bg-[#031f1e]/60 backdrop-blur-sm lg:hidden"
              />

              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{
                  type: "spring",
                  damping: 26,
                  stiffness: 250,
                }}
                className="fixed inset-y-0 left-0 z-50 w-[88%] max-w-[360px] overflow-y-auto bg-white p-5 shadow-2xl lg:hidden"
              >
                <div className="mb-6 flex items-center justify-between border-b border-[#e1e9e7] pb-4">
                  <div>
                    <p className="text-[10px] font-[550] uppercase tracking-[0.14em] text-[#b8833f]">
                      Browse
                    </p>
                    <h2 className="mt-1 font-serif text-2xl font-[550] text-[#163f3d]">
                      Filter Journals
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => setFiltersOpen(false)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#edf3f1] text-[#153f3d]"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-7">
                  <div>
                    <h3 className="mb-3 text-[12px] font-[550] text-[#1d4543]">
                      Subject Area
                    </h3>

                    <div className="space-y-3">
                      {SUBJECT_AREAS.map((item) => {
                        const checked = subjectAreas.includes(item);

                        return (
                          <label
                            key={item}
                            className="flex cursor-pointer items-center gap-3 text-[12px] text-[#596d6b]"
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() =>
                                handleMultiFilter(
                                  item,
                                  subjectAreas,
                                  setSubjectAreas,
                                  "All Subjects",
                                )
                              }
                              className="sr-only"
                            />

                            <span
                              className={`flex h-4 w-4 items-center justify-center rounded border ${
                                checked
                                  ? "border-[#0b514e] bg-[#0b514e] text-white"
                                  : "border-[#b7c5c3]"
                              }`}
                            >
                              {checked && <Check size={11} />}
                            </span>

                            {item}
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 text-[12px] font-[550] text-[#1d4543]">
                      Indexing
                    </h3>

                    <div className="space-y-3">
                      {INDEXING_OPTIONS.map((item) => {
                        const checked = indexing.includes(item);

                        return (
                          <label
                            key={item}
                            className="flex cursor-pointer items-center gap-3 text-[12px] text-[#596d6b]"
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() =>
                                handleMultiFilter(
                                  item,
                                  indexing,
                                  setIndexing,
                                  "__none__",
                                )
                              }
                              className="sr-only"
                            />

                            <span
                              className={`flex h-4 w-4 items-center justify-center rounded border ${
                                checked
                                  ? "border-[#0b514e] bg-[#0b514e] text-white"
                                  : "border-[#b7c5c3]"
                              }`}
                            >
                              {checked && <Check size={11} />}
                            </span>

                            {item}
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 text-[12px] font-[550] text-[#1d4543]">
                      Publication Frequency
                    </h3>

                    <div className="space-y-3">
                      {FREQUENCY_OPTIONS.map((item) => {
                        const checked = frequencies.includes(item);

                        return (
                          <label
                            key={item}
                            className="flex cursor-pointer items-center gap-3 text-[12px] text-[#596d6b]"
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() =>
                                handleMultiFilter(
                                  item,
                                  frequencies,
                                  setFrequencies,
                                  "All Frequency",
                                )
                              }
                              className="sr-only"
                            />

                            <span
                              className={`flex h-4 w-4 items-center justify-center rounded border ${
                                checked
                                  ? "border-[#0b514e] bg-[#0b514e] text-white"
                                  : "border-[#b7c5c3]"
                              }`}
                            >
                              {checked && <Check size={11} />}
                            </span>

                            {item}
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 text-[12px] font-[550] text-[#1d4543]">
                      Access Type
                    </h3>

                    <div className="space-y-3">
                      {ACCESS_OPTIONS.map((item) => {
                        const checked = accessTypes.includes(item);

                        return (
                          <label
                            key={item}
                            className="flex cursor-pointer items-center gap-3 text-[12px] text-[#596d6b]"
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() =>
                                handleMultiFilter(
                                  item,
                                  accessTypes,
                                  setAccessTypes,
                                  "All",
                                )
                              }
                              className="sr-only"
                            />

                            <span
                              className={`flex h-4 w-4 items-center justify-center rounded border ${
                                checked
                                  ? "border-[#0b514e] bg-[#0b514e] text-white"
                                  : "border-[#b7c5c3]"
                              }`}
                            >
                              {checked && <Check size={11} />}
                            </span>

                            {item}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="sticky bottom-0 mt-8 border-t border-[#e1e9e7] bg-white pt-4">
                  <button
                    type="button"
                    onClick={() => setFiltersOpen(false)}
                    className="w-full rounded-md bg-[#073f3d] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#bd8a43]"
                  >
                    Show {filteredJournals.length} Journals
                  </button>

                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="mt-2 w-full rounded-md border border-[#9bb0ad] px-5 py-3 text-xs font-semibold text-[#244c49]"
                    >
                      Reset All Filters
                    </button>
                  )}
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
