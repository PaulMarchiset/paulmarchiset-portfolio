<script setup lang="ts">
import { onMounted } from 'vue';
import gsap from 'gsap';


onMounted(() => {
    const animateText = (selector: string, delay: number) => {
        const textWrapper = document.querySelector(selector);
        if (textWrapper) {
            textWrapper.innerHTML = textWrapper.textContent!.replace(/\S/g, "<span class='letter'>$&</span>");
            
            gsap.fromTo(
                `${selector} .letter`,
                { y: -100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.4, ease: "expo.out", stagger: 0.03, delay: delay / 1000 }
            );
        }
    };

    animateText(".paul", 100);
    animateText(".marchiset", 200);
});
</script>

<template>
    <div class=" ml-8 row-start-4 row-span-3 col-start-2 col-span-3 flex flex-col justify-center relative text-7xl font-title text-white uppercase font-stretch-semi-condensed leading-[88%] ">
     <div>
       <h1 class="paul">Paul</h1>
       <h1 class="marchiset">Marchiset</h1>
     </div>
   </div>
</template>
