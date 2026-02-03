
<script setup lang="ts">
import type { Content } from '@prismicio/client'

const props = defineProps(
  getSliceComponentProps<Content.SkillsSlice>(['slice', 'index', 'slices', 'context'])
)
</script>

<template>
  <section class="px-4 sm:px-8 lg:px-24 py-16 sm:py-24 lg:py-32 text-black">
    
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-y-12 sm:gap-y-16 lg:gap-x-12">
      
      <!-- Core Tech -->
      <div class="lg:col-span-3">
        <span class="text-[10px] tracking-[0.4em] uppercase opacity-40 block mb-6 sm:mb-10">01 / CORE TECH</span>
        <ul class="flex flex-wrap gap-x-4 gap-y-2 sm:flex-col sm:gap-2">
          <li v-for="tech in props.slice.primary.technologies" :key="tech.id" 
              class="text-xs font-sans font-bold uppercase tracking-widest opacity-30">
            {{ tech.name }}
          </li>
        </ul>
      </div>

      <div class="lg:col-span-6 lg:border-l border-black/5 lg:pl-16
                  border-t pt-12 lg:border-t-0 lg:pt-0">
        <span class="text-[10px] tracking-[0.4em] uppercase opacity-40 block mb-6 sm:mb-10">02 / SOFTWARES</span>
        
        <div class="flex flex-wrap gap-x-6 sm:gap-x-10 gap-y-1 sm:gap-y-2 mb-12 sm:mb-20">
          <span v-for="software in props.slice.primary.softwares" :key="software.id" 
                class="font-editorial text-3xl sm:text-4xl lg:text-6xl capitalize tracking-tighter leading-none">
            {{ software.name }}
          </span>
        </div>
        <div class="pt-8 sm:pt-12 border-t border-black/5">
          <span class="text-[10px] tracking-[0.4em] uppercase opacity-40 block mb-6 sm:mb-8">03 / SOFTSKILLS</span>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-4 gap-x-8">
            <div v-for="ability in props.slice.primary.abilities" :key="ability.id" class="flex items-center gap-3">
              <div class="w-1 h-1 bg-black/20 flex-shrink-0"></div>
              <span class="font-editorial text-lg sm:text-xl capitalize opacity-80">{{ ability.name }}</span>
            </div>
          </div>
        </div>
      </div>

        <div class="lg:hidden mb-12">
          <div v-if="props.slice.primary.image" 
               class="aspect-[4/3] overflow-hidden relative border border-black/5">
            <PrismicImage 
              :field="props.slice.primary.image" 
              class="w-full h-full object-cover absolute transition-transform duration-1000 hover:scale-105" 
            />
          </div>
        </div>
        
      <div class="hidden lg:block lg:col-span-3">
        <div v-if="props.slice.primary.image" 
             class="aspect-[3/4] overflow-hidden relative grayscale transition-filter duration-1000 hover:grayscale-0  border border-black/5">
          <PrismicImage 
            :field="props.slice.primary.image" 
            class="w-full h-full object-cover absolute transition-transform duration-1000 hover:scale-105 " 
          />
        </div>
      </div>

    </div>
</section>
</template>
