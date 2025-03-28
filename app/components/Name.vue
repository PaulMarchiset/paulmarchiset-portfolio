<script setup lang="ts">
import { onMounted } from "vue";
import gsap from "gsap";

onMounted(() => {
  // Function to animate text with GSAP
  const animateText = (selector: string) => {
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
          stagger: 0.03, // Adds delay per letter
        }
      );
    }
  };

  // Apply animation to both elements
  animateText(".paul");
  animateText(".marchiset");
});
</script>

<template>
    <div class="ml-8 lg:ml-0 row-start-4 row-span-3 col-start-2 col-span-3 lg:col-span-full
     flex flex-col justify-center relative text-7xl lg:text-8xl font-title text-white uppercase font-stretch-semi-condensed leading-[88%] w-fit lg:w-full lg:items-center">
     <div class="w-fit lg:flex lg:gap-8">
       <h1 class="paul w-fit">Paul</h1>
       <h1 class="marchiset w-fit">Marchiset</h1>
     </div>
   </div>
</template>
