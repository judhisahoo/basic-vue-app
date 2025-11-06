<script setup>
//import { useAuthContext } from '@/context/AuthContext';
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

//const {user,logout} = useAuthContext();
const authStore = useAuthStore();
const router = useRouter();

const handleLogout = ()=>{
  authStore.logout();
  router.push("/login");
}

const moveToProfile = ()=>{
  router.push("/profile");
}
</script>

<template>
  <div>
    <h2>Dashboard</h2>
    <h4>User Profile</h4>
    <p>Name :: {{ authStore.user?.name }}</p>
    <p>Email :: {{ authStore.user?.email }}</p>
    <p>role :: {{ authStore.user?.role }}</p>
    <button @click="handleLogout()">Logout</button>
    <button @click="moveToProfile()">Move to Profile</button>
  </div>
</template>