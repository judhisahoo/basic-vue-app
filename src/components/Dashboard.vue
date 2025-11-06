<script setup>
import UserService from '@/services/UserService';
import { onMounted, ref } from 'vue';

const emitEvent = defineEmits(['logout']);

const user = ref(null);
const errorMsg = ref('');

function logout(){
  localStorage.clear();
  emitEvent('logout');
}

onMounted(async()=>{
  try {
    user.value = await UserService.getProfile();
  } catch (error) {
     errorMsg.value = error.message;
    emitEvent('logout');
  }
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