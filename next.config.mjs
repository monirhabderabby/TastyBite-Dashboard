/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "files.edgestore.dev",
            },
            {
                protocol: "https",
                hostname: "code-theme.com",
            },
            {
                protocol: "https",
                hostname: "assets.aceternity.com",
            },
            {
                protocol: "https",
                hostname: "secretrecipebd.com",
            },
            {
                protocol: "https",
                hostname: "foodking-react.vercel.app",
            },
            {
                protocol: "https",
                hostname: "img.clerk.com",
            },
            {
                protocol: "https",
                hostname: "png.pngtree.com",
            },
        ],
    },
};

export default nextConfig;
