/* eslint-disable no-console */

const nextConfig = {
    distDir: 'build',
    env: {
        appName: process.env.APP_NAME,
        apiHost: process.env.API_HOST,
        cacheHost: process.env.CACHE_HOST,
        osmHost: process.env.OSM_HOST,
        tfApiKey: process.env.TF_API_KEY,
    },
    exportTrailingSlash: true,
    exportPathMap() {
        const paths = {
            '/': { page: '/' },
            '/about/': {
                page: '/about',
            },
            '/privacy/': {
                page: '/privacy',
            },
            '/location/': {
                page: '/location',
            },
            '/locations/': {
                page: '/locations',
            },
            '/user/': {
                page: '/user',
            },
        };

        console.log(paths);

        return paths;
    },
};

module.exports = nextConfig;
