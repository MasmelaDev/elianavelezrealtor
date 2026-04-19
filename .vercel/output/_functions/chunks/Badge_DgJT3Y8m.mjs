import { jsx } from 'react/jsx-runtime';
import 'react';

function Badge({ className = "", variant = "default", ...props }) {
  const base = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  const variants = {
    default: "border-transparent bg-gray-100 text-gray-900",
    success: "border-transparent bg-green-100 text-green-800",
    warning: "border-transparent bg-yellow-100 text-yellow-800",
    error: "border-transparent bg-red-100 text-red-800",
    outline: "text-gray-950 border border-gray-200"
  };
  return /* @__PURE__ */ jsx("div", { className: `${base} ${variants[variant]} ${className}`, ...props });
}

export { Badge as B };
