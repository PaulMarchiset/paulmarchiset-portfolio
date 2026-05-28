<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { ref, computed, onMounted, nextTick } from "vue";
import { getSliceComponentProps } from "@prismicio/vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Props from Prismic Slice
const props = defineProps(getSliceComponentProps<Content.AllProjectsSlice>(["slice", "index", "slices", "context"]));

const prismic = usePrismic();

// Fetch all projects from Prismic
const { data: rawProjects } = await useAsyncData("projects", () => prismic.client.getAllByType("project"));

const projects = ref(rawProjects.value ?? []);

const cardImageParams = {
  auto: ["format", "compress"] as ("format" | "compress")[],
  fit: "crop" as const,
  q: 72,
  w: 1400,
};

// Only keep favorite projects
const favoriteProjects = computed(() => {
  return projects.value.filter(
    (project) => project.data.favorite === true // adjust field name if needed
  );
});

onMounted(async () => {
  await nextTick();
  const wrappers = document.querySelectorAll<HTMLElement>(".project-image-reveal");
  if (!wrappers.length) return;

  wrappers.forEach((el, i) => {
    gsap.fromTo(
      el,
      { clipPath: "inset(100% 0% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: .7,
        delay: (i % 2) * 0.15,
        ease: "cubic-bezier(0.83, 0, 0.29, 0.99)",
        scrollTrigger: {
          trigger: el,
          start: "top 45%",
          once: true,
        },
      }
    );
  });

  // Recalculate trigger positions after images load (their height affects layout)
  window.addEventListener("load", () => ScrollTrigger.refresh());
  setTimeout(() => ScrollTrigger.refresh(), 500);
});
</script>

<template>
  <section class="py-32 text-white">
    <div class="px-4 lg:px-8 flex justify-between">
      <h2 class="font-sans text-xl w-fit font-light">Works</h2>
      <NuxtLink to="/project" aria-label="See all projects" class="text-xl w-fit font-light opacity-75 hover:opacity-100 flex items-center gap-2"> See all projects <Arrow /> </NuxtLink>
    </div>

    <!-- Project list -->
    <article class="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 px-4 lg:px-8">
      <NuxtLink :to="`/project/${project.uid}`" :aria-label="`Go to ${project.data.name}`" v-for="project in favoriteProjects" :key="project.id" class="flex flex-col gap-2">
        <div class="project-image-reveal relative w-full overflow-hidden group">
          <PrismicImage
            :field="project.data.image_main"
            :imgixParams="cardImageParams"
            loading="lazy"
            class="aspect-5/4 lg:aspect-3/2 max-h-[500px] w-full object-cover transition duration-300 ease-in-out group-hover:brightness-75"
          />

          <p class="project-name-badge absolute top-5 left-5 px-4 py-2 bg-(--main-white) text-black text-sm font-light z-20">
            {{ project.data.name }}
          </p>
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

.project-name-badge {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.5s cubic-bezier(0.83, 0, 0.29, 0.99),
    transform 0.5s cubic-bezier(0.83, 0, 0.29, 0.99);
}

.group:hover .project-name-badge {
  opacity: 1;
  transform: translateY(0);
}
</style>
