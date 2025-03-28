<script setup lang="ts">
import { components } from '~/slices'
import { PrismicImage } from '@prismicio/vue' // Make sure you have this import if needed

import gsap from 'gsap';

const prismic = usePrismic()
const { data: page } = await useAsyncData('photos', () =>
    prismic.client.getAllByType('photo')
)

const photos = ref(page.value)

const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const allPhotos = computed(() => {
    const photosArray = photos.value
        ?.flatMap((photoItem) =>
            photoItem.data.slices.flatMap((slice: any) => slice.primary.onephoto)
        ) ?? [];

    return shuffleArray(photosArray);
});


useHead({
    title: 'photos',
})


</script>
<template>
    <main class="flex flex-col">
        <SliceZone :components="components" :slices="page?.data.slices ?? []" />
        <section class="flex flex-col">
            
        </section>
    </main>
</template>