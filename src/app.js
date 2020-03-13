import Vue from "vue";
import App from "./app.vue";
import router from "./router.js";
// 引入全部组件
import NutUI from "@nutui/nutui";
import "@nutui/nutui/dist/nutui.css";

NutUI.install(Vue);

new Vue({
    router,
    mounted() {},
    render: h => h(App)
}).$mount("#app");
