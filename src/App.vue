<template>
  <Menu />
  <Hero />
  <Knowledge />
  <Experience />
  <Contact />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import mixpanel from 'mixpanel-browser'

import Contact from '@/components/Contact.vue'
import Experience from '@/components/Experience.vue'
import Hero from '@/components/Hero.vue'
import Knowledge from '@/components/Knowledge.vue'
import Menu from '@/components/Menu.vue'

onMounted(() => {
  mixpanel.track('Page-view')
})
</script>
