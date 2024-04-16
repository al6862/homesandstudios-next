import React from 'react';
import Head from 'next/head';

const HeadMeta = (props) => {
  const { siteConfigData, pageData } = props;

  const siteFavicon = siteConfigData?.favicon || '/hs_favicon.png';
  const metaTitle = pageData?.metaTitle || siteConfigData?.title;
  const metaDescription = pageData?.metaDesc || siteConfigData?.siteDescription;

  return (
    <Head>
      <title>{metaTitle}</title>

      <link rel="icon" href={siteFavicon} sizes="any" />
      <link preload="true" rel="icon" href={siteFavicon} />
      <link preload="true" rel="mask-icon" href={siteFavicon} color="#000000" />

      <meta
        name="description"
        content={metaDescription ? metaDescription : 'Homes + Studios'}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="author" content="View Source" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={metaTitle} key="og:title" />
      <meta
        property="og:description"
        content={metaDescription ? metaDescription : 'Homes + Studios'}
        key="og:description"
      />
      <meta property="og:image" content={`/hs_og-image.png`} key="og:image" />
      <meta
        property="og:image:alt"
        content="Homes + Studios"
        key="og:image:alt"
      />

      <meta itemProp="name" content={metaTitle} />
      <meta
        itemProp="description"
        content={metaDescription ? metaDescription : 'Homes + Studios'}
      />
      <meta itemProp="image" content={`/hs_og-image.png`} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={metaTitle} />
      <meta
        name="twitter:description"
        content={metaDescription ? metaDescription : 'Homes + Studios'}
      />

      {props.children}
    </Head>
  );
};

export default HeadMeta;
