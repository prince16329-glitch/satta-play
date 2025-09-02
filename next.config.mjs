/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['i.ibb.co'],
        remotePatterns: [new URL('https://b1sattaplay.in/**')],

    },
};

export default nextConfig;
