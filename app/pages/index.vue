<script setup lang="ts">
import { components } from '~/slices'

const prismic = usePrismic();
const { data: page } = await useAsyncData("[homepage]", () =>
  prismic.client.getSingle("homepage"),
);

import { onMounted } from 'vue'
import gsap from 'gsap'

useHead({
  title: 'Paul Marchiset'
})

onMounted(() => {

  const windowWidth = window.innerWidth;
  if (windowWidth < 1024) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'scroll',
        start: '50% 50%',
        end: 'bottom bottom',
        scrub: 1,
        markers: true
      }
    });
    tl.to('scriptiner', {
      duration: 1
    })
  }
});
</script>


<template>
  <Intro />
  <section class="size-full overflow-hidden">
    <div class="z-0 flex flex-col bg-cover bg-center">
      <SliceZone :components="components" :slices="page?.data.slices ?? []" />
    </div>
  </section>
</template>