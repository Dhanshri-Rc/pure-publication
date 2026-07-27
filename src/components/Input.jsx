import { forwardRef } from "react";
import { classNames } from "../utils/helpers";

const Input = forwardRef(function Input(
  { label, error, icon: Icon, className = "", ...props },
  ref
) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-navy-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-300"
          />
        )}
        <input
          ref={ref}
          className={classNames(
            "w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-navy-900 placeholder-navy-300 outline-none transition-all duration-300 focus:border-amber-400 focus:shadow-glow",
            Icon && "pl-11",
            error && "border-red-400",
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
});

export default Input;
