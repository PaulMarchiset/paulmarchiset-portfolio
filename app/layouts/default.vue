<script setup lang="ts">

import { useMenuStore } from '@/stores/menu'

const menuStore = useMenuStore()

</script>

<template>
    <div class="overflow-x-hidden" :class="{ 'overflow-y-hidden': menuStore.isOpen }">
        <LayoutHeader />
        <LayoutMenu />
        <slot />
    </div>
</template>
