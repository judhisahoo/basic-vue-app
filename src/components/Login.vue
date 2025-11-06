<script setup>
//import { useAuthContext } from '@/context/AuthContext';
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const errorMsg = ref('');

//const {login,token} = useAuthContext();
const authStore = useAuthStore();
const router = useRouter();

async function loginUser(){
  try {
    //await login(email.value,password.value);
    await authStore.login(email.value,password.value);
    router.push("/dashboard");
  } catch (error) {
    console.log(error);
    errorMsg.value = error.message || 'Login Failed';
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