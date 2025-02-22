<script setup lang="ts">

import { useMenuStore } from '@/stores/menu'

const menuStore = useMenuStore()

</script>

<template>
    <div>
        <LayoutHeader />
        <LayoutMenu />
        <slot />
    </div>
</template>
