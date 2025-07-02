/** @type {import('next').NextConfig} */
const isGithubPages = process.env.DEPLOY_ENV === 'GH_PAGES';
const repo = 'MovieTracker'; 

const nextConfig = {
  output: 'export', // Required for static export
  basePath: isGithubPages ? `/${repo}` : '',
  assetPrefix: isGithubPages ? `/${repo}/` : '',
};

module.exports = nextConfig;