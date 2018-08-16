export function getEnvironments() {
    let environmentSettings = getEnvironmentSettings();
    let envs = [];
    for (let key in environmentSettings) {
        envs.push(key)
    }
    return envs
}

export function getEnvironment(env) {
    return getEnvironmentSettings()[env]
}

export function getCurrentEnvironmentName() {
    return localStorage.getItem("env") || getEnvironments()[0];
}

export function getCurrentEnvironment() {
    let environment = getCurrentEnvironmentName();

    return getEnvironment(environment)
}

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