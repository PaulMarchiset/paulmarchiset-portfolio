<script setup lang="ts">
import gsap from 'gsap';
const slideOut = ref(false);

function animation() {
    gsap.from(["#P1", "#P2", "#M1", "#M2", "#M3" ], {
        y: 100,
        duration: 0.5,
        ease: "cubic-bezier(0.83, 0, 0.29, 0.99)",
        opacity: 0,
        stagger: 0.05
    });
}


function completeIntro() {
    animation();
    setTimeout(() => {
        slideOut.value = true;
        sessionStorage.setItem('hasSeenIntro', 'true');
    }, 1000);
}

onMounted(() => {
    completeIntro();
});
</script>

<template>
    <div :class="{ 'slide-out': slideOut }"
        class="flex justify-center items-center fixed top-0 left-0 w-screen h-screen bg-black text-white text-6xl lg:text-8xl z-50">
        <div class="flex gap-1.5 icon-logo">
            <LogoP class="logoP" />
            <LogoM class="logoM" />
        </div>
    </div>
</template>



<style scoped>
.slide-out {
    animation: slideOut 1s cubic-bezier(0.83, 0, 0.29, 0.99) forwards;
}

@keyframes slideOut {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-100%);
    }
}
</style>