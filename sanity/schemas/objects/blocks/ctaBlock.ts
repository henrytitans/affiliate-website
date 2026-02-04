import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'ctaBlock',
  title: 'Call to Action',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Button Text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
      description: 'Use /go/casino-slug for affiliate links, or any URL',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'variant',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Primary (Red)', value: 'primary' },
          { title: 'Accent (Gold)', value: 'accent' },
          { title: 'Secondary (Gray)', value: 'secondary' },
        ],
      },
      initialValue: 'accent',
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'sm' },
          { title: 'Medium', value: 'md' },
          { title: 'Large', value: 'lg' },
        ],
      },
      initialValue: 'lg',
    }),
    defineField({
      name: 'centered',
      title: 'Center Button',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'text', url: 'url' },
    prepare({ title, url }) {
      return {
        title: title || 'CTA Button',
        subtitle: url || 'No URL set',
      }
    },
  },
})
