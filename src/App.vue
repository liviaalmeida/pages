<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import mixpanel from 'mixpanel-browser';

onMounted(() => {
  mixpanel.track('Page-view');
});
</script>
