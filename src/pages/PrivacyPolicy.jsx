import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronRight,
  Cookie,
  Database,
  FileText,
  Globe2,
  LockKeyhole,
  Mail,
  MessageCircle,
  RefreshCw,
  Scale,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

import Seo from "../components/Seo";

const LAST_UPDATED = "31 July 2026";

const CONTACT_EMAIL = "info@purepublications.org";
const WHATSAPP_NUMBER = "918446723800";

const WHATSAPP_MESSAGE =
  "Hello Pure Publications, I have a question regarding your Privacy Policy.";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

const policySections = [
  {
    id: "introduction",
    number: "01",
    title: "Introduction",
    icon: FileText,
  },
  {
    id: "information-we-collect",
    number: "02",
    title: "Information We Collect",
    icon: Database,
  },
  {
    id: "how-we-use-information",
    number: "03",
    title: "How We Use Information",
    icon: UserCheck,
  },
  {
    id: "cookies",
    number: "04",
    title: "Cookies and Tracking",
    icon: Cookie,
  },
  {
    id: "information-sharing",
    number: "05",
    title: "Information Sharing",
    icon: Globe2,
  },
  {
    id: "data-security",
    number: "06",
    title: "Data Security",
    icon: LockKeyhole,
  },
  {
    id: "data-retention",
    number: "07",
    title: "Data Retention",
    icon: RefreshCw,
  },
  {
    id: "privacy-rights",
    number: "08",
    title: "Your Privacy Rights",
    icon: Scale,
  },
  {
    id: "third-party-websites",
    number: "09",
    title: "Third-Party Websites",
    icon: Globe2,
  },
  {
    id: "children-privacy",
    number: "10",
    title: "Children’s Privacy",
    icon: ShieldCheck,
  },
  {
    id: "policy-changes",
    number: "11",
    title: "Policy Changes",
    icon: RefreshCw,
  },
  {
    id: "contact-us",
    number: "12",
    title: "Contact Us",
    icon: Mail,
  },
];

const revealAnimation = {
  initial: {
    opacity: 0,
    y: 16,
  },
  whileInView: {
    opacity: 1,
    y: 0,
  },
  viewport: {
    once: true,
    amount: 0.08,
  },
  transition: {
    duration: 0.42,
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
      className="scroll-mt-6 border-b border-[#073F40]/10 py-6 first:pt-0 last:border-b-0 last:pb-0 sm:py-8"
    >
      <div className="flex items-start gap-4 sm:gap-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#073F40]/10 text-[#073F40] sm:h-11 sm:w-11">
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#b28b45]">
            Section {number}
          </span>

          <h2 className="mt-1 text-xl font-semibold leading-tight text-[#073F40] sm:text-2xl">
            {title}
          </h2>

          <div className="mt-3 space-y-1 text-[13px] leading-7 text-slate-600 sm:text-[14px]">
            {children}
          </div>
        </div>
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
      <CheckCircle2 className="mt-1.5 h-4 w-4 shrink-0 text-[#b28b45]" />
      <span>{children}</span>
    </li>
  );
}

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("introduction");

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setActiveSection(sectionId);
  };

  useEffect(() => {
    const sectionElements = policySections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (firstEntry, secondEntry) =>
              secondEntry.intersectionRatio - firstEntry.intersectionRatio
          )[0];

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-15% 0px -65% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => {
      sectionElements.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <>
      <Seo
        title="Privacy Policy | Pure Publications"
        description="Read the Pure Publications Privacy Policy and learn how personal information is collected, used, stored, and protected."
        keywords="Pure Publications privacy policy, personal information, data protection, academic publication privacy"
        canonical="/privacy-policy"
      />

      <main className="min-h-screen overflow-visible bg-[#f7faf9]">
       <section className="mx-auto w-full max-w-[1240px] overflow-visible px-4 py-10 sm:px-6 sm:py-10 lg:px-8 lg:py-10">
          {/* Normal page heading */}
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-6 border-b border-[#073F40]/10 pb-4 sm:mb-6 sm:pb-4"
          >
            <span className="text-xs font-bold uppercase tracking-[0.10em] text-[#b28b45]">
              Pure Publications
            </span>

            <h1 className="mt-2 text-3xl font-semibold leading-tight text-[#073F40] sm:text-4xl lg:text-4xl">
              Privacy Policy
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-slate-500">
              

              <span className="hidden h-1.5 w-1.5 rounded-full bg-slate-500 sm:block" />

              <span>
                Learn how we collect, use, store, and protect your information.
              </span>
            </div>
          </motion.div>

         <div className="grid items-start gap-8 overflow-visible lg:grid-cols-[270px_minmax(0,1fr)] lg:gap-10">
            {/* Left sidebar */}
         <aside className="hidden self-start lg:sticky lg:top-6 lg:block">
  <div className="rounded-xl border border-[#073F40]/10 bg-white shadow-[0_10px_35px_rgba(7,63,64,0.06)]">
    <div className="border-b border-[#073F40]/10 px-5 py-4">
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#b28b45]">
        On This Page
      </span>

      <h2 className="mt-1 text-lg font-semibold text-[#073F40]">
        Policy Contents
      </h2>
    </div>

    <nav
      aria-label="Privacy policy sections"
      className="p-3"
    >
      <ul className="space-y-1">
        {policySections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;

          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => scrollToSection(section.id)}
                className={[
                  "group flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[11px] font-medium transition-all duration-300",
                  isActive
                    ? "bg-[#073F40] text-white"
                    : "text-slate-600 hover:bg-[#073F40]/[0.06] hover:text-[#073F40]",
                ].join(" ")}
              >
                <span
                  className={[
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors duration-300",
                    isActive
                      ? "bg-white/10 text-[#e1c37d]"
                      : "bg-[#073F40]/[0.07] text-[#073F40]",
                  ].join(" ")}
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>

                <span className="flex-1 leading-4">
                  {section.number}. {section.title}
                </span>

                <ChevronRight
                  className={[
                    "h-3.5 w-3.5 shrink-0 transition-all duration-300",
                    isActive
                      ? "opacity-100"
                      : "opacity-0 group-hover:translate-x-0.5 group-hover:opacity-100",
                  ].join(" ")}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  </div>
</aside>

            {/* Right content */}
            <div className="min-w-0">
              <motion.div
                {...revealAnimation}
                className="mb-7 rounded-xl border border-[#d9b66f]/25 bg-[#fffaf0] p-5 sm:p-6"
              >
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#a67c32]" />

                  <p className="text-sm leading-7 text-slate-600">
                    By accessing or using Pure Publications, you acknowledge
                    that you have read and understood this Privacy Policy. It
                    applies to visitors, researchers, authors, reviewers,
                    editors, institutional representatives, and individuals who
                    communicate with our team.
                  </p>
                </div>
              </motion.div>

              <div className="rounded-2xl border border-[#073F40]/10 bg-white px-5 py-6 shadow-[0_12px_40px_rgba(7,63,64,0.06)] sm:px-8 lg:px-10">
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
                  id="information-we-collect"
                  number="02"
                  title="Information We Collect"
                  icon={Database}
                >
                  <p>
                    We may collect information that you provide voluntarily and
                    limited technical information generated while you use our
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
                      academic profile, ORCID identifier, and professional
                      information.
                    </PolicyListItem>

                    <PolicyListItem>
                      Manuscript title, abstract, keywords, subject area,
                      publication preference, and supporting documents.
                    </PolicyListItem>

                    <PolicyListItem>
                      Messages submitted through website forms, email,
                      telephone, WhatsApp, or social media.
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
                      Pages accessed, time spent on the website, referral source,
                      and navigation activity.
                    </PolicyListItem>

                    <PolicyListItem>
                      Cookie identifiers and website usage data where enabled.
                    </PolicyListItem>
                  </PolicyList>
                </PolicySection>

                <PolicySection
                  id="how-we-use-information"
                  number="03"
                  title="How We Use Your Information"
                  icon={UserCheck}
                >
                  <p>
                    Personal information may be used for legitimate publication,
                    communication, administration, and website purposes.
                  </p>

                  <PolicyList>
                    <PolicyListItem>
                      Responding to enquiries and providing requested
                      publication information or assistance.
                    </PolicyListItem>

                    <PolicyListItem>
                      Communicating with authors, researchers, reviewers,
                      editors, journals, publishers, and institutions.
                    </PolicyListItem>

                    <PolicyListItem>
                      Evaluating and coordinating manuscript-related and
                      publication-support requests.
                    </PolicyListItem>

                    <PolicyListItem>
                      Providing administrative notices, service communications,
                      and request-related updates.
                    </PolicyListItem>

                    <PolicyListItem>
                      Maintaining, analysing, securing, and improving our website
                      and services.
                    </PolicyListItem>

                    <PolicyListItem>
                      Detecting fraud, spam, unauthorised access, technical
                      errors, and harmful website activity.
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
                    provide essential functionality, remember user preferences,
                    analyse website activity, improve performance, and protect
                    the website from misuse.
                  </p>

                  <p>
                    Cookies are small files stored on a user’s device. Some
                    cookies may be necessary for technical functionality, while
                    optional cookies may support analytics and preferences.
                  </p>

                  <p>
                    You may manage or disable cookies through your browser
                    settings. Disabling necessary cookies may affect the
                    performance of some website features.
                  </p>
                </PolicySection>

                <PolicySection
                  id="information-sharing"
                  number="05"
                  title="How We Share Information"
                  icon={Globe2}
                >
                  <p>
                    Pure Publications does not sell or rent personal
                    information. Information may be shared only when reasonably
                    necessary for publication, administrative, technical,
                    security, or legal purposes.
                  </p>

                  <PolicyList>
                    <PolicyListItem>
                      With authorised team members, consultants, editors,
                      reviewers, journals, publishers, and institutional
                      partners involved in your request.
                    </PolicyListItem>

                    <PolicyListItem>
                      With hosting, cloud storage, analytics, communication,
                      security, technical support, and payment providers.
                    </PolicyListItem>

                    <PolicyListItem>
                      When disclosure is required by applicable law, court order,
                      regulatory requirement, or governmental request.
                    </PolicyListItem>

                    <PolicyListItem>
                      When necessary to protect our rights, systems, users,
                      services, or the public from fraud or harmful activity.
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
                    technical measures intended to protect personal information
                    against unauthorised access, loss, disclosure, misuse,
                    alteration, and destruction.
                  </p>

                  <p>
                    These measures may include restricted access,
                    authentication controls, secure hosting, monitoring,
                    protected communication, backups, and internal access
                    limitations.
                  </p>

                  <p>
                    No internet transmission or electronic storage system can
                    be guaranteed to be completely secure. We therefore cannot
                    guarantee absolute security, although reasonable
                    precautions are taken to reduce foreseeable risks.
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
                    reasonably necessary to fulfil the purpose for which it was
                    collected, provide requested services, maintain records,
                    resolve disputes, and comply with applicable obligations.
                  </p>

                  <p>
                    Retention periods may vary depending on the nature of the
                    information, publication requirements, contractual
                    obligations, communication history, and applicable law.
                  </p>

                  <p>
                    Information that is no longer necessary may be deleted,
                    anonymised, archived, or access-restricted according to
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
                    Depending on applicable law and your location, you may have
                    the right to:
                  </p>

                  <PolicyList>
                    <PolicyListItem>
                      Request access to personal information held about you.
                    </PolicyListItem>

                    <PolicyListItem>
                      Request correction of inaccurate, incomplete, or outdated
                      information.
                    </PolicyListItem>

                    <PolicyListItem>
                      Request deletion of personal information where legally
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
                      Submit a complaint regarding the handling of your personal
                      information.
                    </PolicyListItem>
                  </PolicyList>

                  <p>
                    We may request reasonable identity verification before
                    processing a privacy request. Certain information may be
                    retained when required for legal, contractual, fraud
                    prevention, academic publishing, or dispute-resolution
                    purposes.
                  </p>
                </PolicySection>

                <PolicySection
                  id="third-party-websites"
                  number="09"
                  title="Third-Party Websites and Services"
                  icon={Globe2}
                >
                  <p>
                    Our website may contain links to journals, indexing
                    databases, publishers, academic platforms, payment
                    services, social media platforms, and other external
                    websites.
                  </p>

                  <p>
                    Pure Publications does not control the privacy, security,
                    content, or information-handling practices of third-party
                    platforms. Users should review the policies of external
                    services before submitting personal information.
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
                    students, academicians, institutions, and professional
                    users. It is not specifically directed toward young
                    children.
                  </p>

                  <p>
                    We do not knowingly collect personal information from
                    children where parental or guardian consent is legally
                    required. Parents or guardians may contact us if they
                    believe a child has submitted personal information.
                  </p>
                </PolicySection>

                <PolicySection
                  id="policy-changes"
                  number="11"
                  title="Changes to This Privacy Policy"
                  icon={RefreshCw}
                >
                  <p>
                    Pure Publications may update this Privacy Policy
                    periodically to reflect changes in services, technologies,
                    internal processes, or legal obligations.
                  </p>

                  <p>
                    Updated versions will be published on this page with a
                    revised “Last Updated” date. Users are encouraged to review
                    this page periodically.
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
                    requests, complaints, or concerns about personal
                    information, contact Pure Publications through the options
                    below.
                  </p>

                  <div className="grid gap-4 pt-2 sm:grid-cols-2">
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="rounded-xl border border-[#073F40]/10 bg-[#f7faf9] p-5 transition-all duration-300 hover:border-[#073F40]/25 hover:bg-white hover:shadow-md"
                    >
                      <Mail className="h-5 w-5 text-[#073F40]" />

                      <span className="mt-4 block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
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
                      className="rounded-xl border border-[#073F40]/10 bg-[#f7faf9] p-5 transition-all duration-300 hover:border-[#25D366]/35 hover:bg-white hover:shadow-md"
                    >
                      <MessageCircle className="h-5 w-5 text-[#25D366]" />

                      <span className="mt-4 block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                        WhatsApp Support
                      </span>

                      <span className="mt-1 block text-sm font-semibold text-[#073F40]">
                        +91 84467 23800
                      </span>
                    </a>
                  </div>
                </PolicySection>
              </div>

              <div className="py-8 text-center">
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