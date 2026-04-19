import { jsx, jsxs } from 'react/jsx-runtime';
import 'react';

function DataTable({ data, columns, keyExtractor, emptyMessage = "No results found." }) {
  return /* @__PURE__ */ jsx("div", { className: "w-full overflow-hidden rounded-lg border border-gray-200 bg-white", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left text-sm text-gray-600", children: [
    /* @__PURE__ */ jsx("thead", { className: "bg-gray-50 text-xs uppercase text-gray-500", children: /* @__PURE__ */ jsx("tr", { children: columns.map((col, i) => /* @__PURE__ */ jsx("th", { className: `px-4 py-3 font-semibold ${col.className ?? ""}`, children: col.header }, i)) }) }),
    /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-200", children: data.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: columns.length, className: "px-4 py-8 text-center text-gray-500", children: emptyMessage }) }) : data.map((row) => /* @__PURE__ */ jsx("tr", { className: "hover:bg-gray-50/50", children: columns.map((col, i) => /* @__PURE__ */ jsx("td", { className: `px-4 py-3 ${col.className ?? ""}`, children: typeof col.accessor === "function" ? col.accessor(row) : row[col.accessor] }, i)) }, keyExtractor(row))) })
  ] }) }) });
}

export { DataTable as D };
