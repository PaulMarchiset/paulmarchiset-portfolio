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
  <main class="flex flex-col items-center justify-center bg-(--main-white) pt-24">
    <SliceZone :slices="page?.data.slices ?? []" :components="components" />
    <section class="h-screen items-center justify-between p-8 flex flex-col lg:flex-row bg-(--main-white) gap-16 z-10 w-full">
      <div class="flex flex-col gap-8">
        <p class="w-fit">Based in Paris</p>
        <p class="hover-animation w-min" id="mail" @click="copyEmail">{{ page?.data.mail }}</p>
        <div class="flex flex-col">
          <PrismicLink class="hover-animation w-min"
          v-for="(item, idx) in page?.data.socials"
          :field="item.social"
          :key="idx"
          />
        </div>
      </div>
      <PrismicImage :field="page?.data.image ?? {}" class=" h-[50vh] object-cover object-center" target="_blank"/>
    </section>
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