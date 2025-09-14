import { getAllPosts } from '@/lib/mdx'

export async function GET() {
  const posts = await getAllPosts()
  
  const baseUrl = 'https://bunsblog.vercel.app'
  const feedUrl = `${baseUrl}/feed`
  
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Bun's Blog - Chia sẻ kiến thức lập trình</title>
    <description>Blog chia sẻ kiến thức, kinh nghiệm và những điều thú vị trong thế giới lập trình</description>
    <link>${baseUrl}</link>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
    <language>vi-VN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>admin@Bun's Blog.com (Bun's Blog Team)</managingEditor>
    <webMaster>admin@Bun's Blog.com (Bun's Blog Team)</webMaster>
    ${posts
      .slice(0, 20)
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>admin@Bun's Blog.com (${post.author})</author>
      ${post.tags.map(tag => `<category>${tag}</category>`).join('')}
    </item>`
      )
      .join('')}
  </channel>
</rss>`

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}