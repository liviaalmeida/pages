<template>
  <button
    :disabled="!!$attrs.disabled || loading"
    class="button"
    v-bind="$attrs"
    @click="onClick"
  >
    <span
      class="button-wave"
      ref="wave"
    />
    <span
      v-if="loading"
      class="button-loading"
    />
    <slot
      v-else
      name="default"
    />
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ loading?: boolean }>()

const wave = ref<HTMLSpanElement | null>(null)
function onClick() {
  if (!wave.value) return

  const animate = 'button-wave--animate'
  const { classList } = wave.value
  if (classList.contains(animate)) return

  classList.add(animate)
  setTimeout(() => {
    classList.remove(animate)
  }, 400)
}
</script>

<style lang="scss" scoped>
$color: rgba($lv-darker, .7);
$height: 45px;
$icon: 25px;

.button {
  background-color: transparent;
  border: 2px solid $color;
  border-radius: 5px;
  color: $color;
  display: block;
  font-family: 'Bebas Neue';
  font-size: 20px;
  height: $height;
  min-width: 200px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;

  &:disabled {
    border-color: $lv-grey;
    color: $lv-grey;
  }

  &:not(:disabled) {
    cursor: pointer;
  }

  svg {
    height: $icon;
    width: $icon;
    fill: $color;
    margin-right: 3px;
    transform: translateY(1px);
  }
}

.button-loading {
  animation: spin 1s ease-in 0s infinite;
  border: 5px solid $color;
  border-right-color: transparent;
  border-radius: 50%;
  display: inline-block;
  margin-top: 4px;
  height: $icon;
  width: $icon;
}

.button-wave {
  background-color: rgba(black, .2);
  display: inline-block;
  transform: scaleX(0);
  transition: all .4s ease-in;
  height: $height;
  width: $height;
  position: absolute;
  top: -2px;
  left: calc(50% - 23px);

  &--animate {
    animation: wave .4s ease-in 1;
  }
}

@keyframes spin {
  100% { transform: rotate(360deg); }
}

@keyframes wave {
	100% {
		opacity: 0;
		transform: scaleX(10);
	}
}
</style>
