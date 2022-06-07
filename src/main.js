import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

import VueCryptojs from "vue-cryptojs";

Vue.use(VueCryptojs);

const configDir = "/resultados/config.json";
const planilhaDir = "/resultados/planilha.json";

fetch(configDir)
  .then((res) => res.json())
  .then((config) => {
    Vue.prototype.$config = config;

    fetch(planilhaDir)
      .then((res) => res.json())
      .then((planilha) => {
        Vue.prototype.$planilha = planilha;

        new Vue({
          router,
          render: (h) => h(App),
        }).$mount("#app");
      });
  });
