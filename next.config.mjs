/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // This allows for usage of React Taint APIs to limit data being passed to client
        taint: true,
    },
};

export default nextConfig;
