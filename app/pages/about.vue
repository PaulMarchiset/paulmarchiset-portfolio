<script setup lang="ts">
import { components } from '~/slices'

const prismic = usePrismic();
const { data: page } = await useAsyncData("[about]", () =>
  prismic.client.getSingle("about"),
);

useHead({
  title: 'About',
})

const about = ref(page.value)

const born = computed(() => new Date(about.value?.data?.born ?? ''));

const date = computed(() => Date.now() - born.value.getTime());
const age = computed(() => Math.floor(date.value / 1000 / 60 / 60 / 24 / 365.25));

</script>


<template>
    <main class="project-container pb-48">
      <section class="relative h-screen">
        <div class="z-10 capitalize absolute top-[25vh] text-white font-title pl-[10vw] flex flex-col">
          <h1 class="text-5xl lg:text-7xl w-min leading-(--leading-title)">Paul Marchiset</h1>
          <h2 class="text-xl lg:text-3xl font-light">{{ about?.data.activity }}</h2>
        </div>
        <PrismicImage v-if="about?.data.image_presentation" :field="about.data.image_presentation" class="hero-image absolute top-0 w-full h-full object-cover p-5" />
      </section>
      <section class="flex flex-col lg:grid grid-cols-12 gap-10 lg:gap-5 px-(--spacing-project-mobile) lg:px-(--spacing-project)" >
        <div class="col-start-2 col-span-4 flex flex-col gap-5">
          <h2 class="text-white text-2xl ">Hi! I'm Paul Marchiset, a {{ age }}-year-old {{ about?.data.activity }} based in {{ about?.data.city }}.</h2>
          <p class="text-white font-mono " style="white-space: pre-wrap;">{{ about?.data.about }}</p>
        </div>
        <PrismicImage v-if="about?.data.image_1" :field="about.data.image_1" class="col-start-7 col-span-5" />
      </section>
    </main>
</template>

<style scoped>
.project-container {
  align-items: normal;
}
</style>