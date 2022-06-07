import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "about" */ "@/views/Home.vue"),
  },
  {
    path: "/converter",
    name: "Converter",
    component: () => import(/* webpackChunkName: "about" */ "@/views/Converter.vue"),
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
