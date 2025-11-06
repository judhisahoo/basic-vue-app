import UserService from '@/services/UserService';
import {defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth',()=>{
  const token = ref(UserService.getToken() || '');
  const user = ref(UserService.getUser() || null);

  async function login(email,password) {
    const data = await UserService.login(email,password);
    token.value = data.access_token;
    user.value = await UserService.getProfile();
    UserService.saveUser(user.value);
  }


  function logout() {
    UserService.logout();
    user.value = null;
    token.value = '';
  }
   
   return {
    token,
    user,
    login,
    logout,
  };
})