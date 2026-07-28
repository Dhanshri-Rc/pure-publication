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

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import {
//   ArrowRight,
//   BookOpen,
//   FileText,
//   Globe2,
//   Users,
//   Award,
//   Search,
//   GraduationCap,
//   PenLine,
//   ChevronLeft,
//   ChevronRight,
//   Send,
// } from "lucide-react";

// import Seo from "../components/Seo";
// import Button from "../components/Button";
// import AnimatedSection from "../components/AnimatedSection";
// import useCountUp from "../hooks/useCountUp";
// import { getJournals } from "../services/journalService";
// import { SITE_NAME, SITE_TAGLINE } from "../utils/constants";
// import heroBackground from "../assets/hero-bg.png";

// const SERVICES = [
//   {
//     icon: FileText,
//     title: "Article Publication",
//     description:
//       "Navigate the publication process with ease in Scopus, ESCI, and more.",
//   },
//   {
//     icon: FileText,
//     title: "Proofreading Services",
//     description:
//       "Elevate the quality of your manuscripts with expert proofreading and editing.",
//   },
//   {
//     icon: Users,
//     title: "Collaboration Services",
//     description:
//       "Connect with leading experts to enhance your research impact and visibility.",
//   },
//   {
//     icon: PenLine,
//     title: "Paper Writing Assistance",
//     description:
//       "Get professional support for well-structured and impactful research.",
//   },
//   {
//     icon: GraduationCap,
//     title: "Thesis Writing Services",
//     description:
//       "Craft your thesis with expert guidance and academic precision.",
//   },
// ];

// const STATS = [
//   {
//     icon: BookOpen,
//     value: 25,
//     suffix: "+",
//     label: "Journals",
//   },
//   {
//     icon: FileText,
//     value: 15000,
//     suffix: "+",
//     label: "Published Articles",
//   },
//   {
//     icon: Globe2,
//     value: 120,
//     suffix: "+",
//     label: "Countries",
//   },
//   {
//     icon: Users,
//     value: 10000,
//     suffix: "+",
//     label: "Active Authors",
//   },
//   {
//     icon: Award,
//     value: 98,
//     suffix: "%",
//     label: "Author Satisfaction",
//   },
// ];

// const BOTTOM_STATS = [
//   {
//     icon: BookOpen,
//     value: 25,
//     suffix: "+",
//     label: "Journals",
//   },
//   {
//     icon: FileText,
//     value: 15000,
//     suffix: "+",
//     label: "Articles Published",
//   },
//   {
//     icon: Users,
//     value: 10000,
//     suffix: "+",
//     label: "Active Authors",
//   },
//   {
//     icon: Users,
//     value: 1200,
//     suffix: "+",
//     label: "Expert Reviewers",
//   },
//   {
//     icon: Globe2,
//     value: 120,
//     suffix: "+",
//     label: "Countries Reached",
//   },
//   {
//     icon: Award,
//     value: 98,
//     suffix: "%",
//     label: "Success Rate",
//   },
// ];

// const FALLBACK_JOURNALS = [
//   {
//     id: "genetics-molecular-research",
//     title: "Genetics and Molecular Research",
//     coverImage: "/images/journals/genetics.jpg",
//     issn: "1676-5680",
//     index: "Scopus Q4",
//   },
//   {
//     id: "aquatic-research",
//     title:
//       "International Journal of Aquatic Research and Environmental Studies",
//     coverImage: "/images/journals/aquatic.jpg",
//     issn: "2289-7840",
//     index: "Scopus",
//   },
//   {
//     id: "special-education",
//     title: "International Journal of Special Education",
//     coverImage: "/images/journals/special-education.jpg",
//     issn: "0887-3338",
//     index: "Scopus",
//   },
//   {
//     id: "environmental-research",
//     title: "Journal of Environmental Research",
//     coverImage: "/images/journals/environmental.jpg",
//     issn: "1234-5678",
//     index: "Scopus Q3",
//   },
//   {
//     id: "pharmaceutical-sciences",
//     title: "Journal of Advanced Pharmaceutical Sciences",
//     coverImage: "/images/journals/pharma.jpg",
//     issn: "2345-6789",
//     index: "Scopus Q4",
//   },
// ];

// function AnimatedStat({ stat, dark = false }) {
//   const { ref, value } = useCountUp(stat.value);

//   const Icon = stat.icon;

//   return (
//     <div
//       ref={ref}
//       className={`flex flex-col items-center text-center ${
//         dark ? "text-white" : "text-slate-900"
//       }`}
//     >
//       <div
//         className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full ${
//           dark ? "bg-white/10 text-[#d7a652]" : "bg-[#eef1f0] text-[#063f40]"
//         }`}
//       >
//         <Icon size={23} strokeWidth={1.8} />
//       </div>

//       <div className="font-heading text-2xl font-semibold sm:text-3xl">
//         {value.toLocaleString()}
//         {stat.suffix}
//       </div>

//       <div
//         className={`mt-1 text-xs sm:text-sm ${
//           dark ? "text-white/70" : "text-slate-600"
//         }`}
//       >
//         {stat.label}
//       </div>
//     </div>
//   );
// }

// function ServiceCard({ service, index }) {
//   const Icon = service.icon;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, amount: 0.15 }}
//       transition={{ duration: 0.5, delay: index * 0.08 }}
//       whileHover={{
//         y: -8,
//         transition: { duration: 0.25 },
//       }}
//       className="group rounded-xl border border-slate-200 bg-white p-6 shadow-[0_5px_25px_rgba(5,45,46,0.06)] transition-shadow duration-300 hover:shadow-[0_15px_40px_rgba(5,45,46,0.12)]"
//     >
//       <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#eef1f0] text-[#063f40] transition-all duration-300 group-hover:bg-[#063f40] group-hover:text-[#d7a652]">
//         <Icon size={23} />
//       </div>

//       <h3 className="font-heading text-lg font-semibold text-[#073e40]">
//         {service.title}
//       </h3>

//       <p className="mt-4 min-h-[78px] text-sm leading-6 text-slate-600">
//         {service.description}
//       </p>

//       <button className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#073e40] transition-all group-hover:gap-4">
//         Learn More
//         <ArrowRight size={16} />
//       </button>
//     </motion.div>
//   );
// }

// function JournalItem({ journal, index }) {
//   return (
//     <motion.article
//       initial={{ opacity: 0, y: 25 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.5, delay: index * 0.08 }}
//       whileHover={{ y: -5 }}
//       className="min-w-[190px] flex-1"
//     >
//       <div className="overflow-hidden rounded-sm bg-slate-100">
//         <img
//           src={journal.coverImage}
//           alt={journal.title}
//           className="aspect-[3/4] w-full object-cover transition-transform duration-500 hover:scale-105"
//         />
//       </div>

//       <h3 className="mt-4 line-clamp-3 text-sm font-semibold leading-5 text-[#073e40]">
//         {journal.title}
//       </h3>

//       <p className="mt-3 text-xs text-slate-500">ISSN: {journal.issn}</p>

//       <span className="mt-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-[11px] text-slate-600">
//         {journal.index}
//       </span>
//     </motion.article>
//   );
// }

// export default function Home() {
//   const [journals, setJournals] = useState(FALLBACK_JOURNALS);

//   useEffect(() => {
//     getJournals()
//       .then((data) => {
//         if (data?.length) {
//           setJournals(data.slice(0, 5));
//         }
//       })
//       .catch(() => {});
//   }, []);

//   return (
//     <>
//       <Seo
//         title="Home"
//         description="Pure Publications is your dedicated partner in academic excellence and professional writing."
//         keywords="academic publishing, journals, research papers, publication"
//         path="/"
//         jsonLd={{
//           "@context": "https://schema.org",
//           "@type": "Organization",
//           name: SITE_NAME,
//           description: SITE_TAGLINE,
//         }}
//       />

//     {/* HERO */}
// <section className="relative overflow-hidden bg-white">
//   <div className="mx-auto flex min-h-[650px] max-w-[1280px] items-center px-6 pt-[110px] pb-14 lg:grid lg:grid-cols-[48%_52%] lg:gap-6">

//     {/* LEFT CONTENT */}
//     <motion.div
//       initial={{ opacity: 0, x: -40 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.7 }}
//       className="z-10 max-w-[520px]"
//     >
//       <h1 className="font-heading text-[42px] font-medium leading-[1.08] text-[#073e40] sm:text-[52px] lg:text-[64px]">
//         Where Your
//         <br />
//         Research Meets
//         <br />
//         <span className="text-[#d2a052]">Recognition</span>
//       </h1>

//       <p className="mt-7 max-w-[430px] text-[18px] leading-8 text-slate-600">
//         Your dedicated partner in academic excellence
//         and professional writing.
//       </p>

//       <div className="mt-9 flex flex-wrap gap-5">

//         <Button
//           to="/services"
//           showArrow
//           className="h-[56px] rounded-xl bg-[#073e40] px-8 text-white hover:bg-[#0b5355]"
//         >
//           Explore Services
//         </Button>

//         <Button
//           to="/submit-paper"
//           variant="outlineDark"
//           showArrow
//           className="h-[56px] rounded-xl border-2 border-[#d9d9d9] px-8"
//         >
//           Submit Your Paper
//         </Button>

//       </div>
//     </motion.div>

//     {/* RIGHT IMAGE */}
//     <motion.div
//       initial={{ opacity: 0, x: 40 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.8 }}
//       className="relative hidden justify-end lg:flex"
//     >
//       <img
//         src={heroBackground}
//         alt="Research"
//         className="w-full max-w-[760px] rounded-l-[70px] rounded-br-[70px] object-contain"
//         draggable={false}
//       />
//     </motion.div>

//   </div>

// </section>

//       {/* INDEXING STRIP */}
//       <section className="container-custom py-8">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.98 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           className="flex flex-wrap items-center justify-center gap-7 rounded-2xl bg-[#063f40] px-6 py-6 text-white lg:justify-between"
//         >
//           <span className="text-sm font-semibold text-[#d7a652]">
//             Trusted & Indexed By
//           </span>

//           <span className="text-xl font-semibold">Crossref</span>
//           <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-[#073e40]">
//             DOI
//           </span>
//           <span className="text-xl font-medium">Google Scholar</span>
//           <span className="text-sm">OPEN ACCESS</span>
//           <span className="text-xl">ORCID</span>
//           <span className="text-xl">Scopus</span>
//           <span className="text-lg font-bold">ISI</span>

//           <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d7a652] text-[#d7a652] transition hover:bg-[#d7a652] hover:text-[#073e40]">
//             <ArrowRight size={18} />
//           </button>
//         </motion.div>
//       </section>

//       {/* SERVICES */}
//       <section className="container-custom py-14 lg:py-20">
//         <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
//           <div>
//             <span className="text-sm font-semibold uppercase tracking-wide text-[#d2a052]">
//               Our Services
//             </span>

//             <h2 className="mt-2 font-heading text-3xl font-semibold text-[#073e40] sm:text-4xl">
//               Elevate Your Academic Success
//             </h2>

//             <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
//               Comprehensive services designed to support your research journey
//               from idea to publication.
//             </p>
//           </div>

//           <Button to="/services" variant="primary" showArrow>
//             View All Services
//           </Button>
//         </div>

//         <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
//           {SERVICES.map((service, index) => (
//             <ServiceCard key={service.title} service={service} index={index} />
//           ))}
//         </div>
//       </section>

//       {/* JOURNALS */}
//       <section className="container-custom py-10 lg:py-16">
//         <div className="mb-8 flex items-end justify-between">
//           <div>
//             <h2 className="font-heading text-3xl font-semibold text-[#073e40]">
//               Latest Additions
//             </h2>

//             <p className="mt-2 text-sm text-slate-600">
//               Discover the newest entries in our Latest Additions section!
//             </p>
//           </div>

//           <Button
//             to="/journals"
//             variant="ghost"
//             showArrow
//             className="hidden sm:flex"
//           >
//             View all journals
//           </Button>
//         </div>

//         <div className="relative">
//           <button className="absolute -left-5 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md lg:flex">
//             <ChevronLeft size={20} />
//           </button>

//           <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
//             {journals.slice(0, 5).map((journal, index) => (
//               <JournalItem key={journal.id} journal={journal} index={index} />
//             ))}
//           </div>

//           <button className="absolute -right-5 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md lg:flex">
//             <ChevronRight size={20} />
//           </button>
//         </div>

//         <div className="mt-8 flex justify-center gap-2">
//           <span className="h-1.5 w-7 rounded-full bg-[#073e40]" />
//           <span className="h-1.5 w-7 rounded-full bg-slate-300" />
//           <span className="h-1.5 w-7 rounded-full bg-slate-300" />
//           <span className="h-1.5 w-7 rounded-full bg-slate-300" />
//         </div>
//       </section>

//       {/* DARK STATS */}
//       <section className="container-custom py-8">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="grid grid-cols-2 gap-8 rounded-3xl bg-[#063f40] px-6 py-10 sm:grid-cols-3 lg:grid-cols-6"
//         >
//           {BOTTOM_STATS.map((stat) => (
//             <AnimatedStat key={stat.label} stat={stat} dark />
//           ))}
//         </motion.div>
//       </section>

//       {/* CTA */}
//       <section className="container-custom py-2 pb-16">
//         <AnimatedSection>
//           <div className="relative overflow-hidden rounded-3xl bg-[#0b4a4b] px-8 py-10 lg:px-12">
//             <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1.1fr_1fr_1fr]">
//               <h2 className="font-heading text-3xl font-semibold leading-tight text-white lg:text-4xl">
//                 Ready to Publish
//                 <br />
//                 Your Research?
//               </h2>

//               <p className="text-sm leading-6 text-white/80">
//                 Join thousands of researchers who trust Pure Publications for
//                 their academic journey.
//               </p>

//               <Button
//                 to="/submit-paper"
//                 variant="primary"
//                 showArrow
//                 className="justify-self-start"
//               >
//                 Submit Your Paper
//               </Button>
//             </div>

//             <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[url('/images/cta-open-book.jpg')] bg-cover bg-right opacity-70" />
//           </div>
//         </AnimatedSection>
//       </section>

     
//     </>
//   );
// }
