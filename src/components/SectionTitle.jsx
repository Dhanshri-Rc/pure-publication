import AnimatedSection from "./AnimatedSection";
import { classNames } from "../utils/helpers";

export default function SectionTitle({
  badge,
  title,
  highlight,
  description,
  align = "center",
  light = false,
}) {
  return (
    <AnimatedSection
      className={classNames(
        "max-w-2xl mb-14",
        align === "center" ? "mx-auto text-center" : "text-left"
      )}
    >
      {badge && <span className="section-badge">{badge}</span>}
      <h2
        className={classNames(
          "text-3xl sm:text-4xl font-heading font-bold leading-tight mb-4",
          light ? "text-white" : "text-navy-900"
        )}
      >
        {title} {highlight && <span className="text-amber-500">{highlight}</span>}
      </h2>
      {description && (
        <p className={classNames("text-base", light ? "text-white/70" : "text-navy-500")}>
          {description}
        </p>
      )}
    </AnimatedSection>
  );
}
