import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'comparisonTableBlock',
  title: 'Comparison Table',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'casinos',
      title: 'Casinos to Compare',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'casino' }] }],
      validation: (rule) => rule.min(2).max(5),
      description: 'Select 2-5 casinos to compare',
    }),
    defineField({
      name: 'columns',
      title: 'Columns to Show',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Rating', value: 'rating' },
          { title: 'Welcome Bonus', value: 'bonus' },
          { title: 'Min Deposit', value: 'minDeposit' },
          { title: 'Payout Speed', value: 'payoutSpeed' },
          { title: 'License', value: 'license' },
        ],
      },
      initialValue: ['rating', 'bonus'],
    }),
    defineField({
      name: 'highlightWinner',
      title: 'Highlight Best Option',
      type: 'boolean',
      initialValue: true,
      description: 'Visually highlight the casino with the best rating',
    }),
  ],
  preview: {
    select: { title: 'title', casinos: 'casinos' },
    prepare({ title, casinos }) {
      return {
        title: title || 'Comparison Table',
        subtitle: `${casinos?.length || 0} casinos`,
      }
    },
  },
})
