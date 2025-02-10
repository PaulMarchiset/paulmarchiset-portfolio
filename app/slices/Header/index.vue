<!-- <script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.HeaderSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    Placeholder component for header (variation: {{ slice.variation }}) Slices
  </section>
</template> -->

<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { ref } from 'vue'
import LogoP from '@/components/LogoP.vue'
import LogoM from '@/components/LogoM.vue'
import { onMounted } from 'vue'
import gsap from 'gsap';

defineProps(
  getSliceComponentProps<Content.HeaderSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

onMounted(() => {
  const iconLogo = document.querySelector(".icon-logo");
  const logoP = document.querySelector("#P");
  const logoP1 = document.querySelector("#P1");
  const logoP2 = document.querySelector("#P2");
  const logoM = document.querySelector("#M");
  const logoM1 = document.querySelector("#M1");
  const logoM2 = document.querySelector("#M2");
  const logoM3 = document.querySelector("#M3");


  iconLogo?.addEventListener("mouseover", () => {
    console.log('mouse over')
    gsap.to([logoP1, logoP2, logoM1, logoM2, logoM3], {
      y: 100,
      duration: 0.6,
      ease: "cubic-bezier(0.83, 0, 0.29, 0.99)",
      opacity: 0,
      stagger: 0.1
    });

    setTimeout(() => {
      gsap.to([logoP1, logoP2, logoM1, logoM2, logoM3], {
        y: 0,
        duration: 0.6,
        ease: "cubic-bezier(0.83, 0, 0.29, 0.99)",
        opacity: 1,
        stagger: 0.1
      });
    }, 1000);
  });


  if (window.innerWidth > 1024) {

    let elements = document.querySelectorAll('.nav-link');
    elements.forEach((element) => {

      let innerText: string | undefined;
      if (element instanceof HTMLElement) {
        innerText = element.innerText;
      }
      element.innerHTML = '';

      let textContainer = document.createElement('div');
      textContainer.classList.add('block');

      for (let lettre of innerText!) {
        let span = document.createElement('span');
        span.innerText = lettre.trim() === '' ? '\xa0' : lettre;
        span.classList.add('lettre');
        textContainer.appendChild(span);
      }

      element.appendChild(textContainer);
      element.appendChild(textContainer.cloneNode(true));
    });

    elements.forEach((element) => {
      element.addEventListener('mouseenter', () => {
        element.classList.add('play');

      });
      element.addEventListener('mouseleave', () => {
        element.classList.remove('play');
      });
    });
  }
});


const menuIsOpen = ref(false)


</script>
<template>
  <section :data-slice-type="slice.slice_type" :data-slice-variation="slice.variation">
    <header class="fixed top-8 flex items-center justify-center z-50 w-full mix-blend-difference">
      <nav
        class="flex items-center justify-center lg:justify-between uppercase mix-blend-difference font-sans text-xl md:gap-[10vw] w-[85%]">
        <NuxtLink to="/works" class="hidden lg:block nav-link">menu</NuxtLink>
        <NuxtLink to="/" @click="menuIsOpen = false" class="icon-logo flex gap-1.5">
          <LogoP class="logoP" />
          <LogoM class="logoM" />
        </NuxtLink>
        <NuxtLink to="/contact" class="hidden lg:block nav-link">contact</NuxtLink>
      </nav>
    </header>
  </section>
</template>

<style>
.nav-link {
  height: 1.5rem;
  overflow: hidden;
  color: white;
}

.nav-link:hover .lettre,
.nav-link.play .lettre {
  transform: translateY(-100%);
}

.nav-link .block:last-child {
  color: white;
  display: flex;
  font-weight: 100;

}

.nav-link .lettre {
  display: inline-block;
  transition: transform 0.6s cubic-bezier(.83, 0, .29, .99);
}

.lettre:nth-child(1) {
  transition-delay: 0s;
}

.lettre:nth-child(2) {
  transition-delay: 0.03s;
}

.lettre:nth-child(3) {
  transition-delay: 0.06s;
}

.lettre:nth-child(4) {
  transition-delay: 0.09s;
}

.lettre:nth-child(5) {
  transition-delay: 0.12s;
}

.lettre:nth-child(6) {
  transition-delay: 0.15s;
}

.lettre:nth-child(7) {
  transition-delay: 0.18s;
}

.lettre:nth-child(8) {
  transition-delay: 0.21s;
}
</style>
