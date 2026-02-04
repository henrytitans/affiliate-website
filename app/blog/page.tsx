import Link from 'next/link'
import Image from 'next/image'
import { getBlogPosts } from '@/lib/sanity/queries/blog'
import { Container } from '@/components/layout/Container'
import { urlFor } from '@/lib/sanity/image'

export const metadata = {
  title: 'Blog',
  description: 'Casino news, guides, and tips from our experts.',
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 py-12">
      <Container>
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Blog</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">News, guides, and tips from our experts.</p>

        {posts.length === 0 ? (
          <p className="text-zinc-500">No posts found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="bg-white dark:bg-zinc-800 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                {post.coverImage ? (
                  <Image
                    src={urlFor(post.coverImage).width(400).height(200).url()}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-zinc-200 dark:bg-zinc-700" />
                )}
                <div className="p-4">
                  <h2 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">{post.title}</h2>
                  {post.excerpt && (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">{post.excerpt}</p>
                  )}
                  {post.publishedAt && (
                    <p className="text-xs text-zinc-500 mt-2">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}
