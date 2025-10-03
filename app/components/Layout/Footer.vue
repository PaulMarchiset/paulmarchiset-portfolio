<!-- footer.vue -->
<script setup lang="ts">
import { ref, reactive } from "vue";
import { usePrismic } from "@prismicio/vue";

const props = defineProps<{
  theme: "dark" | "light";
}>();

const prismic = usePrismic();
import { onMounted } from "vue";
const page = ref<any>(null);

onMounted(async () => {
  page.value = await prismic.client.getSingle("footer");
});

const copied = ref(false);
const hovering = ref(false);

function copyEmail() {
  const email = page.value?.data.mail;
  if (email) {
    navigator.clipboard.writeText(email).then(() => {
      copied.value = true;
      setTimeout(() => (copied.value = false), 1000);
    });
  }
}

const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
const mousePosition = reactive({ x: 0, y: 0 });

function handleMouseMove(event: MouseEvent) {
  const target = event.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  mousePosition.x = event.clientX - rect.left;
  mousePosition.y = event.clientY - rect.top;
}
</script>

<template>
  <footer class="relative bottom-0 flex flex-col lg:flex-row gap-16 lg:gap-auto justify-between py-16 px-8 font-light lg:px-24 lg:py-32" :class="props.theme === 'dark' ? 'bg-(--main-black) text-white' : 'bg-(--main-white) text-black'">
    <div class="flex">
      <p>{{ time }} | {{ page?.data.city }}</p>
    </div>

    <ul class="flex flex-col">
      <li v-for="(item, index) in page?.data.socials" :key="index">
        <NuxtLink
          :to="item.social.url"
          class="hover-animation"
          :class="{
            'after:bg-white': !copied && props.theme === 'dark',
            'after:bg-black': !copied && props.theme !== 'dark',
          }"
        >
          {{ item.social.text }}
        </NuxtLink>
      </li>
    </ul>

    <div class="relative h-min" @mousemove="handleMouseMove" @mouseenter="hovering = true" @mouseleave="hovering = false">
      <p
        v-if="hovering"
        class="absolute px-4 py-2 text-sm font-light z-20 pointer-events-none w-max"
        :style="{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -125%)',
        }"
        :class="{
          'bg-green-900 text-white': copied,
          'bg-(--main-white) text-black': !copied && props.theme === 'dark',
          'bg-(--main-black) text-white': !copied && props.theme !== 'dark',
        }"
      >
        {{ copied ? "Copied!" : "Click to copy" }}
      </p>

      <p @click="copyEmail" class="cursor-pointer">Copy Email</p>
    </div>

    <p>©2025 Paul Marchiset</p>
  </footer>
</template>

<style scoped>
.hover-animation {
  cursor: pointer;
  display: inline-block;
  position: relative;
}

.hover-animation:after {
  content: "";
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 1px;
  bottom: 0;
  left: 0;
  transform-origin: bottom right;
  transition: transform 0.5s cubic-bezier(0.83, 0, 0.29, 0.99);
}

.hover-animation:hover:after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>
