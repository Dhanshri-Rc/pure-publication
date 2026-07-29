import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, X } from "lucide-react";

import { NAV_LINKS, SITE_NAME } from "../utils/constants";
import Button from "./Button";
import logo from "../assets/images/purelogo.webp";

const navbarVariants = {
  hidden: {
    y: -90,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const mobileMenuVariants = {
  hidden: {
    x: "100%",
  },
  visible: {
    x: 0,
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    x: "100%",
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 1, 1],
    },
  },
};

const mobileLinkVariants = {
  hidden: {
    opacity: 0,
    x: 28,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

export default function Navbar() {
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const value = searchValue.trim();

    if (!value) return;

    console.log("Search:", value);
  };

  return (
    <>
      <motion.header
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
          scrolled
            ? "border-white/10 bg-[#073F40]/95 py-2 shadow-[0_12px_35px_rgba(0,0,0,0.18)] backdrop-blur-xl"
            : "border-transparent bg-[#073F40] py-2.5"
        }`}
      >
        <nav className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* LOGO */}
          <Link
            to="/"
            aria-label={`${SITE_NAME} home`}
            className="group relative z-10 flex shrink-0 items-center"
          >
            <motion.img
              src={logo}
              alt="Pure Publication Logo"
              className={`object-contain transition-all duration-300 ${
                scrolled
                  ? "h-10 w-auto sm:h-11"
                  : "h-11 w-auto sm:h-11"
              }`}
              whileHover={{
                scale: 1.04,
              }}
              transition={{
                duration: 0.25,
              }}
            />

            <span className="absolute -bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#D4A257] transition-all duration-300 group-hover:w-full" />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <ul className="hidden items-center gap-1 lg:flex xl:gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive }) =>
                    `group relative flex min-h-11 items-center rounded-lg px-3.5 text-[14px] font-medium tracking-[0.01em] transition-all duration-300 xl:px-4 ${
                      isActive
                        ? " text-[#D4A257]"
                        : "text-white/85 hover:bg-white/7 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10">{link.name}</span>

                      <span
                        className={`absolute bottom-1.5 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[#D4A257] transition-all duration-300 ${
                          isActive
                            ? "w-[40%]"
                            : "w-0 group-hover:w-[40%]"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* DESKTOP ACTIONS */}
          <div className="hidden items-center gap-3 lg:flex">
           

            <button
              to="/submit-paper"
              variant="primary"
              className="min-h-9 text-[14px] whitespace-nowrap rounded-lg bg-[#D4A257] px-5 font-medium text-[#ffffff] shadow-none transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E1B66F] hover:shadow-[0_10px_25px_rgba(212,162,87,0.25)]"
            >
              Submit Paper
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <motion.button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            whileTap={{
              scale: 0.92,
            }}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition-colors duration-300 hover:border-[#D4A257]/60 hover:bg-white/10 hover:text-[#D4A257] lg:hidden"
          >
            <Menu size={24} />
          </motion.button>
        </nav>

        {/* DESKTOP SEARCH PANEL */}
        <AnimatePresence initial={false}>
          {searchOpen && (
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
                ease: [0.22, 1, 0.36, 1],
              }}
              className="hidden overflow-hidden lg:block"
            >
              <div className="mx-auto w-full max-w-[1280px] px-8 pb-3 pt-3">
                <form
                  onSubmit={handleSearchSubmit}
                  className="relative mx-auto max-w-3xl"
                >
                  {/* <Search
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/45"
                  /> */}

                  <input
                    autoFocus
                    type="search"
                    value={searchValue}
                    onChange={(event) =>
                      setSearchValue(event.target.value)
                    }
                    placeholder="Search journals, articles, topics..."
                    className="h-12 w-full rounded-xl border border-white/15 bg-white/10 pl-12 pr-28 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/45 focus:border-[#D4A257] focus:bg-white/12 focus:shadow-[0_0_0_4px_rgba(212,162,87,0.1)]"
                  />

                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 min-h-9 -translate-y-1/2 rounded-lg bg-[#D4A257] px-5 text-xs font-semibold text-[#073F40] transition-all duration-300 hover:bg-[#E1B66F]"
                  >
                    Search
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* MOBILE OVERLAY AND DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation overlay"
              onClick={() => setMobileOpen(false)}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="fixed inset-0 z-[60] bg-black/55 backdrop-blur-[3px] lg:hidden"
            />

            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed bottom-0 right-0 top-0 z-[70] flex w-full max-w-[390px] flex-col overflow-y-auto bg-[#073F40] px-5 pb-6 pt-5 shadow-[-18px_0_50px_rgba(0,0,0,0.25)] sm:px-7"
            >
              {/* MOBILE HEADER */}
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center"
                >
                  <img
                    src={logo}
                    alt="Pure Publication Logo"
                    className="h-11 w-auto object-contain"
                  />
                </Link>

                <motion.button
                  type="button"
                  aria-label="Close navigation menu"
                  onClick={() => setMobileOpen(false)}
                  whileHover={{
                    rotate: 90,
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-[#D4A257] hover:text-[#D4A257]"
                >
                  <X size={23} />
                </motion.button>
              </div>

              {/* MOBILE SEARCH */}
              <form
                onSubmit={handleSearchSubmit}
                className="relative mt-6"
              >
                <Search
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/45"
                />

                <input
                  type="search"
                  value={searchValue}
                  onChange={(event) =>
                    setSearchValue(event.target.value)
                  }
                  placeholder="Search journals..."
                  className="h-12 w-full rounded-xl border border-white/15 bg-white/8 pl-12 pr-4 text-sm text-white outline-none transition-all placeholder:text-white/40 focus:border-[#D4A257] focus:bg-white/10"
                />
              </form>

              {/* MOBILE LINKS */}
              <motion.ul
                initial="hidden"
                animate="visible"
                transition={{
                  staggerChildren: 0.07,
                  delayChildren: 0.1,
                }}
                className="mt-7 flex flex-col gap-2"
              >
                {NAV_LINKS.map((link) => (
                  <motion.li
                    key={link.path}
                    variants={mobileLinkVariants}
                    transition={{
                      duration: 0.35,
                    }}
                  >
                    <NavLink
                      to={link.path}
                      end={link.path === "/"}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `group flex min-h-14 items-center justify-between rounded-xl border px-4 text-[17px] font-semibold transition-all duration-300 ${
                          isActive
                            ? "border-[#D4A257]/50 bg-[#D4A257]/12 text-[#D4A257]"
                            : "border-transparent text-white/90 hover:border-white/10 hover:bg-white/7 hover:text-white"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span>{link.name}</span>

                          <ArrowIndicator active={isActive} />
                        </>
                      )}
                    </NavLink>
                  </motion.li>
                ))}
              </motion.ul>

              {/* MOBILE FOOTER ACTION */}
              <div className="mt-auto pt-8">
                <Button
                  to="/submit-paper"
                  variant="primary"
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-12 w-full items-center justify-center rounded-xl bg-[#D4A257] text-[#073F40] shadow-none hover:bg-[#E1B66F]"
                >
                  Submit Paper
                </Button>

                <p className="mt-4 text-center text-[11px] leading-5 text-white/45">
                  Trusted academic publishing and professional research
                  support.
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function ArrowIndicator({ active }) {
  return (
    <span
      className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
        active
          ? "bg-[#D4A257] text-[#073F40]"
          : "bg-white/7 text-white/60 group-hover:translate-x-1 group-hover:bg-white/10 group-hover:text-white"
      }`}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M5 12H19M13 6L19 12L13 18"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}