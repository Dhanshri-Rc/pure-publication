import { motion } from "framer-motion";
import { classNames } from "../utils/helpers";

export default function Card({
  icon: Icon,
  title,
  description,
  className = "",
  children,
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8 }}
      className={classNames(
        "group relative bg-white rounded-2xl p-8 shadow-card border border-transparent hover:border-amber-400/60 hover:shadow-card-hover transition-all duration-300",
        className
      )}
    >
      {Icon && (
        <div className="w-14 h-14 rounded-xl bg-navy-800 group-hover:bg-amber-500 flex items-center justify-center mb-6 transition-all duration-300 group-hover:rotate-6">
          <Icon className="text-amber-400 group-hover:text-white transition-colors duration-300" size={26} />
        </div>
      )}
      {title && (
        <h3 className="text-xl font-heading font-semibold text-navy-900 mb-3">
          {title}
        </h3>
      )}
      {description && <p className="text-navy-500 leading-relaxed">{description}</p>}
      {children}
    </motion.div>
  );
}
