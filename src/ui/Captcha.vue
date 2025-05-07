<template>
  <Input
    v-model="model"
    :disabled="disabled"
    :label="$t('home.contact.captcha.label')"
    :placeholder="$t('home.contact.captcha.placeholder')"
    required
    type="number"
    class="captcha"
    @update:modelValue="$emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import jCaptcha from 'js-captcha';

import initCaptcha from '@/assets/js/captcha.ts';

import Input from '@/ui/Input.vue';

const props = defineProps<{
  disabled?: boolean
  modelValue: string
  validate: boolean
}>();
const emit = defineEmits(['abuse', 'error', 'success', 'update:modelValue']);

const model = ref(props.modelValue);
watch(() => props.modelValue, (value) => {
  model.value = value;
});

const captcha = ref<jCaptcha>({} as jCaptcha);
function callback(response: CaptchaResponse, _: Element, tries: number) {
  if (response === 'success') {
    emit('success');
    return;
  }
  if (tries > 2) {
    emit('abuse');
    return;
  }
  emit('error');
}
onMounted(() => {
  captcha.value = initCaptcha('.captcha .input-input', callback);
});
watch(() => props.validate, (value) => {
  if (value) {
    captcha.value.validate();
  } else {
    captcha.value.reset();
  }
});
</script>

<style lang="scss" scoped>
.captcha :deep(.captcha-canvas) {
  transform: translateX(3px);
  margin-right: 5px;
}
</style>
