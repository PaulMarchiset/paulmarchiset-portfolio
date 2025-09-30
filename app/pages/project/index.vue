<script setup lang="ts">
import { ref, reactive, computed } from "vue"

useHead({
  title: 'Works - Paul Marchiset',
})

const hoveredProjectId = ref<string | null>(null)
const mousePosition = reactive({ x: 0, y: 0 })

function handleMouseMove(event: MouseEvent, projectId: string) {
  hoveredProjectId.value = projectId
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  mousePosition.x = event.clientX - rect.left
  mousePosition.y = event.clientY - rect.top
}

function handleMouseLeave() {
  hoveredProjectId.value = null
}

const prismic = usePrismic()
const { data: page } = await useAsyncData('projects', () =>
  prismic.client.getAllByType('project')
)

const projects = ref(page.value ?? [])

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



</script>

<template>
  <section class="py-32 bg-(--main-black) text-white">
    <div class="p-8 lg:p-12 flex flex-col">
      <h2 class="font-serif text-7xl lg:text-9xl">Works</h2>
      <div
        class="group flex flex-wrap items-center gap-x-1 lg:gap-x-2 text-white font-light text-3xl relative">

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
       <div v-for="project in filteredProjects" :key="project.id" class="flex flex-col gap-2"> 
        <div class="relative w-full overflow-hidden rounded group" @mousemove="(e) => handleMouseMove(e, project.id)"
          @mouseleave="handleMouseLeave">
          <PrismicImage :field="project.data.image_main"
            class="aspect-5/4 lg:aspect-3/2 max-h-[500px] w-full object-cover transition duration-300 ease-in-out group-hover:brightness-75" />

          <div v-if="hoveredProjectId === project.id" class="absolute inset-0 pointer-events-none cursor-none">
            <NuxtLink :to="`/project/${project.uid}`"
              class="absolute px-4 py-2 bg-(--main-white) text-black text-sm rounded-full font-light z-20 pointer-events-auto"
              :style="{
                left: `${mousePosition.x}px`,
                top: `${mousePosition.y}px`,
                transform: 'translate(-50%, -50%)'
              }">
              Discover
            </NuxtLink>
          </div>
        </div>

        <!-- Text content -->
        <div class="w-full flex justify-between text-white">
          <h2 class="text-xl font-medium">{{ project.data.name }}</h2>
          <p class="text-xl font-light">
            {{
              (project.data.main_categories || [])
                .map((c) => c?.main_category)
                .filter(Boolean)
                .join(", ") || "None"
            }}
          </p>
          <!-- <NuxtLink :to="`/project/${project.uid}`"
              class="text-m leading-none font-light rounded-full bg-white text-black px-5 py-2 h-fit flex items-center justify-center">
              <p>Discover</p>
            </NuxtLink> -->
        </div>
      </div>
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
</style>