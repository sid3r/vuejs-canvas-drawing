import Vue from "vue";
import VueKonva from "vue-konva";

Vue.use(VueKonva);
Vue.component(
  "flash-message",
  require("./components/flashMessage.vue").default
);

import "./main.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
