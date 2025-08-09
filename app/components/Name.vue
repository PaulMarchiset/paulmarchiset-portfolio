<script setup lang="ts">
import { onMounted } from "vue";
import gsap from "gsap";

onMounted(() => {
  // Function to animate text with GSAP
  const animateText = (selector: string, delay: number = 0) => {
    const textWrapper = document.querySelector(selector);
    if (textWrapper) {
      textWrapper.innerHTML = textWrapper.textContent!.replace(
        /\S/g,
        "<span class='letter'>$&</span>"
      );

      gsap.fromTo(
        `${selector} .letter`,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: "expo.out",
          stagger: 0.03,
          delay, // Delay before starting animation
        }
      );
    }
  };

  // Add a 2s delay for both
  animateText(".paul", 2);
  animateText(".marchiset", 2);
});
</script>

<template>
    <div class="w-full pl-4 lg:pl-0 m-auto row-start-7 row-span-2 lg:row-span-3 col-start-2 col-span-3 lg:col-start-6 lg:row-start-4
     flex flex-col justify-center relative text-white z-10">
     <div class="w-fit text-7xl font-title uppercase font-stretch-condensed font-semibold leading-[88%]">
       <h1 class="paul w-fit">Paul</h1>
       <h1 class="marchiset w-fit">Marchiset</h1>
     </div>
     <h2 class="font-sans font-light text-xl lg:text-lg w-max md:w-auto">Creative engineer student</h2>
   </div>
</template>
