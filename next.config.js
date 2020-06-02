/* eslint-disable no-console */

const nextConfig = {
    distDir: 'build',
    env: {
        apiHost:  process.env.API_HOST,
        cacheHost: process.env.CACHE_HOST,
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
