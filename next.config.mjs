/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    prependData: `@import "./src/styles/index.scss";`,
  },
};

export default nextConfig;
