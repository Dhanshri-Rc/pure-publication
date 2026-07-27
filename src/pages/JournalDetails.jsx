import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookMarked, Hash, Repeat, Building2, CalendarClock } from "lucide-react";
import Seo from "../components/Seo";
import Loader from "../components/Loader";
import Button from "../components/Button";
import AnimatedSection from "../components/AnimatedSection";
import { getJournalById } from "../services/journalService";

const FALLBACK = {
  title: "International Journal of Applied Sciences",
  coverImage: "",
  description:
    "The International Journal of Applied Sciences (IJAS) publishes original, peer-reviewed research across applied physics, chemistry, and materials science. The journal welcomes theoretical and experimental studies that advance scientific understanding and practical application.",
  issn: "2456-1010",
  frequency: "Quarterly",
  publisher: "Pure Publication",
  category: "Science & Technology",
  currentIssue: "Volume 12, Issue 2, 2026",
  status: "Actively Publishing",
};

export default function JournalDetails() {
  const { id } = useParams();
  const [journal, setJournal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getJournalById(id)
      .then((data) => setJournal(data || FALLBACK))
      .catch(() => setJournal(FALLBACK))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader fullscreen={false} />;
  if (!journal) return null;

  const {
    title,
    coverImage,
    description,
    issn,
    frequency,
    publisher,
    category,
    currentIssue,
    status,
  } = journal;

  const scope = [
    "Original research articles and review papers",
    "Case studies and short communications",
    "Interdisciplinary and applied research",
  ];

  return (
    <>
      <Seo title={title} description={description?.slice(0, 155)} path={`/journals/${id}`} />

      <section className="bg-hero-gradient pt-36 pb-20">
        <div className="container-custom">
          <p className="text-white/60 text-sm mb-4">
            <Link to="/journals" className="hover:text-amber-400">Journals</Link> / {title}
          </p>
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-1"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-navy-800 shadow-2xl">
                {coverImage ? (
                  <img src={coverImage} alt={title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-navy-400">
                    <BookMarked size={64} />
                  </div>
                )}
              </div>
            </motion.div>

            <div className="lg:col-span-2">
              {category && <span className="section-badge bg-white/10 text-amber-400">{category}</span>}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl lg:text-4xl font-heading font-bold text-white mb-6"
              >
                {title}
              </motion.h1>
              <p className="text-white/70 leading-relaxed mb-8">{description}</p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Hash, label: "ISSN", value: issn },
                  { icon: Repeat, label: "Frequency", value: frequency },
                  { icon: Building2, label: "Publisher", value: publisher },
                  { icon: CalendarClock, label: "Current Issue", value: currentIssue },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
                    <item.icon size={18} className="text-amber-400 shrink-0" />
                    <div>
                      <p className="text-xs text-white/50">{item.label}</p>
                      <p className="text-white text-sm font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button to="/submit-paper" variant="primary" showArrow>
                Submit to This Journal
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom max-w-3xl">
          <AnimatedSection>
            <h2 className="text-2xl font-heading font-bold text-navy-900 mb-4">Scope</h2>
            <ul className="space-y-3 mb-10">
              {scope.map((item) => (
                <li key={item} className="flex items-start gap-3 text-navy-600">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="bg-navy-50 rounded-2xl p-6 flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm text-navy-500">Publication Status</p>
                <p className="font-heading font-semibold text-navy-900">{status}</p>
              </div>
              <Button to="/submit-paper" variant="ghost" showArrow>
                Start Submission
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
