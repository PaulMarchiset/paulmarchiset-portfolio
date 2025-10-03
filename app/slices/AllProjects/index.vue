<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { ref, reactive, computed } from "vue";
import { getSliceComponentProps } from "@prismicio/vue";

// Props from Prismic Slice
const props = defineProps(getSliceComponentProps<Content.AllProjectsSlice>(["slice", "index", "slices", "context"]));

const prismic = usePrismic();

// Fetch all projects from Prismic
const { data: rawProjects } = await useAsyncData("projects", () => prismic.client.getAllByType("project"));

const projects = ref(rawProjects.value ?? []);

// Only keep favorite projects
const favoriteProjects = computed(() => {
  return projects.value.filter(
    (project) => project.data.favorite === true // adjust field name if needed
  );
});

const hoveredProjectId = ref<string | null>(null);

// Track actual cursor vs smoothed cursor
const mouseTarget = reactive({ x: 0, y: 0 });
const mouseSmooth = reactive({ x: 0, y: 0 });

let animationFrame: number | null = null;

function handleMouseMove(event: MouseEvent, projectId: string) {
  hoveredProjectId.value = projectId;
  const target = event.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  mouseTarget.x = event.clientX - rect.left;
  mouseTarget.y = event.clientY - rect.top;

  if (!animationFrame) animateCursor();
}

function handleMouseLeave() {
  hoveredProjectId.value = null;
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }
}

// Animate smoothed position toward target
function animateCursor() {
  const ease = 0.1; // smaller = smoother & slower
  mouseSmooth.x += (mouseTarget.x - mouseSmooth.x) * ease;
  mouseSmooth.y += (mouseTarget.y - mouseSmooth.y) * ease;

  animationFrame = requestAnimationFrame(animateCursor);
}
</script>

<template>
  <section class="py-32 text-white">
    <div class="px-4 lg:px-8 flex justify-between">
      <h2 class="font-sans text-xl w-fit font-light">Works</h2>
      <NuxtLink to="/project" class="text-xl w-fit font-light opacity-75 hover:opacity-100 flex items-center gap-2"> See all projects <Arrow /> </NuxtLink>
    </div>

    <!-- Project list -->
    <article class="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 px-4 lg:px-8">
      <NuxtLink :to="`/project/${project.uid}`" v-for="project in favoriteProjects" :key="project.id" class="flex flex-col gap-2">
        <div class="relative w-full overflow-hidden group" @mousemove="(e) => handleMouseMove(e, project.id)" @mouseleave="handleMouseLeave">
          <PrismicImage :field="project.data.image_main" class="aspect-5/4 lg:aspect-3/2 max-h-[500px] w-full object-cover transition duration-300 ease-in-out group-hover:brightness-75" />

          <div v-if="hoveredProjectId === project.id" class="absolute inset-0 pointer-events-none cursor-none">
            <p
              class="absolute px-4 py-2 bg-(--main-white) text-black text-sm font-light z-20 pointer-events-auto"
              :style="{
                left: `${mouseSmooth.x}px`,
                top: `${mouseSmooth.y}px`,
                transform: 'translate(-50%, -125%)',
                transition: 'none', // important: let JS handle smoothness
              }"
            >
              Discover
            </p>
          </div>
        </div>

        <!-- Text content -->
        <!-- <div class="w-full flex justify-between text-white">
          <h2 class="text-xl font-light">{{ project.data.name }}</h2>
          <p class="text-xl font-light opacity-75">
            {{
              (project.data.main_categories || [])
                .map((c) => c?.main_category)
                .filter(Boolean)
                .join(", ") || "None"
            }}
          </p>
        </div> -->
      </NuxtLink>
    </article>
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
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
</style>
