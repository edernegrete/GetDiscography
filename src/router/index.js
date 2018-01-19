import Vue from 'vue';
import Router from 'vue-router';
import Search from '@/components/Search';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/search/:id',
      name: 'search',
      component: Search,
    },
  ],
});
