import {
  Target,
  Eye,
  HeartHandshake,
  ShieldCheck,
  Lightbulb,
  Users2,
} from "lucide-react";
import Seo from "../components/Seo";
import Hero from "../components/Hero";
import SectionTitle from "../components/SectionTitle";
import Card from "../components/Card";
import AnimatedSection from "../components/AnimatedSection";
import useCountUp from "../hooks/useCountUp";

const TIMELINE = [
  { year: "2014", title: "Founded", text: "Pure Publication was established with a vision to simplify academic publishing." },
  { year: "2017", title: "10 Journals Launched", text: "Expanded into Engineering, Medicine, and Social Sciences disciplines." },
  { year: "2020", title: "Global Indexing", text: "Partnered with international indexing bodies for wider research visibility." },
  { year: "2024", title: "48+ Active Journals", text: "Now serving researchers across 90+ countries with fast, transparent review." },
];

const VALUES = [
  { icon: ShieldCheck, title: "Integrity", description: "Every submission goes through honest, unbiased, rigorous peer review." },
  { icon: Lightbulb, title: "Innovation", description: "We continuously improve our processes with modern publishing technology." },
  { icon: Users2, title: "Collaboration", description: "We work closely with authors, reviewers, and institutions alike." },
  { icon: HeartHandshake, title: "Accessibility", description: "Open access publishing to make research available to everyone." },
];

const STATS = [
  { value: 12500, suffix: "+", label: "Articles Published" },
  { value: 48, suffix: "+", label: "Active Journals" },
  { value: 3200, suffix: "+", label: "Expert Reviewers" },
  { value: 92, suffix: "+", label: "Countries Served" },
];

function Stat({ value, suffix, label }) {
  const { ref, value: animated } = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl font-heading font-bold text-navy-900">
        {animated.toLocaleString()}
        {suffix}
      </p>
      <p className="text-navy-500 text-sm mt-2">{label}</p>
    </div>
  );
}

export default function About() {
  return (
    <>
      <Seo
        title="About Us"
        description="Learn about Pure Publication's mission, vision, values, and journey supporting academic research publishing worldwide."
        path="/about"
      />

      <Hero
        breadcrumb="About"
        eyebrow="Our Story"
        title="Championing Research"
        highlight="Since 2014"
        description="We are a team of editors, reviewers, and technologists dedicated to making academic publishing faster, fairer, and more transparent."
        image="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop"
        primaryAction={{ label: "Our Services", to: "/services" }}
      />

      {/* MISSION / VISION */}
      <section className="py-24">
        <div className="container-custom grid md:grid-cols-2 gap-8">
          <AnimatedSection direction="left">
            <Card icon={Target} title="Our Mission" description="To provide researchers a credible, efficient, and globally accessible platform to publish high-quality peer-reviewed work." />
          </AnimatedSection>
          <AnimatedSection direction="right">
            <Card icon={Eye} title="Our Vision" description="To become the most trusted name in open-access academic publishing across every research discipline." />
          </AnimatedSection>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-24 bg-navy-50">
        <div className="container-custom">
          <SectionTitle badge="Our Journey" title="A Decade of" highlight="Growth" />
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-navy-200 md:-translate-x-1/2" />
            <div className="space-y-12">
              {TIMELINE.map((item, i) => (
                <AnimatedSection
                  key={item.year}
                  direction={i % 2 === 0 ? "left" : "right"}
                  className={`relative flex md:justify-${i % 2 === 0 ? "start" : "end"} pl-12 md:pl-0`}
                >
                  <div className="absolute left-4 md:left-1/2 top-1.5 w-3.5 h-3.5 rounded-full bg-amber-500 -translate-x-1/2 ring-4 ring-amber-100" />
                  <div className={`bg-white rounded-2xl p-6 shadow-card w-full md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}>
                    <span className="text-amber-600 font-heading font-bold text-lg">{item.year}</span>
                    <h4 className="font-heading font-semibold text-navy-900 mt-1 mb-2">{item.title}</h4>
                    <p className="text-navy-500 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24">
        <div className="container-custom">
          <SectionTitle badge="What Drives Us" title="Our Core" highlight="Values" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <Card key={v.title} {...v} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 bg-white border-y border-navy-100">
        <div className="container-custom grid grid-cols-2 lg:grid-cols-4 gap-10">
          {STATS.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>
      </section>
    </>
  );
}
