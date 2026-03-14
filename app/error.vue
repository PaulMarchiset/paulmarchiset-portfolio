<script setup lang="ts">
import { computed, onMounted } from "vue";
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();

const statusCode = computed(() => props.error?.statusCode ?? 500);
const title = computed(() => (statusCode.value === 404 ? "Page not found" : "Something went wrong"));

onMounted(() => {
  // Client-side redirect for unknown routes.
  // Note: this produces a soft redirect (the initial response can still be 404).
  if (statusCode.value === 404) {
    clearError({ redirect: "/" });
  }
});
</script>

<template>
  <div class="min-h-screen w-full flex flex-col items-center justify-center px-6 text-center">
    <p class="text-sm uppercase tracking-widest opacity-70">Error {{ statusCode }}</p>
    <h1 class="mt-2 text-3xl font-semibold">{{ title }}</h1>
    <p v-if="error?.statusMessage" class="mt-4 max-w-prose opacity-80">
      {{ error.statusMessage }}
    </p>

    <div class="mt-8 flex gap-4">
      <NuxtLink to="/" class="underline">Go to homepage</NuxtLink>
      <button
        type="button"
        class="underline"
        @click="clearError()"
      >
        Dismiss
      </button>
    </div>
  </div>
</template>
