<template>
  <div class="overview">
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li v-bind:class="[className ? '' : 'is-active']">
          <a href="#">Scheduled Jobs</a>
        </li>

          <li v-if="className" class="is-active">
              {{className}}
          </li>
      </ul>
    </nav>

     <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="error" class="notification is-danger">
      {{ error }}
    </div>

    <div v-if="jobs">
      {{ error }}
    </div>
    
    <div class="tile is-ancestor" v-for="(chunk, idx) in chunkedItems" v-bind:key="idx">
      <div class="tile is-parent" v-for="job in chunk" v-bind:key="job.name">
        <div v-bind:class="cssClass(job)">
            <p class="title is-capitalized"><router-link to="/job">{{job.methodName}}</router-link></p>
          <p class="subtitle is-size-7">{{job.className}}</p>
          
              <span v-if="job.lastRunStatus"><icon name="play-circle"></icon> Started: 15 minutes ago<br /></span>
              <span v-else><icon name="pause" /> Job did not run yet.</span>
              <span v-if="job.lastRunStatus && job.status !== 'RUNNING'"><icon name="redo"></icon> Next start approx: 3 minutes</span>
        
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Overview",
  data() {
    return {
      loading: false,
      jobs: null,
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
  computed: {
    chunkedItems() {
      return this.chunk(this.jobs, 4);
    },
    className() {
        return this.$route.params.class
    }
  },
  methods: {

    chunk: function(arr, size) {
      if (!arr) return null;
      let newArr = [];
      for (let i = 0; i < arr.length; i += size) {
        newArr.push(arr.slice(i, i + size));
      }
      return newArr;
    },

    cssClass(job) {
      let boxStyle = job.status === 'RUNNING' ? 'blink' : '';
      let lastRunStyle;
      switch(job.lastRunStatus) {
          case "SUCCESS":
            lastRunStyle = 'is-primary';
            break;
          case 'FAIL':
            lastRunStyle = 'is-danger';
            break;
          default:
            lastRunStyle = '';
      }

      return `tile is-child notification ${lastRunStyle} ${boxStyle}`
    },

    fetchData() {
      this.error = null;
      this.loading = true;
      let self = this;

      fetch(
        "https://gist.githubusercontent.com/kevcodez/6c661f551cc8e6e00af2f22e9e6c57b8/raw/f446ada52c1ba87cfca4839ea7a704b78f992551/gistfile1.txt"
      )
        .then(function(response) {
          self.loading = false;
          return response.json();
        })
        .then(function(myJson) {
          self.jobs = myJson;
        })
        .catch(function(err) {
          console.log(err);
          self.loading = false;
          self.error = err;
        });
    }
  }
};
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
