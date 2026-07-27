import { forwardRef } from "react";
import { classNames } from "../utils/helpers";

const Textarea = forwardRef(function Textarea(
  { label, error, rows = 5, className = "", ...props },
  ref
) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-navy-700 mb-2">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={classNames(
          "w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-navy-900 placeholder-navy-300 outline-none transition-all duration-300 focus:border-amber-400 focus:shadow-glow resize-none",
          error && "border-red-400",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
});

export default Textarea;
