import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, BookMarked } from "lucide-react";
import { truncate } from "../utils/helpers";

export default function JournalCard({ journal, delay = 0 }) {
  const {
    id,
    title,
    coverImage,
    description,
    category,
    frequency,
    issn,
  } = journal;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover border border-transparent hover:border-amber-400/60 transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-navy-100">
        {coverImage ? (
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-navy-300">
            <BookMarked size={48} />
          </div>
        )}
        <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/20 transition-colors duration-300" />
        {category && (
          <span className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {category}
          </span>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-lg font-heading font-semibold text-navy-900 mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-navy-500 mb-4 leading-relaxed">
          {truncate(description, 100)}
        </p>
        <div className="flex items-center justify-between text-xs text-navy-400 mb-5">
          {issn && <span>ISSN: {issn}</span>}
          {frequency && <span>{frequency}</span>}
        </div>
        <Link
          to={`/journals/${id}`}
          className="inline-flex items-center gap-1.5 text-amber-600 font-semibold text-sm group/link"
        >
          View Details
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
          />
        </Link>
      </div>
    </motion.div>
  );
}
