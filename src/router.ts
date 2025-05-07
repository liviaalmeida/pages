import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: () => import('./pages/Home.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
// router.beforeEach(beforeEach);
// router.afterEach(afterEach);
// router.onError(onError);

export default router;
