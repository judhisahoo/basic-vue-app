<script setup>
import { onMounted, ref } from 'vue';
const emitEvent = defineEmits(['logout']);

const user = ref(null);
const API_URL =  "https://api.escuelajs.co/api/v1";

async function getUser(){
  const response = await fetch(`${API_URL}/auth/profile`,{
    method:"GET",
    headers:{
      "Content-type":"application/json",
      "Authorization": "Bearer "+localStorage.getItem("token")
    }
  });

  user.value = await response.json();
  return true;
}

function logout(){
  localStorage.clear();
  emitEvent('logout');
}

onMounted(()=>{
  getUser();
})
</script>

<template>
  <div>
    <h2>Dashboard</h2>
    <h4>User Profile</h4>
    <p>Name :: {{ user?.name }}</p>
    <p>Email :: {{ user?.email }}</p>
    <p>role :: {{ user?.role }}</p>
    <button @click="logout">Logout</button>
  </div>
</template>