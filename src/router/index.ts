import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Root',
      component: () => import('@/views/root/index.vue')
    },
    // demo
    {
      path: '/demo-dialog',
      name: 'DemoDialog',
      component: () => import('@/views/demo/dialog/index.vue')
    },
    {
      path: '/demo-taskpane',
      name: 'DemoTaskpane',
      component: () => import('@/views/demo/taskpane/index.vue')
    }
  ]
});

export default router;
