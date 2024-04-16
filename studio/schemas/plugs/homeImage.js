export default {
  name: 'homeImage',
  type: 'object',
  title: 'Image',
  fields: [
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
    },
    { name: 'alt', type: 'string', title: 'Alternative text' },
    { name: 'caption', type: 'text', title: 'Caption text' },
    {
      title: 'Link to page',
      name: 'linkToPage',
      type: 'reference',
      to: [{ type: 'architecture' }],
    },
  ],
};
