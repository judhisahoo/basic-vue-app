<script setup>
import { ref } from 'vue';

const emitEvent = defineEmits(['login-success']);

const email = ref('');
const password = ref('');
const errorMsg = ref('');
const API_URL =  "https://api.escuelajs.co/api/v1";

async function loginUser(){
  
  const bodyObj = JSON.stringify({
    email:email.value,
    password:password.value
  });
  console.log('bodyObj ::',bodyObj);
  try {
    const response = await fetch(`${API_URL}/auth/login`,{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:bodyObj
    });

    if(!response.ok){
      console.log("invalid credentials");
      errorMsg.value = "invalid credentials";
      return false;
    }

    const data = await response.json();
    console.log('login data from remote server',data);
    const {access_token,refresh_token} = data;
    console.log('access token',access_token);
    localStorage.setItem('token',access_token);
    localStorage.setItem('refresh_token',refresh_token);

    const userData = await getUser();
    localStorage.setItem('user',JSON.stringify(userData));

    emitEvent('login-success');

    return true;
  } catch (error) {
    console.log(error);
    errorMsg.value = 'Network error. Try again!';
  }
}

async function getUser(){
  const response = await fetch(`${API_URL}/auth/profile`,{
    method:"GET",
    headers:{
      "Content-type":"application/json",
      "Authorization": "Bearer "+localStorage.getItem("token")
    }
  });

  return await response.json();
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