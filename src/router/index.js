// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import UserService from '@/services/UserService';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to,from,next)=>{
  const isAuthnticated = !!UserService.getToken();
  console.log('isAuthnticated in router/index.js file ::::',isAuthnticated);
  
  /*if(to.path ==='/dashboard' && !isAuthnticated){
    next('/login');
  }else if(to.path === '/login' && isAuthnticated){
    next('/dashboard');
  }else{
    next();
  }*/
 if(to?.meta?.requiresAuth && !isAuthnticated){
  return next('/login');
 }

 if(to?.meta?.guest && isAuthnticated){
  return next('/dashboard');
 }

 next();
});

export default router;
