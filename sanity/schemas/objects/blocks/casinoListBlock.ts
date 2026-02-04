import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'casinoListBlock',
  title: 'Casino List',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'displayMode',
      title: 'Display Mode',
      type: 'string',
      options: {
        list: [
          { title: 'Automatic (by filters)', value: 'automatic' },
          { title: 'Manual Selection', value: 'manual' },
        ],
      },
      initialValue: 'automatic',
    }),
    defineField({
      name: 'manualCasinos',
      title: 'Select Casinos',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'casino' }] }],
      hidden: ({ parent }) => parent?.displayMode !== 'manual',
      description: 'Manually select which casinos to display',
    }),
    defineField({
      name: 'filter',
      title: 'Filter',
      type: 'string',
      options: {
        list: [
          { title: 'All Casinos', value: 'all' },
          { title: 'Featured Only', value: 'featured' },
          { title: 'Highest Rated', value: 'top-rated' },
          { title: 'Newest', value: 'newest' },
        ],
      },
      initialValue: 'all',
      hidden: ({ parent }) => parent?.displayMode !== 'automatic',
    }),
    defineField({
      name: 'limit',
      title: 'Max Casinos to Show',
      type: 'number',
      validation: (rule) => rule.min(1).max(20),
      initialValue: 6,
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'number',
      options: {
        list: [
          { title: '2 Columns', value: 2 },
          { title: '3 Columns', value: 3 },
          { title: '4 Columns', value: 4 },
        ],
      },
      initialValue: 3,
    }),
    defineField({
      name: 'showViewAllLink',
      title: 'Show "View All" Link',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'title', filter: 'filter', displayMode: 'displayMode', limit: 'limit' },
    prepare({ title, filter, displayMode, limit }) {
      const subtitle =
        displayMode === 'manual'
          ? 'Manual selection'
          : `${filter || 'all'} casinos (max ${limit || 6})`
      return {
        title: title || 'Casino List',
        subtitle,
      }
    },
  },
})
