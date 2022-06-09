import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

import VueCryptojs from "vue-cryptojs";

Vue.use(VueCryptojs);
Vue.prototype.$baseURL = "resultados";
const configDir = Vue.prototype.$baseURL + "/config.json";

fetch(configDir)
  .then((res) => res.json())
  .then((config) => {
    Vue.prototype.$config = config;

    new Vue({
      router,
      render: (h) => h(App),
    }).$mount("#app");
  });
