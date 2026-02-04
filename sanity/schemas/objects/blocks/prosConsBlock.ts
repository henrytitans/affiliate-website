import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'prosConsBlock',
  title: 'Pros & Cons',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Pros & Cons',
    }),
    defineField({
      name: 'pros',
      title: 'Pros',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'cons',
      title: 'Cons',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: { pros: 'pros', cons: 'cons' },
    prepare({ pros, cons }) {
      return {
        title: 'Pros & Cons',
        subtitle: `${pros?.length || 0} pros, ${cons?.length || 0} cons`,
      }
    },
  },
})
