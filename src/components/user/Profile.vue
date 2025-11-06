<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
function moveDashboard(){
  router.push("/dashboard");
}
</script>

<template>
  <div>
    <h2>User Profile.........................................</h2>
    <button @click="moveDashboard()">Move to Dashboard</button>
  </div>
</template>