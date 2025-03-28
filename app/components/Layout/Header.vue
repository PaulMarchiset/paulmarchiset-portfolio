<script setup lang="ts">
import gsap from 'gsap';

import { useMenuStore } from '@/stores/menu'

const menuStore = useMenuStore()


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


watch(() => menuStore.isOpen, (newVal) => {
  const iconMenuPan = document.querySelector("#pan");
  const menuText = document.querySelector("#menu-text");
  if (newVal === true && menuText) {
    gsap.to(iconMenuPan, {
      y: 7.5,
      duration: 0.4,
      ease: "cubic-bezier(0.83, 0, 0.29, 0.99)",
      stagger: 0.1
    });
    gsap.to(menuText, {
      duration: 0.6,
      ease: "cubic-bezier(0.83, 0, 0.29, 0.99)",
      stagger: 0.1,
      innerHTML: 'close'
    });
  }
  if (newVal === false && menuText) {
    gsap.to(iconMenuPan, {
      y: 0,
      duration: 0.4,
      ease: "cubic-bezier(0.83, 0, 0.29, 0.99)",
      stagger: 0.1

    });
    gsap.to(menuText, {
      duration: 0.6,
      ease: "cubic-bezier(0.83, 0, 0.29, 0.99)",
      stagger: 0.1,
      innerHTML: 'menu'
    });

  }
});

</script>
<template>
  <header class="fixed top-8 flex items-center justify-center z-50 w-full mix-blend-difference">
    <nav class="flex items-center justify-center lg:justify-between uppercase font-sans text-xl md:gap-[10vw] w-[95%]">
      <div class="flex items-center gap-12">
        <NuxtLink to="/" class="flex gap-2 items-center icon-logo" @click="menuStore.isOpen = false">
          <div class="flex gap-1.5 scale-90">
            <LogoP class="logoP" />
            <LogoM class="logoM" />
          </div>
          <div
            class="hidden lg:flex flex-col text-white mix-blend-difference capitalize font-title leading-(--leading-100)">
            <h1>Paul</h1>
            <h1>Marchiset</h1>
          </div>
        </NuxtLink>
        
      </div>
      <div class="flex justify-end gap-4 items-end">
        <!-- <button @click="menuStore.toggleMenu"
          class="hidden lg:block opacity-50 hover:opacity-100 cursor-pointer mix-blend-difference">
          <IconMenu />
        </button> -->
        <h3 class="hidden lg:block nav-link font-mono mix-blend-difference hover:cursor-pointer" @click="menuStore.toggleMenu">menu</h3>
      </div>
    </nav>
  </header>
  <p @click="menuStore.toggleMenu" id="menu-text"
    class="z-30 w-fit uppercase fixed bottom-8 lg:hidden hover:opacity-100 cursor-pointer text-2xl p-4 bg-white font-mono mix-blend-normal left-0 right-0 mx-auto">
    menu
  </p>
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
</style>~~/stores/menu