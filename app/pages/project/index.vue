<script setup lang="ts">
import { ref, computed } from "vue"
import { useHead, useSeoMeta } from "@unhead/vue"
import { usePrismic } from "@prismicio/vue"

const prismic = usePrismic()
const { data: page } = await useAsyncData('projects', () =>
  prismic.client.getAllByType('project')
)

const siteUrl = 'https://paulmarchiset.me'
const canonicalUrl = `${siteUrl}/project`
const metaTitle = 'Works - Paul Marchiset'
const metaDescription = 'Selected works and projects by Paul Marchiset, graphic designer and videographer.'

useSeoMeta({
  title: metaTitle,
  description: metaDescription,
  ogTitle: metaTitle,
  ogDescription: metaDescription,
  ogUrl: canonicalUrl,
  ogType: 'website',
  twitterTitle: metaTitle,
  twitterDescription: metaDescription,
  twitterCard: 'summary_large_image',
})

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: metaTitle,
        description: metaDescription,
        url: canonicalUrl,
        isPartOf: { '@type': 'WebSite', name: 'Paul Marchiset', url: siteUrl },
      }),
    },
  ],
})

const projects = ref(page.value ?? [])

const cardImageParams = {
  auto: ["format", "compress"] as ("format" | "compress")[],
  fit: "crop" as const,
  q: 72,
  w: 1400,
}

type mainCategoryMap = Record<string, number>

const mainCategoryCounts = computed(() => {
  const counts: mainCategoryMap = {}

  projects.value.forEach((project) => {
    project.data.main_categories?.forEach((cat) => {
      const name = cat?.main_category?.trim()
      if (name) {
        counts[name] = (counts[name] || 0) + 1
      }
    })
  })

  return counts
})

// Extract maincategory names sorted alphabetically
const allMainCategories = computed(() => {
  return Object.keys(mainCategoryCounts.value).sort()
})

const selectedMainCategory = ref<string | null>(null)

const filteredProjects = computed(() => {
  if (!selectedMainCategory.value) return projects.value

  return projects.value.filter((project) =>
    project.data.main_categories?.some(
      (cat) => cat?.main_category?.trim() === selectedMainCategory.value
    )
  )
})

definePageMeta({
  theme: 'dark'
})

</script>

<template>
  <section class="py-32 bg-(--main-black) text-white">
    <div class="px-4 flex justify-between">
      <h2 class="font-sans text-3xl w-fit font-light">Works</h2>
      <div
        class="group hidden lg:flex flex-wrap items-center gap-x-1 lg:gap-x-2 text-white font-light text-3xl relative">

        <button :class="[selectedMainCategory === null ? 'text-white' : '']" @click="selectedMainCategory = null">
          All ({{ projects.length }})
        </button>
        <template v-for="(cat, index) in allMainCategories" :key="cat">
          <span class="mx-1 select-none">—</span>
          <button :class="[selectedMainCategory === cat ? 'text-white' : '']" @click="selectedMainCategory = cat">
            {{ cat }} ({{ mainCategoryCounts[cat] }})
          </button>
        </template>
      </div>
    </div>



    <!-- Project list -->
    <section class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8 p-4">
       <NuxtLink :to="`/project/${project.uid}`" :aria-label="`Go to ${project.data.name}`" v-for="project in filteredProjects" :key="project.id" class="flex flex-col gap-2">
        <div class="relative w-full overflow-hidden group">
          <PrismicImage
            :field="project.data.image_main"
            :imgixParams="cardImageParams"
            loading="lazy"
            class="aspect-5/4 lg:aspect-3/2 max-h-[500px] w-full object-cover transition duration-300 ease-in-out group-hover:brightness-75"
          />

          <div class="absolute top-5 left-5 flex flex-col items-start gap-2 z-20">
            <p
              v-for="(cat, i) in (project.data.main_categories || []).map((c) => c?.main_category).filter(Boolean)"
              :key="`${project.id}-cat-${i}`"
              class="project-categories-badge px-4 py-2 bg-(--main-white) text-black text-sm font-light"
              :style="{ transitionDelay: `${i * 80}ms` }"
            >
              {{ cat }}
            </p>
          </div>
        </div>

        <!-- Text content -->
        <div class="w-full flex justify-between text-white">
          <h2 class="text-xl font-light">{{ project.data.name }}</h2>
          <p class="text-xl font-light opacity-75">{{ project.data.date }}</p>
        </div>
      </NuxtLink>
    </section>
    
    
    
  </section>
</template>

<style scoped>
.group button,
.group span {
  opacity: 1;
  transition: opacity 0.2s ease;
}

.group:hover button:hover {
  cursor: pointer;
}

.group:hover button:not(:hover),
.group:hover span {
  opacity: 0.3;
}

.nuxt-link-hover {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.project-categories-badge {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.5s cubic-bezier(0.83, 0, 0.29, 0.99),
    transform 0.5s cubic-bezier(0.83, 0, 0.29, 0.99);
}

.group:hover .project-categories-badge {
  opacity: 1;
  transform: translateY(0);
}
</style>