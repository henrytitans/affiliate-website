import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'heroBlock',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      options: {
        list: [
          { title: 'Background (Full)', value: 'background' },
          { title: 'Right Side', value: 'right' },
          { title: 'Left Side', value: 'left' },
        ],
      },
      initialValue: 'background',
      hidden: ({ parent }) => !parent?.image,
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action Button',
      type: 'object',
      fields: [
        { name: 'text', type: 'string', title: 'Button Text' },
        { name: 'url', type: 'string', title: 'Button URL' },
      ],
    }),
    defineField({
      name: 'overlay',
      title: 'Dark Overlay',
      type: 'boolean',
      description: 'Add dark overlay for better text readability',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'title', media: 'image' },
    prepare({ title, media }) {
      return {
        title: title || 'Hero Section',
        subtitle: 'Hero Block',
        media,
      }
    },
  },
})
