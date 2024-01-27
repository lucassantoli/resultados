import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

import VueCryptojs from "vue-cryptojs";

Vue.use(VueCryptojs);

const configDir = "/config.json?nocache=" + new Date().getDate();

fetch(configDir)
  .then((res) => res.json())
  .then((config) => {
    Vue.prototype.$config = config;

    new Vue({
      router,
      render: (h) => h(App),
    }).$mount("#app");
  });
