import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  Send,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { NAV_LINKS, SITE_NAME, SOCIAL_LINKS, CONTACT_INFO } from "../utils/constants";
import { validateEmail } from "../utils/helpers";
import logo from "../assets/images/purelogo.webp";
// Lightweight inline social icons (lucide-react no longer ships brand logos)
function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16} {...props}>
      <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.7c0-.9.3-1.6 1.6-1.6h1.7V3.2C16.5 3.1 15.5 3 14.3 3c-2.5 0-4.2 1.5-4.2 4.3v2.5H7.4v3.2h2.7v8h3.4z" />
    </svg>
  );
}
function TwitterIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16} {...props}>
      <path d="M22 5.9c-.7.3-1.5.6-2.3.7a4 4 0 0 0 1.8-2.2 8 8 0 0 1-2.5 1 4 4 0 0 0-6.9 3.6A11.4 11.4 0 0 1 3.7 4.6a4 4 0 0 0 1.2 5.3 4 4 0 0 1-1.8-.5v.1a4 4 0 0 0 3.2 3.9 4 4 0 0 1-1.8.1 4 4 0 0 0 3.7 2.8A8 8 0 0 1 2 17.8 11.3 11.3 0 0 0 8.3 20c7.5 0 11.6-6.2 11.6-11.6v-.5c.8-.6 1.5-1.3 2.1-2.1z" />
    </svg>
  );
}
function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16} {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6V21h-4v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4V9z" />
    </svg>
  );
}
function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={16} height={16} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const socialIcons = {
  Facebook: FacebookIcon,
  Twitter: TwitterIcon,
  LinkedIn: LinkedinIcon,
  Instagram: InstagramIcon,
};



export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  async function handleSubscribe(e) {
    e.preventDefault();
    if (!validateEmail(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      await addDoc(collection(db, "newsletter"), {
        email,
        subscribedAt: serverTimestamp(),
      });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer className="bg-[#132525] text-white pt-6 pb-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-6">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
             <img src={logo} alt="Pure Publication Logo" className="w-32 h-10" />
            </Link>
            <p className="text-white/60 text-[12px] leading-relaxed mb-4">
              A trusted platform for researchers and academicians to publish
              high-quality, peer-reviewed research across disciplines.
            </p>
            <div className="flex gap-2">
              {SOCIAL_LINKS.map((social) => {
                const Icon = socialIcons[social.name];
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.name}
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-500 hover:scale-110 hover:-translate-y-1 transition-all duration-300"
                  >
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-md mb-2">Quick Links</h4>
            <ul className="space-y-[1px]">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-amber-400 text-[12px] transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-md mb-3">Resources</h4>
          
            <ul className="space-y-2 mt-4 text-[12px] text-white/60">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0 text-amber-400" />
                {CONTACT_INFO.address}
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-amber-400" />
                {CONTACT_INFO.email}
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-amber-400" />
                {CONTACT_INFO.phone}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-md mb-3">Newsletter</h4>
            <p className="text-white/60 text-[12px] mb-4 leading-relaxed">
              Subscribe to get the latest call <br /> for papers and journal updates.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 min-w-0 bg-white/10 border border-white/20 focus:border-amber-400 rounded-full px-4 py-2 text-xs outline-none transition-all duration-300 placeholder-white/40"
              />
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                aria-label="Subscribe"
                className="w-10 h-10 shrink-0 rounded-full bg-amber-500 hover:bg-amber-600 flex items-center justify-center transition-colors duration-300"
              >
                <Send size={16} />
              </motion.button>
            </form>
            {status === "success" && (
              <p className="text-xs text-green-400 mt-2">Subscribed successfully!</p>
            )}
            {status === "error" && (
              <p className="text-xs text-red-400 mt-2">Please enter a valid email.</p>
            )}
          </div>
        </div>

        <div className="border-t border-white/10 pt-3 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/50">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/about" className="hover:text-amber-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about" className="hover:text-amber-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
