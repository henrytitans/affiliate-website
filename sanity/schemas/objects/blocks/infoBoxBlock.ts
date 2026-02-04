import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'infoBoxBlock',
  title: 'Info Box',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'variant',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Info (Blue)', value: 'info' },
          { title: 'Warning (Yellow)', value: 'warning' },
          { title: 'Success (Green)', value: 'success' },
          { title: 'Danger (Red)', value: 'danger' },
        ],
      },
      initialValue: 'info',
    }),
  ],
  preview: {
    select: { title: 'title', variant: 'variant' },
    prepare({ title, variant }) {
      const variantLabels: Record<string, string> = {
        info: 'Info',
        warning: 'Warning',
        success: 'Success',
        danger: 'Danger',
      }
      return {
        title: title || 'Info Box',
        subtitle: variantLabels[variant as string] || 'Info Box',
      }
    },
  },
})
