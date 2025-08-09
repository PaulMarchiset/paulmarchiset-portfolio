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
      duration: 0.75,
      ease: "cubic-bezier(0.83, 0, 0.29, 0.99)",
      opacity: 0,
      stagger: 0.1
    });

    setTimeout(() => {
      gsap.to([logoP1, logoP2, logoM1, logoM2, logoM3], {
        y: 0,
        duration: 0.75,
        ease: "cubic-bezier(0.83, 0, 0.29, 0.99)",
        opacity: 1,
        stagger: 0.1
      });
    }, 1000);
  });


  if (window.innerWidth > 1024) {
    const nav = document.querySelector('.nav')
    const elements = document.querySelectorAll('.nav-link')

    elements.forEach((element) => {
      let innerText: string | undefined
      if (element instanceof HTMLElement) {
        innerText = element.innerText
      }

      element.innerHTML = ''

      const textContainer = document.createElement('div')
      textContainer.classList.add('block')

      for (const lettre of innerText!) {
        const span = document.createElement('span')
        span.innerText = lettre.trim() === '' ? '\xa0' : lettre
        span.classList.add('lettre')
        textContainer.appendChild(span)
      }

      element.appendChild(textContainer)
      element.appendChild(textContainer.cloneNode(true))
    })

    // 🔥 Add/remove "play" class to all nav-links when nav is hovered
    nav?.addEventListener('mouseenter', () => {
      elements.forEach(el => el.classList.add('play'))
    })
    nav?.addEventListener('mouseleave', () => {
      elements.forEach(el => el.classList.remove('play'))
    })
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
    <nav class="flex items-center justify-between font-sans text-xl md:gap-[10vw] w-[95%]">
      <div class="flex items-center gap-12">
        <NuxtLink to="/" class="flex gap-2 items-center icon-logo" @click="menuStore.isOpen = false">
          <div class="flex gap-1.5 scale-75 lg:scale-90">
            <LogoP class="logoP" />
            <LogoM class="logoM" />
          </div>
        </NuxtLink>

      </div>
      <div class="flex items-center justify-end gap-3 nav">
        <h3 class="hidden lg:block nav-link font-light font-sans uppercase mix-blend-difference cursor-pointer"
          @click="menuStore.toggleMenu">
          menu
        </h3>

        <div class="flex flex-col justify-center items-center w-8 h-16 cursor-pointer mr-2 lg:m-0" @click="menuStore.toggleMenu">
          <div :class="[
            'w-full h-[1.5px] bg-(--main-white) transition-transform duration-500 ease-[cubic-bezier(0.83,0,0.29,0.99)]',
            menuStore.isOpen ? 'rotate-45 translate-y-[1px]' : '-translate-y-[3px]'
          ]"></div>
          <div :class="[
            'w-full h-[1.5px] bg-(--main-white) transition-transform duration-500 ease-[cubic-bezier(0.83,0,0.29,0.99)]',
            menuStore.isOpen ? '-rotate-45 -translate-y-[1px]' : 'translate-y-[3px]'
          ]"></div>
        </div>
      </div>

    </nav>
  </header>
</template>

<style>
.nav-link {
  height: 1.5rem;
  overflow: hidden;
  color: white;
}

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