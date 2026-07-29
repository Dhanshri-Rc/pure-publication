import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  Clock3,
  FileCheck2,
  FileText,
  Globe2,
  GraduationCap,
  Handshake,
  Headphones,
  LockKeyhole,
  MessageSquareText,
  PenLine,
  Send,
  ShieldCheck,
  Users2,
} from "lucide-react";

import Seo from "../components/Seo";
import servicesBg from "../assets/images/services-bg.png";
import serviceCta from "../assets/images/servicecta.png";

/* =========================================================
   PAGE DATA
========================================================= */

const HERO_STATS = [
  {
    icon: FileText,
    value: 15000,
    suffix: "+",
    label: "Articles Published",
  },
  {
    icon: Award,
    value: 98,
    suffix: "%",
    label: "Author Satisfaction",
  },
];

const SERVICES = [
  {
    icon: BookOpen,
    title: "Article Publication",
    description:
      "Navigate the publication process with ease in Scopus, ESCI, and more.",
  },
  {
    icon: FileText,
    title: "Proofreading Services",
    description:
      "Elevate the quality of your manuscripts with expert proofreading and editing.",
  },
  {
    icon: Handshake,
    title: "Collaboration Services",
    description:
      "Connect with leading experts to enhance your research impact.",
  },
  {
    icon: PenLine,
    title: "Paper Writing Assistance",
    description:
      "Get professional support for well-structured and impactful research.",
  },
  {
    icon: GraduationCap,
    title: "Thesis Writing Services",
    description:
      "Craft your thesis with expert guidance and academic precision.",
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
    description:
      "We maintain the highest standards of academic quality.",
  },
  {
    icon: Clock3,
    title: "Timely Delivery",
    description:
      "On-time delivery without compromising on excellence.",
  },
  {
    icon: Globe2,
    title: "Global Reach",
    description:
      "Serving researchers from 120+ countries worldwide.",
  },
  {
    icon: LockKeyhole,
    title: "Confidentiality",
    description:
      "Your data and research are always secure with us.",
  },
  {
    icon: Headphones,
    title: "End-to-End Support",
    description:
      "We support you from concept to publication.",
  },
];

const STATISTICS = [
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
    label: "Published Articles",
  },
  {
    icon: Globe2,
    value: 120,
    suffix: "+",
    label: "Countries",
  },
  {
    icon: Users2,
    value: 10000,
    suffix: "+",
    label: "Active Authors",
  },
  {
    icon: Award,
    value: 98,
    suffix: "%",
    label: "Author Satisfaction",
  },
];

const PROCESS = [
  {
    step: "01",
    icon: MessageSquareText,
    title: "Consultation",
    description: "Share your requirements with our experts.",
  },
  {
    step: "02",
    icon: FileCheck2,
    title: "Planning",
    description: "We create a tailored strategy for your needs.",
  },
  {
    step: "03",
    icon: PenLine,
    title: "Execution",
    description: "Our team works on your research with precision.",
  },
  {
    step: "04",
    icon: ShieldCheck,
    title: "Quality Check",
    description: "Rigorous quality checks ensure excellence.",
  },
  {
    step: "05",
    icon: Send,
    title: "Delivery",
    description: "Timely delivery of the final output.",
  },
  {
    step: "06",
    icon: BookOpen,
    title: "Publication Support",
    description: "We assist you through the publication process.",
  },
];

const CTA_FEATURES = [
  "Expert Guidance",
  "Timely Support",
  "Quality Services",
  "Global Recognition",
];

/* =========================================================
   ANIMATION CONFIGURATION
========================================================= */

const ease = [0.22, 1, 0.36, 1];

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
      ease,
    },
  },
};

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -42,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease,
    },
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 42,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease,
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
   SECTION HEADING
========================================================= */

function SectionHeading({
  eyebrow,
  title,
  description,
  centered = true,
  light = false,
  className = "",
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      className={`${centered ? "text-center" : "text-left"} ${className}`}
    >
      <p
        className={`mb-2 text-[11px] font-bold uppercase tracking-[0.1em] ${
          light ? "text-[#d7a84e]" : "text-[#c9953e]"
        }`}
      >
        {eyebrow}
      </p>

      <h2
        className={`font-serif text-[22px] font-semibold leading-tight sm:text-[28px] ${
          light ? "text-white" : "text-[#063330]"
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mx-auto mt-3 max-w-[690px] text-[13px] leading-6 sm:text-[14px] ${
            light ? "text-white/75" : "text-[#637371]"
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}

/* =========================================================
   SERVICES PAGE
========================================================= */

export default function Services() {
  return (
    <>
      <Seo
        title="Services | Pure Publications"
        description="Explore Pure Publications' article publication, proofreading, research collaboration, paper writing, thesis writing, quality assurance, and global publication support services."
        path="/services"
      />

      <main className="overflow-hidden bg-white text-[#253b3a]">
        {/* =================================================
            HERO
        ================================================= */}
        <section
          className="
            relative
            min-h-[390px]
            overflow-hidden
            bg-white
            bg-cover
            bg-[68%_center]
            bg-no-repeat
            sm:min-h-[420px]
            lg:min-h-[470px]
            lg:bg-center
          "
          style={{
            backgroundImage: `url(${servicesBg})`,
          }}
        >
          <div
            className="
              mx-auto
              flex
              min-h-[390px]
              max-w-[1440px]
              items-center
              px-5
              py-10
              sm:min-h-[420px]
              sm:px-8
              lg:min-h-[470px]
              lg:px-16
              xl:px-20
            "
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="relative z-10 w-full max-w-[650px]"
            >
              <motion.div variants={fadeUp}>
                <div className="mb-7 mt-2 flex items-center gap-3 text-[13px] font-medium text-[#536563]">
                  <Link
                    to="/"
                    className="transition-colors duration-300 hover:text-[#c9953e]"
                  >
                    Home
                  </Link>

                  <span className="text-[#9ca8a7]">›</span>

                  <span className="font-semibold text-[#173f3c]">
                    Services
                  </span>
                </div>
              </motion.div>

              <motion.h1
                variants={fadeLeft}
                className="
                  font-serif
                  font-semibold
                  leading-[1.04]
                  text-[#063330]
                  text-[30px]
             sm:text-[38px]
             lg:text-[44px]
                "
              >
                Our{" "}
                <span className="text-[#d0a151]">
                  Services
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="
                  mt-6
                  max-w-[610px]
                  text-[14px]
                  leading-7
                  text-[#4f605f]
                  sm:text-[16px]
                "
              >
                Comprehensive solutions designed to support researchers,
                authors, and institutions at every stage of their academic
                journey.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-10 flex flex-wrap items-center gap-x-12 gap-y-6"
              >
                {HERO_STATS.map((stat) => {
                  const Icon = stat.icon;

                  return (
                    <motion.div
                      key={stat.label}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.25 }}
                      className="group flex items-center gap-4"
                    >
                      <div
                        className="
                          flex
                          h-[52px]
                          w-[52px]
                          shrink-0
                          items-center
                          justify-center
                          rounded-[10px]
                          bg-[#003f3b]
                          text-white
                          shadow-[0_8px_20px_rgba(0,63,59,0.18)]
                          transition-all
                          duration-300
                          group-hover:bg-[#c9953e]
                        "
                      >
                        <Icon
                          size={24}
                          strokeWidth={1.8}
                          className="transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>

                      <div>
                        <p className="font-serif text-[26px] font-[550] leading-none text-[#183f3c]">
                          <AnimatedCounter
                            value={stat.value}
                            suffix={stat.suffix}
                          />
                        </p>

                        <p className="mt-2 text-[12px] font-medium text-[#637371]">
                          {stat.label}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/35 via-white/5 to-transparent lg:hidden" />
        </section>

        {/* =================================================
            WHAT WE OFFER
        ================================================= */}
        <section className="bg-white px-5 py-10 sm:px-8 lg:px-16 lg:py-12 xl:px-20">
          <div className="mx-auto max-w-[1320px]">
            <SectionHeading
              eyebrow="What We Offer"
              title="Elevate Your Academic Success"
              description="From publication to promotional support, our services are tailored to ensure your research receives the recognition it deserves."
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
            >
              {SERVICES.map((service) => {
                const Icon = service.icon;

                return (
                  <motion.article
                    key={service.title}
                    variants={fadeUp}
                    whileHover={{
                      y: -9,
                      scale: 1.015,
                    }}
                    transition={{
                      duration: 0.28,
                      ease,
                    }}
                    className="
                      group
                      flex
                      min-h-[230px]
                      flex-col
                      rounded-[10px]
                      border
                      border-[#e1e8e6]
                      bg-white
                      px-5
                      py-6
                      shadow-[0_8px_26px_rgba(7,54,50,0.055)]
                      transition-shadow
                      duration-300
                      hover:shadow-[0_20px_45px_rgba(7,54,50,0.13)]
                    "
                  >
                    <div
                      className="
                        flex
                        h-[52px]
                        w-[52px]
                        items-center
                        justify-center
                        rounded-[9px]
                        bg-[#003f3b]
                        text-white
                        shadow-[0_8px_18px_rgba(0,63,59,0.18)]
                        transition-all
                        duration-300
                        group-hover:rotate-[5deg]
                        group-hover:bg-[#c9953e]
                      "
                    >
                      <Icon size={25} strokeWidth={1.7} />
                    </div>

                    <h3 className="mt-6 text-[14px] font-[550] text-[#153c39]">
                      {service.title}
                    </h3>

                    <p className="mt-4 flex-1 text-[12px] leading-6 text-[#657573]">
                      {service.description}
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
        <section className="bg-white px-5 pb-20 pt-2 sm:px-8 lg:px-16 xl:px-20">
          <div className="mx-auto max-w-[1320px]">
            <SectionHeading
              eyebrow="Why Choose Us"
              title="Your Research, Our Priority"
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
                    transition={{ duration: 0.28 }}
                    className={`group px-5 text-center ${
                      index < BENEFITS.length - 1
                        ? "xl:border-r xl:border-dashed xl:border-[#d8e0df]"
                        : ""
                    }`}
                  >
                    <div
                      className="
                        mx-auto
                        flex
                        h-[51px]
                        w-[51px]
                        items-center
                        justify-center
                        rounded-full
                        bg-[#003f3b]
                        text-white
                        shadow-[0_8px_18px_rgba(0,63,59,0.18)]
                        transition-all
                        duration-300
                        group-hover:scale-110
                        group-hover:bg-[#c9953e]
                      "
                    >
                      <Icon size={24} strokeWidth={1.8} />
                    </div>

                    <h3 className="mt-5 text-[13px] font-[550] text-[#163d3a]">
                      {benefit.title}
                    </h3>

                    <p className="mx-auto mt-4 max-w-[165px] text-[11px] leading-5 text-[#637371]">
                      {benefit.description}
                    </p>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* =================================================
            STATISTICS BANNER
        ================================================= */}
        <section className="bg-white px-5 pb-16 sm:px-8 lg:px-16 xl:px-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="
              relative
              mx-auto
              max-w-[1320px]
              overflow-hidden
              rounded-[12px]
              bg-[#003f3b]
              px-7
              py-9
              shadow-[0_18px_45px_rgba(0,63,59,0.16)]
              sm:px-10
              lg:px-11
            "
          >
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255,255,255,.3) 51px)",
              }}
            />

            <div className="absolute -bottom-32 right-10 h-72 w-[460px] rounded-[50%] bg-white/5 blur-3xl" />

            <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[0.78fr_2fr]">
              <motion.div
                variants={fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h2 className="font-serif text-[22px] font-semibold leading-[1.08] text-white sm:text-[25px]">
                  Empowering Research,
                  <span className="block">Enriching Knowledge</span>
                </h2>

                <p className="mt-4 max-w-[390px] text-[12px] leading-6 text-white/80">
                  We are committed to providing world-class academic services
                  that help researchers publish, collaborate, and grow.
                </p>

                <motion.div
                  className="mt-6 inline-block"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    to="/submit-paper"
                    className="
                      group
                      inline-flex
                      min-h-[43px]
                      items-center
                      gap-5
                      rounded-[6px]
                      bg-[#d5a34a]
                      px-6
                      text-[12px]
                      font-semibold
                      text-[#073a37]
                      shadow-[0_10px_24px_rgba(0,0,0,0.18)]
                      transition-all
                      duration-300
                      hover:bg-white
                    "
                  >
                    Submit Your Paper

                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="grid grid-cols-2 gap-y-8 sm:grid-cols-3 xl:grid-cols-5"
              >
                {STATISTICS.map((stat, index) => {
                  const Icon = stat.icon;

                  return (
                    <motion.div
                      key={stat.label}
                      variants={fadeUp}
                      whileHover={{ y: -6 }}
                      className={`group px-4 text-center ${
                        index < STATISTICS.length - 1
                          ? "xl:border-r xl:border-dashed xl:border-white/25"
                          : ""
                      }`}
                    >
                      <Icon
                        size={34}
                        strokeWidth={1.7}
                        className="mx-auto text-[#d6a540] transition-transform duration-300 group-hover:scale-110"
                      />

                      <p className="mt-4 font-serif text-[24px] font-[550] leading-none text-white">
                        <AnimatedCounter
                          value={stat.value}
                          suffix={stat.suffix}
                        />
                      </p>

                      <p className="mt-2 text-[11px] text-white/90">
                        {stat.label}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* =================================================
            PROCESS
        ================================================= */}
        <section className="bg-white px-5 pb-18 sm:px-8 lg:px-16 xl:px-20">
          <div className="mx-auto max-w-[1320px]">
            <SectionHeading
              eyebrow="Our Process"
              title="How It Works"
              centered={false}
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="
                relative
                mt-10
                grid
                gap-y-10
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-6
              "
            >
              <div className="absolute left-[7%] right-[7%] top-[38px] hidden border-t border-dashed border-[#cbd5d3] xl:block" />

              {PROCESS.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.article
                    key={item.step}
                    variants={fadeUp}
                    whileHover={{ y: -7 }}
                    transition={{ duration: 0.28 }}
                    className="group relative z-10 px-4 text-center"
                  >
                    <div
                      className="
                        mx-auto
                        flex
                        h-[66px]
                        w-[66px]
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#d4dcda]
                        bg-white
                        text-[#16413e]
                        shadow-[0_7px_20px_rgba(7,54,50,0.05)]
                        transition-all
                        duration-300
                        group-hover:border-[#c9953e]
                        group-hover:bg-[#003f3b]
                        group-hover:text-white
                        group-hover:shadow-[0_15px_30px_rgba(0,63,59,0.18)]
                      "
                    >
                      <Icon size={27} strokeWidth={1.7} />
                    </div>

                    <p className="mt-4 text-[10px] font-semibold text-[#c9953e]">
                      {item.step}
                    </p>

                    <h3 className="mt-1 text-[13px] font-bold text-[#153c39]">
                      {item.title}
                    </h3>

                    <p className="mx-auto mt-3 max-w-[170px] text-[11px] leading-5 text-[#657573]">
                      {item.description}
                    </p>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* =================================================
            FINAL CTA
        ================================================= */}
        <section className="bg-white px-5 pb-12 pt-16 sm:px-8 lg:px-16 xl:px-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="
              relative
              mx-auto
              max-w-[1320px]
              overflow-hidden
              rounded-[13px]
              bg-[#003f3b]
              px-7
              py-8
              shadow-[0_18px_42px_rgba(0,63,59,0.17)]
              sm:px-10
              lg:px-12
            "
          >
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,.7) 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            />

            <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[190px_1fr_1.1fr]">
              <motion.div
                variants={fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{
                  rotate: -4,
                  scale: 1.04,
                }}
                transition={{ duration: 0.3 }}
                className="mx-auto w-[150px] sm:w-[170px] lg:mx-0"
              >
                <img
                  src={serviceCta}
                  alt="Research submission envelope"
                  className="h-auto w-full object-contain drop-shadow-[0_18px_20px_rgba(0,0,0,0.25)]"
                />
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center lg:text-left"
              >
                <h2 className="font-serif text-[25px] font-semibold text-white sm:text-[29px]">
                  Ready to Take the Next Step?
                </h2>

                <p className="mt-3 text-[12px] leading-6 text-white/80">
                  Let us help you turn your research into global recognition.
                </p>

                <motion.div
                  className="mt-5 inline-block"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    to="/submit-paper"
                    className="
                      group
                      inline-flex
                      min-h-[43px]
                      items-center
                      gap-5
                      rounded-[6px]
                      bg-[#d6a540]
                      px-6
                      text-[12px]
                      font-semibold
                      text-[#073a37]
                      transition-all
                      duration-300
                      hover:bg-white
                    "
                  >
                    Submit Your Paper Now

                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                variants={fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid gap-x-8 gap-y-5 sm:grid-cols-2"
              >
                {CTA_FEATURES.map((feature) => (
                  <motion.div
                    key={feature}
                    whileHover={{ x: 5 }}
                    className="group flex items-center gap-3"
                  >
                    <CheckCircle2
                      size={18}
                      className="shrink-0 text-[#d6a540] transition-transform duration-300 group-hover:scale-110"
                    />

                    <span className="text-[12px] font-semibold text-white">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}