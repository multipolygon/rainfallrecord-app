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
            '/user/': {
                page: '/user',
            },
        };

        console.log(paths);

        return paths;
    },
};

module.exports = withOffline(nextConfig);
