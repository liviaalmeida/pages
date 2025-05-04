<template>
  <section class="section">
    <h2
      v-if="title"
      class="section-title"
    >
      {{ title }}
    </h2>
    <div class="section-content">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ title?: string }>()
</script>

<style lang="scss" scoped>
.section {
  @include flex-column;
  padding: 50px;
  justify-content: center;
  min-height: calc(100vh - 60px);
}

.section-title {
  font-family: 'Abel';
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 40px;
  text-align: center;
}

.section-content {
  margin: 0 auto;
  max-width: 650px;

  @include phone {
    width: 100%;
  }
}
</style>
