<template>
  <div
    :style="style"
    class="icon"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{ color?: COLOR, name: string }>(),
  { color: 'gray' },
)

const COLORS: Record<COLOR,string> = {
  gray: '#1e1e1e',
  green: '#008000',
  red: '#ff0000',
  white: '#fff',
  yellow: '#ffff00',
}

const style = computed(() => ({
  backgroundColor: COLORS[props.color],
  maskImage: `url('/icons/${props.name}.svg')`,
}))
</script>

<style lang="scss" scoped>
.icon {
  height: 35px;
  width: 35px;
  mask-position: center;
  mask-repeat: no-repeat;
  mask-size: 100% 100%;
  -webkit-mask-position: center;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
}
</style>
