/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    prependData: `@import "./src/styles/index.scss";`,
  },
};

export default nextConfig;
