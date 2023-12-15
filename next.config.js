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
		source: "/api/discord/:path*",
		destination: "https://discordapp.com/api/guilds/:path*",
	  },
    ];
  },
};

module.exports = nextConfig;
