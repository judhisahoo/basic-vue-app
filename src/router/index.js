// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
//import UserService from '@/services/UserService';
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  //const auth = useAuthStore();
  //const isAuthnticated = !!UserService.getToken();
  const { token } = useAuthStore();
  const isAuthnticated = !!token;
  console.log("isAuthnticated in router/index.js file ::::", isAuthnticated);

  if (to?.meta?.requiresAuth && !isAuthnticated) {
    return next("/login");
  }

  if (to?.meta?.guest && isAuthnticated) {
    return next("/dashboard");
  }

  next();
});

export default router;
