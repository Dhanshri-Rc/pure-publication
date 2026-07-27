import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { classNames } from "../utils/helpers";

const variants = {
  primary:
    "bg-amber-500 hover:bg-amber-600 text-white shadow-card hover:shadow-card-hover",
  outline:
    "border-2 border-white/70 text-white hover:bg-white hover:text-navy-900",
  outlineDark:
    "border-2 border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-white",
  ghost: "bg-navy-50 text-navy-800 hover:bg-navy-100",
};

export default function Button({
  children,
  to,
  href,
  onClick,
  type = "button",
  variant = "primary",
  showArrow = false,
  loading = false,
  disabled = false,
  className = "",
  ...props
}) {
  const classes = classNames(
    "inline-flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-full transition-all duration-300 text-sm sm:text-base disabled:opacity-60 disabled:cursor-not-allowed",
    variants[variant],
    className
  );

  const content = (
    <motion.span
      className="inline-flex items-center gap-2"
      whileHover={!disabled ? { scale: 1.04 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
    >
      {loading && <Loader2 className="animate-spin" size={18} />}
      {children}
      {showArrow && !loading && (
        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </motion.span>
  );

  if (to) {
    return (
      <Link to={to} className={classNames(classes, "group")} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classNames(classes, "group")}
        target="_blank"
        rel="noreferrer"
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classNames(classes, "group")}
      {...props}
    >
      {content}
    </button>
  );
}
