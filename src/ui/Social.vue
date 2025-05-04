<template>
  <a
    :href="href"
    target="_blank"
    class="social"
    rel="noopener noreferrer"
    @click="onClick(href)"
  >
    <Icon :name="image" />
    {{ text }}
  </a>
</template>

<script setup lang="ts">
import mixpanel from 'mixpanel-browser'

import Icon from '@/ui/Icon.vue'

defineProps<{
  href: string
  image: string
  text: string
}>()

function onClick(href: string) {
  mixpanel.track('Icon-click', {
    to: href,
  })
}
</script>

<style lang="scss" scoped>
.social {
  align-items: center;
  display: inline-flex;
  font-family: 'Abel';
  font-size: 16px;
  font-weight: 600;
  gap: 10px;
  width: fit-content;

  &, &:visited {
    color: $lv-darker;
    text-decoration: none;
  }
}
</style>
