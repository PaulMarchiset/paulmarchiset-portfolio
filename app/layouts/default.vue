<script setup lang="ts">

import { useMenuStore } from '@/stores/menu'

const menuStore = useMenuStore()

</script>

<template>
    <div class="overflow-x-hidden">
        <LayoutHeader />
        <LayoutMenu />
        <slot />
    </div>
</template>
