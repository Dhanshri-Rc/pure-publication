import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  ShieldCheck,
  Globe2,
  Users,
  FileCheck2,
  Award,
  ArrowRight,
  Quote,
} from "lucide-react";
import Seo from "../components/Seo";
import Hero from "../components/Hero";
import SectionTitle from "../components/SectionTitle";
import Card from "../components/Card";
import JournalCard from "../components/JournalCard";
import Button from "../components/Button";
import AnimatedSection from "../components/AnimatedSection";
import useCountUp from "../hooks/useCountUp";
import { getJournals } from "../services/journalService";
import { SITE_NAME, SITE_TAGLINE } from "../utils/constants";

const SERVICES = [
  {
    icon: BookOpen,
    title: "Journal Publishing",
    description:
      "End-to-end publishing support across Science, Medicine, Engineering, and Social Sciences.",
  },
  {
    icon: ShieldCheck,
    title: "Peer Review",
    description:
      "Rigorous double-blind peer review conducted by subject-matter experts worldwide.",
  },
  {
    icon: Globe2,
    title: "Global Indexing",
    description:
      "Wider visibility through indexing partnerships and DOI assignment for every article.",
  },
  {
    icon: FileCheck2,
    title: "Manuscript Editing",
    description:
      "Professional language and formatting support to meet international publishing standards.",
  },
];

const STATS = [
  { label: "Published Articles", value: 12500, suffix: "+" },
  { label: "Active Journals", value: 48, suffix: "+" },
  { label: "Countries Reached", value: 92, suffix: "+" },
  { label: "Expert Reviewers", value: 3200, suffix: "+" },
];

const FEATURES = [
  "Fast & transparent review process",
  "Open access to global readership",
  "Dedicated editorial support team",
  "Plagiarism screening on every submission",
];

const FALLBACK_JOURNALS = [
  {
    id: "journal-of-applied-sciences",
    title: "International Journal of Applied Sciences",
    coverImage: "",
    description:
      "Covering multidisciplinary research in applied physics, chemistry, and materials science.",
    category: "Science & Technology",
    frequency: "Quarterly",
    issn: "2456-1010",
  },
  {
    id: "journal-of-clinical-medicine",
    title: "Journal of Clinical & Medical Research",
    coverImage: "",
    description:
      "Peer-reviewed clinical studies, case reports, and public health research.",
    category: "Medicine & Health",
    frequency: "Monthly",
    issn: "2456-2020",
  },
  {
    id: "journal-of-social-sciences",
    title: "Journal of Social Science & Humanities",
    coverImage: "",
    description:
      "Exploring contemporary issues in sociology, psychology, and political science.",
    category: "Social Sciences",
    frequency: "Bi-Monthly",
    issn: "2456-3030",
  },
];

function StatCounter({ value, suffix, label }) {
  const { ref, value: animated } = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl sm:text-5xl font-heading font-bold text-white">
        {animated.toLocaleString()}
        {suffix}
      </p>
      <p className="text-white/60 mt-2 text-sm tracking-wide">{label}</p>
    </div>
  );
}

export default function Home() {
  const [journals, setJournals] = useState(FALLBACK_JOURNALS);

  useEffect(() => {
    getJournals()
      .then((data) => {
        if (data.length) setJournals(data.slice(0, 3));
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <Seo
        title="Home"
        description="Pure Publication is a trusted platform for peer-reviewed journal publishing, manuscript submission, and academic research support."
        keywords="journal publication, peer review, research papers, academic publishing"
        path="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SITE_NAME,
          description: SITE_TAGLINE,
        }}
      />

      <Hero
        eyebrow="Peer-Reviewed • Open Access • Global"
        title="Advancing Research,"
        highlight="Empowering Knowledge"
        description="Pure Publication connects researchers, academicians, and institutions through a fast, transparent, and globally recognized journal publishing platform."
        image="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop"
        primaryAction={{ label: "Submit Your Paper", to: "/submit-paper" }}
        secondaryAction={{ label: "Explore Journals", to: "/journals" }}
        stats={[
          { value: "12.5K+", label: "Articles Published" },
          { value: "48+", label: "Active Journals" },
          { value: "92+", label: "Countries" },
        ]}
      />

      {/* SERVICES */}
      <section className="py-24">
        <div className="container-custom">
          <SectionTitle
            badge="What We Offer"
            title="Our Publishing"
            highlight="Services"
            description="From manuscript submission to global indexing, we support every stage of the research publishing journey."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, i) => (
              <Card key={service.title} {...service} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="py-20 bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(247,148,30,0.12),transparent_50%)]" />
        <div className="container-custom grid grid-cols-2 lg:grid-cols-4 gap-10 relative">
          {STATS.map((stat) => (
            <StatCounter key={stat.label} {...stat} />
          ))}
        </div>
      </section>

      {/* LATEST JOURNALS */}
      <section className="py-24">
        <div className="container-custom">
          <SectionTitle
            badge="Featured"
            title="Latest"
            highlight="Journals"
            description="Explore our actively publishing, peer-reviewed journals across diverse research disciplines."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {journals.map((journal, i) => (
              <JournalCard key={journal.id} journal={journal} delay={i * 0.1} />
            ))}
          </div>
          <AnimatedSection className="text-center mt-12">
            <Button to="/journals" variant="outlineDark" showArrow>
              View All Journals
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* FEATURES / WHY CHOOSE US */}
      <section className="py-24 bg-navy-50">
        <div className="container-custom grid lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection direction="left">
            <img
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1100&auto=format&fit=crop"
              alt="Researchers collaborating"
              className="rounded-3xl shadow-card-hover w-full object-cover aspect-[4/3] transition-transform duration-700 hover:scale-105"
            />
          </AnimatedSection>
          <AnimatedSection direction="right">
            <span className="section-badge">Why Choose Us</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-navy-900 mb-6">
              Built for Researchers Who Value{" "}
              <span className="text-amber-500">Integrity & Speed</span>
            </h2>
            <ul className="space-y-4 mb-8">
              {FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="mt-1 w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                    <Award size={14} />
                  </span>
                  <span className="text-navy-600">{feature}</span>
                </li>
              ))}
            </ul>
            <Button to="/about" variant="ghost" showArrow>
              Learn More About Us
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* TESTIMONIAL / QUOTE STRIP */}
      <section className="py-20">
        <div className="container-custom">
          <AnimatedSection direction="scale" className="bg-navy-900 rounded-3xl p-10 lg:p-16 text-center relative overflow-hidden">
            <Quote className="mx-auto text-amber-400 mb-6" size={40} />
            <p className="text-white text-xl lg:text-2xl font-heading leading-relaxed max-w-3xl mx-auto mb-6">
              "Pure Publication made the entire review and publishing process
              seamless — transparent timelines and genuinely helpful editorial
              support."
            </p>
            <div className="flex items-center justify-center gap-3">
              <Users className="text-amber-400" size={20} />
              <span className="text-white/70 text-sm">
                Dr. Ananya Rao, Senior Researcher
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="container-custom">
          <AnimatedSection className="bg-cta-gradient rounded-3xl p-10 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl lg:text-3xl font-heading font-bold text-navy-900 mb-2">
                Ready to publish your research?
              </h3>
              <p className="text-navy-800/80">
                Submit your manuscript today and join thousands of published
                researchers worldwide.
              </p>
            </div>
            <Button
              to="/submit-paper"
              variant="outlineDark"
              className="bg-navy-900 !text-white border-navy-900 hover:bg-navy-800 whitespace-nowrap"
            >
              Submit Paper <ArrowRight size={18} />
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
