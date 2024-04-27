import { type MetadataRoute } from 'next'
import { allPosts } from 'contentlayer/generated'
import { env } from '@/env'
 
export default function sitemap(): MetadataRoute.Sitemap {
    const posts  = allPosts
  return [
    {
      url: env.NEXT_PUBLIC_APP_URL,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...posts.map((post) => ({
        url: `$env.NEXT_PUBLIC_APP_URL/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'yearly',
        priority: 1,
    })),
  ]
}