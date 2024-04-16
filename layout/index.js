import React from 'react';
import Navigator from './Navigator';
import Body from './Body';
import Head from 'next/head';
import HeadMeta from '@/components/HeadMeta';

const Layout = ({ siteConfigData, pageData, navListData, children }) => {
  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/fonts/font-steinbeck-regular.woff2"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/font-suisse-neue-trial-light.woff2"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/font-gt-zirkon-regular.woff2"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/font-gt-zirkon-regular-Italic.woff2"
          as="font"
          crossOrigin=""
        />
      </Head>
      <HeadMeta siteConfigData={siteConfigData} pageData={pageData} />
      <div className="layout">
        <Navigator navList={navListData} />
        <Body>{children}</Body>
      </div>
      <style jsx>{`
        .layout {
          display: flex;
          position: relative;
          height: 100%;
          overflow: hidden;
          margin: 0;
        }
      `}</style>
    </>
  );
};

export default Layout;
