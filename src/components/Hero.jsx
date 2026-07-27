import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "./Button";

/**
 * Shared Hero used on every page. Only title, description, image, button
 * and breadcrumb change between pages.
 */
export default function Hero({
  eyebrow,
  title,
  highlight,
  description,
  image,
  primaryAction,
  secondaryAction,
  breadcrumb,
  stats,
}) {
  return (
    <section className="relative overflow-hidden bg-hero-gradient pt-36 pb-24 lg:pt-44 lg:pb-32">
      {/* decorative blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 -left-24 w-72 h-72 bg-navy-400/20 rounded-full blur-3xl animate-float" />

      <div className="container-custom relative grid lg:grid-cols-2 gap-12 items-center">
        <div>
          {breadcrumb && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-sm text-white/60 mb-6"
            >
              <Link to="/" className="hover:text-amber-400 transition-colors">
                Home
              </Link>
              <ChevronRight size={14} />
              <span className="text-amber-400">{breadcrumb}</span>
            </motion.div>
          )}

          {eyebrow && (
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="section-badge bg-white/10 text-amber-400"
            >
              {eyebrow}
            </motion.span>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6"
          >
            {title} {highlight && <span className="text-amber-400">{highlight}</span>}
          </motion.h1>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-white/70 text-lg max-w-xl mb-8 leading-relaxed"
            >
              {description}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            {primaryAction && (
              <Button to={primaryAction.to} variant="primary" showArrow>
                {primaryAction.label}
              </Button>
            )}
            {secondaryAction && (
              <Button to={secondaryAction.to} variant="outline">
                {secondaryAction.label}
              </Button>
            )}
          </motion.div>

          {stats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 mt-12 max-w-md"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl sm:text-3xl font-heading font-bold text-white">
                    {s.value}
                  </p>
                  <p className="text-xs text-white/60 mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-amber-500/20 rounded-3xl rotate-6 scale-95" />
            <img
              src={image}
              alt={title}
              className="relative rounded-3xl shadow-2xl w-full object-cover aspect-[4/3] transition-transform duration-700 hover:scale-105"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
