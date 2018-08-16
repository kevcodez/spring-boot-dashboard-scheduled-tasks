# spring-boot-dashboard-scheduled-tasks

Dashboard to track scheduled tasks in a spring boot application.

This is a dashboard based on the data retrieved via https://github.com/kevcodez/spring-boot-track-scheduled-tasks

The dashboard allows the configuration of multiple services.

# Images

![Overview of the jobs](images/dashboard_1.PNG?raw=true)

![Mobile view](images/dashboard_2.PNG?raw=true)

![View runs from a specific job](images/dashboard_3.PNG?raw=true)

![Specific job, when job did not run yet](images/dashboard_4.PNG?raw=true)

![Data from a specific run](images/dashboard_5.PNG?raw=true)

# Configuration

The getEnvironmentSettings.js includes the environments and URLs to the services providing scheduled task tracking data.

You can configure multiple services.

```js
export function getEnvironmentSettings() {
    return {
        "Test": {
            "baseUrl": "https://my-api.test.de/",
            "services": [
                {
                    "host": "Billing-Service",
                    "url": "billing-service/scheduled-jobs"
                },
                {
                    "host": "Contract-Service",
                    "url": "contract-service/scheduled-jobs"
                }
            ]
        },
        "Production": {
            "baseUrl": "https://my-api.live.de/",
            "services": [
                {
                    "host": "Billing-Service",
                    "url": "billing-service/scheduled-jobs"
                },
                {
                    "host": "Contract-Service",
                    "url": "contract-service/scheduled-jobs"
                }
            ]
        }
    }
}
```

# Features

* Switch between different environments
* Support for multiple services
* Get an overview of all jobs
* Get all jobs from a specific service
* View successful, failed and jobs that did not run yet
* View a run history of a any job
* Trigger a job
* View a specific run
* View errors from jobs, of occured

# Development

Simple run `yarn serve` for starting a webserver with hot reload and everything you need. You may the server url in .env.development.

For fetching data from the services, [Vue-Resource](https://github.com/pagekit/vue-resource) is used. Vue-Resource also lets you add authentication very easily.

# Building for production

First configure your services in the getEnvironmentSettings.js file.

Build the docker image, nginx is used as server.

```
docker image build -t dashboard:latest .

docker run -d -p 80:80 dashboard:latest
```