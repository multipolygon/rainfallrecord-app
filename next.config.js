/* eslint-disable no-console */
const withOffline = require('next-offline');

const nextConfig = {
    distDir: 'build',
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
            '/locations/': {
                page: '/locations',
            },
        };

        console.log(paths);

        return paths;
    },
};

module.exports = withOffline(nextConfig);
