<template>
    <div class="job">
        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li>
                    <router-link to="/">Scheduled Jobs</router-link>
                </li>
                <li>
                    <router-link :to="'/' + this.$route.params.class">{{this.$route.params.class}}</router-link>
                </li>

                <li class="is-active is-capitalized">
                    <a href="#">{{this.$route.params.method}}</a>
                </li>
            </ul>
        </nav>
        <div v-if="job">

            <div class="columns">
                <div class="column">
                    <div class="box">
                        <p class="title is-capitalized">{{this.$route.params.method}}</p>
                        <p class="subtitle">{{this.$route.params.class}}</p>

                        <hr/>

                        <p class="is-size-5 has-text-weight-semibold">Stats</p>
                        <p>Average time: {{job.averageRunTimeInMs ? job.averageRunTimeInMs + ' ms' : '-'}}</p>
                        <p>Run count: {{job.runCount || '0'}}</p>
                        <p>Exceptions occured: {{job.exceptionCount || '0'}}</p>

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
                                    Started {{startTimeAsText(job.startedAt)}}
                                </div>

                                <div class="column is-4">
                                    <router-link :to="job.methodName + '/' + run.uuid">{{run.uuid}}</router-link>
                                </div>

                                <div class="column">
                                    <span v-if="!run.endedAt">
                                        <icon name="spinner" spin/> Currently running
                                    </span>
                                    <span v-else-if="run.exception">
                                        <icon name="exclamation-circle"/> Error after {{durationAsText(job.duration)}}
                                    </span>
                                    <span v-else>
                                        <icon name="check-circle"/> Took {{durationAsText(job.duration)}}
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
    import moment from 'moment'

    export default {
        name: "Job",
        data() {
            return {
                loading: false,
                job: null,
                error: null
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
            cssClassForRun(run) {
                let style = 'is-primary';

                if (!run.endedAt)
                    style = 'is-info';
                else if(run.exception)
                    style = 'is.danger';

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

                fetch(
                    "https://gist.githubusercontent.com/kevcodez/6c9b3cd72700f62b3f76956157ab749a/raw/46e76ba63fb1272b05a288ad033d4b06e92be1d3/gistfile1.txt"
                )
                    .then(function (response) {
                        self.loading = false;
                        return response.json();
                    })
                    .then(function (myJson) {
                        self.job = myJson;
                    })
                    .catch(function (err) {
                        console.log(err);
                        self.loading = false;
                        self.error = err;
                    });
            }
        }
    };
</script>
