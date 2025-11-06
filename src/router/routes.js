export default [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'/login',
    component: ()=> import('@/components/Login.vue'),
    meta: {guest:true}
  },
  {
    path:'/dashboard',
    component: ()=> import('@/components/Dashboard.vue'),
    meta: {requiresAuth:true}
  },
  {
    path:'/about-us',
    component: ()=> import('@/components/AboutUs.vue'),
    meta: {guest:true}
  },
  {
    path:'/profile',
    component: ()=>import('@/components/user/Profile.vue'),
    meta: {requiresAuth:true}
  }
];