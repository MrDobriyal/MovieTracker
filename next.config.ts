import type { NextConfig } from 'next';

const repo = 'MovieTracker'; // replace with your GitHub repo name
const isGithubPages = process.env.DEPLOY_ENV === 'GH_PAGES';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: isGithubPages ? `/${repo}` : '',
  assetPrefix: isGithubPages ? `/${repo}/` : '',
};

export default nextConfig;