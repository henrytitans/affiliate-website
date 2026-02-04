import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'paymentMethod',
  title: 'Payment Method',
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
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Credit/Debit Card', value: 'card' },
          { title: 'E-Wallet', value: 'ewallet' },
          { title: 'Cryptocurrency', value: 'crypto' },
          { title: 'Bank Transfer', value: 'bank' },
          { title: 'Prepaid', value: 'prepaid' },
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'processingTime',
      title: 'Processing Time',
      type: 'string',
      description: 'e.g., "Instant", "1-3 business days"',
    }),
    defineField({
      name: 'fees',
      title: 'Fees',
      type: 'string',
      description: 'e.g., "Free", "2.5%"',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'type', media: 'logo' },
  },
})
