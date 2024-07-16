import { createApp } from 'vue';
import App from './App.vue';
import  localStoragePlugin from './plugins/localStoragePlugin';

createApp(App).use(localStoragePlugin).mount('#app');