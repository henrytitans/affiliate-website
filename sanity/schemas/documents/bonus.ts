import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'bonus',
  title: 'Bonus',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g., "100% up to $500"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'casino',
      title: 'Casino',
      type: 'reference',
      to: [{ type: 'casino' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Bonus Type',
      type: 'string',
      options: {
        list: [
          { title: 'Welcome Bonus', value: 'welcome' },
          { title: 'Reload Bonus', value: 'reload' },
          { title: 'Free Spins', value: 'freespins' },
          { title: 'No Deposit', value: 'no-deposit' },
          { title: 'Cashback', value: 'cashback' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'Human-readable value, e.g., "$500 + 100 Free Spins"',
    }),
    defineField({
      name: 'wageringRequirement',
      title: 'Wagering Requirement',
      type: 'number',
      description: 'e.g., 35 means 35x wagering',
    }),
    defineField({
      name: 'minDeposit',
      title: 'Minimum Deposit',
      type: 'number',
      description: 'Minimum deposit in USD',
    }),
    defineField({
      name: 'code',
      title: 'Bonus Code',
      type: 'string',
      description: 'Optional bonus code to claim',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'terms',
      title: 'Terms & Conditions',
      type: 'text',
      rows: 6,
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
      title: 'title',
      casino: 'casino.name',
      type: 'type',
    },
    prepare({ title, casino, type }) {
      return {
        title,
        subtitle: `${casino || 'No casino'} • ${type || 'No type'}`,
      }
    },
  },
})
