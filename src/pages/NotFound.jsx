import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import Seo from "../components/Seo";
import Button from "../components/Button";

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="The page you're looking for doesn't exist."
        path="/404"
      />
      <section className="min-h-screen flex items-center justify-center bg-hero-gradient px-4">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-20 h-20 rounded-2xl bg-amber-500 flex items-center justify-center mx-auto mb-8"
          >
            <Compass className="text-white animate-pulse" size={36} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl sm:text-8xl font-heading font-bold text-white mb-4"
          >
            404
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/70 mb-8 max-w-md mx-auto"
          >
            The page you're looking for has been moved, removed, or never existed.
          </motion.p>
          <Button to="/" variant="primary">
            Back to Home
          </Button>
        </div>
      </section>
    </>
  );
}
