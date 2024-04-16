export default {
  name: 'infoPage',
  title: 'Info Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'imageCourtesy',
      title: 'Image Courtesy of',
      type: 'array',
      of: [
        {
          name: 'imageCourtesy',
          type: 'object',
          title: 'Image Courtesy of',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            {
              name: 'url',
              type: 'url',
              title: 'URL',
            },
          ],
        },
      ],
    },
    {
      title: 'Show Contribute Button',
      name: 'showContributeButton',
      type: 'boolean',
      description: 'Display Contribute Form On Info Page',
    },
    {
      name: 'serviceID',
      title: 'EmailJs Service ID',
      type: 'string',
    },
    {
      name: 'templateID',
      title: 'EmailJs Template ID',
      type: 'string',
    },
    {
      name: 'userID',
      title: 'EmailJs User ID',
      type: 'string',
    },
    {
      name: 'contributeSuccessMessage',
      title: 'Contribute Success Message',
      type: 'string',
    },
    {
      title: 'Meta Title',
      name: 'metaTitle',
      type: 'string',
      description: 'Title used for search engines and browsers',
      validation: (Rule) =>
        Rule.max(50).warning(
          'Longer titles may be truncated by search engines'
        ),
    },
    {
      title: 'Meta Description',
      name: 'metaDesc',
      type: 'text',
      rows: 3,
      description: 'Description for search engines',
      validation: (Rule) =>
        Rule.max(150).warning(
          'Longer descriptions may be truncated by search engines'
        ),
    },
  ],
};
