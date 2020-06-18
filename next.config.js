/* eslint-disable no-console */

const nextConfig = {
    env: {
        appName: process.env.APP_NAME,
        apiHost: process.env.API_HOST,
        cacheHost: process.env.CACHE_HOST,
        osmHost: process.env.OSM_HOST,
        tfApiKey: process.env.TF_API_KEY,
        showTemperature: process.env.SHOW_TEMPERATURE,
    },
    exportTrailingSlash: true,
};

module.exports = nextConfig;
