<template>
  <div
    class="input"
    :class="{
      'input--disabled': disabled,
      'input--focused': focus,
    }"
  >
    <label class="input-label">
      {{ labelText }}
    </label>
    <div class="input-wrapper">
      <textarea
        v-if="$attrs.type === 'textarea'"
        v-bind="$attrs"
        class="input-textarea"
        @blur="onBlur"
        @focus="onFocus"
        @input="onModel($event.target as HTMLTextAreaElement)"
      />
      <input
        v-else
        v-bind="$attrs"
        class="input-input"
        @blur="onBlur"
        @focus="onFocus"
        @input="onModel($event.target as HTMLInputElement)"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'

const props = defineProps<{ label: string }>()
const emit = defineEmits(['update:modelValue'])

const focus = ref(false)
function onBlur() { focus.value = false }
function onFocus() { focus.value = true }

function onModel({ value }: HTMLInputElement | HTMLTextAreaElement) {
  emit('update:modelValue', value)
}

const attrs = useAttrs()
const labelText = computed(() => {
  if ('required' in attrs && attrs.required !== false) {
    return props.label.concat(' *')
  }
  return props.label
})
const disabled = computed(() => {
  return 'disabled' in attrs && attrs.disabled !== false
})
</script>

<style lang="scss" scoped>
$blur: rgba($lv-dark, .7);

.input {
  @include flex-column;
  background-color: $lv-white;
  border-bottom: 2px solid $blur;
  border-radius: 2px;
  padding: 2px 5px;
  transition: border-color .5s;
}

.input--disabled {
  background-color: $lv-gray-50;
  border-color: $lv-gray;

  .input-label,
  .input-input,
  .input-textarea {
    &, &::placeholder {
      color: $lv-grey;
    }
  }
}

.input--focused {
  border-color: $lv-darker;

  .input-label {
    color: $lv-darker;
  }
}

.input-label {
  color: $blur;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 5px;
  margin-left: 3px;
  transition: color .5s;
}

.input-wrapper {
  display: flex;
}

.input-input,
.input-textarea {
  background-color: transparent;
  border: none;
  font-family: 'Open Sans';
  font-size: 14px;
  width: 100%;

  &:focus {
    outline-color: transparent;
  }
}

.input-textarea {
  min-height: 65px;
  resize: vertical;
}
</style>
