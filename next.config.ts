import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: true,
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      'remark-gfm',
      // Ví dụ plugin có options:
      ['remark-toc', { tight: true }]
    ],
    rehypePlugins: [
      'rehype-slug',
      ['rehype-autolink-headings', { behavior: 'wrap' }]
    ],
    providerImportSource: '@mdx-js/react'
  },
})

export default withMDX(nextConfig);
