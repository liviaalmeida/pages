<template>
  <a
    :href="href"
    :target="target"
    class="link"
  >
    <slot></slot>
  </a>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{ href: string, target?: string }>(),
  { target: '_blank' },
)
</script>

<style lang="scss" scoped>
$color: rgba($lv-darker, .7);

.link {
  border: 2px solid $color;
  border-radius: 5px;
  color: $color;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'Bebas Neue';
  font-size: 14px;
  height: 32px;
  min-width: 100px;
  margin: 0 auto;
  padding: 4px;
  text-decoration: none;
}
</style>
