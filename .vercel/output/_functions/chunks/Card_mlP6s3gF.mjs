import { jsx } from 'react/jsx-runtime';
import 'react';

function Card({ className = "", children, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: `rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm ${className}`, ...props, children });
}
function CardContent({ className = "", children, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: `p-6 pt-0 ${className}`, ...props, children });
}

export { Card as C, CardContent as a };
