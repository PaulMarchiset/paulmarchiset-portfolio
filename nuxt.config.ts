// import { repositoryName, apiEndpoint } from "./slicemachine.config.json"
import tailwindcss from "@tailwindcss/vite"
import { createClient } from "@prismicio/client"

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2025-01-06",

  ssr: true,

  devtools: { enabled: true },

  app: {
    pageTransition: { name: "scale-slide" },
    head: {
      title: "Paul Marchiset - Portfolio",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "Portfolio of Paul Marchiset, graphic designer.",
        },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [{ rel: "icon", type: "image/svg+xml", href: "/logo.svg" }, 
        { rel: "icon", type: "image/x-icon", href: "/paulmarchiset_logo.ico" },
        { 
          rel: 'preload', 
          as: 'font', 
          type: 'font/ttf', 
          href: '/fonts/Bahnschrift.ttf', 
          crossorigin: 'anonymous' 
        },
        { 
          rel: 'preload', 
          as: 'font', 
          type: 'font/otf', 
          href: '/fonts/PPNeueMontreal-Book.otf', 
          crossorigin: 'anonymous' 
        },
        { 
          rel: 'preload', 
          as: 'font', 
          type: 'font/otf', 
          href: '/fonts/PPNeueMontreal-Medium.otf', 
          crossorigin: 'anonymous' 
        },
        { 
          rel: 'preload', 
          as: 'font', 
          type: 'font/otf', 
          href: '/fonts/PPEditorialNew-Ultralight.otf', // Adjust filename to match yours
          crossorigin: 'anonymous' 
        },
      ],
    },
  },

  css: ["../assets/css/main.css"],

  modules: [
    "@nuxt/eslint",
    "@nuxtjs/prismic",
    "@pinia/nuxt",
    "nuxt-gtag",
    "lenis/nuxt",
    "@nuxtjs/sitemap",
  ],

  gtag: {
    id: "G-JWDW19ZCXB",
  },

  /** ✅ Prismic Setup */
  prismic: {
    endpoint: 'paulmarchiset-portfolio',
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
          uid: "about",
          path: "/about",
        },
        {
          type: "contact",
          uid: "contact",
          path: "/contact",
        },
        {
          type: "photo",
          uid: "photos",
          path: "/photos",
        },
        {
          type: "project",
          path: "/project/:uid",
        },
      ],
    },
  },

  /** ✅ Required for Sitemap */
  site: {
    url: "https://paulmarchiset.me",
  },

  /** ✅ Sitemap + Dynamic Prismic Routes */
  sitemap: {
    urls: async () => {
      const client = createClient('paulmarchiset-portfolio',)

      // Fetch all project pages
      const projects = await client.getAllByType("project")

      return projects.map((doc) => ({
        loc: `/project/${doc.uid}`,
        lastmod: new Date(doc.last_publication_date).toISOString(),
        images: doc.data.meta_image?.url
          ? [
            {
              loc: doc.data.meta_image.url,
            },
          ]
          : [],
      }))
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
})
