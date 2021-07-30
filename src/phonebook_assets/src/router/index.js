import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import User from '../views/User.vue';
import Test from '../views/Test.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  }
];

const router = new VueRouter({
  routes
});

export default router;
