import React from 'react';

const LinkRender = ({ children }) => <span>{children}🔗</span>;

const link = {
  title: 'URL',
  name: 'link',
  type: 'object',
  fields: [
    {
      title: 'URL',
      name: 'href',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ['https', 'http', 'mailto', 'tel'],
        }),
    },
    {
      title: 'Open in new tab',
      name: 'blank',
      type: 'boolean',
    },
  ],
  blockEditor: {
    icon: () => '🔗',
    render: LinkRender,
  },
};

export default link;
