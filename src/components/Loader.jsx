import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function Loader({ fullscreen = true }) {
  return (
    <div
      className={
        fullscreen
          ? "fixed inset-0 z-[100] flex items-center justify-center bg-navy-900"
          : "flex items-center justify-center py-20"
      }
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
        className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center"
      >
        <BookOpen className="text-white" size={26} />
      </motion.div>
    </div>
  );
}
