<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps<{ error: NuxtError }>();

if (import.meta.client) {
  window.location.replace("/");
} else {
  await clearError({ redirect: "/" });
}
</script>

<template>
  <div />
</template>
