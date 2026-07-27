import {
  BookOpen,
  ShieldCheck,
  Globe2,
  FileCheck2,
  PenLine,
  BadgeCheck,
  Search,
  Layers,
} from "lucide-react";
import Seo from "../components/Seo";
import Hero from "../components/Hero";
import SectionTitle from "../components/SectionTitle";
import Card from "../components/Card";
import AnimatedSection from "../components/AnimatedSection";
import Button from "../components/Button";

const SERVICES = [
  { icon: BookOpen, title: "Journal Publishing", description: "Complete publishing pipeline for peer-reviewed journals across every major research discipline." },
  { icon: ShieldCheck, title: "Peer Review Management", description: "Structured double-blind review coordinated by qualified subject-matter reviewers." },
  { icon: PenLine, title: "Manuscript Editing", description: "Language polishing, formatting, and reference styling aligned to journal guidelines." },
  { icon: Search, title: "Plagiarism Screening", description: "Every manuscript is checked against leading plagiarism-detection databases." },
  { icon: Globe2, title: "Global Indexing & DOI", description: "DOI assignment and indexing support to maximize your research's global visibility." },
  { icon: FileCheck2, title: "Fast-Track Review", description: "Expedited review options for time-sensitive research and conference proceedings." },
  { icon: BadgeCheck, title: "Certification & Proof", description: "Digital publication certificates and author proofs delivered promptly." },
  { icon: Layers, title: "Special Issues", description: "Guest-edited special issues curated around emerging research themes." },
];

const PROCESS = [
  { step: "01", title: "Submit Manuscript", text: "Upload your paper through our secure submission portal." },
  { step: "02", title: "Editorial Screening", text: "Initial review for scope, formatting, and plagiarism." },
  { step: "03", title: "Peer Review", text: "Double-blind review by expert reviewers in your field." },
  { step: "04", title: "Publication", text: "Final formatting, DOI assignment, and online publication." },
];

export default function Services() {
  return (
    <>
      <Seo
        title="Services"
        description="Explore Pure Publication's full range of journal publishing, peer review, editing, and indexing services for researchers."
        path="/services"
      />

      <Hero
        breadcrumb="Services"
        eyebrow="What We Do"
        title="End-to-End Publishing"
        highlight="Services"
        description="From manuscript submission to global indexing, we provide everything researchers need to publish with confidence."
        image="https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?q=80&w=1200&auto=format&fit=crop"
        primaryAction={{ label: "Submit Paper", to: "/submit-paper" }}
      />

      <section className="py-24">
        <div className="container-custom">
          <SectionTitle
            badge="Our Services"
            title="Everything You Need to"
            highlight="Publish"
            description="Comprehensive support across every stage of the academic publishing lifecycle."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <Card key={s.title} {...s} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-navy-50">
        <div className="container-custom">
          <SectionTitle badge="How It Works" title="Our Publishing" highlight="Process" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS.map((p, i) => (
              <AnimatedSection key={p.step} delay={i * 0.1} className="relative">
                <span className="text-5xl font-heading font-bold text-navy-100">{p.step}</span>
                <h4 className="font-heading font-semibold text-navy-900 text-lg mt-2 mb-2">{p.title}</h4>
                <p className="text-navy-500 text-sm leading-relaxed">{p.text}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-custom">
          <AnimatedSection className="bg-hero-gradient rounded-3xl p-10 lg:p-16 text-center">
            <h3 className="text-2xl lg:text-3xl font-heading font-bold text-white mb-4">
              Have a manuscript ready?
            </h3>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Start your submission today and our editorial team will guide you
              through every step.
            </p>
            <Button to="/submit-paper" variant="primary" showArrow>
              Submit Your Paper
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
