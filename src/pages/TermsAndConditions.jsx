import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  CreditCard,
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
  "Hello Pure Publications, I have a question regarding your Terms and Conditions.";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

const termsSections = [
  {
    id: "acceptance-of-terms",
    number: "01",
    title: "Acceptance of Terms",
    icon: FileText,
  },
  {
    id: "about-our-services",
    number: "02",
    title: "About Our Services",
    icon: BookOpen,
  },
  {
    id: "user-responsibilities",
    number: "03",
    title: "User Responsibilities",
    icon: UserCheck,
  },
  {
    id: "academic-ethics",
    number: "04",
    title: "Academic Ethics",
    icon: ShieldCheck,
  },
  {
    id: "publication-decisions",
    number: "05",
    title: "Publication Decisions",
    icon: Globe2,
  },
  {
    id: "timelines-communication",
    number: "06",
    title: "Timelines and Communication",
    icon: RefreshCw,
  },
  {
    id: "fees-payments",
    number: "07",
    title: "Fees and Payments",
    icon: CreditCard,
  },
  {
    id: "cancellation-refunds",
    number: "08",
    title: "Cancellation and Refunds",
    icon: Scale,
  },
  {
    id: "intellectual-property",
    number: "09",
    title: "Intellectual Property",
    icon: LockKeyhole,
  },
  {
    id: "prohibited-use",
    number: "10",
    title: "Prohibited Use",
    icon: AlertTriangle,
  },
  {
    id: "third-party-services",
    number: "11",
    title: "Third-Party Services",
    icon: Globe2,
  },
  {
    id: "disclaimer-warranties",
    number: "12",
    title: "Disclaimer of Warranties",
    icon: ShieldCheck,
  },
  {
    id: "limitation-liability",
    number: "13",
    title: "Limitation of Liability",
    icon: Scale,
  },
  {
    id: "privacy-data-protection",
    number: "14",
    title: "Privacy and Data Protection",
    icon: LockKeyhole,
  },
  {
    id: "suspension-termination",
    number: "15",
    title: "Suspension or Termination",
    icon: AlertTriangle,
  },
  {
    id: "changes-to-terms",
    number: "16",
    title: "Changes to These Terms",
    icon: RefreshCw,
  },
  {
    id: "governing-law",
    number: "17",
    title: "Governing Law",
    icon: Scale,
  },
  {
    id: "contact-us",
    number: "18",
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

function TermsSection({
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

          <div className="mt-3 space-y-3 text-[13px] leading-7 text-slate-600 sm:text-[14px]">
            {children}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function TermsList({ children }) {
  return <ul className="space-y-3">{children}</ul>;
}

function TermsListItem({ children }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle2 className="mt-1.5 h-4 w-4 shrink-0 text-[#b28b45]" />
      <span>{children}</span>
    </li>
  );
}

export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState(
    "acceptance-of-terms"
  );

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
    const sectionElements = termsSections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (firstEntry, secondEntry) =>
              secondEntry.intersectionRatio -
              firstEntry.intersectionRatio
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

    sectionElements.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sectionElements.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      <Seo
        title="Terms and Conditions | Pure Publications"
        description="Read the Pure Publications Terms and Conditions governing the use of our website and publication-related services."
        keywords="Pure Publications terms and conditions, publication services terms, manuscript submission terms"
        canonical="/terms-and-conditions"
      />

      <main className="min-h-screen overflow-visible bg-[#f7faf9]">
        <section className="mx-auto w-full max-w-[1240px] overflow-visible px-4 py-10 sm:px-6 lg:px-8">
          {/* Normal heading */}
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
            className="mb-6 border-b border-[#073F40]/10 pb-4"
          >
            <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#b28b45]">
              Pure Publications
            </span>

            <h1 className="mt-2 text-3xl font-semibold leading-tight text-[#073F40] sm:text-4xl">
              Terms and Conditions
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-slate-500">
              <span className="hidden h-1.5 w-1.5 rounded-full bg-slate-500 sm:block" />

              <span>
                Understand the conditions governing the use of our
                website and publication-related services.
              </span>
            </div>
          </motion.div>

          <div className="grid items-start gap-8 overflow-visible lg:grid-cols-[270px_minmax(0,1fr)] lg:gap-10">
            {/* Sticky sidebar */}
            <aside className="hidden self-start lg:sticky lg:top-6 lg:block">
              <div className="rounded-xl border border-[#073F40]/10 bg-white shadow-[0_10px_35px_rgba(7,63,64,0.06)]">
                <div className="border-b border-[#073F40]/10 px-5 py-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#b28b45]">
                    On This Page
                  </span>

                  <h2 className="mt-1 text-lg font-semibold text-[#073F40]">
                    Terms Contents
                  </h2>
                </div>

                <nav
                  aria-label="Terms and conditions sections"
                  className="p-2"
                >
                  <ul className="space-y-0.5">
                    {termsSections.map((section) => {
                      const Icon = section.icon;
                      const isActive =
                        activeSection === section.id;

                      return (
                        <li key={section.id}>
                          <button
                            type="button"
                            onClick={() =>
                              scrollToSection(section.id)
                            }
                            className={[
                              "group flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[10px] font-medium transition-all duration-300",
                              isActive
                                ? "bg-[#073F40] text-white"
                                : "text-slate-600 hover:bg-[#073F40]/[0.06] hover:text-[#073F40]",
                            ].join(" ")}
                          >
                            <span
                              className={[
                                "flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition-colors duration-300",
                                isActive
                                  ? "bg-white/10 text-[#e1c37d]"
                                  : "bg-[#073F40]/[0.07] text-[#073F40]",
                              ].join(" ")}
                            >
                              <Icon className="h-3 w-3" />
                            </span>

                            <span className="flex-1 leading-4">
                              {section.number}. {section.title}
                            </span>

                            <ChevronRight
                              className={[
                                "h-3 w-3 shrink-0 transition-all duration-300",
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
                  <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-[#a67c32]" />

                  <p className="text-sm leading-7 text-slate-600">
                    By accessing this website, submitting an enquiry,
                    or using a publication-related service offered by
                    Pure Publications, you agree to comply with these
                    Terms and Conditions.
                  </p>
                </div>
              </motion.div>

              <div className="rounded-2xl border border-[#073F40]/10 bg-white px-5 py-6 shadow-[0_12px_40px_rgba(7,63,64,0.06)] sm:px-8 lg:px-10">
                <TermsSection
                  id="acceptance-of-terms"
                  number="01"
                  title="Acceptance of Terms"
                  icon={FileText}
                >
                  <p>
                    These Terms and Conditions apply to all visitors,
                    authors, researchers, academicians, reviewers,
                    editors, institutions, and other users who access
                    the Pure Publications website or communicate with
                    our team.
                  </p>

                  <p>
                    By using the website or requesting our services,
                    you confirm that you have read, understood, and
                    accepted these terms.
                  </p>

                  <p>
                    If you do not agree with any part of these terms,
                    you should discontinue the use of the website and
                    related services.
                  </p>
                </TermsSection>

                <TermsSection
                  id="about-our-services"
                  number="02"
                  title="About Our Services"
                  icon={BookOpen}
                >
                  <p>
                    Pure Publications provides publication-related
                    information, manuscript support, journal guidance,
                    editorial assistance, author communication, and
                    related academic services.
                  </p>

                  <p>
                    The exact nature, scope, timeline, and cost of a
                    service may vary depending on the manuscript,
                    journal, subject area, publisher requirements, and
                    author request.
                  </p>

                  <p>
                    Information displayed on the website is provided
                    for general guidance and may be updated from time
                    to time.
                  </p>
                </TermsSection>

                <TermsSection
                  id="user-responsibilities"
                  number="03"
                  title="User Responsibilities"
                  icon={UserCheck}
                >
                  <p>
                    Users are responsible for providing accurate,
                    complete, and lawful information when contacting
                    Pure Publications or requesting a service.
                  </p>

                  <TermsList>
                    <TermsListItem>
                      Provide correct personal, professional,
                      institutional, and manuscript information.
                    </TermsListItem>

                    <TermsListItem>
                      Ensure that submitted content belongs to the
                      author or is used with proper permission.
                    </TermsListItem>

                    <TermsListItem>
                      Disclose previous submissions, publications,
                      conflicts of interest, or ethical concerns.
                    </TermsListItem>

                    <TermsListItem>
                      Review and approve final documents before
                      submission or publication.
                    </TermsListItem>
                  </TermsList>
                </TermsSection>

                <TermsSection
                  id="academic-ethics"
                  number="04"
                  title="Manuscript Originality and Academic Ethics"
                  icon={ShieldCheck}
                >
                  <p>
                    Authors are responsible for the originality,
                    authenticity, accuracy, and ethical compliance of
                    submitted manuscripts and supporting materials.
                  </p>

                  <TermsList>
                    <TermsListItem>
                      Manuscripts must not contain plagiarism,
                      fabricated data, falsified results, misleading
                      claims, or unauthorised content.
                    </TermsListItem>

                    <TermsListItem>
                      Authors, contributors, sources, images, tables,
                      and references must be properly acknowledged.
                    </TermsListItem>

                    <TermsListItem>
                      Required permissions, approvals, consent forms,
                      and ethical clearances must be obtained.
                    </TermsListItem>
                  </TermsList>
                </TermsSection>

                <TermsSection
                  id="publication-decisions"
                  number="05"
                  title="Journal Selection and Publication Decisions"
                  icon={Globe2}
                >
                  <p>
                    Journal suggestions may be based on manuscript
                    scope, subject area, indexing preference,
                    publication timeline, and available information.
                  </p>

                  <p>
                    Final acceptance, rejection, revision, peer-review
                    outcome, publication date, and indexing status are
                    controlled by the journal, editor, publisher, or
                    indexing authority.
                  </p>

                  <p>
                    Pure Publications does not guarantee manuscript
                    acceptance, publication, indexing, citation
                    count, journal ranking, or a specific academic
                    outcome.
                  </p>
                </TermsSection>

                <TermsSection
                  id="timelines-communication"
                  number="06"
                  title="Timelines and Communication"
                  icon={RefreshCw}
                >
                  <p>
                    Review, decision, publication, correction, and
                    processing timelines are estimates unless
                    expressly confirmed in writing.
                  </p>

                  <p>
                    Timelines may be affected by journal workload,
                    reviewer availability, revisions, payment status,
                    technical issues, holidays, and publisher
                    procedures.
                  </p>
                </TermsSection>

                <TermsSection
                  id="fees-payments"
                  number="07"
                  title="Fees and Payments"
                  icon={CreditCard}
                >
                  <p>
                    Service fees, publication charges, editing
                    charges, processing fees, and other applicable
                    costs will be communicated during the service
                    process.
                  </p>

                  <TermsList>
                    <TermsListItem>
                      Verify the amount, purpose, and payment details
                      before making payment.
                    </TermsListItem>

                    <TermsListItem>
                      Journal or publisher charges may be separate
                      from Pure Publications service charges.
                    </TermsListItem>

                    <TermsListItem>
                      Work may be paused when payment or required
                      information is pending.
                    </TermsListItem>
                  </TermsList>
                </TermsSection>

                <TermsSection
                  id="cancellation-refunds"
                  number="08"
                  title="Cancellation and Refunds"
                  icon={Scale}
                >
                  <p>
                    Refund eligibility depends on the service stage,
                    completed work, third-party charges, journal fees,
                    and the specific agreement communicated to the
                    user.
                  </p>

                  <p>
                    Charges may be non-refundable after work has
                    started, a submission has been made, or payment
                    has been transferred to a journal or third party.
                  </p>
                </TermsSection>

                <TermsSection
                  id="intellectual-property"
                  number="09"
                  title="Intellectual Property"
                  icon={LockKeyhole}
                >
                  <p>
                    Authors retain ownership of original manuscript
                    content, subject to journal, publisher, licence,
                    or copyright agreements.
                  </p>

                  <p>
                    The Pure Publications name, logo, design,
                    graphics, layout, and website content are
                    protected by applicable intellectual property
                    laws.
                  </p>
                </TermsSection>

                <TermsSection
                  id="prohibited-use"
                  number="10"
                  title="Prohibited Use"
                  icon={AlertTriangle}
                >
                  <p>
                    Users must not use the website or services for
                    unlawful, fraudulent, abusive, misleading, or
                    harmful purposes.
                  </p>

                  <TermsList>
                    <TermsListItem>
                      Submitting stolen, fabricated, plagiarised, or
                      misleading manuscripts.
                    </TermsListItem>

                    <TermsListItem>
                      Impersonating an author, researcher,
                      institution, or organisation.
                    </TermsListItem>

                    <TermsListItem>
                      Attempting unauthorised access to systems,
                      accounts, files, or communications.
                    </TermsListItem>

                    <TermsListItem>
                      Uploading malicious code, viruses, spam, or
                      harmful material.
                    </TermsListItem>
                  </TermsList>
                </TermsSection>

                <TermsSection
                  id="third-party-services"
                  number="11"
                  title="Third-Party Websites and Services"
                  icon={Globe2}
                >
                  <p>
                    The website may contain links to journals,
                    publishers, indexing databases, payment
                    providers, academic platforms, and social media
                    websites.
                  </p>

                  <p>
                    Pure Publications does not control third-party
                    websites and is not responsible for their
                    content, policies, security, fees, or services.
                  </p>
                </TermsSection>

                <TermsSection
                  id="disclaimer-warranties"
                  number="12"
                  title="Disclaimer of Warranties"
                  icon={ShieldCheck}
                >
                  <p>
                    Website and publication-related information is
                    provided on an “as available” basis.
                  </p>

                  <p>
                    Journal indexing, ranking, scope, fees, review
                    timelines, acceptance policies, and publisher
                    information may change without prior notice.
                  </p>
                </TermsSection>

                <TermsSection
                  id="limitation-liability"
                  number="13"
                  title="Limitation of Liability"
                  icon={Scale}
                >
                  <p>
                    To the extent permitted by law, Pure Publications
                    will not be liable for indirect, incidental,
                    consequential, or academic losses arising from
                    use of the website or services.
                  </p>

                  <p>
                    This includes manuscript rejection, publication
                    delay, indexing changes, author disputes,
                    third-party actions, and missed deadlines.
                  </p>
                </TermsSection>

                <TermsSection
                  id="privacy-data-protection"
                  number="14"
                  title="Privacy and Data Protection"
                  icon={LockKeyhole}
                >
                  <p>
                    Personal information submitted through the
                    website or during communication will be handled
                    in accordance with our Privacy Policy.
                  </p>

                  <p>
                    Users should avoid sharing unnecessary
                    confidential, sensitive, financial, medical, or
                    identity-related information.
                  </p>
                </TermsSection>

                <TermsSection
                  id="suspension-termination"
                  number="15"
                  title="Suspension or Termination"
                  icon={AlertTriangle}
                >
                  <p>
                    Pure Publications may suspend, refuse, or
                    terminate services where a user violates these
                    terms, fails to provide required information or
                    payment, or creates legal, ethical, or security
                    risks.
                  </p>
                </TermsSection>

                <TermsSection
                  id="changes-to-terms"
                  number="16"
                  title="Changes to These Terms"
                  icon={RefreshCw}
                >
                  <p>
                    Pure Publications may update these Terms and
                    Conditions to reflect changes in services,
                    business practices, technology, legal
                    obligations, or publication processes.
                  </p>

                  <p>
                    Updated terms will be displayed on this page with
                    a revised last-updated date.
                  </p>
                </TermsSection>

                <TermsSection
                  id="governing-law"
                  number="17"
                  title="Governing Law"
                  icon={Scale}
                >
                  <p>
                    These Terms and Conditions are governed by
                    applicable laws in India, subject to mandatory
                    rights that may apply based on the user’s
                    location.
                  </p>

                  <p>
                    Disputes should first be addressed through
                    good-faith communication with Pure Publications.
                  </p>
                </TermsSection>

                <TermsSection
                  id="contact-us"
                  number="18"
                  title="Contact Us"
                  icon={Mail}
                >
                  <p>
                    For questions about these Terms and Conditions,
                    payments, services, cancellations, or
                    publication-related matters, contact Pure
                    Publications.
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
                </TermsSection>
              </div>

              <div className="py-8 text-center">
                <p className="text-xs text-slate-400">
                  © {new Date().getFullYear()} Pure Publications.
                  All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}