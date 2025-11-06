<script setup>
import { useAuthContext } from '@/context/AuthContext';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const {user,logout} = useAuthContext();
const router = useRouter();

const handleLogout = ()=>{
  logout();
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
    <p>Name :: {{ user?.name }}</p>
    <p>Email :: {{ user?.email }}</p>
    <p>role :: {{ user?.role }}</p>
    <button @click="handleLogout()">Logout</button>
    <button @click="moveToProfile()">Move to Profile</button>
  </div>
</template>