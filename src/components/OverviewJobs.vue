<template>
    <div>
        <div class="tile is-ancestor" v-for="(chunk, idx) in chunk(jobs, 3)" v-bind:key="idx">
            <div class="tile is-parent is-4" v-for="job in chunk" v-bind:key="job.name">
                <div v-bind:class="cssClass(job)">
                    <p class="title is-capitalized is-size-4">
                        <router-link :to="job.className + '/' + job.methodName">{{job.methodName}}</router-link>
                    </p>
                    <p class="subtitle is-size-7">
                        <router-link :to="job.className">{{job.className}}</router-link>
                    </p>

                    <span v-if="job.latestRun" class="is-size-6"><icon name="play-circle"/> Last run started {{startTimeAsText(job.latestRun.startedAt)}}<br/></span>
                    <span v-else><icon name="pause"/> Job did not run yet.</span>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        name: "OverviewJobs",
        props: {
            jobs: Array
        },
        methods: {
            chunk: function (arr, size) {
                if (!arr) return null;
                let newArr = [];
                for (let i = 0; i < arr.length; i += size) {
                    newArr.push(arr.slice(i, i + size));
                }
                return newArr;
            },

            cssClass(job) {
                let boxStyle = job.currentlyRunning ? 'blink' : '';
                let lastRunStyle;
                let lastFinishedRun = job.lastFinishedRun;
                if (lastFinishedRun) {
                    if (lastFinishedRun.exception) {
                        lastRunStyle = 'is-danger';
                    } else {
                        lastRunStyle = 'is-primary';
                    }
                }

                return `tile is-child notification ${lastRunStyle} ${boxStyle}`
            },

            startTimeAsText(timeString) {
                return moment(timeString).fromNow();
            }

        }
    }
</script>

<style scoped>
    @keyframes blink {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
        100% {
            opacity: 1;
        }
    }

    @-webkit-keyframes blink {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
        100% {
            opacity: 1;
        }
    }

    .blink {
        -moz-transition: all 0.5s ease-in-out;
        -webkit-transition: all 0.5s ease-in-out;
        -o-transition: all 0.5s ease-in-out;
        -ms-transition: all 0.5s ease-in-out;
        transition: all 0.5s ease-in-out;
        -moz-animation: blink normal 1.5s infinite ease-in-out;
        /* Firefox */
        -webkit-animation: blink normal 1.5s infinite ease-in-out;
        /* Webkit */
        -ms-animation: blink normal 1.5s infinite ease-in-out;
        /* IE */
        animation: blink normal 1.5s infinite ease-in-out;
    }
</style>
