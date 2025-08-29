<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.PhotoSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);
// Get the photo array from the custom "onephoto" field
const photos = ref(props.slice.primary.onephoto ?? [])

const selectedAlbum = ref<string | null>(null)

// Compute album counts
type AlbumMap = Record<string, number>
const albumCounts = computed(() => {
  const counts: AlbumMap = {}
  photos.value.forEach((photo) => {
    const album = photo.album?.trim()
    if (album) counts[album] = (counts[album] || 0) + 1
  })
  return counts
})

const allAlbums = computed(() => Object.keys(albumCounts.value).sort())

const filteredPhotos = computed(() => {
  if (!selectedAlbum.value) return photos.value
  return photos.value.filter(
    (photo) => photo.album?.trim() === selectedAlbum.value
  )
})

onMounted(() => {
  let randomAlbum = allAlbums.value[Math.floor(Math.random() * allAlbums.value.length)]

  if (!selectedAlbum.value && allAlbums.value.length > 0) {
    selectedAlbum.value = randomAlbum ?? null
  }
})
</script>

<template>
  <section class="p-8 lg:p-12 flex flex-col gap-32 bg-(--main-white)">
    <div
      class="group flex flex-wrap items-center gap-x-1 lg:gap-x-2 text-black font-light text-xl lg:text-3xl relative">
      <template v-for="(album, index) in allAlbums" :key="album">
        <button :class="[selectedAlbum === album ? 'text-black' : '']" @click="selectedAlbum = album">
          {{ album }}
        </button>
        <span v-if="index < allAlbums.length - 1" class="mx-1 select-none">—</span>
      </template>

    </div>

    <div v-for="(photoItem, idx) in filteredPhotos" :key="idx" class="mb-16 text-base capitalize font-light">
      <!-- <div
    v-if="photoItem.photo?.dimensions?.height && photoItem.photo?.dimensions?.width && (photoItem.photo.dimensions.height > photoItem.photo.dimensions.width) || (photoItem.photo.dimensions.height === photoItem.photo.dimensions.width)"
    class="flex items-center justify-center uppercase w-full gap-4">
    <p class="hidden md:block w-1/8 text-right">{{ photoItem.name }}</p>
    <div class="flex justify-center">
      <PrismicImage :field="photoItem.photo" class="max-h-[110vh] max-w-full object-contain" />
    </div>
    <p class="hidden md:block w-1/8 text-left">{{ photoItem.date }}</p>
  </div>


  <div v-else class="flex flex-col items-center gap-2">
    <p class=" hidden md:block text-center">{{ photoItem.name }}</p>
    <PrismicImage :field="photoItem.photo" class="max-h-[110vh] max-w-full object-contain" />
    <p class=" hidden md:block text-center">{{ photoItem.date }}</p>
  </div> -->
      <div class="flex flex-col items-center gap-2">
        <PrismicImage :field="photoItem.photo" class="max-h-[110vh] max-w-full object-contain" />
        <p class="text-center opacity-65">{{ photoItem.name }}, {{ photoItem.date }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.group button,
.group span {
  opacity: 1;
  transition: opacity 0.2s ease;
}

.group:hover button:hover {
  cursor: pointer;
}

.group:hover button:not(:hover),
.group:hover span {
  opacity: 0.5;
}
</style>
