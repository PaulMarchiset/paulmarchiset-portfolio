<script setup lang="ts">
import { components } from "~/slices";
import { ref, onMounted, reactive } from "vue";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const prismic = usePrismic();
const { data: page } = await useAsyncData("[contact]", () => prismic.client.getSingle("contact"));

useHead({
  title: "Contact - Paul Marchiset",
});

onMounted(() => {
  const mailElement = document.getElementById("mail");
  if (mailElement) {
    mailElement.addEventListener("click", copyEmail);
  }
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

const mousePosition = reactive({ x: 0, y: 0 });

function handleMouseMove(event: MouseEvent) {
  const target = event.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  mousePosition.x = event.clientX - rect.left;
  mousePosition.y = event.clientY - rect.top;
}

type Skill = { skill: string };

const skills = page.value?.data?.skills.map((cat: Skill) => cat.skill) || ["skill"];
const skillIndex = ref(0);
const skillText = ref<HTMLElement | null>(null);

onMounted(() => {
  cycleSkills();
});

function cycleSkills() {
  const showNext = () => {
    const next = skills[skillIndex.value] ?? "";
    if (skillText.value) {
      gsap.to(skillText.value, {
        duration: 1,
        text: typeof next === "string" ? next : String(next),
        ease: "power2.out",
      });
    }

    skillIndex.value = (skillIndex.value + 1) % skills.length;
    setTimeout(showNext, 2000);
  };

  showNext();
}
</script>

<template>
  <main class="flex justify-end md:justify-between items-center bg-(--main-white) min-h-screen px-4 lg:px-20">
    <div class="hidden md:flex flex-col">
      <p ref="skillText" class="text-3xl font-sans font-light w-max"></p>
    </div>
    <div class="w-fit flex flex-col items-end justify-end px-4">
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
            'bg-(--main-black) text-white': !copied
          }"
        >
          {{ copied ? "Copied!" : "Click to copy" }}
        </p>
        <p @click="copyEmail" class="text-right font-sans font-medium text-xl lg:text-3xl hover-animation cursor-pointer">{{ page?.data.mail }}</p>
      </div>
      
      <h3 class="text-right text-balance font-sans font-light text-base lg:text-3xl">{{ page?.data.catchphrase }}</h3>
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
  content: "";
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 1.5px;
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
