<template>
  <div class="job">
     <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li>
          <a href="#">Scheduled Jobs</a>
        </li>
        <li>
          <a href="#">TaskScheduler</a>
        </li>

        <li class="is-active is-capitalized">
          <a href="#">importOrdersToContract</a>
        </li>
      </ul>
    </nav>

    <div class="columns">
      <div class="column">
        <div class="box">
          <p class="title is-capitalized">importOrdersToContract</p>
          <p class="subtitle">de.ottonow.contract.TaskScheduler</p>
          <p class="is-size-5 has-text-weight-semibold">Next start approx: 3 minutes</p>
         
          <hr />

          <p class="is-size-5 has-text-weight-semibold">Stats</p>
          <p>Average: 100ms</p>
          <p>Run count: 150</p>
          <p>Exceptions occured: 0</p>

          <hr />

          <p class="is-size-5 has-text-weight-semibold">Settings</p>
          <p>Fixed Rate:</p>
          <p>Initial Delay:</p>
          <p>Zone:</p>
          <p>CRON:</p>
        </div>

      </div>
      <div class="column is-two-thirds">
       

        <div class="notification is-info">

          <div class="columns">
            <div class="column is-4">
              <icon name="play-circle" /> Started five minutes ago
            </div>

            <div class="column is-4">
              <a href="#">weudg8qwdpgqwgdzoqwdqwgozdqwgz</a>
            </div>


            <div class="column">
              <icon name="spinner" spin /> Currently running
            </div>


          </div>
          
        </div>

        
        <div class="notification is-primary">

          <div class="columns">
            <div class="column is-4">
              <icon name="play-circle" />  01.01.2018 15:23:00 Uhr
            </div>

            <div class="column is-4">
              <a href="#">weudg8qwdpgqwgdzoqwdqwgozdqwgz</a>
            </div>

            <div class="column">
              <icon name="stop-circle" /> Took 5 minutes 3 seconds
            </div>
          </div>
          
        </div>

        <div class="notification is-primary">

          <div class="columns">
          
            <div class="column">
              <icon name="play-circle" /> 01.01.2018 15:18:00 Uhr
            </div>

            <div class="column">
              <a href="#">weudg8qwdpgqwgdzoqwdqwgozdqwgz</a>
            </div>


            <div class="column">
              <icon name="stop-circle" /> Took 5 minutes 3 seconds
            </div>


          </div>
          
        </div>

        <div class="notification is-danger">

          <div class="columns">
            <div class="column">
              <icon name="play-circle" /> 01.01.2018 15:00:00 Uhr
            </div>

            <div class="column">
              <a href="#">weudg8qwdpgqwgdzoqwdqwgozdqwgz</a>
            </div>


            <div class="column">
              <icon name="exclamation-circle" /> Error after 5 seconds
            </div>


          </div>
          
        </div>

        <div class="notification is-primary">

          <div class="columns">
            <div class="column">
              <icon name="play-circle" /> 01.01.2018 14:23:00 Uhr
            </div>

            <div class="column">
              <a href="#">weudg8qwdpgqwgdzoqwdqwgozdqwgz</a>
            </div>


            <div class="column">
              <icon name="stop-circle" /> Took 5 minutes 3 seconds
            </div>


          </div>
          
        </div>
  </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Job"
};
</script>
