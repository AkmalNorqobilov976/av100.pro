
<script setup lang="ts">
import Navbar from './Navbar.vue';
</script>
<template>
    <div>
        <Navbar/>
        <main class="p-2">
            <slot>
                <RouterView/>
            </slot>
        </main>
    </div>
</template>