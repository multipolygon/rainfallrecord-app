/* eslint-disable no-console */

const nextConfig = {
    distDir: 'build',
    env: {
        apiHost:
        process.env.NODE_ENV === 'development'
            ? 'api.climatelog.localhost'
            : 'api.climatelog.app',
        cacheHost:
        process.env.NODE_ENV === 'development'
            ? 'api.climatelog.localhost'
            : 'data.climatelog.app',
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
