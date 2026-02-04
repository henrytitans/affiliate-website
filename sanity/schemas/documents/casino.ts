import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'casino',
  title: 'Casino',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (rule) => rule.min(0).max(5),
      description: 'Rating from 0 to 5',
    }),
    defineField({
      name: 'affiliateUrl',
      title: 'Affiliate URL',
      type: 'url',
      description: 'The affiliate tracking URL for this casino',
    }),
    defineField({
      name: 'countries',
      title: 'Accepted Countries',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'country' }] }],
      description: 'Countries where this casino accepts players',
    }),
    defineField({
      name: 'paymentMethods',
      title: 'Payment Methods',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'paymentMethod' }] }],
      description: 'Payment methods accepted by this casino',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
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
      title: 'name',
      subtitle: 'rating',
      media: 'logo',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `Rating: ${subtitle}/5` : 'No rating',
        media,
      }
    },
  },
})
