import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["react", "react-dom"],
    },
  },

  // i18n nativo
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en", "fr"],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: true,
    },
    fallback: {
      en: "es",
      fr: "es",
    },
  },

  output: "static",
  site: "https://segula-technologies.com",
});
