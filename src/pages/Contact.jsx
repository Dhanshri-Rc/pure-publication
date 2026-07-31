import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  Globe2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";

import Seo from "../components/Seo";
import { submitContactMessage } from "../services/contactService";

import contactHero from "../assets/images/contactus-bg.png";
import submitCta from "../assets/images/submitcta.png";

/* =========================================================
   DATA
========================================================= */

const HERO_STATS = [
  {
    icon: BookOpen,
    value: "25+",
    label: "Journals",
  },
  {
    icon: FileText,
    value: "15,000+",
    label: "Articles Published",
  },
  {
    icon: Globe2,
    value: "120+",
    label: "Countries",
  },
  {
    icon: Award,
    value: "98%",
    label: "Author Satisfaction",
  },
];

const CONTACT_CARDS = [
  {
    icon: MapPin,
    title: "Our Office",
    lines: [
      "Pure Publications",
      "Planet Apartment Omkar Nagar,",
      "Nagpur, Maharashtra 440027",
    ],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+91  84467 23800", "", "(Mon - Fri, 10:00 AM - 6:00 PM IST)"],
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["publicationpure@gmail.com", "", "(We respond within 24 hours)"],
  },
  {
    icon: Clock3,
    title: "Working Hours",
    lines: [
      "Monday - Friday",
      "10:00 AM - 6:00 PM (IST)",
      "",
      "Saturday - Sunday",
      "Closed",
    ],
  },
];

const FAQS = [
  {
    question: "How can I submit my manuscript?",
    answer:
      "You can submit your manuscript through our online submission page. Upload your paper, author details, abstract, keywords, and supporting documents. Our editorial team will confirm receipt after submission.",
  },
  {
    question: "Is there a publication fee?",
    answer:
      "Publication charges depend on the selected journal, article type, editing requirements, and publication services. Our team will provide complete fee details before processing your submission.",
  },
  {
    question: "What is the average review time?",
    answer:
      "The review duration varies by journal and subject area. Most manuscripts receive an initial editorial response within a few working days, followed by the peer-review process.",
  },
  {
    question: "How can I track my manuscript status?",
    answer:
      "You can contact our editorial support team using your manuscript ID. Status updates may include editorial screening, under review, revision requested, accepted, or published.",
  },
];

/* =========================================================
   ANIMATIONS
========================================================= */

const easing = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: easing,
    },
  },
};

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -40,
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
    x: 40,
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
      staggerChildren: 0.09,
    },
  },
};

/* =========================================================
   REUSABLE FORM FIELD
========================================================= */

function FormField({
  label,
  required = false,
  error,
  textarea = false,
  className = "",
  ...props
}) {
  const sharedClasses = `
    w-full
    rounded-[6px]
    border
    bg-white
    px-3.5
    text-[12px]
    text-[#173f3d]
    outline-none
    transition-all
    duration-300
    placeholder:text-[#8c9a99]
    ${
      error
        ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
        : "border-[#dbe4e2] focus:border-[#0a514e] focus:ring-4 focus:ring-[#0a514e]/10"
    }
  `;

  return (
    <div className={className}>
      <label className="sr-only">
        {label}
        {required ? " required" : ""}
      </label>

      {textarea ? (
        <textarea
          {...props}
          rows={5}
          aria-label={label}
          aria-invalid={Boolean(error)}
          className={`${sharedClasses} min-h-[138px] resize-y py-3`}
        />
      ) : (
        <input
          {...props}
          aria-label={label}
          aria-invalid={Boolean(error)}
          className={`${sharedClasses} h-[46px]`}
        />
      )}

      {error && (
        <p className="mt-1.5 text-[10px] font-medium text-red-500">{error}</p>
      )}
    </div>
  );
}

/* =========================================================
   CONTACT PAGE
========================================================= */

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      phone: "",
      affiliation: "",
      message: "",
    },
  });

  // async function onSubmit(data) {
  //   setSubmitError("");

  //   try {
  //     await submitContactMessage(data);
  //     setSubmitted(true);
  //     reset();

  //     window.setTimeout(() => {
  //       setSubmitted(false);
  //     }, 5000);
  //   } catch {
  //     setSubmitError(
  //       "Something went wrong while sending your message. Please try again."
  //     );
  //   }
  // }

  async function onSubmit(data) {
    console.log("Submitting...", data);

    setSubmitError("");
    setSubmitted(false);

    try {
      const documentId = await submitContactMessage(data);

      console.log("Message saved successfully:", documentId);

      setSubmitted(true);
      reset();

      window.setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Contact submission error:", error);

      setSubmitError(
        error?.message ||
          "Something went wrong while sending your message. Please try again.",
      );
    }
  }

  return (
    <>
      <Seo
        title="Contact Us | Pure Publications"
        description="Contact Pure Publications for journal submissions, publication support, academic services, partnerships, and editorial assistance."
        path="/contact"
      />

      <main className="overflow-hidden bg-white text-[#253b3a]">
        {/* =====================================================
            HERO SECTION
        ===================================================== */}

        <section
          className="
            relative
            min-h-[390px]
            overflow-hidden
            bg-white
            bg-cover
            bg-[68%_center]
            bg-no-repeat
            sm:min-h-[430px]
            lg:min-h-[470px]
            lg:bg-center
          "
          style={{
            backgroundImage: `url(${contactHero})`,
          }}
        >
          <div
            className="
              mx-auto
              flex
              min-h-[390px]
              w-full
              max-w-[1440px]
              items-center
              px-5
              py-10
              sm:min-h-[430px]
              sm:px-8
              lg:min-h-[470px]
              lg:px-14
              xl:px-20
            "
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="relative z-10 w-full max-w-[660px]"
            >
              <motion.div variants={fadeUp}>
                <div className="mb-5 mt-16 flex items-center gap-3 text-[12px] font-medium text-[#536563]">
                  <Link
                    to="/"
                    className="transition-colors duration-300 hover:text-[#c9953e]"
                  >
                    Home
                  </Link>

                  <span className="text-[#9ca8a7]">›</span>

                  <span className="font-semibold text-[#173f3c]">
                    Contact Us
                  </span>
                </div>
              </motion.div>

              <motion.h1
                variants={fadeLeft}
                className="
                  font-serif
                  font-[600]
                  leading-[1.04]
                  tracking-[-0.025em]
                  text-[#063330]
                  text-[28px]
             sm:text-[32px]
             lg:text-[36px]
                "
              >
                Get in Touch
                <span className="mt-2 block text-[#d0a151]">
                  We’re Here to Help
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="
                  mt-5
                  max-w-[550px]
                  text-[14px]
                  leading-7
                  text-[#536563]
                  sm:text-[15px]
                "
              >
                Have questions or need assistance? Our team is ready to support
                you at every step of your research journey.
              </motion.p>

              {/* Hero statistics */}

              <motion.div
                variants={fadeUp}
                className="
                  mt-5
                  grid
                  max-w-[780px]
                  grid-cols-2
                  overflow-hidden
                  rounded-[10px]
                  border
                  border-white/15
                  bg-[#003f3b]
                  shadow-[0_16px_38px_rgba(0,49,45,0.24)]
                  lg:grid-cols-4
                "
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
                      className={`
                        group
                        relative
                        flex
                        min-h-[82px]
                        items-center
                        gap-3
                        px-4
                        py-3.5
                        sm:px-5
                        ${
                          index < HERO_STATS.length - 1
                            ? "lg:after:absolute lg:after:right-0 lg:after:top-1/2 lg:after:h-12 lg:after:w-px lg:after:-translate-y-1/2 lg:after:bg-white/20"
                            : ""
                        }
                      `}
                    >
                      <Icon
                        size={28}
                        strokeWidth={1.8}
                        className="shrink-0 text-[#d6a540] transition-transform duration-300 group-hover:scale-110"
                      />

                      <div>
                        <p className="font-serif text-[22px] font-[550] leading-none text-white">
                          {stat.value}
                        </p>

                        <p className="mt-2 whitespace-nowrap text-[9px] font-medium text-white/90 sm:text-[10px]">
                          {stat.label}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* =====================================================
            CONTACT INFORMATION CARDS
        ===================================================== */}

        <section className="bg-white px-5 py-10 sm:px-8 lg:px-14 lg:py-12 xl:px-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="mx-auto grid w-full max-w-[1320px] gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            {CONTACT_CARDS.map((card) => {
              const Icon = card.icon;

              return (
                <motion.article
                  key={card.title}
                  variants={fadeUp}
                  whileHover={{
                    y: -7,
                    scale: 1.01,
                  }}
                  transition={{
                    duration: 0.28,
                    ease: easing,
                  }}
                  className="
                    group
                    min-h-[190px]
                    rounded-[10px]
                    border
                    border-[#e1e8e6]
                    bg-white
                    px-5
                    py-6
                    shadow-[0_7px_22px_rgba(7,54,50,0.045)]
                    transition-shadow
                    duration-300
                    hover:shadow-[0_18px_40px_rgba(7,54,50,0.12)]
                  "
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[#f0f5f4]
                        text-[#06413e]
                        transition-all
                        duration-300
                        group-hover:bg-[#003f3b]
                        group-hover:text-[#d6a540]
                      "
                    >
                      <Icon size={23} strokeWidth={1.8} />
                    </div>

                    <div>
                      <h2 className="text-[15px] font-[550] text-[#173f3c]">
                        {card.title}
                      </h2>

                      <div className="mt-3 space-y-1 text-[13px] leading-5 text-[#61716f]">
                        {card.lines.map((line, index) =>
                          line ? (
                            <p key={`${card.title}-${index}`}>{line}</p>
                          ) : (
                            <div
                              key={`${card.title}-${index}`}
                              className="h-1"
                            />
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </section>

        {/* =====================================================
            FORM AND MAP
        ===================================================== */}

        <section className="bg-white px-5 pb-10 sm:px-8 lg:px-14 xl:px-20">
          <div className="mx-auto grid w-full max-w-[1320px] gap-5 lg:grid-cols-2">
            {/* Contact form */}

            <motion.section
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="
                rounded-[10px]
                border
                border-[#e1e8e6]
                bg-white
                p-5
                shadow-[0_7px_24px_rgba(7,54,50,0.045)]
                sm:p-6
              "
            >
              <div className="mb-5">
                <h2 className="font-serif text-[25px] font-semibold text-[#063330]">
                  Send Us a Message
                </h2>

                <span className="mt-2 block h-[2px] w-10 bg-[#d0a151]" />

                <p className="mt-5 max-w-[530px] text-[12px] leading-6 text-[#647473]">
                  Fill out the form below and our team will get back to you as
                  soon as possible.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{
                      opacity: 0,
                      scale: 0.94,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.94,
                    }}
                    className="
                      flex
                      min-h-[385px]
                      flex-col
                      items-center
                      justify-center
                      rounded-[10px]
                      border
                      border-green-200
                      bg-green-50
                      px-6
                      text-center
                    "
                  >
                    <CheckCircle2 size={50} className="text-green-500" />

                    <h3 className="mt-4 font-serif text-[23px] font-semibold text-[#173f3c]">
                      Message Sent!
                    </h3>

                    <p className="mt-2 max-w-[360px] text-[12px] leading-6 text-[#60716f]">
                      Thank you for contacting us. Our team will respond within
                      24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="space-y-3"
                  >
                    <div className="grid gap-3 sm:grid-cols-2">
                      <FormField
                        label="Full Name"
                        required
                        placeholder="Full Name *"
                        error={errors.name?.message}
                        {...register("name", {
                          required: "Full name is required.",
                          minLength: {
                            value: 2,
                            message: "Enter at least two characters.",
                          },
                        })}
                      />

                      <FormField
                        label="Email Address"
                        required
                        type="email"
                        placeholder="Email Address *"
                        error={errors.email?.message}
                        {...register("email", {
                          required: "Email address is required.",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address.",
                          },
                        })}
                      />
                    </div>

                    <FormField
                      label="Subject"
                      required
                      placeholder="Subject *"
                      error={errors.subject?.message}
                      {...register("subject", {
                        required: "Subject is required.",
                      })}
                    />

                    <div className="grid gap-3 sm:grid-cols-2">
                      <FormField
                        label="Phone Number"
                        type="tel"
                        placeholder="Phone Number"
                        error={errors.phone?.message}
                        {...register("phone", {
                          pattern: {
                            value: /^[+()\d\s-]{7,20}$/,
                            message: "Enter a valid phone number.",
                          },
                        })}
                      />

                      <FormField
                        label="Your Affiliation"
                        placeholder="Your Affiliation"
                        error={errors.affiliation?.message}
                        {...register("affiliation")}
                      />
                    </div>

                    <FormField
                      label="Your Message"
                      required
                      textarea
                      placeholder="Your Message *"
                      error={errors.message?.message}
                      {...register("message", {
                        required: "Message is required.",
                        minLength: {
                          value: 10,
                          message:
                            "Message must contain at least 10 characters.",
                        },
                      })}
                    />

                    {submitError && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-md bg-red-50 px-3 py-2 text-[11px] font-medium text-red-600"
                      >
                        {submitError}
                      </motion.p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={
                        isSubmitting
                          ? undefined
                          : {
                              y: -2,
                            }
                      }
                      whileTap={
                        isSubmitting
                          ? undefined
                          : {
                              scale: 0.99,
                            }
                      }
                      className="
                        group
                        flex
                        min-h-[45px]
                        w-full
                        items-center
                        justify-center
                        gap-4
                        rounded-[6px]
                        bg-[#003f3b]
                        px-6
                        text-[12px]
                        font-semibold
                        text-white
                        shadow-[0_8px_20px_rgba(0,63,59,0.18)]
                        transition-all
                        duration-300
                        hover:bg-[#c9953e]
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                    >
                      {isSubmitting ? "Sending Message..." : "Send Message"}

                      <Send
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                      />
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.section>

            {/* Location map */}

            <motion.section
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="
                rounded-[10px]
                border
                border-[#e1e8e6]
                bg-white
                p-5
                shadow-[0_7px_24px_rgba(7,54,50,0.045)]
                sm:p-6
              "
            >
              <div className="mb-5">
                <h2 className="font-serif text-[25px] font-semibold text-[#063330]">
                  Our Location
                </h2>

                <span className="mt-2 block h-[2px] w-10 bg-[#d0a151]" />
              </div>

              <div className="relative min-h-[435px] overflow-hidden rounded-[8px] border border-[#e0e7e5]">
                <iframe
                  title="Pure Publications Location"
                  src="https://www.google.com/maps?q=Pure+Publications,+Nagpur,+Maharashtra&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 }}
                  className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-[38%]
                    z-10
                    w-[185px]
                    -translate-x-1/2
                    rounded-[7px]
                    bg-[#003f3b]
                    px-4
                    py-3
                    text-white
                    shadow-[0_12px_30px_rgba(0,49,45,0.28)]
                  "
                >
                  <p className="text-[11px] font-[550]">Pure Publications</p>

                  <p className="mt-1 text-[9px] leading-4 text-white/85">
                    Planet Apartment Omkar Nagar,
                    <br />
                    Nagpur, Maharashtra 440027
                  </p>

                  <span
                    className="
                      absolute
                      -bottom-2
                      left-1/2
                      h-4
                      w-4
                      -translate-x-1/2
                      rotate-45
                      bg-[#003f3b]
                    "
                  />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-[62%]
                    z-10
                    flex
                    h-10
                    w-10
                    -translate-x-1/2
                    items-center
                    justify-center
                    rounded-full
                    bg-[#003f3b]
                    text-white
                    shadow-lg
                  "
                >
                  <MapPin size={20} />
                </motion.div>
              </div>
            </motion.section>
          </div>
        </section>

        {/* =====================================================
            FAQ SECTION
        ===================================================== */}

        <section className="bg-white px-5 pb-10 sm:px-8 lg:px-14 xl:px-20">
          <div className="mx-auto w-full max-w-[1320px]">
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <motion.div
                variants={fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h2 className="font-serif text-[26px] font-semibold text-[#063330]">
                  Frequently Asked Questions
                </h2>

                <span className="mt-2 block h-[2px] w-10 bg-[#d0a151]" />
              </motion.div>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="grid gap-3 lg:grid-cols-2"
            >
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <motion.article
                    key={faq.question}
                    variants={fadeUp}
                    layout
                    className="
                      overflow-hidden
                      rounded-[8px]
                      border
                      border-[#e1e8e6]
                      bg-white
                      shadow-[0_5px_17px_rgba(7,54,50,0.035)]
                      transition-shadow
                      duration-300
                      hover:shadow-[0_12px_28px_rgba(7,54,50,0.09)]
                    "
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setOpenFaq(isOpen ? null : index);
                      }}
                      aria-expanded={isOpen}
                      className="
                        flex
                        min-h-[52px]
                        w-full
                        items-center
                        justify-between
                        gap-4
                        px-5
                        py-3
                        text-left
                      "
                    >
                      <span className="text-[12px] font-semibold text-[#173f3c]">
                        {faq.question}
                      </span>

                      <motion.span
                        animate={{
                          rotate: isOpen ? 180 : 0,
                        }}
                        transition={{ duration: 0.25 }}
                        className="
                          flex
                          h-7
                          w-7
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          text-[#174643]
                          transition-colors
                          duration-300
                          hover:bg-[#eef4f2]
                        "
                      >
                        <ChevronDown size={16} />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            duration: 0.3,
                            ease: easing,
                          }}
                        >
                          <p className="border-t border-[#edf1f0] px-5 py-4 text-[11px] leading-6 text-[#667674]">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* =====================================================
            SUBMISSION CTA
        ===================================================== */}

        <section className="bg-white px-5 pb-12 sm:px-8 lg:px-14 xl:px-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ y: -4 }}
            className="
              relative
              mx-auto
              flex
              w-full
              max-w-[1320px]
              flex-col
              items-center
              gap-7
              overflow-hidden
              rounded-[12px]
              bg-[#003f3b]
              px-6
              py-2
              shadow-[0_16px_38px_rgba(0,63,59,0.17)]
              sm:flex-row
              sm:justify-between
              sm:px-10
            "
          >
            <div
              className="absolute inset-0 opacity-[0.055]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,.8) 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            />

            <div className="relative z-10 flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
              <motion.img
                src={submitCta}
                alt="Research manuscript submission envelope"
                whileHover={{
                  rotate: -5,
                  scale: 1.05,
                }}
                transition={{ duration: 0.3 }}
                className="h-[90px] w-[90px] shrink-0 object-contain drop-shadow-[0_12px_14px_rgba(0,0,0,0.2)]"
              />

              <div>
                <h2 className="font-serif text-[20px] font-semibold text-white sm:text-[22px]">
                  Ready to Share Your Research?
                </h2>

                <p className="mt-2 text-[12px] leading-6 text-white/80">
                  Submit your manuscript now and take the next step toward
                  global recognition.
                </p>
              </div>
            </div>

            <motion.div
              className="relative z-10"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to="/submit-paper"
                className="
                  group
                  inline-flex
                  min-h-[42px]
                  min-w-[200px]
                  items-center
                  justify-center
                  gap-8
                  rounded-[7px]
                  bg-[#d6a540]
                  px-7
                  text-[13px]
                  font-semibold
                  text-[#073a37]
                  shadow-[0_9px_22px_rgba(0,0,0,0.17)]
                  transition-all
                  duration-300
                  hover:bg-white
                "
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
