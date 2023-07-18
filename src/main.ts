import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import useSvgIcon from '@/assets/icons'; // svg component

const app = createApp(App);
app.use(router);
useSvgIcon(app);
app.mount('#app');
