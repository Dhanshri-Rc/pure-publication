import { motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Cookie,
  Database,
  FileText,
  Globe2,
  LockKeyhole,
  Mail,
  MapPin,
  MessageCircle,
  RefreshCw,
  Scale,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import Seo from "../components/Seo";

const LAST_UPDATED = "31 July 2026";

const WHATSAPP_NUMBER = "918446723800";

const WHATSAPP_MESSAGE =
  "Hello Pure Publications, I have a question regarding your Privacy Policy.";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

const CONTACT_EMAIL = "info@purepublications.org";

const policySections = [
  {
    id: "introduction",
    title: "Introduction",
    icon: FileText,
  },
  {
    id: "information-collected",
    title: "Information We Collect",
    icon: Database,
  },
  {
    id: "information-use",
    title: "How We Use Information",
    icon: UserCheck,
  },
  {
    id: "cookies",
    title: "Cookies and Tracking",
    icon: Cookie,
  },
  {
    id: "information-sharing",
    title: "Information Sharing",
    icon: Globe2,
  },
  {
    id: "data-security",
    title: "Data Security",
    icon: LockKeyhole,
  },
  {
    id: "data-retention",
    title: "Data Retention",
    icon: RefreshCw,
  },
  {
    id: "privacy-rights",
    title: "Your Privacy Rights",
    icon: Scale,
  },
  {
    id: "third-party-links",
    title: "Third-Party Links",
    icon: Globe2,
  },
  {
    id: "children-privacy",
    title: "Children’s Privacy",
    icon: ShieldCheck,
  },
  {
    id: "policy-changes",
    title: "Policy Changes",
    icon: RefreshCw,
  },
  {
    id: "contact-us",
    title: "Contact Us",
    icon: Mail,
  },
];

const revealAnimation = {
  initial: {
    opacity: 0,
    y: 24,
  },
  whileInView: {
    opacity: 1,
    y: 0,
  },
  viewport: {
    once: true,
    amount: 0.12,
  },
  transition: {
    duration: 0.55,
    ease: [0.22, 1, 0.36, 1],
  },
};

function PolicySection({
  id,
  number,
  title,
  icon: Icon,
  children,
}) {
  return (
    <motion.section
      id={id}
      {...revealAnimation}
      className="scroll-mt-6 rounded-2xl border border-[#073F40]/10 bg-white p-5 shadow-[0_15px_45px_rgba(7,63,64,0.07)] transition-all duration-300 hover:border-[#c7a35c]/35 hover:shadow-[0_20px_55px_rgba(7,63,64,0.1)] sm:p-7 lg:p-8"
    >
      <div className="mb-5 flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#073F40] text-[#e0bd73] shadow-[0_8px_20px_rgba(7,63,64,0.22)]">
          <Icon className="h-5 w-5" />
        </div>

        <div>
          <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#b58c42]">
            Section {number}
          </span>

          <h2 className="font-heading text-xl font-semibold leading-tight text-[#073F40] sm:text-2xl">
            {title}
          </h2>
        </div>
      </div>

      <div className="space-y-4 text-[14px] leading-7 text-slate-600 sm:text-[15px]">
        {children}
      </div>
    </motion.section>
  );
}

function PolicyList({ children }) {
  return <ul className="space-y-3">{children}</ul>;
}

function PolicyListItem({ children }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle2 className="mt-1.5 h-4 w-4 shrink-0 text-[#b58c42]" />

      <span>{children}</span>
    </li>
  );
}

export default function PrivacyPolicy() {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const closePolicyPage = () => {
    if (window.history.length > 1) {
      window.close();

      setTimeout(() => {
        window.location.href = "/";
      }, 150);
    } else {
      window.location.href = "/";
    }
  };

  return (
    <>
      <Seo
        title="Privacy Policy | Pure Publications"
        description="Read the Pure Publications Privacy Policy and learn how we collect, use, store, and protect personal information."
        keywords="Pure Publications privacy policy, personal data, data security, academic publishing privacy"
        canonical="/privacy-policy"
      />

      <main className="min-h-screen bg-[#f4f8f7]">
        {/* Standalone top bar */}
        <div className="border-b border-white/10 bg-[#073F40]">
          <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <a
              href="/"
              className="group inline-flex items-center gap-3"
              aria-label="Go to Pure Publications home page"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#d9b66f]/30 bg-white/[0.06]">
                <FileText className="h-4 w-4 text-[#e0bd73]" />
              </span>

              <span>
                <span className="block text-sm font-semibold uppercase tracking-[0.12em] text-white">
                  Pure Publications
                </span>

                <span className="hidden text-[10px] tracking-[0.08em] text-white/45 sm:block">
                  Publishing Knowledge, Inspiring Impact
                </span>
              </span>
            </a>

            <button
              type="button"
              onClick={closePolicyPage}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-medium text-white/80 transition-all duration-300 hover:border-[#d9b66f]/50 hover:bg-[#d9b66f]/10 hover:text-[#e0bd73]"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Website</span>
            </button>
          </div>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden bg-[#073F40] text-white">
          {/* Decorative background */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-32 -top-44 h-[430px] w-[430px] rounded-full bg-[#d9b66f]/10 blur-3xl" />

            <div className="absolute -bottom-52 right-0 h-[460px] w-[460px] rounded-full bg-[#d9b66f]/[0.07] blur-3xl" />

            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
                backgroundSize: "42px 42px",
              }}
            />
          </div>

          <div className="relative mx-auto w-full max-w-[1240px] px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-20">
            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mx-auto max-w-4xl text-center"
            >
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d9b66f]/30 bg-[#d9b66f]/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#e0bd73] sm:text-xs"
              >
                <ShieldCheck className="h-4 w-4" />
                Your Privacy Matters
              </span>

              <h1 className="font-heading text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Privacy{" "}
                <span className="text-[#d9b66f]">Policy</span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
                This Privacy Policy explains how Pure Publications collects,
                uses, stores, shares, and protects personal information when
                users access our website or communicate with our publication
                support team.
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs text-white/65">
                  <CalendarDays className="h-4 w-4 text-[#d9b66f]" />
                  Last updated: {LAST_UPDATED}
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs text-white/65">
                  <LockKeyhole className="h-4 w-4 text-[#d9b66f]" />
                  Secure and transparent
                </span>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#d9b66f]/55 to-transparent" />
        </section>

        {/* Main content */}
        <section className="mx-auto w-full max-w-[1240px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid items-start gap-8 lg:grid-cols-[270px_minmax(0,1fr)] lg:gap-10">
            {/* Policy navigation */}
            <aside className="lg:sticky lg:top-6">
              <div className="overflow-hidden rounded-2xl border border-[#073F40]/10 bg-white shadow-[0_15px_45px_rgba(7,63,64,0.07)]">
                <div className="bg-[#073F40] px-5 py-5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#d9b66f]">
                    Navigation
                  </span>

                  <h2 className="mt-1 font-heading text-lg font-semibold text-white">
                    Policy Contents
                  </h2>
                </div>

                <nav
                  aria-label="Privacy Policy contents"
                  className="max-h-[68vh] overflow-y-auto p-3"
                >
                  <ul className="space-y-1">
                    {policySections.map((section, index) => {
                      const Icon = section.icon;

                      return (
                        <li key={section.id}>
                          <button
                            type="button"
                            onClick={() => scrollToSection(section.id)}
                            className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-medium text-slate-600 transition-all duration-300 hover:bg-[#073F40] hover:text-white"
                          >
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#073F40]/[0.07] text-[#a97d2f] transition-all duration-300 group-hover:bg-white/10 group-hover:text-[#d9b66f]"
                            >
                              <Icon className="h-3.5 w-3.5" />
                            </span>

                            <span className="flex-1">
                              {String(index + 1).padStart(2, "0")}.{" "}
                              {section.title}
                            </span>

                            <ChevronRight className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>

              {/* Help card */}
              <div className="mt-5 overflow-hidden rounded-2xl bg-[#073F40] p-5 text-white shadow-[0_15px_40px_rgba(7,63,64,0.2)]">
                <MessageCircle className="h-7 w-7 text-[#d9b66f]" />

                <h3 className="mt-4 font-heading text-base font-semibold">
                  Have a privacy question?
                </h3>

                <p className="mt-2 text-xs leading-6 text-white/60">
                  Contact our support team for assistance regarding your
                  personal information or this Privacy Policy.
                </p>

                <motion.a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-xs font-semibold text-white transition-colors duration-300 hover:bg-[#20bd5a]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Contact on WhatsApp
                </motion.a>
              </div>
            </aside>

            {/* Policy details */}
            <div className="space-y-6">
              {/* Important note */}
              <motion.div
                {...revealAnimation}
                className="rounded-2xl border border-[#d9b66f]/30 bg-[#fffaf0] p-5 sm:p-6"
              >
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#a97d2f]" />

                  <p className="text-sm leading-7 text-slate-600">
                    By accessing or using Pure Publications, you acknowledge
                    that you have read and understood this Privacy Policy. This
                    policy applies to website visitors, researchers, authors,
                    reviewers, editors, institutional representatives, and
                    individuals who contact our team.
                  </p>
                </div>
              </motion.div>

              <PolicySection
                id="introduction"
                number="01"
                title="Introduction"
                icon={FileText}
              >
                <p>
                  Pure Publications respects the privacy of researchers,
                  authors, academicians, reviewers, editors, institutional
                  representatives, and website visitors. We are committed to
                  handling personal information responsibly, lawfully, and
                  transparently.
                </p>

                <p>
                  This Privacy Policy explains the types of information that
                  may be collected when you access our website, submit an
                  enquiry, contact our publication team, request manuscript
                  assistance, or use any publication-related service.
                </p>
              </PolicySection>

              <PolicySection
                id="information-collected"
                number="02"
                title="Information We Collect"
                icon={Database}
              >
                <p>
                  We may collect information that you voluntarily provide and
                  limited technical information generated while using our
                  website.
                </p>

                <h3 className="font-semibold text-[#073F40]">
                  Personal and professional information
                </h3>

                <PolicyList>
                  <PolicyListItem>
                    Name, email address, telephone number, WhatsApp number,
                    country, address, and institutional affiliation.
                  </PolicyListItem>

                  <PolicyListItem>
                    Department, designation, university, research area,
                    academic profile, ORCID identifier, or professional
                    information.
                  </PolicyListItem>

                  <PolicyListItem>
                    Manuscript title, abstract, keywords, subject area,
                    publication preference, and supporting documents.
                  </PolicyListItem>

                  <PolicyListItem>
                    Messages submitted through contact forms, email, phone,
                    WhatsApp, or social media.
                  </PolicyListItem>
                </PolicyList>

                <h3 className="pt-2 font-semibold text-[#073F40]">
                  Technical information
                </h3>

                <PolicyList>
                  <PolicyListItem>
                    Internet Protocol address, browser type, device type,
                    operating system, and approximate location.
                  </PolicyListItem>

                  <PolicyListItem>
                    Pages accessed, time spent on the website, referring URL,
                    and navigation activity.
                  </PolicyListItem>

                  <PolicyListItem>
                    Cookie identifiers and website usage information where
                    enabled.
                  </PolicyListItem>
                </PolicyList>
              </PolicySection>

              <PolicySection
                id="information-use"
                number="03"
                title="How We Use Your Information"
                icon={UserCheck}
              >
                <p>
                  Personal information may be used for the following legitimate
                  publication and website purposes:
                </p>

                <PolicyList>
                  <PolicyListItem>
                    Responding to enquiries and providing requested publication
                    information or assistance.
                  </PolicyListItem>

                  <PolicyListItem>
                    Communicating with authors, researchers, reviewers,
                    editors, journals, publishers, and institutions.
                  </PolicyListItem>

                  <PolicyListItem>
                    Evaluating and coordinating manuscript-related or
                    publication-support requests.
                  </PolicyListItem>

                  <PolicyListItem>
                    Providing important administrative notices, service
                    communications, and request-related updates.
                  </PolicyListItem>

                  <PolicyListItem>
                    Maintaining, analysing, securing, and improving our website
                    and services.
                  </PolicyListItem>

                  <PolicyListItem>
                    Detecting fraud, spam, unauthorised access, technical
                    errors, or harmful website activity.
                  </PolicyListItem>

                  <PolicyListItem>
                    Meeting legal, regulatory, contractual, accounting, and
                    record-keeping obligations.
                  </PolicyListItem>
                </PolicyList>
              </PolicySection>

              <PolicySection
                id="cookies"
                number="04"
                title="Cookies and Tracking Technologies"
                icon={Cookie}
              >
                <p>
                  Our website may use cookies and similar technologies to
                  provide essential functionality, remember preferences,
                  analyse website activity, improve performance, and protect
                  the website against misuse.
                </p>

                <p>
                  Cookies are small files stored on a user’s device. Some
                  cookies may be necessary for technical functionality, while
                  optional cookies may support analytics or user preferences.
                </p>

                <p>
                  Users may manage or disable cookies through their browser
                  settings. Disabling necessary cookies may affect the
                  performance of certain website features.
                </p>
              </PolicySection>

              <PolicySection
                id="information-sharing"
                number="05"
                title="How We Share Information"
                icon={Globe2}
              >
                <p>
                  Pure Publications does not sell or rent personal information.
                  Information may be shared only where reasonably necessary for
                  publication, administrative, technical, or legal purposes.
                </p>

                <PolicyList>
                  <PolicyListItem>
                    With authorised team members, consultants, editors,
                    reviewers, journals, publishers, or institutional partners
                    involved in responding to your request.
                  </PolicyListItem>

                  <PolicyListItem>
                    With hosting, cloud storage, analytics, communication,
                    security, technical support, or payment service providers.
                  </PolicyListItem>

                  <PolicyListItem>
                    When disclosure is required under applicable law, court
                    order, regulatory requirement, or governmental request.
                  </PolicyListItem>

                  <PolicyListItem>
                    When necessary to protect our rights, systems, users,
                    services, or the public from fraud, security threats, or
                    harmful conduct.
                  </PolicyListItem>
                </PolicyList>
              </PolicySection>

              <PolicySection
                id="data-security"
                number="06"
                title="Data Security"
                icon={LockKeyhole}
              >
                <p>
                  We implement reasonable administrative, organisational, and
                  technical safeguards intended to protect personal information
                  from unauthorised access, loss, disclosure, misuse,
                  alteration, or destruction.
                </p>

                <p>
                  Security measures may include restricted system access,
                  authentication controls, secure hosting, monitoring,
                  protected communication, backups, and internal access
                  limitations.
                </p>

                <p>
                  No internet transmission or digital storage system can be
                  guaranteed to be completely secure. We therefore cannot
                  guarantee absolute security, although reasonable precautions
                  are taken to reduce foreseeable risks.
                </p>
              </PolicySection>

              <PolicySection
                id="data-retention"
                number="07"
                title="Data Retention"
                icon={RefreshCw}
              >
                <p>
                  Personal information is retained only for as long as
                  reasonably necessary to fulfil the purposes for which it was
                  collected, provide requested services, maintain business
                  records, resolve disputes, and comply with legal obligations.
                </p>

                <p>
                  Retention periods may vary depending on the nature of the
                  information, publication requirements, contractual
                  obligations, communication history, and applicable law.
                </p>

                <p>
                  Information that is no longer necessary may be deleted,
                  anonymised, archived, or access-restricted according to our
                  legal and operational requirements.
                </p>
              </PolicySection>

              <PolicySection
                id="privacy-rights"
                number="08"
                title="Your Privacy Rights"
                icon={Scale}
              >
                <p>
                  Subject to applicable law and your location, you may have the
                  right to:
                </p>

                <PolicyList>
                  <PolicyListItem>
                    Request access to the personal information held about you.
                  </PolicyListItem>

                  <PolicyListItem>
                    Request correction of inaccurate, incomplete, or outdated
                    information.
                  </PolicyListItem>

                  <PolicyListItem>
                    Request deletion of your personal information where legally
                    applicable.
                  </PolicyListItem>

                  <PolicyListItem>
                    Withdraw consent where information processing is based on
                    consent.
                  </PolicyListItem>

                  <PolicyListItem>
                    Object to or request restriction of certain information
                    processing activities.
                  </PolicyListItem>

                  <PolicyListItem>
                    Raise a complaint or grievance regarding the handling of
                    your personal information.
                  </PolicyListItem>
                </PolicyList>

                <p>
                  We may request reasonable identity verification before
                  processing a privacy request. Certain information may be
                  retained where required by legal, contractual, fraud
                  prevention, academic publishing, or dispute-resolution
                  obligations.
                </p>
              </PolicySection>

              <PolicySection
                id="third-party-links"
                number="09"
                title="Third-Party Websites and Services"
                icon={Globe2}
              >
                <p>
                  Our website may provide links to journals, indexing
                  databases, publishers, academic platforms, payment services,
                  social media platforms, and other external websites.
                </p>

                <p>
                  Pure Publications does not control the privacy, security,
                  content, or data practices of third-party platforms. Users
                  should review the privacy policies of external services
                  before providing personal information.
                </p>
              </PolicySection>

              <PolicySection
                id="children-privacy"
                number="10"
                title="Children’s Privacy"
                icon={ShieldCheck}
              >
                <p>
                  Our website is primarily intended for researchers, authors,
                  students, academicians, institutions, and professional users.
                  It is not specifically directed toward young children.
                </p>

                <p>
                  We do not knowingly collect personal information from
                  children where parental or guardian consent is legally
                  required. Parents or guardians may contact us if they believe
                  that a child has submitted personal information.
                </p>
              </PolicySection>

              <PolicySection
                id="policy-changes"
                number="11"
                title="Changes to This Privacy Policy"
                icon={RefreshCw}
              >
                <p>
                  Pure Publications may revise this Privacy Policy periodically
                  to reflect updates in our services, technologies, internal
                  processes, or legal obligations.
                </p>

                <p>
                  Updated versions will be published on this page with a revised
                  “Last Updated” date. Users are encouraged to review this page
                  periodically.
                </p>
              </PolicySection>

              <PolicySection
                id="contact-us"
                number="12"
                title="Contact Us"
                icon={Mail}
              >
                <p>
                  For privacy questions, correction requests, deletion
                  requests, complaints, or concerns regarding personal
                  information, contact Pure Publications using the options
                  below.
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="group rounded-xl border border-[#073F40]/10 bg-[#f5f8f7] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#d9b66f]/45 hover:bg-white hover:shadow-lg"
                  >
                    <Mail className="h-5 w-5 text-[#b58c42]" />

                    <span className="mt-4 block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                      Email Address
                    </span>

                    <span className="mt-1 block break-all text-sm font-semibold text-[#073F40]">
                      {CONTACT_EMAIL}
                    </span>
                  </a>

                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-xl border border-[#073F40]/10 bg-[#f5f8f7] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#25D366]/40 hover:bg-white hover:shadow-lg"
                  >
                    <MessageCircle className="h-5 w-5 text-[#25D366]" />

                    <span className="mt-4 block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                      WhatsApp Support
                    </span>

                    <span className="mt-1 block text-sm font-semibold text-[#073F40]">
                      +91 84467 23800
                    </span>
                  </a>
                </div>
              </PolicySection>

              {/* Standalone page ending */}
              <motion.div
                {...revealAnimation}
                className="relative overflow-hidden rounded-2xl bg-[#073F40] p-6 text-center text-white shadow-[0_20px_50px_rgba(7,63,64,0.2)] sm:p-9"
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#d9b66f]/10 blur-3xl" />

                <div className="relative z-10">
                  <ShieldCheck className="mx-auto h-9 w-9 text-[#d9b66f]" />

                  <h2 className="mt-4 font-heading text-xl font-semibold sm:text-2xl">
                    Responsible protection of your information
                  </h2>

                  <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/60">
                    Pure Publications is committed to transparent and
                    responsible information-handling practices for researchers,
                    authors, institutions, and website visitors.
                  </p>

                  <button
                    type="button"
                    onClick={closePolicyPage}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#d9b66f] px-6 py-3 text-xs font-semibold text-[#073F40] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e5c681]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Return to Website
                  </button>
                </div>
              </motion.div>

              {/* Minimal copyright—not the main website footer */}
              <div className="pt-3 text-center">
                <p className="text-xs text-slate-400">
                  © {new Date().getFullYear()} Pure Publications. All rights
                  reserved.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}