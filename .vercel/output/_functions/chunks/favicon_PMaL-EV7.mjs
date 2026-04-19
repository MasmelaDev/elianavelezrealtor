import { e as createComponent, s as spreadAttributes, u as unescapeHTML, r as renderTemplate } from './astro/server_Bx_r-E3M.mjs';

function createSvgComponent({ meta, attributes, children }) {
  const Component = createComponent((_, props) => {
    const normalizedProps = normalizeProps(attributes, props);
    return renderTemplate`<svg${spreadAttributes(normalizedProps)}>${unescapeHTML(children)}</svg>`;
  });
  Object.defineProperty(Component, "toJSON", {
    value: () => meta,
    enumerable: false
  });
  return Object.assign(Component, meta);
}
const ATTRS_TO_DROP = ["xmlns", "xmlns:xlink", "version"];
const DEFAULT_ATTRS = {};
function dropAttributes(attributes) {
  for (const attr of ATTRS_TO_DROP) {
    delete attributes[attr];
  }
  return attributes;
}
function normalizeProps(attributes, props) {
  return dropAttributes({ ...DEFAULT_ATTRS, ...attributes, ...props });
}

const favicon = createSvgComponent({"meta":{"src":"/_astro/favicon.BvBnxEJd.svg","width":32,"height":32,"format":"svg"},"attributes":{"viewBox":"0 0 32 32","fill":"none","stroke":"currentColor","stroke-width":"2"},"children":"<path d=\"M4 14v12h10V14H4zm14 0v12h10V14H18zM4 6v6h10V6H4zm14 0v6h10V6H18z\" />"});

export { favicon as f };
