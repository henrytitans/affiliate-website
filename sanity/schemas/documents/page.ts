import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
      description: 'URL path for this page (e.g., "about" becomes /about)',
    }),
    defineField({
      name: 'blocks',
      title: 'Page Content',
      type: 'array',
      of: [
        { type: 'heroBlock' },
        { type: 'richTextBlock' },
        { type: 'casinoListBlock' },
        { type: 'comparisonTableBlock' },
        { type: 'prosConsBlock' },
        { type: 'ctaBlock' },
        { type: 'faqBlock' },
        { type: 'infoBoxBlock' },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: { title: 'title', slug: 'slug' },
    prepare({ title, slug }) {
      return {
        title: title || 'Untitled Page',
        subtitle: slug?.current ? `/${slug.current}` : 'No slug',
      }
    },
  },
})
