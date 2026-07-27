import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, BookOpen } from "lucide-react";
import { NAV_LINKS, SITE_NAME } from "../utils/constants";
import Button from "./Button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy-900/80 backdrop-blur-lg shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500 text-navy-900 group-hover:rotate-6 transition-transform duration-300">
            <BookOpen size={20} />
          </span>
          <span className="text-white font-heading font-bold text-lg sm:text-xl tracking-tight">
            {SITE_NAME}
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.path} className="relative">
              <NavLink
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `relative py-1 text-sm font-medium tracking-wide transition-colors duration-300 ${
                    isActive ? "text-amber-400" : "text-white/85 hover:text-white"
                  } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-amber-400 after:transition-all after:duration-300 ${
                    isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          <button
            aria-label="Search"
            onClick={() => setSearchOpen((s) => !s)}
            className="text-white/85 hover:text-amber-400 transition-colors duration-300 hover:rotate-12"
          >
            <Search size={20} />
          </button>
          <Button to="/submit-paper" variant="primary">
            Submit Paper
          </Button>
        </div>

        <button
          className="lg:hidden text-white"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={28} />
        </button>
      </nav>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="container-custom overflow-hidden hidden lg:block"
          >
            <div className="pt-4">
              <input
                autoFocus
                type="text"
                placeholder="Search journals, articles, topics..."
                className="w-full bg-white/10 border border-white/20 focus:border-amber-400 text-white placeholder-white/50 rounded-full px-5 py-3 outline-none transition-all duration-300 focus:shadow-glow"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="fixed inset-0 bg-navy-900 z-50 flex flex-col p-6 lg:hidden"
          >
            <div className="flex justify-between items-center mb-10">
              <span className="text-white font-heading font-bold text-lg">
                {SITE_NAME}
              </span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={28} className="text-white" />
              </button>
            </div>
            <ul className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    end={link.path === "/"}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `text-2xl font-heading font-semibold ${
                        isActive ? "text-amber-400" : "text-white"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-auto">
              <Button
                to="/submit-paper"
                variant="primary"
                className="w-full justify-center"
                onClick={() => setMobileOpen(false)}
              >
                Submit Paper
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
