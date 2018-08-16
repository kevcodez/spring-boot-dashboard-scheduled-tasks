import Vue from 'vue'
import App from './App.vue'
import Overview from './components/Overview'
import Job from './components/Job'
import Run from './components/Run'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource';
import 'bulma/css/bulma.css'
import 'vue-awesome/icons/play-circle';
import 'vue-awesome/icons/spinner';
import 'vue-awesome/icons/check-circle';
import 'vue-awesome/icons/exclamation-circle';
import 'vue-awesome/icons/pause';
import Icon from 'vue-awesome/components/Icon';
import {getCurrentEnvironment} from "./getEnvironmentSettings";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.component('icon', Icon);

Vue.http.options.root = getCurrentEnvironment().baseUrl;

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
