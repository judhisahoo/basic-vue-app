<template>
  <div>
    <component :is="currentView" @login-success="onLoginSuccess" @logout="onLogout" />
  </div>
</template>
<script setup>
import { shallowRef } from 'vue';
import Dashboard from './components/Dashboard.vue';
import Login from './components/Login.vue';
import UserService from './services/UserService';


const currentView = shallowRef(UserService.getToken() ? Dashboard : Login);

function onLoginSuccess(){
  currentView.value = Dashboard;
}
function onLogout(){
  //localStorage.removeItem("token");
  UserService.logout();
  currentView.value = Login;
}


</script>