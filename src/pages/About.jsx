import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  Clock3,
  Eye,
  FileText,
  Globe2,
  Handshake,
  Headphones,
  HeartHandshake,
  Lightbulb,
  LockKeyhole,
  Scale,
  ShieldCheck,
  Target,
  Users2,
} from "lucide-react";

import Seo from "../components/Seo";
import aboutBg from "../assets/images/about-bg.png";
import aboutCta from "../assets/images/aboutcta.png";

/* =========================================================
   PAGE DATA
========================================================= */

const HERO_STATS = [
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
    label: "Articles Published",
  },
  {
    icon: Globe2,
    value: 120,
    suffix: "+",
    label: "Countries",
  },
  {
    icon: Award,
    value: 98,
    suffix: "%",
    label: "Author Satisfaction",
  },
];

const PRINCIPLES = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To provide world-class publishing solutions that empower researchers and promote academic excellence worldwide.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "To be a global leader in academic publishing, fostering innovation, collaboration, and knowledge dissemination.",
  },
  {
    icon: HeartHandshake,
    title: "Our Commitment",
    description:
      "We are committed to integrity, quality, transparency, and supporting the academic community at every step.",
  },
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Quality",
    description:
      "We maintain the highest standards in publishing and peer review.",
  },
  {
    icon: Scale,
    title: "Integrity",
    description:
      "We uphold ethical practices and transparency in everything we do.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We embrace new ideas and technologies to enhance research impact.",
  },
  {
    icon: Users2,
    title: "Collaboration",
    description:
      "We work together with researchers, reviewers, and institutions globally.",
  },
  {
    icon: Globe2,
    title: "Accessibility",
    description:
      "We ensure research is accessible to all and creates a wider impact.",
  },
];

const BENEFITS = [
  {
    icon: Users2,
    title: "Expert Team",
    description:
      "Work with subject matter experts and experienced researchers.",
  },
  {
    icon: BadgeCheck,
    title: "Quality Assurance",
    description: "We maintain the highest standards of academic quality.",
  },
  {
    icon: Clock3,
    title: "Timely Delivery",
    description: "On-time delivery without compromising on excellence.",
  },
  {
    icon: Globe2,
    title: "Global Reach",
    description: "Serving researchers from 120+ countries worldwide.",
  },
  {
    icon: LockKeyhole,
    title: "Confidentiality",
    description: "Your data and research are always secure with us.",
  },
  {
    icon: Headphones,
    title: "End-to-End Support",
    description: "We support you from concept to publication.",
  },
];

const TEAM = [
  {
    name: "Prof. John Smith",
    role: "Editor-in-Chief",
    institution: "University of Oxford,",
    country: "United Kingdom",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=85",
  },
  {
    name: "Prof. Maria Garcia",
    role: "Associate Editor",
    institution: "Stanford University,",
    country: "United States",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=85",
  },
  {
    name: "Prof. Rajesh Kumar",
    role: "Editorial Board Member",
    institution: "IIT Delhi,",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?auto=format&fit=crop&w=500&q=85",
  },
  {
    name: "Prof. Li Wei",
    role: "Editorial Board Member",
    institution: "Tsinghua University,",
    country: "China",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=85",
  },
  {
    name: "Prof. Michael Osei",
    role: "Editorial Board Member",
    institution: "University of Cape Town,",
    country: "South Africa",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=85",
  },
];

/* =========================================================
   ANIMATION SETTINGS
========================================================= */

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

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 45,
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

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
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

/* =========================================================
   COMMON SECTION HEADING
========================================================= */

function SectionHeading({
  eyebrow,
  title,
  centered = true,
  light = false,
  className = "",
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className={`${centered ? "text-center" : "text-left"} ${className}`}
    >
      <p
        className={`mb-2 text-[11px] font-bold uppercase tracking-[0.12em] ${
          light ? "text-[#d7a84e]" : "text-[#c9953e]"
        }`}
      >
        {eyebrow}
      </p>

      <h2
        className={`font-serif text-[22px] font-semibold leading-tight sm:text-[28px] ${
          light ? "text-white" : "text-[#062f2d]"
        }`}
      >
        {title}
      </h2>
    </motion.div>
  );
}

/* =========================================================
   ABOUT PAGE
========================================================= */

export default function About() {
  return (
    <>
      <Seo
        title="About Us | Pure Publications"
        description="Learn about Pure Publications, our mission, vision, values, academic publishing services, global reach, and editorial advisory board."
        path="/about"
      />

      <main className="overflow-hidden bg-white text-[#253b3a]">
        {/* =================================================
            HERO SECTION
        ================================================= */}
        <section
          className="relative overflow-hidden bg-white bg-cover bg-[70%_center] bg-no-repeat
             min-h-[260px]
             sm:min-h-[290px]
             lg:min-h-[320px]
             lg:bg-center"
          style={{
            backgroundImage: `url(${aboutBg})`,
          }}
        >
          <div
            className="mx-auto flex items-center
                  min-h-[260px]
                  sm:min-h-[290px]
                  lg:min-h-[320px]
                  max-w-[1440px]
                  px-5
                  py-8
                  sm:px-8
                  lg:px-16
                  xl:px-20"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="relative z-10 w-full max-w-[690px]"
            >
              <motion.div variants={fadeUp}>
                <div className="mb-5 mt-16 flex items-center gap-3 text-[13px] font-medium text-[#536563]">
                  <Link
                    to="/"
                    className="transition-colors duration-300 hover:text-[#c9953e]"
                  >
                    Home
                  </Link>

                  <span className="text-[#9ca8a7]">›</span>

                  <span className="font-semibold text-[#173f3c]">About Us</span>
                </div>
              </motion.div>

              <motion.h1
                variants={fadeLeft}
                className="font-serif font-semibold leading-[1.05]
             text-[28px]
             sm:text-[32px]
             lg:text-[36px]
             text-[#063330]"
              >
                About
                <span className="mt-2 block text-[#d0a151]">
                  Pure Publications
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-[400px] text-[15px] leading-8 text-[#4a5c5b] sm:text-[16px]"
              >
                Your trusted partner in academic excellence and professional
                writing.
              </motion.p>

              {/* Hero statistics */}
              <motion.div
                variants={fadeUp}
                className="mt-5 grid max-w-[760px] grid-cols-2 overflow-hidden rounded-[12px] border border-white/20 bg-[#003f3b]/95 shadow-[0_18px_40px_rgba(0,49,45,0.26)] backdrop-blur-sm lg:grid-cols-4"
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
            </motion.div>
          </div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/25 via-transparent to-transparent lg:hidden" />
        </section>

        {/* =================================================
            WHO WE ARE
        ================================================= */}
        <section className="bg-white px-5 py-10 sm:px-8 lg:px-16 lg:py-12 xl:px-20">
          <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[0.78fr_1.42fr] lg:gap-16">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="lg:border-r lg:border-[#e2e8e7] lg:pr-14"
            >
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.1em] text-[#c9953e]">
                Who We Are
              </p>

              <h2 className="max-w-[480px] font-serif text-[22px] font-semibold leading-[1.12] text-[#063330] sm:text-[28px]">
                Empowering Research,
                <span className="block">Enriching Knowledge</span>
              </h2>

              <p className="mt-7 max-w-[465px] text-[14px] leading-7 text-[#536563]">
                Pure Publications is a leading academic publisher committed to
                advancing research and knowledge across diverse disciplines. We
                provide a trusted platform for researchers, scholars, and
                institutions to publish, collaborate, and make a global impact.
              </p>

              <motion.div
                className="mt-8 inline-block"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/services"
                  className="group inline-flex min-h-[45px] items-center gap-5 rounded-[6px] bg-[#003f3b] px-6 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(0,63,59,0.2)] transition-all duration-300 hover:bg-[#c9953e] hover:shadow-[0_14px_30px_rgba(201,149,62,0.28)]"
                >
                  Learn More About Us
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              <p className="max-w-[850px] text-[15px] leading-8 text-[#536563]">
                We believe in the power of research to transform societies and
                improve lives. Through our high-quality, peer-reviewed journals
                and professional services, we ensure that valuable research
                receives the recognition it deserves.
              </p>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="mt-9 grid gap-7 md:grid-cols-3"
              >
                {PRINCIPLES.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.article
                      key={item.title}
                      variants={fadeUp}
                      whileHover={{ y: -6 }}
                      className={`group relative ${
                        index < PRINCIPLES.length - 1
                          ? "md:border-r md:border-[#e1e7e6] md:pr-7"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1f6f5] text-[#063f3b] transition-all duration-300 group-hover:bg-[#003f3b] group-hover:text-[#d7a84e]">
                          <Icon size={21} strokeWidth={1.8} />
                        </span>

                        <h3 className="text-[14px] font-bold text-[#173f3c]">
                          {item.title}
                        </h3>
                      </div>

                      <p className="mt-4 text-[12px] leading-6 text-[#647473]">
                        {item.description}
                      </p>
                    </motion.article>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* =================================================
            OUR VALUES
        ================================================= */}
        <section className="bg-[#fdfefe] px-5 pb-20 pt-6 sm:px-8 lg:px-16 xl:px-20">
          <div className="mx-auto max-w-[1320px]">
            <SectionHeading
              eyebrow="Our Values"
              title="Guided by Integrity, Driven by Excellence"
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5"
            >
              {VALUES.map((value) => {
                const Icon = value.icon;

                return (
                  <motion.article
                    key={value.title}
                    variants={fadeUp}
                    whileHover={{
                      y: -9,
                      scale: 1.015,
                    }}
                    transition={{
                      duration: 0.28,
                      ease: easing,
                    }}
                    className="group flex min-h-[238px] flex-col items-center rounded-[10px] border border-[#e3e9e8] bg-white px-6 py-7 text-center shadow-[0_8px_25px_rgba(7,54,50,0.06)] transition-shadow duration-300 hover:shadow-[0_20px_42px_rgba(7,54,50,0.13)]"
                  >
                    <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#003f3b] text-white shadow-[0_8px_18px_rgba(0,63,59,0.2)] transition-all duration-300 group-hover:rotate-[6deg] group-hover:bg-[#c9953e]">
                      <Icon size={26} strokeWidth={1.7} />
                    </div>

                    <h3 className="mt-5 text-[15px] font-bold text-[#163d3a]">
                      {value.title}
                    </h3>

                    <p className="mt-4 text-[12px] leading-6 text-[#647473]">
                      {value.description}
                    </p>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* =================================================
            WHY CHOOSE US
        ================================================= */}
        <section className="relative overflow-hidden bg-[#003f3b] px-5 py-10 sm:px-8 lg:px-16 xl:px-20">
          <div
            className="absolute inset-0 opacity-[0.055]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 45px, rgba(255,255,255,.35) 46px)",
            }}
          />

          <div className="absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#d6a540]/5 blur-3xl" />
          <div className="absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-[1320px]">
            <SectionHeading
              eyebrow="Why Choose Us"
              title="Your Research, Our Priority"
              light
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-10 grid gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
            >
              {BENEFITS.map((benefit, index) => {
                const Icon = benefit.icon;

                return (
                  <motion.article
                    key={benefit.title}
                    variants={fadeUp}
                    whileHover={{ y: -7 }}
                    className={`group px-5 text-center ${
                      index < BENEFITS.length - 1
                        ? "xl:border-r xl:border-white/20"
                        : ""
                    }`}
                  >
                    <Icon
                      size={34}
                      strokeWidth={1.7}
                      className="mx-auto text-[#d7a84e] transition-all duration-300 group-hover:scale-115 group-hover:text-white"
                    />

                    <h3 className="mt-4 text-[13px] font-semibold text-white">
                      {benefit.title}
                    </h3>

                    <p className="mt-4 text-[11px] leading-6 text-white/80">
                      {benefit.description}
                    </p>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </section>

       

        {/* =================================================
            CTA SECTION
        ================================================= */}
        <section className="bg-white px-5 sm:px-8 lg:px-16 xl:px-20 py-12">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            whileHover={{ y: -4 }}
            className="mx-auto flex max-w-[1320px] flex-col items-center gap-7 overflow-hidden rounded-[14px] bg-gradient-to-r from-[#f7f3ed] via-[#fcfaf7] to-[#f4eee6] px-7 py-5 shadow-[0_12px_30px_rgba(7,54,50,0.06)] sm:flex-row sm:justify-between sm:px-10"
          >
            <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
              <motion.div
                whileHover={{ rotate: 4, scale: 1.04 }}
                transition={{ duration: 0.3 }}
                className="h-[98px] w-[98px] shrink-0 overflow-hidden rounded-full border-[3px] border-[#315b56] bg-white shadow-md"
              >
                <img
                  src={aboutCta}
                  alt="Open academic publication book"
                  className="h-full w-full object-cover"
                />
              </motion.div>

              <div>
                <h2 className="max-w-[560px] font-serif text-[20px] font-semibold leading-[1.15] text-[#063330] sm:text-[24px]">
                  Join Thousands of Researchers
                  <span className="block">Who Trust Pure Publications</span>
                </h2>

                <p className="mt-2 text-[13px] text-[#667675]">
                  Let us help you share your research with the world.
                </p>
              </div>
            </div>

            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/submit-paper"
                className="group inline-flex min-h-[48px] min-w-[225px] items-center justify-center gap-10 rounded-[7px] bg-[#003f3b] px-7 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(0,63,59,0.18)] transition-all duration-300 hover:bg-[#c9953e]"
              >
                Submit Your Paper
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </main>
    </>
  );
}
