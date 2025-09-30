<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { getSliceComponentProps } from "@prismicio/vue";

const props = defineProps(
  getSliceComponentProps<Content.ContactSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

const bgColor = computed(() => props.context?.bgColor ?? "white");
const copied = ref(false);

function copyEmail() {
  if (props.slice.primary.mail) {
    navigator.clipboard.writeText(props.slice.primary.mail)
      .then(() => {
        copied.value = true;
        setTimeout(() => (copied.value = false), 1000);
      })
      .catch(err => console.error("Failed to copy email:", err));
  }
}
</script>

<template>
  <footer
    class="relative bottom-0 grid grid-cols-6 lg:grid-cols-12 pt-48 lg:pt-60 pb-12 lg:pb-24"
    :class="bgColor === 'white' ? 'bg-(--main-black)' : 'bg-(--main-white)'"
  >
    <div
      class="flex flex-col col-span-6 lg:col-span-12 text-center gap-4"
      :class="bgColor === 'white' ? 'text-white' : 'text-black'"
    >
      <div class="flex flex-col lg:gap-2 mx-4">
        <h2 class="font-sans font-light text-lg lg:text-xl">
          Don't hesitate to contact me :)
        </h2>
        <p
          id="mail"
          @click="copyEmail"
          class="font-serif lowercase text-3xl lg:text-8xl cursor-pointer"
        >
          {{ copied ? "Copied!" : slice.primary.mail }}
        </p>
      </div>

      <ul class="flex justify-center gap-4 my-4">
        <li
          v-for="(item, index) in slice.primary.socials"
          :key="index"
          class="flex"
        >
          <NuxtLink
            :to="item.social.url"
            class="border-[1px] rounded-md"
            :class="
              bgColor === 'white'
                
                ? 'border-white/25 hover:border-white'
                : 'border-black/25 hover:border-black'
            "
          >
            <PrismicImage class="w-5 h-5 m-4" :field="item.icon" />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </footer>
</template>