<script setup lang="ts">
import { components } from '~/slices'
import { ref, onMounted, computed } from "vue"

import gsap from 'gsap'
import { TextPlugin } from "gsap/TextPlugin"

gsap.registerPlugin(TextPlugin)

const prismic = usePrismic()
const { data: page } = await useAsyncData("[about]", () =>
  prismic.client.getSingle("about")
)

useHead({ title: 'About - Paul Marchiset' })

const isMobile = ref(false)
onMounted(() => {
  isMobile.value = window.innerWidth < 1024
})

const about = ref(page.value)

const born = computed(() => new Date(about.value?.data?.born ?? ''))
const date = computed(() => Date.now() - born.value.getTime())
const age = computed(() => Math.floor(date.value / 1000 / 60 / 60 / 24 / 365.25))

const year = "©" + born.value.getFullYear()

const activities = about.value?.data?.activities.map(cat => cat.activity) || ['Activity']
const activityIndex = ref(0)
const activityText = ref<HTMLElement | null>(null)

onMounted(() => {
  cycleActivities()
})

function cycleActivities() {
  const showNext = () => {
    const next = activities[activityIndex.value]
    if (activityText.value) {
      gsap.to(activityText.value, {
        duration: 1,
        text: typeof next === 'string' ? next : String(next),
        ease: "power2.out",
      })
    }

    activityIndex.value = (activityIndex.value + 1) % activities.length
    setTimeout(showNext, 3000)
  }

  showNext()
}



</script>

<template>
  <section class="bg-(--main-white) text-black z-10">
    <header class="pt-[60vh] lg:pt-0 flex flex-col lg:grid grid-cols-4 grid-rows-2 gap-4 px-8 lg:px-24">
      <div class="h-full flex flex-col justify-end">
        <h1
          class="font-title uppercase font-stretch-condensed w-min font-semibold text-7xl lg:text-9xl leading-(--leading-title)">
          Paul Marchiset
        </h1>
      </div>

      <div class="flex gap-24 row-start-2 col-span-2">
        <!-- 🔁 Replaces ©2004 with animated age -->
        <p class="text-lg font-sans font-light">
          {{ year }}
        </p>

        <!-- 🔁 Dynamic single activity -->
        <ul class="flex flex-col">
          <li ref="activityText" class="text-lg font-sans font-light w-max"></li>
        </ul>
      </div>

      <div class="col-start-3 col-span-2 row-start-2">
        <PrismicImage :field="about.data?.image_cover" class="w-full h-full aspect-square object-cover object-center" />
      </div>
    </header>

    <section class="flex flex-col gap-32 pt-32">
      <SliceZone :components="components" :slices="about?.data.slices ?? []" />
    </section>
  </section>
</template>
