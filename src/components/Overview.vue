<template>
    <div class="overview">
        <div style="margin-bottom: 20px">
            <router-link class="button is-light"
                         style="margin-right: 10px; margin-bottom: 10px"
                         :to="'/' + service.host"
                         active-class="is-dark"
                         v-for="service in services"
                        :key="service.host">
                {{service.host}}
            </router-link>
        </div>

        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li v-bind:class="[this.$route.params.class || this.$route.params.host ? '' : 'is-active']">
                    <router-link to="/">Scheduled Jobs</router-link>
                </li>

                <li v-if="this.$route.params.host && !this.$route.params.class" class="is-active">
                    <a href="#">{{this.$route.params.host}}</a>
                </li>
                <li v-else-if="this.$route.params.host && this.$route.params.class">
                    <router-link :to="'/' + this.$route.params.host">{{this.$route.params.host}}</router-link>
                </li>

                <li v-if="this.$route.params.class" class="is-active">
                    <a href="#">{{this.$route.params.class}}</a>
                </li>
            </ul>
        </nav>

        <div class="loading" v-if="!jobs">
            Loading...
        </div>

        <OverviewJobs v-bind:jobs="jobsWithError()" key="ERROR" v-if="jobsWithError()" style="margin-bottom: 20px"/>
        <OverviewJobs v-bind:jobs="jobsWithoutError()" key="WITHOUT_ERROR" v-if="jobsWithoutError()"/>
    </div>
</template>

<script>
    import OverviewJobs from "./OverviewJobs";
    import {getCurrentEnvironment} from "../getEnvironmentSettings";

    export default {
        name: "Overview",
        components: {OverviewJobs},
        data() {
            return {
                jobs: null,
                services: getCurrentEnvironment().services
            };
        },
        created() {
            this.fetchData();

            setInterval(function () {
                this.fetchData();
            }.bind(this), 10000);
        },
        watch: {
            $route (to, from) {
                this.jobs = null;
                this.fetchData();
            }
        },
        methods: {
            jobsWithoutError() {
                if (!this.jobs)
                    return [];

                let allJobs = [];
                this.jobs.forEach((value) => allJobs = allJobs.concat(value));
                let jobsWithoutError = allJobs.filter(job => (!job.lastFinishedRun) || (job.lastFinishedRun && !job.lastFinishedRun.exception));
                jobsWithoutError.sort(function (a, b) {
                    if (a.lastFinishedRun && !b.lastFinishedRun) {
                        return -1;
                    } else if (!a.lastFinishedRun && b.lastFinishedRun) {
                        return 1;
                    } else {
                        let methodName = a.methodName.localeCompare(b.methodName);

                        if (methodName === 0)
                            return a.className.localeCompare(b.className);

                        return methodName;
                    }
                });

                return jobsWithoutError;
            },
            jobsWithError() {
                if (!this.jobs)
                    return [];

                let allJobs = [];
                this.jobs.forEach((value) => allJobs = allJobs.concat(value));

                let jobsWithError = allJobs.filter(job => job.lastFinishedRun && job.lastFinishedRun.exception);
                jobsWithError.sort(function (a, b) {
                    return a.methodName.localeCompare(b.methodName);
                });

                return jobsWithError;
            },
            fetchData() {
                let self = this;

                let services = self.services;
                if (self.$route.params.host)
                    services = services.filter(it => it.host === self.$route.params.host);

                services.forEach(service => {
                    this.$http.get(service.url)
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (myJson) {
                            if (self.jobs == null)
                                self.jobs = new Map();

                            myJson.forEach(entry => entry.host = service.host);

                            self.jobs.delete(service.host);
                            self.jobs.set(service.host, myJson);

                            self.$forceUpdate();
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                });
            }
        }
    };
</script>