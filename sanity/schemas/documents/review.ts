import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({
      name: 'casino',
      title: 'Casino',
      type: 'reference',
      to: [{ type: 'casino' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'headline',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Review Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  { name: 'href', type: 'url', title: 'URL' },
                  { name: 'openInNewTab', type: 'boolean', title: 'Open in new tab', initialValue: true },
                ],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),
    defineField({
      name: 'verdict',
      title: 'Verdict',
      type: 'text',
      rows: 3,
      description: 'Short summary verdict for the casino',
    }),
    defineField({
      name: 'lastTested',
      title: 'Last Tested',
      type: 'date',
      description: 'When was this casino last tested/verified',
    }),
    defineField({
      name: 'ratings',
      title: 'Detailed Ratings',
      type: 'object',
      fields: [
        { name: 'overall', title: 'Overall', type: 'number', validation: (r) => r.min(0).max(5) },
        { name: 'games', title: 'Games Selection', type: 'number', validation: (r) => r.min(0).max(5) },
        { name: 'support', title: 'Customer Support', type: 'number', validation: (r) => r.min(0).max(5) },
        { name: 'payout', title: 'Payout Speed', type: 'number', validation: (r) => r.min(0).max(5) },
        { name: 'mobile', title: 'Mobile Experience', type: 'number', validation: (r) => r.min(0).max(5) },
      ],
    }),
    defineField({
      name: 'pros',
      title: 'Pros',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'cons',
      title: 'Cons',
      type: 'array',
      of: [{ type: 'string' }],
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
    select: {
      title: 'headline',
      casino: 'casino.name',
      media: 'casino.logo',
    },
    prepare({ title, casino, media }) {
      return {
        title: title || 'Untitled Review',
        subtitle: casino ? `Review of ${casino}` : 'No casino selected',
        media,
      }
    },
  },
})
