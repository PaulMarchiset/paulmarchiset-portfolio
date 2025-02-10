<script setup lang="ts">
import { components } from '~/slices'

const prismic = usePrismic()
const { data: page } = await useAsyncData('index', () =>
  prismic.client.getByUID('page', 'home')
)


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
      tl.to('.container', {
        duration: 1
      })
  }

  const heroContainer = document.querySelector('.hero-container');
  const links = document.querySelectorAll('.hero-works a');

  links.forEach(link => {
    link.addEventListener('mouseover', function () {
      //@ts-ignore
      let image = this.getAttribute('id') + '.jpg';
      //@ts-ignore
      heroContainer.style.backgroundImage = `url('img/menu/${image}')`;
      //@ts-ignore
      heroContainer.style.animation = 'fadeIn 0.5s forwards';
      //@ts-ignore
      this.style.color = 'white';
      links.forEach(otherLink => {
        if (otherLink !== link) {
          //@ts-ignore
          otherLink.style.color = 'rgba(255, 255, 255, 0.5)';
        } else {
          //@ts-ignore
          otherLink.style.color = 'white';
        }
      });
    });

    link.addEventListener('mouseout', function () {
      //@ts-ignore
      heroContainer.style.backgroundImage = '';
      //@ts-ignore
      this.style.color = 'rgba(255, 255, 255, 0.5)';
      //@ts-ignore
      heroContainer.style.animation = 'fadeOut 0.5s forwards';
    });
  });
});
</script>


<template>
  <section class="size-full">
    <div
      class="container hidden lg:block z-0 col-start-2 col-end-8 row-start-2 row-end-9 bg-cover bg-center">
      <Name />
      <Works />
    </div>
  </section>
</template>