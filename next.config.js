/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  rewrites: () => {
    return [
      {
        source: "/api/gitcoin/:path*",
        destination: "https://api.scorer.gitcoin.co/:path*",
      },
      {
        source: "/access/discord/:path*",
        destination: "https://discord.com/api/guilds/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
