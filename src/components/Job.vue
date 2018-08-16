<template>
    <div class="job">
        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li>
                    <router-link to="/">Scheduled Jobs</router-link>
                </li>
                <li>
                    <router-link :to="'/' + this.$route.params.host">{{this.$route.params.host}}</router-link>
                </li>
                <li>
                    <router-link :to="'/' + this.$route.params.host + '/' + this.$route.params.class">{{this.$route.params.class}}</router-link>
                </li>

                <li class="is-active is-capitalized">
                    <a href="#">{{this.$route.params.method}}</a>
                </li>
            </ul>
        </nav>

        <div v-if="errorTrigger" class="notification is-danger">
            Error while triggering job. Either the job was not found or the job is currently running.
        </div>

        <div v-if="job">
            <div class="columns">
                <div class="column">
                    <div class="box">
                        <p class="title is-capitalized">{{this.$route.params.method}}
                            <a v-on:click="triggerJob()"><span class="is-pulled-right" title="Trigger Job"><icon style="height: 1em; width: auto" name="play-circle"/> </span></a>
                        </p>
                        <p class="subtitle">{{this.$route.params.class}}</p>

                        <hr/>

                        <p class="is-size-5 has-text-weight-semibold">Stats</p>
                        <p>Average time: {{job.stats.averageDurationInMs !== undefined ? job.stats.averageDurationInMs + ' ms' : '-'}}</p>
                        <p>Run count: {{job.stats.numberOfInvocations}}</p>
                        <p>Exceptions occured: {{job.stats.numberOfExceptions}}</p>

                        <hr/>

                        <p class="is-size-5 has-text-weight-semibold">Settings</p>
                        <p>Fixed Rate: {{job.fixedRate || job.fixedRateString || '-'}}</p>
                        <p>Initial Delay: {{job.initialDelay || job.initialDelayString || '-'}}</p>
                        <p>Zone: {{job.zone || '-'}}</p>
                        <p>CRON: {{job.cron || '-'}}</p>
                    </div>

                </div>
                <div class="column is-two-thirds">

                    <div v-if="!job.runs || job.runs.length === 0">
                        <div class="notification">
                            <p>Job did not not run yet.</p>
                        </div>
                    </div>

                    <div v-else>
                        <div v-bind:class="cssClassForRun(run)" v-for="(run, idx) in job.runs" v-bind:key="idx">

                            <div class="columns">
                                <div class="column is-4">
                                    <icon name="play-circle"/>
                                    Started {{startTimeAsText(run.startedAt)}}
                                </div>

                                <div class="column is-4">
                                    <router-link :to="'/' + job.host + '/' + job.className + '/' + job.methodName + '/' + run.uuid">{{run.uuid}}</router-link>
                                </div>

                                <div class="column">
                                    <span v-if="!run.endedAt">
                                        <icon name="spinner" spin/> Currently running
                                    </span>
                                    <span v-else-if="run.exception">
                                        <icon name="exclamation-circle"/> Error after {{durationAsText(run.duration)}}
                                    </span>
                                    <span v-else>
                                        <icon name="check-circle"/> Took {{durationAsText(run.duration)}}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import moment from 'moment';
    import {getCurrentEnvironment} from "../getEnvironmentSettings";

    export default {
        name: "Job",
        data() {
            return {
                loading: false,
                job: null,
                error: null,
                errorTrigger: null,
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
            $route: "fetchData"
        },
        methods: {
            triggerJob() {
                let self = this;
                self.errorTrigger = null;

                let params = self.$route.params;
                let serviceByHost = JSON.parse(self.services).filter(it => it.host === params.host)[0];

                this.$http.post(serviceByHost.url + '/' + params.class + '/' + params.method)
                    .then(function (response) { self.fetchData()})
                    .catch(function (err) {
                        self.errorTrigger = err;
                    });
            },
            cssClassForRun(run) {
                let style = 'is-primary';

                 if (run.exception)
                    style = 'is-danger';
                 else if (!run.endedAt)
                     style = 'is-info';

                return 'notification ' + style;
            },

            durationAsText(duration) {
                return moment.duration(duration).humanize()
            },
            startTimeAsText(timeString) {
                return moment(timeString).fromNow();
            },
            fetchData() {
                this.error = null;
                this.loading = true;
                let self = this;

                let params = self.$route.params;
                let serviceByHost = JSON.parse(self.services).filter(it => it.host === params.host)[0];
                this.$http.get(serviceByHost.url + '/' + params.class + '/' + params.method)
                    .then(function (response) {
                        self.loading = false;
                        return response.json();
                    })
                    .then(function (myJson) {
                        self.job = myJson;
                        self.job.host = serviceByHost.host;
                    })
                    .catch(function (err) {
                        self.loading = false;
                        self.error = err;
                    });
            }
        }
    };
</script>
