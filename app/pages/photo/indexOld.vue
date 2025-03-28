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

import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode, Mousewheel, Pagination } from 'swiper/modules';
import 'swiper/css';

const modules = [Mousewheel, Pagination, FreeMode];


const selectedPhoto = ref<null | { name: string; date: string; photo: any }>(null)

const closeDetails = () => {
    selectedPhoto.value = null
}

const desktop = typeof window !== 'undefined' ? window.innerWidth > 1024 : false

</script>

<template>
    <Swiper v-if="desktop" :modules="modules" :spaceBetween="12" :loop="true" :slidesPerView="'auto'" :mousewheel="true"
        :freeMode="true" :keyboard="true" class="flex px-[3.125rem] gap-4 h-[50vh] w-full absolute top-[25vh]">
        <SwiperSlide v-for="(onePhoto, index) in allPhotos" :key="index" class="w-auto ml-8 hover-zoom-animation"
            @click="selectedPhoto = { name: onePhoto.name ?? '', date: onePhoto.date ?? '', photo: onePhoto.photo }">
            <PrismicImage :field="onePhoto.photo" class="h-full" />
        </SwiperSlide>
    </Swiper>
    <section v-else class="flex flex-col px-12 gap-4 my-48">
        <div v-for="(onePhoto, index) in allPhotos" :key="index" class="w-auto"
            @click="selectedPhoto = { name: onePhoto.name ?? '', date: onePhoto.date ?? '', photo: onePhoto.photo }">
            <PrismicImage :field="onePhoto.photo" class="h-full w-full" />
        </div>
    </section>
    <article @click="closeDetails" v-if="selectedPhoto"
        class="photo-container font-mono font-regular text-xl uppercase text-white fixed top-0 bg-black z-10">
        <p
            class="hidden lg:block z-10 h-fit lg:justify-self-end justify-self-start self-end lg:row-start-5 col-start-1 col-span-4 row-start-2 lg:col-span-1 font-normal">
            {{ selectedPhoto.name }}</p>
        <p
            class="hidden lg:block z-10 h-fit self-end row-start-5 col-start-6 col-span-2 text-right hover-underline-animation justify-self-end">
            {{ selectedPhoto.date }}
        </p>
        <div
            class="lg:h-full w-full lg:w-auto col-start-1 col-span-5 row-start-1 lg:row-start-1 lg:row-span-9 lg:col-start-3 lg:col-span-4 object-cover aspect-[3/2] lg:aspect-auto">
            <PrismicImage :field="selectedPhoto.photo" class="h-full w-full object-contain" />
        </div>
        <p class="lg:hidden z-10 text-center">{{ selectedPhoto.name }}, {{ selectedPhoto.date }}</p>
    </article>
</template>

<style scoped>
img {
    max-width: none;
}

.swiper-slide {
    width: auto;
}

.hover-zoom-animation {
    transition: transform 0.3s cubic-bezier(0.83, 0, 0.29, 0.99)
}

.hover-zoom-animation:hover {
    transform: scale(1.01);
}
</style>