<template>
  <div>
    <component :is="currentView" @login-success="onLoginSuccess" @logout="onLogout" />
  </div>
</template>
<script setup>
import { shallowRef } from 'vue';
import Dashboard from './components/Dashboard.vue';
import Login from './components/Login.vue';

const currentView = shallowRef(localStorage.getItem('token') ? Dashboard : Login);

function onLoginSuccess(){
  currentView.value = Dashboard;
}
function onLogout(){
  localStorage.removeItem("token");
  currentView.value = Login;
}


</script>