<script setup>
import UserService from '@/services/UserService';
import { ref } from 'vue';


const emitEvent = defineEmits(['login-success']);

const email = ref('');
const password = ref('');
const errorMsg = ref('');


async function loginUser(){
  
  
  try {
    await UserService.login(email.value,password.value);
    const user = await UserService.getProfile();
    
    UserService.saveUser(user);
    emitEvent('login-success');

    return true;
  } catch (error) {
    console.log(error);
    errorMsg.value = error.message;
  }
}

</script>

<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="loginUser">
      <input type="email" v-model="email" placeholder="enter email" required />
      <input type="password" v-model="password" required />
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMsg" style="color: red;"> {{ errorMsg }} </p>
  </div>
</template>