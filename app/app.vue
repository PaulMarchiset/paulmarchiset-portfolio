<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useMenuStore } from '@/stores/menu'

// Access menu store
const menuStore = useMenuStore()

onMounted(() => {
  console.log('App mounted')
})

// Compute transition name based on menu's open state
const transitionName = computed(() =>
  menuStore.isOpen ? 'fade' : 'scale-slide'
)

// Handle transition end to close the menu if open
function handleAfterLeave() {
  if (menuStore.isOpen) {
    menuStore.toggleMenu()
  }
}
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage :transition="transitionName" @after-leave="handleAfterLeave" />
    </NuxtLayout>
  </div>
</template>

<style scoped>
/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* Scale and slide transition */
.scale-slide-enter-active,
.scale-slide-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}
.scale-slide-enter-from {
  transform: translateY(30px) scale(0.95);
  opacity: 0;
}
.scale-slide-enter-to {
  transform: translateY(0) scale(1);
  opacity: 1;
}
.scale-slide-leave-from {
  transform: translateY(0) scale(1);
  opacity: 1;
}
.scale-slide-leave-to {
  transform: translateY(30px) scale(0.95);
  opacity: 0;
}
</style>