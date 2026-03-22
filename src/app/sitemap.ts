import { MetadataRoute } from 'next'
import { readCms } from '@/lib/cms'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://robotikai.com.tr'
  const cms = readCms('tr')

  const staticPages = [
    '',
    '/courses',
    '/shop',
    '/blog',
    '/about',
    '/contact',
    '/faq',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const blogPosts = cms.blog.items.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const courses = cms.courses.items.map((course) => ({
    url: `${baseUrl}/courses/${course.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const products = cms.shop.items.map((product) => ({
    url: `${baseUrl}/shop/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...(blogPosts as any),
    ...(courses as any),
    ...(products as any)
  ]
}
