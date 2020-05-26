/* eslint-disable no-console */
const withOffline = require('next-offline');

const nextConfig = {
    distDir: 'build',
    env: {
        apiHost:
            process.env.NODE_ENV === 'development'
                ? 'api.rainfallrecord.localhost'
                : 'api.rainfallrecord.info',
        cacheHost:
            process.env.NODE_ENV === 'development'
                ? 'cache.rainfallrecord.localhost'
                : 'cache.rainfallrecord.info',
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

module.exports = withOffline(nextConfig);
