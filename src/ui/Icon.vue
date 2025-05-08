<template>
  <div
    :style="style"
    class="icon"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    color?: COLOR,
    name: string,
    visible?: boolean,
  }>(),
  {
    color: 'gray',
    visible: true,
  },
);

const COLORS: Record<COLOR,string> = {
  gray: '#1e1e1e',
  green: '#008000',
  red: '#ff0000',
  white: '#fff',
  yellow: '#ffff00',
};

const style = computed(() => ({
  backgroundColor: COLORS[props.color],
  maskImage: props.visible ? `url('/icons/${props.name}.svg')` : '',
}));
</script>

<style lang="scss" scoped>
$size: 35px;

.icon {
  height: $size;
  width: $size;
  mask-position: center;
  mask-repeat: no-repeat;
  mask-size: 100% 100%;
  -webkit-mask-position: center;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
}
</style>
