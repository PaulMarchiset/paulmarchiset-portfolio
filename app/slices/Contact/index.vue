<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { getSliceComponentProps } from "@prismicio/vue";

const props = defineProps(getSliceComponentProps<Content.ContactSlice>(["slice", "index", "slices", "context"]));

// const bgColor = computed(() => props.context?.bgColor ?? "white");
import { ref, reactive } from "vue"
const copied = ref(false);
const hovering = ref(false);

function copyEmail() {
  const email = props.slice.primary.mail;
  if (email) {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        copied.value = true;
        setTimeout(() => (copied.value = false), 1000);
      })
      .catch((err) => console.error("Failed to copy email:", err));
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
  <footer class="relative bottom-0 flex justify-between py-48 px-12 font-light mix-blend-difference text-(--main-white) lg:px-24 lg:py-32">
    <div class="flex">
      <p>{{ time }} | {{ slice.primary.city }}</p>
    </div>
    <ul class="flex flex-col">
      <li v-for="(item, index) in slice.primary.socials" :key="index">
        <NuxtLink :to="item.social.url" class="hover-animation">{{ item.social.text }}</NuxtLink>
      </li>
    </ul>
    <!-- Copy email with mouse-follow tooltip -->
    <div
      class="relative h-min"
      @mousemove="handleMouseMove"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
    >
      <!-- Tooltip -->
      <p
        v-if="hovering"
        class="absolute px-4 py-2 bg-black text-white text-sm font-light z-20 pointer-events-none w-max"
        :style="{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -125%)',
        }"
        :class="{ 'bg-green-900 text-white': copied, 'bg-(--main-white) text-black': !copied }"
      >
        {{ copied ? "Copied!" : "Click to copy" }}
      </p>

      <!-- Trigger -->
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
  height: 1.25px;
  bottom: 0;
  left: 0;
  background-color: black;
  transform-origin: bottom right;
  transition: transform 0.5s cubic-bezier(0.83, 0, 0.29, 0.99);
}

.hover-animation:hover:after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>
