export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: "https://Bun's Blog.vercel.app/sitemap.xml",
  }
}