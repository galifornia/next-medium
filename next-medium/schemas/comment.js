export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  initialValue: {
    valid: false,
  },
  fields: [
    {
      name: 'post',
      type: 'reference',
      to: { type: 'post' },
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'valid',
      title: 'Valid',
      type: 'boolean',
      description: "Comments won't show up until approved by admin.",
    },
    {
      name: 'comment',
      title: 'Comment',
      type: 'text',
    },
  ],
};
