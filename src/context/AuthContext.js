import UserService from "@/services/UserService";
import { inject, provide, ref } from "vue";

const AUTH_KEY = Symbol('AuthContext');


export function provideAuthContext(){
  const user = ref(null);
  const token = ref(UserService.getToken() || '');

  async function login(email,password) {
    const data = await UserService.login(email,password);
    token.value = data.access_token;
    user.value = await UserService.getProfile();
    UserService.saveUser(user.value);
  }


  function logout(){
    console.log('calling logout in auth context class file');
    UserService.logout();
    user.value=null;
    token.value = '';  
  }

  provide(AUTH_KEY,{
    user,
    token,
    login,
    logout
  });
}


export function useAuthContext(){
  const context = inject(AUTH_KEY);
  if(!context) throw new Error(`AuthContext not provided`);
  return context;
}