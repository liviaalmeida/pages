<template>
  <div class="locale">
    <label
      v-for="lang in locales"
      :key="lang"
      class="locale-label"
    >
      <input
        v-model="locale"
        type="radio"
        name="lang"
        :value="lang"
        class="locale-input"
        @click="onClick(locale, lang)"
      >
      <span class="locale-lang">
        {{ lang }}
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useI18n } from 'vue-i18n';
import mixpanel from 'mixpanel-browser';
import { useStorage } from '@/composables/storage.ts';

const { availableLocales: locales, locale } = useI18n({ useScope: 'global' });

const { getLocale, setLocale } = useStorage();

onBeforeMount(() => {
  const savedLocale = getLocale();
  if (savedLocale && locales.includes(savedLocale)) {
    locale.value = savedLocale;
  }

  setLocale(locale.value);
});

function onClick(from: string, to: string) {
  setLocale(to);
  mixpanel.track('Locale-change', {
    from,
    to,
  });
}
</script>

<style lang="scss" scoped>
.locale {
  color: $lv-white;
}

.locale-label {
  font-weight: 400;
  font-size: 14px;

  &:not(:last-child):after {
    content: '|';
    margin: 0 3px;
  }
}

.locale-input {
  display: none;

  &:checked ~ .locale-lang {
    font-weight: 700;
    opacity: 1;
  }
}

.locale-lang {
  opacity: .5;
  cursor: pointer;
}
</style>
