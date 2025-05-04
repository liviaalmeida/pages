<template>
  <Section
    :title="$t('home.menu.knowledge')"
    class="knowledge"
  >
    <Skills
      :skills="education"
      :title="$t('home.title.education')"
      class="knowledge-item"
    />
    <Skills
      :skills="languages"
      :title="$t('home.title.languages')"
      class="knowledge-item"
    />
    <Skills
      :skills="programming"
      :title="$t('home.title.programming')"
      class="knowledge-item"
    />
  </Section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import Section from '@/ui/Section.vue'
import Skills from '@/ui/Skills.vue'

const { t, tm } = useI18n({ useScope: 'global' })

const education = computed<Skill[]>(() => tm('home.education'))

const languages = computed<Skill[]>(() => tm('home.languages'))

const programming = computed<Skill[]>(() => [
  {
    name: t('home.skills.languages'),
    listing: ['JavaScript', 'Python', 'C++'],
    stars: 5,
  },
  {
    name: t('home.skills.web'),
    listing: ['HTML', 'CSS', 'performance', t('home.skills.skill.accessibility')],
    stars: 4,
  },
  {
    name: t('home.skills.frameworks'),
    listing: ['Vue', 'Angular'],
    stars: 3,
  },
  {
    name: t('home.skills.tools'),
    listing: ['Vite', 'Webpack'],
    stars: 3,
  },
  {
    name: t('home.skills.tests'),
    listing: ['Vitest', 'Jest', 'Nightwatch', 'Cypress'],
    stars: 3,
  },
  {
    name: t('home.skills.databases'),
    listing: ['SQL'],
    stars: 3,
  },
])
</script>

<style lang="scss" scoped>
.knowledge {
	background-color: $lv-gray;
}

.knowledge-item {
  &:not(:last-of-type) {
    margin-bottom: 50px;
  }
}
</style>
