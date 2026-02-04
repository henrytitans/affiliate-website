import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getBlogPostBySlug, getBlogPostSlugs } from '@/lib/sanity/queries/blog'
import { Container } from '@/components/layout/Container'
import { RichText } from '@/components/blocks/RichText'
import { urlFor } from '@/lib/sanity/image'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getBlogPostSlugs()
  return posts.map((p) => ({ slug: p.slug.current }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: post.title,
    description: post.excerpt || `Read ${post.title} on Casino Guide.`,
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) notFound()

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 py-12">
      <Container>
        <article className="max-w-3xl mx-auto">
          {post.coverImage && (
            <Image
              src={urlFor(post.coverImage).width(800).height(400).url()}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-64 object-cover rounded-lg mb-8"
            />
          )}
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-zinc-500 mb-8">
            {post.author && <span>By {post.author}</span>}
            {post.publishedAt && <span>{new Date(post.publishedAt).toLocaleDateString()}</span>}
          </div>
          {post.body && (
            <div className="prose dark:prose-invert max-w-none">
              <RichText value={post.body} />
            </div>
          )}
        </article>
      </Container>
    </div>
  )
}
