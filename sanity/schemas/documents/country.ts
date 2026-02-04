import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'country',
  title: 'Country',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'code',
      title: 'Country Code',
      type: 'string',
      description: 'ISO 3166-1 alpha-2 code (e.g., US, UK, CA)',
      validation: (rule) => rule.required().length(2).uppercase(),
    }),
    defineField({
      name: 'flag',
      title: 'Flag',
      type: 'image',
    }),
    defineField({
      name: 'legalStatus',
      title: 'Legal Status',
      type: 'string',
      options: {
        list: [
          { title: 'Legal', value: 'legal' },
          { title: 'Restricted', value: 'restricted' },
          { title: 'Prohibited', value: 'prohibited' },
          { title: 'Unregulated', value: 'unregulated' },
        ],
      },
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'text',
      rows: 6,
      description: 'Overview of gambling laws in this country',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'code' },
  },
})
