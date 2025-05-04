<template>
  <Section
    class="experience"
    :title="$t('home.menu.experience')"
  >
    <Timeline
      v-for="experience in experiences"
      :key="experience.title"
      :time-events="experience.events"
      :title="experience.title"
      class="experience-info"
    />
  </Section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import Section from '@/ui/Section.vue'
import Timeline from '@/ui/Timeline.vue'

const { t, tm } = useI18n({ useScope: 'global' })

const experiences = computed<Experience[]>(() => [
  {
    title: t('home.title.experience'),
    events: tm('home.experience'),
  },
  {
    title: t('home.title.presentations'),
    events: tm('home.presentations'),
  },
  {
    title: t('home.title.projects'),
    events: tm('home.projects'),
  },
])
</script>

<style lang="scss" scoped>
.experience-info {
  max-width: 500px;

  &:not(:first-of-type) {
    margin-top: 60px;
  }
}
</style>
