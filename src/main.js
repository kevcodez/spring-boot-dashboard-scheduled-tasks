import Vue from 'vue'
import App from './App.vue'
import Overview from './components/Overview'
import Job from './components/Job'
import Run from './components/Run'
import VueRouter from 'vue-router'
import 'bulma/css/bulma.css'
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon'

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.component('icon', Icon);

const routes = [
    {path: '/', component: Overview},
    {path: '/:host', component: Overview},
    {path: '/:host/:class', component: Overview},
    {path: '/:host/:class/:method', component: Job},
    {path: '/:host/:class/:method/:uuid', component: Run}
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
    routes
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
