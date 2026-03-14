<script setup lang="ts">
import { ref, watchEffect, onMounted, computed, watch } from "vue";
import { useMenuStore } from "../stores/menu";
import { openHeaderAnimation, closeHeaderAnimation } from "../animations/menuAnimation";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();

const route = useRoute()
const theme = computed(() => {
  const t = route.meta.theme;
  return t === "dark" ? "dark" : "light";
});

const lenisRef = ref();

watchEffect(() => {
  if (lenisRef.value?.lenis) {
    console.log("Lenis initialized ✅");
  }
});

watch(
  () => lenisRef.value?.lenis,
  (lenis) => {
    window.addEventListener("load", () => {
      lenis.resize();
    });
  }
);

let menuStore = useMenuStore();

onMounted(() => {
  menuStore = useMenuStore();
});

// Menu open/close animations (unrelated to scroll)
watch(
  () => menuStore.isOpen,
  (isOpen) => {
    if (process.server) return;

    if (isOpen) {
      lenisRef.value?.lenis?.stop();
      openHeaderAnimation({
        isMobile: window.innerWidth < 768,
        yOffset: window.scrollY,
        borderRadius: 20,
        duration: 0.8,
      });
    } else {
      lenisRef.value?.lenis?.start();
      closeHeaderAnimation({
        yOffset: window.scrollY,
        duration: 0.8,
      });
    }
  }
);

onMounted(() => {
  router.afterEach(() => {
    requestAnimationFrame(() => {
      lenisRef.value?.lenis?.resize();
    });
  });

  const observer = new ResizeObserver(() => {
    lenisRef.value?.lenis?.resize();
  });

  const mainContent = document.getElementById("main-content");
  if (mainContent) {
    observer.observe(mainContent);
  }
});

</script>

<template>
  <VueLenis root ref="lenisRef" :options="{ autoRaf: true }">
    <LayoutHeader />
    <LayoutMenu />

    <div id="main" class="z-10 absolute top-0 w-full overflow-clip" style="backface-visibility: hidden">
      <div id="main-content">
        <slot />
        <LayoutFooter :theme="theme"/>
      </div>
    </div>
  </VueLenis>
</template>

<style scoped>
#main {
  scrollbar-gutter: stable;
  transform-origin: center top;
  transform: translateZ(0);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
