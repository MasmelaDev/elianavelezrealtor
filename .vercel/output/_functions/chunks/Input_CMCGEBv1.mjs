import { jsx } from 'react/jsx-runtime';
import * as React from 'react';

const Button = React.forwardRef(
  ({ className = "", variant = "primary", size = "md", ...props }, ref) => {
    const base = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    const variants = {
      primary: "bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-500",
      secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-brand-500",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500"
    };
    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base"
    };
    return /* @__PURE__ */ jsx(
      "button",
      {
        ref,
        className: `${base} ${variants[variant]} ${sizes[size]} ${className}`,
        ...props
      }
    );
  }
);
Button.displayName = "Button";

const Input = React.forwardRef(
  ({ className = "", error, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        ref,
        className: `flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50
          ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-brand-500 focus:ring-brand-500"} ${className}`,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const Textarea = React.forwardRef(
  ({ className = "", error, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        ref,
        className: `flex min-h-[80px] w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50
          ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-brand-500 focus:ring-brand-500"} ${className}`,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";

export { Button as B, Input as I, Textarea as T };
