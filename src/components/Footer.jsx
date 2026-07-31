import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, ArrowUpRight } from "lucide-react";
import {
  SITE_NAME,
  SOCIAL_LINKS,
  CONTACT_INFO,
} from "../utils/constants";
import logo from "../assets/images/purelogo.webp";

const WHATSAPP_NUMBER = "918446723800";

const WHATSAPP_MESSAGE =
  "Hello Pure Publication, I would like to know more about your publication services.";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

/* -------------------- Social Icons -------------------- */

function FacebookIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.7c0-.9.3-1.6 1.6-1.6h1.7V3.2C16.5 3.1 15.5 3 14.3 3c-2.5 0-4.2 1.5-4.2 4.3v2.5H7.4v3.2h2.7v8h3.4z" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6V21h-4v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4V9z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle
        cx="17.5"
        cy="6.5"
        r="1"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function WhatsAppIcon(props) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M16.04 3C8.86 3 3 8.78 3 15.89c0 2.5.72 4.93 2.08 7.01L3.71 28l5.25-1.35a13.1 13.1 0 0 0 7.07 2.05h.01C23.22 28.7 29 22.92 29 15.81 29 8.77 23.21 3 16.04 3Zm0 23.52h-.01a10.9 10.9 0 0 1-5.56-1.52l-.4-.24-3.12.8.83-3.02-.26-.41a10.66 10.66 0 0 1-1.66-5.72c0-5.96 4.57-10.81 10.18-10.81 5.62 0 10.19 4.85 10.19 10.81 0 5.96-4.57 10.81-10.19 10.81Zm5.58-8.08c-.31-.16-1.81-.94-2.09-1.05-.28-.1-.49-.16-.69.16-.2.31-.8 1.05-.98 1.26-.18.21-.36.24-.67.08-.31-.16-1.3-.5-2.47-1.6a9.36 9.36 0 0 1-1.72-2.25c-.18-.31-.02-.48.14-.64.14-.14.31-.36.46-.55.15-.18.2-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.69-1.73-.95-2.37-.25-.61-.51-.53-.69-.54h-.59c-.2 0-.54.08-.82.39-.28.31-1.08 1.1-1.08 2.68s1.11 3.11 1.26 3.32c.15.21 2.18 3.48 5.29 4.88.74.33 1.32.52 1.77.67.74.25 1.42.21 1.95.13.6-.09 1.81-.78 2.07-1.52.25-.73.25-1.36.18-1.49-.08-.13-.28-.21-.59-.37Z" />
    </svg>
  );
}

/* -------------------- Footer Data -------------------- */

const footerLinks = [
  {
    name: "About Us",
    path: "/about",
  },
  {
    name: "Services",
    path: "/services",
  },
  {
    name: "Journals",
    path: "/journals",
  },
  {
    name: "Contact Us",
    path: "/contact",
  },
  {
    name: "Privacy Policy",
    path: "/privacy-policy",
  },
  {
    name: "Terms of Service",
    path: "/terms-and-conditions",
  },
];

const footerSocialLinks = [
  {
    name: "Facebook",
    url:
      SOCIAL_LINKS?.find(
        (social) => social.name?.toLowerCase() === "facebook"
      )?.url || "https://www.facebook.com/profile.php?id=61569172181435",
    icon: FacebookIcon,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/pure_publication/?hl=en",
    icon: InstagramIcon,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/purepublication/posts/?feedView=all",
    icon: LinkedinIcon,
  },
];

/* -------------------- Footer Component -------------------- */

export default function Footer() {
  return (
    <>
      <footer className="relative overflow-hidden bg-[#0d211f] text-white">
        {/* Decorative top border */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9a45f]/80 to-transparent" />

        {/* Background decorative glow */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#c9a45f]/[0.05] blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="px-4 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-8 lg:px-8">
            {/* Top section */}
            <div className="grid gap-10 lg:grid-cols-[1.25fr_0.9fr_0.9fr_0.9fr] lg:gap-8">
              {/* Brand section */}
              <div className="max-w-xl">
                <Link
                  to="/"
                  aria-label="Pure Publications home"
                  className="inline-flex"
                >
                  <motion.img
                    src={logo}
                    alt="Pure Publications Logo"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.25 }}
                    className="h-auto w-[145px] object-contain sm:w-[165px]"
                  />
                </Link>

                <p className="mt-5 max-w-[280px] text-sm leading-6 text-white/70 sm:text-[14px]">
                  Your dedicated partner in academic excellence, research
                  publishing, journal guidance, and professional writing.
                </p>

             
              </div>


 <div>
  <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#d9b66f]">
    Quick Links
  </h3>

  <nav aria-label="Footer navigation">
    <ul className="space-y-[2px]">
      {footerLinks.map((link) => (
        <li key={link.path}>
          <Link
            to={link.path}
            className="group relative inline-block text-[13px]  text-white/70 transition-colors duration-300 hover:text-[#d9b66f]"
          >
            {link.name}

            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#d9b66f] transition-all duration-300 group-hover:w-full" />
          </Link>
        </li>
      ))}
    </ul>
  </nav>
</div>
              {/* Contact section */}
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#d9b66f]">
                  Contact
                </h3>

                <ul className="space-y-2 text-[13px] text-white/65">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#d9b66f]">
                      <MapPin className="h-4 w-4" />
                    </span>

                    <span className="leading-6">
                      {CONTACT_INFO.address}
                    </span>
                  </li>

                  <li>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="group flex items-center gap-3 transition-colors duration-300 hover:text-[#d9b66f]"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#d9b66f] transition-colors group-hover:border-[#d9b66f]/40">
                        <Mail className="h-4 w-4" />
                      </span>

                      <span className="break-all">{CONTACT_INFO.email}</span>
                    </a>
                  </li>

                  <li>
                    <a
                      href={`tel:${CONTACT_INFO.phone}`}
                      className="group flex items-center gap-3 transition-colors duration-300 hover:text-[#d9b66f]"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#d9b66f] transition-colors group-hover:border-[#d9b66f]/40">
                        <Phone className="h-4 w-4" />
                      </span>

                      <span>{CONTACT_INFO.phone}</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Social section */}
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#d9b66f]">
                  Follow Us
                </h3>

                <p className="mb-5 max-w-xs text-[13px] leading-6 text-white/60">
                  Connect with Pure Publications for research updates,
                  publishing opportunities, and academic insights.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  {footerSocialLinks.map((social) => {
                    const Icon = social.icon;

                    return (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit Pure Publications on ${social.name}`}
                        title={social.name}
                        whileHover={{
                          y: -4,
                          scale: 1.05,
                        }}
                        whileTap={{ scale: 0.94 }}
                        className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/15 text-white shadow-sm transition-all duration-300 hover:border-[#d9b66f]/60 hover:bg-[#d9b66f] hover:text-[#0d211f]"
                      >
                        <Icon className="h-[18px] w-[18px]" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Navigation links */}
           

          
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp button */}
     <motion.a
  href={WHATSAPP_URL}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Chat with Pure Publications on WhatsApp"
  title="Chat with us on WhatsApp"
  initial={{
    opacity: 0,
    scale: 0.75,
    y: 18,
  }}
  animate={{
    opacity: 1,
    scale: 1,
    y: [0, -6, 0],
  }}
  transition={{
    opacity: {
      duration: 0.4,
      delay: 0.2,
    },
    scale: {
      duration: 0.4,
      delay: 0.2,
    },
    y: {
      duration: 2.8,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 0.8,
    },
  }}
  whileHover={{
    scale: 1.08,
    y: -5,
  }}
  whileTap={{
    scale: 0.92,
  }}
  className="group fixed bottom-4 right-4 z-[9999] flex items-center sm:bottom-5 sm:right-5"
>
  {/* Hover label */}
  <span className="pointer-events-none mr-2.5 hidden translate-x-2 whitespace-nowrap rounded-md border border-black/5 bg-white px-3 py-1.5 text-[11px] font-semibold text-[#102522] opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
    Chat with us
  </span>

  {/* Main WhatsApp icon */}
  <span className="relative flex h-[46px] w-[46px] items-center justify-center rounded-full border-2  bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.35)] sm:h-[46px] sm:w-[46px]">
    {/* Soft pulse effect */}
    <motion.span
      className="absolute inset-0 -z-10 rounded-full bg-[#25D366]"
      animate={{
        scale: [1, 1.28, 1],
        opacity: [0.22, 0, 0.22],
      }}
      transition={{
        duration: 2.4,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />

    <WhatsAppIcon className="relative z-10 h-6 w-6 sm:h-7 sm:w-7" />

    {/* Online indicator */}
    <span className="absolute right-0 top-0 h-3 w-3 rounded-full border-2  bg-[#f44336]" />
  </span>
</motion.a>
    </>
  );
}