<template>
    <div style="padding: 10px">
        <div class="select is-pulled-right">
            <select v-model="environment">
                <option v-for="env in environments" v-bind:key="env">{{env}}</option>
            </select>
        </div>
    </div>
</template>

<script>
    import {getEnvironments} from '../getEnvironmentSettings'

    export default {
        name: "Menu",
        data() {
            return {
                environment: localStorage.getItem("env") || getEnvironments()[0],
                environments: getEnvironments()
            }
        },
        watch: {
            environment: function (newEnv, oldEnv) {
                localStorage.setItem("env", newEnv);
                location.reload()
            }
        }
    }
</script>