<template>
    <div id="app">
        <section class="section">
            <router-view></router-view>

        </section>

    </div>
</template>

<script>
    import Overview from './components/Overview.vue'
    import Job from './components/Job.vue'

    export default {
        name: 'app',
        components: {
            Overview,
            Job
        }
    }
</script>