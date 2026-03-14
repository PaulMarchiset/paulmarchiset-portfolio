<script setup lang="ts">
// Catch-all route: ensures unknown URLs show a 404 instead of falling back to the home page.
const route = useRoute();

showError({
  statusCode: 404,
  statusMessage: `Page not found: ${route.fullPath}`,
});
</script>

<template>
  <!-- Error UI is rendered by app/error.vue -->
</template>
