import {createRouter, createWebHistory} from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'contact.index',
    component: () => import('../pages/contacts/Index.vue')
  },
  {
    path: '/create',
    name: 'contact.create',
    component: () => import('../pages/contacts/Create.vue')
  },
  {
    path: '/edit/:id',
    name: 'contact.edit',
    component: () => import('../pages/contacts/Edit.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;