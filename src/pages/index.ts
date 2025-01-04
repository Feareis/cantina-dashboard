import React from "react";

const modules = import.meta.glob<true, string, { default: React.ComponentType<any> }>("./*.tsx");

const pages: { [key: string]: React.LazyExoticComponent<React.ComponentType<any>> } = {};

for (const path in modules) {
  const pageName = path.replace("./", "").replace(/\.tsx$/, "");
  pages[pageName] = React.lazy(() => modules[path]());
}

export default pages;
