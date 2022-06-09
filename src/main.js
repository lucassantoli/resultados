import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

import VueCryptojs from "vue-cryptojs";

Vue.use(VueCryptojs);

Vue.prototype.$baseURL = process.env.NODE_ENV === "production" ? "/resultados/" : "";
const configDir =
  process.env.NODE_ENV === "production"
    ? "/resultados/config.json?nocache=" + new Date().getDate()
    : "/config.json?nocache=" + new Date().getDate();

fetch(configDir)
  .then((res) => res.json())
  .then((config) => {
    Vue.prototype.$config = config;

    new Vue({
      router,
      render: (h) => h(App),
    }).$mount("#app");
  });
