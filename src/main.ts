import { createApp } from "vue";
// import "./style.css";
import App from "./App.vue";
import VueGridLayout from "vue-grid-layout"; //引入layout

const app = createApp(App);
app.use(VueGridLayout);
app.mount("#app");
