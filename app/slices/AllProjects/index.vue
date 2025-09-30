  <script setup lang="ts">
  import type { Content } from "@prismicio/client"
  import { ref, computed } from "vue"
  import { getSliceComponentProps } from "@prismicio/vue"

  // Props from Prismic Slice
  const props = defineProps(
    getSliceComponentProps<Content.AllProjectsSlice>([
      "slice",
      "index",
      "slices",
      "context",
    ])
  )

  const prismic = usePrismic()

  // Fetch all projects from Prismic
  const { data: rawProjects } = await useAsyncData("projects", () =>
    prismic.client.getAllByType("project")
  )

  const projects = ref(rawProjects.value ?? [])

  // Only keep favorite projects
  const favoriteProjects = computed(() => {
    return projects.value.filter(
      (project) => project.data.favorite === true // adjust field name if needed
    )
  })

  import { Swiper, SwiperSlide } from 'swiper/vue'
  import { Autoplay, Pagination } from 'swiper/modules'
  import 'swiper/css'
  import 'swiper/css/pagination'
</script>


  <template>
    <section class="py-32 text-white">
      <div class="p-8 lg:p-16 flex flex-col">
        <h2 class="font-serif text-7xl lg:text-9xl w-fit ml-[-0.5rem]">Works</h2>
        <!-- <div class="group flex flex-wrap items-center gap-x-2 text-white font-light text-xl lg:text-3xl relative">
          <button :class="[selectedMainCategory === null ? 'text-white' : '']" @click="selectedMainCategory = null">
            All ({{ projects.length }})
          </button>
          <template v-for="(cat, index) in allMainCategories" :key="cat">
            <span class="mx-1 select-none">—</span>
            <button :class="[selectedMainCategory === cat ? 'text-white' : '']" @click="selectedMainCategory = cat">
              {{ cat }} ({{ MainCategoryCounts[cat] }})
            </button>
          </template></div> -->
        <NuxtLink to="/project" class="text-2xl lg:text-3xl font-light w-fit opacity-75 hover:opacity-100">
          See all projects
        </NuxtLink>
      </div>



      <!-- Project list -->
      <client-only>
        <Swiper :modules="[Autoplay, Pagination]" :slides-per-view="'auto'" :space-between="30" :centered-slides="true"
          :loop="true" :autoplay="{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }"
          :pagination="{ el: '.swiper-pagination ', clickable: true }" class="mySwiper cursor-grab">
          <SwiperSlide v-for="project in favoriteProjects" :key="project.id"
            class="relative aspect-3/4 lg:aspect-video">

            <PrismicImage :field="project.data.image_main" class="w-full h-full object-cover rounded" />

            <div
              class=" absolute bottom-0 left-0 w-full h-full md:h-auto p-6 z-10 flex flex-col md:flex-row items-center justify-between bg-gradient-to-t from-black/30 to-transparent text-white">
              <div class="flex flex-col gap-1 md:gap-0">
                <h2 class="text-2xl leading-title">{{ project.data.name }}</h2>
                <p class="text-sm font-light hidden md:block"> {{(project.data.main_categories || []).map((c) =>
                  c?.main_category).filter(Boolean).join(", ") || "None" }} </p>
              </div>
              <NuxtLink :to="`/project/${project.uid}`"
                class="text-m leading-none font-light rounded-full bg-(--main-white) text-black px-5 py-2 h-fit flex items-center justify-center w-min">
                <p>Discover</p>
              </NuxtLink>
            </div>
          </SwiperSlide>

          <SwiperSlide class="relative aspect-3/4 lg:aspect-video">
            <PrismicImage :field="slice.primary.image" class="w-full h-full object-cover rounded" />
            <div
              class="absolute bottom-0 left-0 w-full h-full p-6 z-10 flex flex-col items-center justify-between text-white">
              <div class="h-full flex flex-col gap-4 justify-center items-center">
                <h2 class="font-serif text-4xl font-light leading-title">Discover all works</h2>
                <NuxtLink :to="`/project`"
                  class="text-m leading-none font-light rounded-full bg-(--main-white) text-black px-5 py-2 h-fit flex items-center justify-center ">
                  <p>See more projects</p>
                </NuxtLink>
              </div>
            </div>
          </SwiperSlide>
          <div class="swiper-pagination"></div>
        </Swiper>
      </client-only>



    </section>
  </template>

<style>
.swiper-pagination {
  position: relative !important;
  bottom: auto !important;
  top: auto !important;
  /* margin-top: 2rem; */
  display: flex;
  justify-content: center;
}

.swiper-pagination-bullet {
  background: white;
  opacity: 0.5;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  margin: 0 4px;
}

.swiper-pagination-bullet-active {
  background: white;
  opacity: 1;
}</style>

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
  opacity: 0.5;
}

.swiper-slide {
  width: 85vw;
}

@media screen and (min-width: 1024px) {
  .swiper-slide {
    width: 67vw;
  }
}

.mySwiper {
  display: flex !important;
  flex-direction: column;
  gap: 1rem;
}
</style>