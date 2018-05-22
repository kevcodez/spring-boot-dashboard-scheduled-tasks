<template>
    <div class="run">
        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li>
                    <router-link to="/">Scheduled Jobs</router-link>
                </li>
                <li>
                    <router-link :to="'/' + this.$route.params.class">{{this.$route.params.class}}</router-link>
                </li>

                <li class="is-capitalized">
                    <router-link :to="'/' + this.$route.params.class + '/' + this.$route.params.method">
                        {{this.$route.params.method}}
                    </router-link>
                </li>

                <li class="is-active is-capitalized">
                    <a href="#">{{this.$route.params.uuid}}</a>
                </li>
            </ul>
        </nav>

        <div v-if="run">
            <div class="notification">
                <table class="table is-fullwidth">
                    <tr>
                        <td>UUID</td>
                        <td>{{run.uuid}}</td>
                    </tr>
                    <tr>
                        <td>Started at</td>
                        <td>{{moment(run.startedAt).format('DD.MM.YYYY HH:mm:ss')}}</td>
                    </tr>
                    <tr>
                        <td>Ended at</td>
                        <td>{{moment(run.endedAt).format('DD.MM.YYYY HH:mm:ss')}}</td>
                    </tr>
                    <tr>
                        <td>Duration</td>
                        <td>{{run.duration ? durationAsText(run.duration) : '-'}}</td>
                    </tr>
                    <tr>
                        <td>Exception occured</td>
                        <td>{{run.exception ? 'Yes' : 'No'}}</td>
                    </tr>
                </table>
            </div>

            <div v-if="run.exception" class="notification is-danger">
                <p class="is-size-5">Exception occured</p>
                {{run.exception}}
            </div>
        </div>

    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        name: "Run",
        data() {
            return {
                loading: false,
                run: null,
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
            moment: function (str) {
                return moment(str);
            },
            durationAsText(duration) {
                return moment.duration(duration).humanize();
            },
            fetchData() {
                this.error = null;
                this.loading = true;
                let self = this;

                fetch(
                    "https://gist.githubusercontent.com/kevcodez/f4db9c7c7d6375e18df6d3822b883fff/raw/29054721aa77333c109b2291611000120b0a4a2b/gistfile1.txt"
                )
                    .then(function (response) {
                        self.loading = false;
                        return response.json();
                    })
                    .then(function (myJson) {
                        self.run = myJson;
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
