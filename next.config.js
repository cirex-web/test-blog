/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 't3.gstatic.com',
                port: '',
                pathname: '/faviconV2',
            },
        ],
    },
}

module.exports = nextConfig
