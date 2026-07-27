import { useEffect, useMemo, useState } from "react";
import { Search as SearchIcon, BookX } from "lucide-react";
import Seo from "../components/Seo";
import Hero from "../components/Hero";
import SectionTitle from "../components/SectionTitle";
import JournalCard from "../components/JournalCard";
import Loader from "../components/Loader";
import { getJournals } from "../services/journalService";
import { JOURNAL_CATEGORIES } from "../utils/constants";
import { classNames } from "../utils/helpers";

const FALLBACK_JOURNALS = [
  { id: "journal-of-applied-sciences", title: "International Journal of Applied Sciences", coverImage: "", description: "Multidisciplinary research in applied physics, chemistry, and materials science.", category: "Science & Technology", frequency: "Quarterly", issn: "2456-1010" },
  { id: "journal-of-clinical-medicine", title: "Journal of Clinical & Medical Research", coverImage: "", description: "Peer-reviewed clinical studies, case reports, and public health research.", category: "Medicine & Health", frequency: "Monthly", issn: "2456-2020" },
  { id: "journal-of-social-sciences", title: "Journal of Social Science & Humanities", coverImage: "", description: "Contemporary issues in sociology, psychology, and political science.", category: "Social Sciences", frequency: "Bi-Monthly", issn: "2456-3030" },
  { id: "journal-of-engineering-innovations", title: "Journal of Engineering Innovations", coverImage: "", description: "Cutting-edge research in mechanical, civil, and electrical engineering.", category: "Engineering", frequency: "Quarterly", issn: "2456-4040" },
  { id: "journal-of-management-commerce", title: "Journal of Management & Commerce", coverImage: "", description: "Research in business strategy, finance, marketing, and commerce.", category: "Management & Commerce", frequency: "Half-Yearly", issn: "2456-5050" },
  { id: "journal-of-humanities-culture", title: "Journal of Humanities & Culture", coverImage: "", description: "Explorations in literature, history, philosophy, and cultural studies.", category: "Humanities", frequency: "Annually", issn: "2456-6060" },
];

export default function Journals() {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    getJournals(category)
      .then((data) => {
        setJournals(data.length ? data : FALLBACK_JOURNALS);
      })
      .catch(() => setJournals(FALLBACK_JOURNALS))
      .finally(() => setLoading(false));
  }, [category]);

  const filtered = useMemo(() => {
    let list = journals;
    if (category !== "All") {
      list = list.filter((j) => j.category === category);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.description?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [journals, category, search]);

  return (
    <>
      <Seo
        title="Journals"
        description="Browse Pure Publication's peer-reviewed journals across Science, Medicine, Engineering, Social Sciences, and more."
        path="/journals"
      />

      <Hero
        breadcrumb="Journals"
        eyebrow="Explore"
        title="Our Peer-Reviewed"
        highlight="Journals"
        description="Discover actively publishing journals across diverse research disciplines, each maintaining rigorous editorial standards."
        image="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1200&auto=format&fit=crop"
        primaryAction={{ label: "Submit Paper", to: "/submit-paper" }}
      />

      <section className="py-20">
        <div className="container-custom">
          <SectionTitle badge="Browse" title="Find a" highlight="Journal" />

          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-12">
            <div className="relative w-full lg:max-w-sm">
              <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-300" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search journals..."
                className="w-full pl-11 pr-4 py-3 rounded-full border border-navy-100 outline-none focus:border-amber-400 focus:shadow-glow transition-all duration-300"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {JOURNAL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={classNames(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    category === cat
                      ? "bg-navy-900 text-white"
                      : "bg-navy-50 text-navy-600 hover:bg-navy-100"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <Loader fullscreen={false} />
          ) : filtered.length ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((journal, i) => (
                <JournalCard key={journal.id} journal={journal} delay={i * 0.06} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-navy-400">
              <BookX size={48} className="mx-auto mb-4" />
              <p>No journals found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
