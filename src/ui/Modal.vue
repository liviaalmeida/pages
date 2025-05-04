<template>
  <transition name="modal-transition">
    <div
      v-if="modelValue"
      class="modal-wrapper"
      @click="onClose"
    >
      <div
        class="modal"
        @click.stop
      >
        <div class="modal-content">
          <Icon
            :color="color"
            :name="reason"
            class="modal-icon"
          />
          <p class="modal-title">
            {{ title }}
          </p>
          <p class="modal-message">
            {{ message }}
          </p>
        </div>
        <button
          class="modal-close"
          type="button"
          @click="onClose"
        >
          {{ $t('common.close') }}
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Icon from '@/ui/Icon.vue'

const props = defineProps<{
  message: string
  modelValue: boolean
  title: string
  reason: ModalReason
}>()
const emit = defineEmits(['update:modelValue'])

const ERRORCOLOR: Record<string, COLOR> = {
  'error': 'red',
  'info': 'yellow',
  'success': 'green',
}
const color = computed(() => ERRORCOLOR[props.reason])

function onClose() {
  emit('update:modelValue', false)
}
</script>

<style lang="scss" scoped>
.modal {
  background: $lv-white;
  border-radius: 5px;
  font-family: 'Open Sans';
  font-size: 14px;
  text-align: center;
  width: 450px;

  &-transition {
    &-enter {
      opacity: 0;
    }
  
    &-enter-active {
      transition: .4s;

      .pt-modal {
        animation: grow .4s ease-in 0s 1;
      }
    }
  
    &-leave-to {
      transition: .4s;
      opacity: 0;

      .pt-modal {
        animation: grow .4s ease-out 0s 1 reverse;
      }
    }
  }
}

.modal-wrapper {
  background: rgba(black, .5);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.modal-content {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-title {
  font-weight: 600;
  margin-right: 8px;
  text-transform: uppercase;
}

.modal-close {
  background: none;
  border: none;
  border-top: 1px solid $lv-grey;
  color: $lv-grey;
  cursor: pointer;
  font-family: 'Open Sans';
  padding: 5px;
  text-transform: uppercase;
  width: 100%;
}

@keyframes grow {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}
</style>
