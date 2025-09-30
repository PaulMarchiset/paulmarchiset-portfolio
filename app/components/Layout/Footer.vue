<script setup lang="ts">
import { ref } from "vue";
import { components } from "~/slices";
import { usePrismic } from "@prismicio/vue";

const prismic = usePrismic();

// fetch the single custom type "footer"
import { onMounted } from "vue";

const { data: footer } = await useAsyncData("[footer]", () =>
  prismic.client.getSingle("footer")
)

const bgColor = ref<"black" | "white">("white");

import { useRoute } from "vue-router";

const route = useRoute();

import { nextTick, watch } from "vue";

watch(
  () => route.fullPath,
  async () => {
    await nextTick();
    const getMain = document.getElementById("main-content");
    const getSection = getMain?.querySelector("section");

    if (getSection) {
      const bgColorValue = window.getComputedStyle(getSection).getPropertyValue("background-color");
      bgColor.value = bgColorValue === "rgb(0, 0, 0)" ?  "black" : "white";
    }
  }
);
</script>
<template>
  <sliceZone :components="components" :slices="footer?.data?.slices ?? []" :context="{ bgColor: bgColor }" />
</template>
