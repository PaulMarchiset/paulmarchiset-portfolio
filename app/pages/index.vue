<script setup lang="ts">
import { components } from '~/slices'

const prismic = usePrismic()
const { data: page } = await useAsyncData('index', () =>
  prismic.client.getByUID('page', 'home',
  ))


useHead({
  title: prismic.asText(page.value?.data.title)
})

import { onMounted } from 'vue'
import gsap from 'gsap'

useHead({
  title: 'Paul Marchiset'
})

onMounted(() => {

  const windowWidth = window.innerWidth;
  if (windowWidth < 1024) {
    //generate scrolltrigger that when it reaches the end of the page it loads works.vue
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
  <section class="size-full overflow-hidden">
    <div class="container hidden lg:block z-0 col-start-2 col-end-8 row-start-2 row-end-9 bg-cover bg-center">
      <Name />
      <Works />
      <div class="col-start-2 col-end-8 row-start-2 row-end-9 bg-cover bg-center"><img src="" alt=""></div>
    </div>
  </section>
</template>