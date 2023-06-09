import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./view/index.vue";

const app = createApp(App).use(createPinia());
app.mount('#app');