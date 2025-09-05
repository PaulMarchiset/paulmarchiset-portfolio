<script setup lang="ts">
import { components } from '~/slices'
import { onMounted } from 'vue';

const prismic = usePrismic();
const { data: page } = await useAsyncData("[contact]", () =>
  prismic.client.getSingle("contact"),
);

useHead({
  title: 'Contact - Paul Marchiset',
})

onMounted(() => {
  const mailElement = document.getElementById('mail');
  if (mailElement) {
    mailElement.addEventListener('click', copyEmail);
  }
});

function copyEmail() {
  if (page.value?.data.mail) {
    const mailElement = document.getElementById('mail');
    navigator.clipboard.writeText(page.value.data.mail)
      .then(() => {
        if (mailElement) {
          mailElement.innerText = 'Copied!';
          setTimeout(() => {
            mailElement.innerText = page?.value?.data.mail || 'Email';
          }, 1000); // Remove class after 2 seconds
        }
      })
      .catch(err => {
        console.error('Failed to copy email: ', err)
      })
  }
}


</script>


<template>
  <main class="flex flex-col items-start justify-center bg-(--main-white) min-h-screen gap-20 px-12 lg:px-20">
    <PrismicImage :field="page?.data.image_up ?? {}" class="h-[10vh] md:h-[25vh] object-cover object-center" target="_blank" />
    <div class="flex flex-col gap-2 items-center justify-center px-0 lg:px-20">
      <h2 class="font-serif text-5xl md:text-6xl">Available for anything, don’t hesitate to reach me :)</h2>
      <p class="hover-animation w-min text-2xl md:text-base" id="mail" @click="copyEmail">{{ page?.data.mail }}</p>
    </div>
    <div class="flex justify-between items-center w-full">
      <div class="flex flex-col">
        <PrismicLink class="hover-animation w-min text-2xl md:text-base" v-for="(item, idx) in page?.data.socials" :field="item.social"
          :key="idx" />
      </div>
      <PrismicImage :field="page?.data.image_down ?? {}" class="h-[10vh] md:h-[25vh]  object-cover object-center" target="_blank" />
    </div>
  </main>
</template>

<style scoped>
.hover-animation {
  cursor: pointer;
  display: inline-block;
  position: relative;
}

.hover-animation:after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 1.5px;
  bottom: 0;
  left: 0;
  background-color: black;
  transform-origin: bottom right;
  transition: transform 1s cubic-bezier(0.83, 0, 0.29, 0.99);
}

.hover-animation:hover:after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>