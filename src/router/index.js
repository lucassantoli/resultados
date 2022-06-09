import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/converter",
    name: "Converter",
    component: () => import("@/views/Converter.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/NotFound.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/:olimpiada",
    name: "Olimpiada",
    component: () => import("@/views/Olimpiada.vue"),
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
