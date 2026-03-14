<script setup lang="ts">
import type { Content } from "@prismicio/client";

const props = defineProps(
  getSliceComponentProps<Content.HeroSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

const projectName = props.slice.primary.name;

// Helper function to force Prismic to resize the images
const optimizePrismicUrl = (url: string | undefined | null, width: number) => {
  if (!url) return '';
  // Prismic URLs usually already have a '?' in them, but we check just to be safe
  const separator = url.includes('?') ? '&' : '?';
  // This tells Prismic: "Send me the most compressed format (WebP/AVIF) at this exact width"
  return `${url}${separator}auto=format,compress&w=${width}`;
};
</script>

<template>
  <section class="h-screen flex flex-col justify-end w-full relative">
    <div class="absolute top-0 w-full h-full">
      <picture>
        
        <source
          media="(min-width: 768px)"
          :srcset="optimizePrismicUrl(slice.primary.image_desktop.url || slice.primary.image_mobile.url, 1920)"
        />
        
        <img 
          :src="optimizePrismicUrl(slice.primary.image_mobile.url || slice.primary.image_desktop.url, 800)"
          :alt="slice.primary.image_mobile.alt || slice.primary.image_desktop.alt || ''"
          loading="eager"
          fetchpriority="high"
          class="object-cover w-full h-full"
        />
        
      </picture>
    </div>
    
    <div class="flex flex-col z-10 items-center justify-center w-full h-full">
      <h1 class="font-serif font-light text-6xl leading-(--leading-title)">
        {{ projectName }}
      </h1>
    </div>
  </section>
</template>