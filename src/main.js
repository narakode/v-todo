import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import vClickOutside from 'click-outside-vue3';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { router } from './core/router/router';
import { layouts } from './components/layouts';

const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

for (const layout in layouts) {
  app.component(layout, layouts[layout]);
}

app.use(router);
app.use(pinia);
app.use(vClickOutside);

app.mount('#app');
