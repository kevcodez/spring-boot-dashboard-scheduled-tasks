<template>
    <div id="app">
        <Menu />
        <section class="section">
            <router-view></router-view>

        </section>

    </div>
</template>

<script>
    import Overview from './components/Overview.vue';
    import Job from './components/Job.vue';
    import Menu from './components/Menu.vue';

    export default {
        name: 'app',
        components: {
            Overview,
            Job,
            Menu
        }
    }
</script>