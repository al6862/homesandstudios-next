export default {
  name: 'siteConfig',
  type: 'document',
  title: 'Site configuration',
  // https://www.sanity.io/docs/experimental/ui-affordances-for-actions
  fieldsets: [{ name: 'footer', title: 'Footer' }],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Site title',
    },
    {
      name: 'siteDescription',
      type: 'text',
      title: 'Site description',
      description: 'description for SEO',
    },
    {
      title: 'Browser Icon (Favicon)',
      name: 'favicon',
      type: 'image',
      description: 'Upload a icon to use as the browser icon',
    },
    {
      title: 'Instagram',
      name: 'instagramUrl',
      type: 'url',
      description: 'Instagram URL',
    },
    {
      title: 'Email',
      name: 'email',
      type: 'email',
      description: 'Contact email',
    },
  ],
};
