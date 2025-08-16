import { repositoryName, apiEndpoint } from "./slicemachine.config.json";
import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  devtools: { enabled: true },

  app: {
    head: {
      title: "Paul Marchiset - Portfolio",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/logo.svg" }],
    },
  },

  modules: ["@nuxt/eslint", "@nuxtjs/prismic", "@pinia/nuxt", "nuxt-gtag"],

  gtag: {
    id: "G-JWDW19ZCXB"
  },

  prismic: {
    endpoint: apiEndpoint || repositoryName,
    preview: "/api/preview",
    clientConfig: {
      routes: [
        {
          type: "homepage",
          uid: "home",
          path: "/",
        },
        {
          type: "about",
          path: "/about",
        },
        {
          type: "contact",
          path: "/contact",
        },
        {
          type: "photo",
          path: "/photos",
        },
        {
          type: "project",
          path: "/project/:uid",
        },
      ],
    },
  },

  compatibilityDate: "2025-01-06",
  css: ["../assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
});