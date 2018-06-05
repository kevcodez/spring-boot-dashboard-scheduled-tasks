# spring-boot-dashboard-scheduled-tasks

Dashboard to track scheduled tasks in a spring boot application.

This is a dashboard based on the data retrieved via https://github.com/kevcodez/spring-boot-track-scheduled-tasks

The dashboard allows the configuration of multiple services.

# Images

![](images/dashboard_1.PNG?raw=true)

![](images/dashboard_2.PNG?raw=true)

![](images/dashboard_3.PNG?raw=true)

![](images/dashboard_4.PNG?raw=true)

![](images/dashboard_5.PNG?raw=true)

# Configuration

The .env.* files include the URLs to the services providing scheduled task tracking data.

You can configure multiple services.

```json
[{"host": "localhost", "url": "http://localhost:8081/scheduled-jobs"}]
```

# Development

Simple run `yarn serve` for starting a webserver with hot reload and everything you need. You may the server url in .env.development.

For fetching data from the services, [Vue-Resource](https://github.com/pagekit/vue-resource) is used. Vue-Resource also lets you add authentication very easily.

# Building for production

First configure your services in the .env.production file.

Build the docker image, nginx is used as server.

```
docker image build -t dashboard:latest .

docker run -d -p 80:80 dashboard:latest
```